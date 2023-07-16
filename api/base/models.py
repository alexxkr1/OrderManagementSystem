from django.db import models


class Order(models.Model):
    order_number = models.CharField(max_length=200)
    customer_code = models.CharField(max_length=200)
    customer_name = models.CharField(max_length=200)
    date = models.DateField()


class OrderRow(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_code = models.CharField(max_length=200)
    product_name = models.CharField(max_length=200)
    ordered_quantity = models.IntegerField()
