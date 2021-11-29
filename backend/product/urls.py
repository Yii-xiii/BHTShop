from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list),
    path('<int:pk>/', views.product),
    path('create/', views.create_product),
    path('<int:pk>/specs/', views.product_spec_list),
    path('<int:pk>/specs/<int:pk_spec>', views.product_spec),
    path('<int:pk>/specs/create/', views.product_spec_list),
]
