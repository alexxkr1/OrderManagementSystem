from rest_framework.response import Response
from rest_framework.decorators import api_view
from reportlab.lib.styles import getSampleStyleSheet

# from OMSApi.api.helpers import save_pdf
from .serializers import OrderSerializer, OrderRowSerializer
from base.models import Order, OrderRow
from rest_framework.exceptions import APIException
from django.core.mail import send_mail, EmailMessage
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from barcode import Code128
from barcode.writer import ImageWriter
from PIL import Image

from io import BytesIO

@api_view(['GET'])
def getData(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addOrder(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def getOrderRowData(request, order_id):
    order_rows = OrderRow.objects.filter(order__id=order_id)
    serializer = OrderRowSerializer(order_rows, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def sendEmail(request):
    email = request.data.get('email')
    orderId = request.data.get('orderId')

    order_rows = OrderRow.objects.filter(order__id=orderId)
    order_rows_serializer = OrderRowSerializer(order_rows, many=True)

    orders = Order.objects.filter(id=orderId)
    orders_serializer = OrderSerializer(orders, many=True)

    if email:
        subject = "Order Delivery Note"
        body = "Info about the order to deliver in attachment PDF"
        from_email = "from@example.com"
        to_emails = [email]
        
    
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)

        barcode_value = orderId
        barcode_image = BytesIO()
        Code128(barcode_value, writer=ImageWriter()).write(barcode_image)
        barcode_image.seek(0)
        barcode_image = Image.open(barcode_image)
        barcode_width, barcode_height = barcode_image.size

        p.drawInlineImage(barcode_image, 250, 10, width=barcode_width // 2, height=barcode_height // 2)

        y = 350
        p.drawString(250, y + 400, "Order Details")

        p.drawString(100, 670, "Client Details:")
        for order_row_data in order_rows_serializer.data:
            for key, value in order_row_data.items():
                 if key != "id":  # Exclude the "id" field
                    p.drawString(100, y, f"{key}: {value}")
                    y += 20

        p.drawString(100, y + 20, "Orders:")
        for order_data in orders_serializer.data:
            for key, value in order_data.items():
                if key != "order" and key != "id":
                    p.drawString(100, y + 70, f"{key}: {value}")
                    y += 20

        p.showPage()
        p.save()
        buffer.seek(0)

        email_message = EmailMessage(subject, body, from_email, to_emails)

        email_message.attach("orderdelivery.pdf", buffer.read(), "application/pdf")

        email_message.send()

        return Response(email)
    else:
        raise APIException('Email not provided')