from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import OrderSerializer, OrderRowSerializer
from base.models import Order, OrderRow
from rest_framework.exceptions import APIException
from .services import get_order_row_data, get_orders, send_delivery_email
from rest_framework import status


@api_view(["GET"])
def getData(request):
    order_response = get_orders()
    return Response(order_response, status=status.HTTP_200_OK)


@api_view(["GET"])
def getOrderRowData(request, order_id):
    order_row_response = get_order_row_data(order_id)
    return Response(order_row_response, status=status.HTTP_200_OK)


@api_view(["POST"])
def sendEmail(request):
    email = request.data.get("email")
    orderId = request.data.get("orderId")
    order_number = request.data.get("orderNumber")

    if email:
        email_response = send_delivery_email(email, orderId, order_number)

        return Response(email_response, status=status.HTTP_200_OK)
    else:
        raise APIException("Email not provided")
