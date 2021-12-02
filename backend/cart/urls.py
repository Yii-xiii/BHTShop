from django.urls import path
from . import views

urlpatterns = [
	path('',views.customer_cart_list),
	path('latest/',views.latest_customer_cart_list),
	path('latest/pages/<int:pageNum>',views.latest_customer_cart_list_by_page),

	path('create/',views.create_customer_cart),
	path('productSpecs/<int:pk_spec>/',views.get_customer_cart),
	path('productSpecs/<int:pk_spec>/edit/',views.edit_customer_cart),
]