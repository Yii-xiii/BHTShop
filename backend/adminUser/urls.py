from django.urls import path
from . import views

urlpatterns = [
	path('reports/', views.get_all_report_list),

	path('reports/customers/reporting/pages/<int:pageNum>/', views.get_all_latest_customer_reporting_list_by_page),
	path('reports/sellers/reporting/pages/<int:pageNum>/', views.get_all_latest_seller_reporting_list_by_page),
	path('reports/customers/reporting/users/pages/<int:pageNum>/', views.get_all_latest_customer_reporting_user_list_by_page),
	path('reports/sellers/reporting/users/pages/<int:pageNum>/', views.get_all_latest_seller_reporting_user_list_by_page),
	path('reports/customers/reporting/products/pages/<int:pageNum>/', views.get_all_latest_customer_reporting_product_list_by_page),
	path('reports/sellers/reporting/products/pages/<int:pageNum>/', views.get_all_latest_seller_reporting_product_list_by_page),
	path('reports/customers/reporting/comments/pages/<int:pageNum>/', views.get_all_latest_customer_reporting_comment_list_by_page),
	path('reports/sellers/reporting/comments/pages/<int:pageNum>/', views.get_all_latest_seller_reporting_comment_list_by_page),

	path('reports/reporting/users/pages/<int:pageNum>/', views.get_all_latest_reported_user_list_by_page),
	path('reports/reporting/customers/pages/<int:pageNum>/', views.get_all_latest_reported_customer_list_by_page),
	path('reports/reporting/sellers/pages/<int:pageNum>/', views.get_all_latest_reported_seller_list_by_page),
	path('reports/reporting/products/pages/<int:pageNum>/', views.get_all_latest_reported_product_list_by_page),
	path('reports/reporting/comments/pages/<int:pageNum>/', views.get_all_latest_reported_comment_list_by_page),

	path('reports/customers/<int:pk_customer>/reporting/pages/<int:pageNum>/', views.get_latest_customer_reporting_list_by_page),
	path('reports/customers/<int:pk_customer>/reporting/users/pages/<int:pageNum>/', views.get_latest_customer_reporting_user_list_by_page),
	path('reports/customers/<int:pk_customer>/reporting/products/pages/<int:pageNum>/', views.get_latest_customer_reporting_product_list_by_page),
	path('reports/customers/<int:pk_customer>/reporting/comments/pages/<int:pageNum>/', views.get_latest_customer_reporting_comment_list_by_page),
	
	path('reports/sellers/<int:pk_seller>/reporting/pages/<int:pageNum>/', views.get_latest_seller_reporting_list_by_page),
	path('reports/sellers/<int:pk_seller>/reporting/users/pages/<int:pageNum>/', views.get_latest_seller_reporting_user_list_by_page),
	path('reports/sellers/<int:pk_seller>/reporting/products/pages/<int:pageNum>/', views.get_latest_seller_reporting_product_list_by_page),
	path('reports/sellers/<int:pk_seller>/reporting/comments/pages/<int:pageNum>/', views.get_latest_seller_reporting_comment_list_by_page),

	path('reports/reporting/customers/<int:pk_customer>/pages/<int:pageNum>/', views.get_latest_reported_customer_list_by_page),
	path('reports/reporting/sellers/<int:pk_seller>/pages/<int:pageNum>/', views.get_latest_reported_seller_list_by_page),
	path('reports/reporting/products/<int:pk_product>/pages/<int:pageNum>/', views.get_latest_reported_product_list_by_page),
	path('reports/reporting/comments/<int:pk_comment>/pages/<int:pageNum>/', views.get_latest_reported_comment_list_by_page),

	path('reports/in_days/<int:dayNum>/', views.get_report_in_days),
	path('reports/reporting/users/in_days/<int:dayNum>/', views.get_reported_user_in_days),
	path('reports/reporting/products/in_days/<int:dayNum>/', views.get_reported_product_in_days),
	path('reports/reporting/comments/in_days/<int:dayNum>/', views.get_reported_comment_in_days),

	path('reports/by_day/', views.get_report_by_day),
	path('reports/reporting/users/by_day/', views.get_reported_user_by_day),
	path('reports/reporting/products/by_day/', views.get_reported_product_by_day),
	path('reports/reporting/comments/by_day/', views.get_reported_comment_by_day),

	path('reports/by_month/', views.get_report_by_month),
	path('reports/reporting/users/by_month/', views.get_reported_user_by_month),
	path('reports/reporting/products/by_month/', views.get_reported_product_by_month),
	path('reports/reporting/comments/by_month/', views.get_reported_comment_by_month),

	path('reports/by_year/', views.get_report_by_year),
	path('reports/reporting/users/by_year/', views.get_reported_user_by_year),
	path('reports/reporting/products/by_year/', views.get_reported_product_by_year),
	path('reports/reporting/comments/by_year/', views.get_reported_comment_by_year),

	path('reports/<int:pk>/', views.get_report),

	path('reports/users/create/', views.create_user_report),
	path('reports/products/create/', views.create_product_report),
	path('reports/comments/create/', views.create_product_comment_report),

	path('reports/<int:pk>/edit/', views.edit_report),

	path('logs/illegal_login/', views.anonymous_user_illegal_login),
	path('logs/users/<int:pk>/', views.user_get_request),
	path('logs/illegal_operation/', views.illegal_operation),
	path('logs/users/<int:pk>/illegal_operation/', views.user_illegal_operation),
]
