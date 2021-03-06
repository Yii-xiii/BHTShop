from django.urls import path
from . import views

urlpatterns = [
	path('',views.get_order_list),
	path('pages/<int:pageNum>/',views.get_latest_order_list_by_page),
	path('customers/<int:customerId>/pages/<int:pageNum>/',views.get_latest_customer_order_list_by_page),
	path('products/<int:productId>/pages/<int:pageNum>/',views.get_latest_product_order_list_by_page),
	path('products/specs/<int:specId>/pages/<int:pageNum>/',views.get_latest_product_spec_order_list_by_page),

	path('sellers/status/pages/<int:pageNum>/',views.get_seller_order_list_by_order_status_and_page),
	path('customers/status/pages/<int:pageNum>/',views.get_customer_order_list_by_order_status_and_page),
	
	path('create/',views.create_order),
	path('<int:orderId>/',views.get_order),
	path('<int:orderId>/edit/',views.edit_order),

	path('<int:orderId>/statuses/',views.get_order_status_list),
	path('<int:orderId>/statuses/latest/',views.get_latest_order_status),
	path('<int:orderId>/statuses/latest_list/',views.get_latest_order_status_list),

	path('<int:orderId>/statuses/create/',views.create_order_status),
	path('<int:orderId>/statuses/<int:statusId>/',views.get_order_status),
	path('<int:orderId>/statuses/<int:statusId>/edit/',views.edit_order_status),

	path('return_requests/',views.get_return_request_list),
	path('return_requests/sellers/<int:sellerId>/latest_list/',views.get_seller_latest_return_request_list),
	path('return_requests/customers/<int:customerId>/latest_list/',views.get_customer_latest_return_request_list),
	path('return_requests/products/<int:productId>/latest_list/',views.get_product_latest_return_request),
	path('return_requests/productSpecs/<int:specId>/latest_list/',views.get_product_spec_latest_return_request),

	path('<int:orderId>/return_requests/create/',views.create_return_request),
	path('<int:orderId>/return_requests/',views.get_return_request),
	path('<int:orderId>/return_requests/edit/',views.edit_return_request),

	path('sellers/in_days/<int:dayNum>/',views.get_seller_orders_in_days),
	path('sellers/sales/in_days/<int:dayNum>/',views.get_seller_sales_in_days),

	path('sellers/by_day/',views.get_seller_orders_by_day),
	path('sellers/sales/by_day/',views.get_seller_sales_by_day),
	path('sellers/by_month/',views.get_seller_orders_by_month),
	path('sellers/sales/by_month/',views.get_seller_sales_by_month),
	path('sellers/by_year/',views.get_seller_orders_by_year),
	path('sellers/sales/by_year/',views.get_seller_sales_by_year),


	path('shipped/pages/<int:pageNum>/', views.order_shipped_list_by_page),
	path('postmen/pages/<int:pageNum>/', views.postman_order_list_by_page),
	path('postmen/delivered/pages/<int:pageNum>/', views.postman_delivered_order_list_by_page),
	path('postmen/delivered/in_days/<int:dayNum>/pages/<int:pageNum>/', views.postman_delivered_order_list_in_days_by_page),
	path('postmen/delivered/by_day/pages/<int:pageNum>/', views.postman_delivered_order_list_by_day_and_page),
	path('postmen/delivered/by_month/pages/<int:pageNum>/', views.postman_delivered_order_list_by_month_and_page),
	path('postmen/delivered/by_year/pages/<int:pageNum>/', views.postman_delivered_order_list_by_year_and_page),
]