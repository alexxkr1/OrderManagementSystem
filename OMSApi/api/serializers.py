from rest_framework import serializers
from base.models import Order, OrderRow


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderRowSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderRow
        fields = "__all__"
