from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import OrderSerializer
from base.models import Order
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