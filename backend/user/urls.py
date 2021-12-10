from django.urls import path
from . import views

urlpatterns = [
	path('current_user/', views.current_user),

	path('customers/',views.customer_list),
	path('customers/create/',views.create_customer),
	path('customers/<int:pk>/',views.customer),
	path('customers/<int:pk>/edit/',views.edit_customer),

	path('sellers/',views.seller_list),
	path('sellers/create/',views.create_seller),
	path('sellers/<int:pk>/',views.seller),
	path('sellers/<int:pk>/edit/', views.edit_seller),

	path('postmen/',views.postman_list),
	path('postmen/create/',views.create_postman),
	path('postmen/<int:pk>/',views.postman),
	path('postmen/<int:pk>/edit/', views.edit_postman),

	path('login/',views.user_login),
	path('logout/',views.user_logout),
]