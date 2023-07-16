from django.urls import path, re_path
from . import views

urlpatterns = [
    path("", views.getData),
    path("add", views.addOrder),
    re_path("^order-rows/(?P<order_id>.+)/$", views.getOrderRowData),
    path("send-order", views.sendEmail),
]
