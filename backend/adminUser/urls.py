from django.urls import path
from . import views

urlpatterns = [
	path('reports/', views.get_report_list),
	path('reports/reporting/customers/pages/<int:pageNum>/', views.get_all_latest_customer_reporting_list_by_page),
	path('reports/reported/customers/pages/<int:pageNum>/', views.get_all_latest_reported_customer_list_by_page),
	path('reports/reporting/sellers/pages/<int:pageNum>/', views.get_all_latest_seller_reporting_list_by_page),
	path('reports/reported/sellers/pages/<int:pageNum>/', views.get_all_latest_reported_seller_list_by_page),

	path('reports/reporting/customers/<int:pk_customer>/pages/<int:pageNum>/', views.get_latest_customer_reporting_list_by_page),
	path('reports/reported/customers/<int:pk_customer>/pages/<int:pageNum>/', views.get_latest_reported_customer_list_by_page),
	path('reports/reporting/sellers/<int:pk_seller>/pages/<int:pageNum>/', views.get_latest_seller_reporting_list_by_page),
	path('reports/reported/sellers/<int:pk_seller>/pages/<int:pageNum>/', views.get_latest_reported_seller_list_by_page),

	path('reports/<int:pk>/', views.getReport),
	path('reports/', views.createReport),
	path('reports/<int:pk>/edit/', views.editReport),
]
