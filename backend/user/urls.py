from django.urls import path
from . import views

urlpatterns = [
	path('customers/',views.customerList),
	path('customers/create/',views.createCustomer),
	path('customers/<int:pk>/',views.customer),
	path('sellers/',views.sellerList),
	path('sellers/create/',views.createSeller),
	path('sellers/<int:pk>/',views.seller),
]