from django.urls import path
from . import views

urlpatterns = [
	path('',views.get_order_list),
	path('pages/<int:pageNum>',views.get_latest_order_list_by_page),
	path('customers/<int:customerId>/pages/<int:pageNum>',views.get_latest_customer_order_list_by_page),
	path('products/<int:productId>/pages/<int:pageNum>',views.get_latest_product_order_list_by_page),
	
	path('create',views.create_order),
	path('<int:orderId>',views.get_order),
	path('<int:orderId>/edit',views.edit_order),
]