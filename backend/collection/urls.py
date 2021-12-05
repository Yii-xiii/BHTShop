from django.urls import path
from . import views

urlpatterns = [
	path('',views.customer_collection_list),
	path('latest/',views.latest_customer_collection_list),
	path('latest/pages/<int:pageNum>',views.latest_customer_collection_list_by_page),

	path('create/',views.create_customer_collection),
	path('products/<int:pk_product>/',views.get_customer_collection),
	path('products/<int:pk_product>/edit/',views.edit_customer_collection),

	path('most_popular/pages/<int:pageNum>',views.most_popular_product_list_by_page),
	path('categories/most_popular/pages/<int:pageNum>',views.most_popular_product_list_by_category_and_page),
]