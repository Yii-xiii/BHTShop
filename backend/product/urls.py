from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list),
    path('pages/<int:pageNum>', views.product_list_by_page),
    path('latest', views.latest_product_list),
    path('latest/pages/<int:pageNum>', views.latest_product_list_by_page),

    path('<int:pk>/', views.product),
    path('<int:pk>/edit', views.edit_product),
    path('create/', views.create_product),

    path('<int:pk>/specs/', views.product_spec_list),
    path('<int:pk>/specs/pages/<int:pageNum>', views.product_spec_list_by_page),
    path('<int:pk>/specs/latest/', views.latest_product_spec_list),
    path('<int:pk>/specs/latest/pages/<int:pageNum>', views.latest_product_spec_list_by_page),

    path('<int:pk>/specs/<int:pk_spec>', views.product_spec),
    path('<int:pk>/specs/<int:pk_spec>/edit', views.edit_product_spec),
    path('<int:pk>/specs/create/', views.create_product_spec),

    path('<int:pk>/images/', views.product_image_list),

    path('<int:pk>/images/<int:pk_image>', views.product_image),
    path('<int:pk>/images/<int:pk_image>/edit', views.edit_product_image),
    path('<int:pk>/images/create/', views.create_product_image),

    # path('<int:pk>/images/<int:pk_image>/delete/', views.delete_image),
]
