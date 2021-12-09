from django.urls import path
from . import views

urlpatterns = [
    path('products/<int:pk>/', views.product_comment_list),
    path('products/<int:pk>/rating/<int:rating>/', views.product_comment_list_by_rating),
    path('products/<int:pk>/lowest_rating/', views.lowest_rating_product_comment_list),
    path('products/<int:pk>/highest_rating/', views.highest_rating_product_comment_list),

    path('products/<int:pk>/pages/<int:pageNum>/', views.product_comment_list_by_page),
    path('products/<int:pk>/latest/', views.latest_product_comment_list),
    path('products/<int:pk>/latest/pages/<int:pageNum>/', views.latest_product_comment_list_by_page),

    path('orders/<int:pk>/', views.order_comment),

    path('<int:pk_comment>/', views.product_comment),
    path('<int:pk_comment>/edit/', views.edit_product_comment),
    path('orders/<int:pk_order>/create/', views.create_product_comment),
]
