from django.urls import path
from . import views

urlpatterns = [
	path('',views.customer_followship_list),
	path('latest/',views.latest_customer_followship_list),
	path('latest/pages/<int:pageNum>/',views.latest_customer_followship_list_by_page),

	path('create/',views.create_customer_followship),
	path('sellers/<int:pk_seller>/',views.get_customer_followship),
	path('sellers/<int:pk_seller>/edit/',views.edit_customer_followship),
]