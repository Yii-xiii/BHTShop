from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list),
    path('latest/', views.latest_product_list),
    path('latest/pages/<int:pageNum>/', views.latest_product_list_by_page),
    path('best_selling/', views.best_selling_product_list),
    path('pages/<int:pageNum>/', views.product_list_by_page),

    path('sellers/<int:pk>/average_rating/', views.seller_average_rating),
    path('sellers/<int:pk>/latest/pages/<int:pageNum>/', views.seller_latest_product_list_by_page),
    path('sellers/<int:pk>/best_selling/pages/<int:pageNum>/', views.seller_best_selling_product_list_by_page),

    path('<int:pk>/', views.product),
    path('<int:pk>/edit/', views.edit_product),
    path('create/', views.create_product),

    path('<int:pk>/specs/', views.product_spec_list),
    path('<int:pk>/specs/pages/<int:pageNum>/', views.product_spec_list_by_page),
    path('<int:pk>/specs/latest/', views.latest_product_spec_list),
    path('<int:pk>/specs/latest/pages/<int:pageNum>/', views.latest_product_spec_list_by_page),

    path('<int:pk>/specs/<int:pk_spec>/', views.product_spec),
    path('<int:pk>/specs/<int:pk_spec>/edit/', views.edit_product_spec),
    path('<int:pk>/specs/create/', views.create_product_spec),

    path('<int:pk>/images/', views.product_image_list),

    path('<int:pk>/images/<int:pk_image>/', views.product_image),
    path('<int:pk>/images/first/', views.first_product_image),
    path('<int:pk>/images/<int:pk_image>/edit/', views.edit_product_image),
    path('<int:pk>/images/create/', views.create_product_image),

    path('filter/categories/randoms/', views.random_product_list_by_category),
    path('filter/categories/latest/pages/<int:pageNum>/', views.latest_product_list_by_category),
    path('filter/categories/highest_rating/pages/<int:pageNum>/', views.highest_rating_product_list_by_category),
    path('filter/categories/lowest_rating/pages/<int:pageNum>/', views.lowest_rating_product_list_by_category),
    path('filter/categories/cheapest/pages/<int:pageNum>/', views.cheapest_product_list_by_category),
    path('filter/categories/most_expensive/pages/<int:pageNum>/', views.most_expensive_product_list_by_category),
    path('filter/categories/price_range/randoms/', views.random_product_by_price_range_and_category),


    path('filter/randoms/', views.random_product_list),
    path('filter/highest_rating/pages/<int:pageNum>/', views.highest_rating_product_list),
    path('filter/lowest_rating/pages/<int:pageNum>/', views.lowest_rating_product_list),
    path('filter/cheapest/pages/<int:pageNum>/', views.cheapest_product_list),
    path('filter/most_expensive/pages/<int:pageNum>/', views.most_expensive_product_list),
    path('filter/price_range/randoms/', views.random_product_by_price_range),


    path('search/pages/<int:pageNum>/',views.search_product),
    path('search/categories/pages/<int:pageNum>/',views.search_product_by_category),
]
