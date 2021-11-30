from django.urls import path
from . import views

urlpatterns = [
	path('',views.getOrderList),
	path('pages/<int:pageNum>',views.getLatestOrderListByPage),
	path('customers/<int:customerId>/pages/<int:pageNum>',views.getLatestCustomerOrderListByPage),
	path('products/<int:productId>/pages/<int:pageNum>',views.getLatestProductOrderListByPage),
	
	path('create',views.createOrder),
	path('<int:orderId>',views.getOrder),
	path('<int:orderId>/edit',views.editOrder),
]