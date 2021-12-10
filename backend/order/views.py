from django.shortcuts import render
from .models import Order, OrderStatus, ReturnRequest
from product.models import ProductSpec, Product
from user.models import Customer, Seller
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from datetime import timedelta
from django.utils import timezone
from decimal import Decimal
import json
# Create your views here.


def returnJson(data=None, pageCount=0, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'pageCount': int(pageCount)})


def get_order_list(request):
	orders = Order.objects.all()
	return returnJson([dict(order.body()) for order in orders])


def get_latest_order_list_by_page(request, pageNum):
	orders = Order.objects.all()
	pages = (orders.count()+9)/10
	orders = orders.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders],pages)


def get_latest_customer_order_list_by_page(request, customerId, pageNum):
	try:
		customer = Customer.objects.get(id=customerId)
	except Customer.DoesNotExist:
		return returnJson([],0,404)

	orders = Order.objects.filter(customer=customer)
	pages = (orders.count()+9)/10
	orders = orders.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders], pages)


def get_latest_product_order_list_by_page(request, productId, pageNum):
	try:
		product = Product.objects.get(id=productId)
	except Product.DoesNotExist:
		return returnJson([],0,404)

	specs = ProductSpec.objects.filter(product=product)

	orders = Order.objects.filter(productSpec__in=specs)
	pages = (orders.count()+9)/10
	orders = orders.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders],pages)

def get_latest_product_spec_order_list_by_page(request, specId, pageNum):
	try:
		spec = ProductSpec.objects.get(id=specId)
	except ProductSpec.DoesNotExist:
		return returnJson([],0,404)

	orders = Order.objects.filter(productSpec=spec)
	pages = (orders.count()+9)/10
	orders = orders.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders],pages)


@login_required
def get_seller_order_list_by_order_status_and_page(request, pageNum):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)

	if data["status"] not in dict(OrderStatus.STATUSES):
		return returnJson([],0, 400)

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)
	orders = Order.objects.filter(productSpec__in=specs)
	results = []
	for order in orders:
		status = OrderStatus.objects.filter(order=order).order_by('-id').first()
		if status is not None and status.status == data["status"]:
			results += [status]

	pages = (results.count()+9)/10
	results = results.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(status.body()) for status in results],pages)


@login_required
def get_customer_order_list_by_order_status_and_page(request, pageNum):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)

	if data["status"] not in dict(OrderStatus.STATUSES):
		return returnJson([],0, 400)

	orders = Order.objects.filter(customer=customer)
	results = []
	for order in orders:
		status = OrderStatus.objects.filter(order=order).order_by('-id').first()
		if status is not None and status.status == data["status"]:
			results += [status]

	pages = (orders.count()+9)/10
	results = results.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(status.body()) for status in results], pages)

@login_required
def create_order(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)

	try:
		spec = ProductSpec.objects.get(id=data["specId"])
	except ProductSpec.DoesNotExist:
		return returnJson([],0,404)

	if (spec.stock < int(data["quantity"])):
		return returnJson([],0,400)

	quantity = int(data["quantity"])
	totalPrice = data["totalPrice"]
	address = data["address"]
	phoneNumber = data["phoneNumber"]

	order = Order.objects.create(customer=customer, productSpec=spec,quantity=quantity,totalPrice=totalPrice,address=address,phoneNumber=phoneNumber)
	product = spec.product 
	product.soldAmount += quantity
	product.save()
	spec.stock -= quantity
	spec.save()
	status = OrderStatus.objects.create(order=order)

	return returnJson([dict(order.body())])

@login_required
def get_order(request,orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],0,404)

	if request.user.id != order.customer.id and request.user.id != order.productSpec.product.seller.id:
		return returnJson([],0,403)

	return returnJson([dict(order.body())])

@login_required
def edit_order(request,orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],0,404)

	if request.user.id != order.customer.id:
		return returnJson([],0,403)
	
	if request.method == 'PUT':
		data = json.loads(request.body)
		order.quantity = data["quantity"]
		order.totalPrice = data["totalPrice"]
		order.address = data["address"]
		order.phoneNumber = data["phoneNumber"]
		order.save()

		return returnJson([dict(order.body())])
	elif request.method == 'DELETE':
		order.delete()
		return returnJson()


def get_order_status_list(request, orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],0,404)

	statuses = OrderStatus.objects.filter(order=order)
	return returnJson([dict(status.body()) for status in statuses])


def get_latest_order_status_list(request, orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],0,404)

	statuses = OrderStatus.objects.filter(order=order).order_by('-id')
	return returnJson([dict(status.body()) for status in statuses])


def get_latest_order_status(request, orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],0,404)

	status = OrderStatus.objects.filter(order=order).order_by('-id').first()
	return returnJson([dict(status.body())])


@login_required
def create_order_status(request,orderId):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],0,404)

	if seller.id != order.productSpec.product.seller.id:
		return returnJson([],0, 403)

	data = json.loads(request.body)

	if data["status"] not in dict(OrderStatus.STATUSES):
		return returnJson([],0, 400)

	status = OrderStatus.objects.create(order=order)
	status.status = data["status"]
	status.description = data["description"]
	status.save()

	return returnJson([dict(status.body())])

@login_required
def get_order_status(request,orderId,statusId):
	try:
		status = OrderStatus.objects.get(id=statusId)
	except OrderStatus.DoesNotExist:
		return returnJson([],0,404)

	# if request.user is not status.order.customer and request.user is not status.order.product.seller:
	# 	return returnJson([],0,403)

	return returnJson([dict(status.body())])

@login_required
def edit_order_status(request,orderId,statusId):
	try:
		status = OrderStatus.objects.get(id=statusId)
	except OrderStatus.DoesNotExist:
		return returnJson([],0,404)

	if request.user.id != status.order.productSpec.product.seller.id:
		return returnJson([],0,403)
	
	if request.method == 'PUT':
		data = json.loads(request.body)
		if data["status"] not in dict(OrderStatus.STATUSES):
			return returnJson([],0, 400)
		status.status = data["status"]
		status.description = data["description"]
		status.save()

		return returnJson([dict(status.body())])
	elif request.method == 'DELETE':
		status.delete()
		return returnJson()


# return request
def get_return_request_list(request):
	reqs = ReturnRequest.objects.all()
	return returnJson([dict(req.body()) for req in reqs])


def get_customer_latest_return_request_list(request, customerId):
	try:
		customer = Customer.objects.get(id=customerId)
	except Customer.DoesNotExist:
		return returnJson([],0,404)

	orders = Order.objects.filter(customer=customer)

	reqs = ReturnRequest.objects.filter(order__in=orders).order_by('-id')
	return returnJson([dict(req.body()) for req in reqs])


def get_product_latest_return_request(request, productId):
	try:
		product = Product.objects.get(id=productId)
	except Product.DoesNotExist:
		return returnJson([],0,404)

	specs = ProductSpec.objects.filter(product=product)

	orders = Order.objects.filter(productSpec__in=specs)

	reqs = ReturnRequest.objects.filter(order__in=orders).order_by('-id')
	return returnJson([dict(req.body()) for req in reqs])


def get_product_spec_latest_return_request(request, specId):
	try:
		spec = ProductSpec.objects.get(id=specId)
	except ProductSpec.DoesNotExist:
		return returnJson([],0,404)

	orders = Order.objects.filter(productSpec=spec)

	reqs = ReturnRequest.objects.filter(order__in=orders).order_by('-id')
	return returnJson([dict(req.body()) for req in reqs])


@login_required
def create_return_request(request,orderId):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],0,404)

	if request.user.id != order.customer.id:
		return returnJson([],0,403)

	data = json.loads(request.body)

	if data["reason"] not in dict(ReturnRequest.REASONS):
		return returnJson([],0, 400)

	reason = data["reason"]
	description = data["description"]

	req = ReturnRequest.objects.create(order=order,reason=reason, description=description)

	return returnJson([dict(req.body())])


def get_return_request(request, orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],0,404)

	try:
		req = ReturnRequest.objects.get(order=order)
	except ReturnRequest.DoesNotExist:
		return returnJson([],0,404)

	return returnJson([dict(req.body())])


@login_required
def edit_return_request(request, orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],0,404)

	try:
		req = ReturnRequest.objects.get(order=order)
	except ReturnRequest.DoesNotExist:
		return returnJson([],0,404)

	try:
		customer = Customer.objects.get(id=request.user.id)
		if request.user.id != order.customer.id:
			return returnJson([],0,403)

		if request.method == 'PUT':
			data = json.loads(request.body)
			if data["reason"] not in dict(ReturnRequest.REASONS):
				return returnJson([],0, 400)
			req.reason = data["reason"]
			req.description = data["description"]
			req.save()

			return returnJson([dict(req.body())])
		elif request.method == 'DELETE':
			req.delete()
			return returnJson()

	except Customer.DoesNotExist:
		try:
			seller = Seller.objects.get(id=request.user.id)
			if request.user.id != order.productSpec.product.seller.id:
				return returnJson([],0,403)

			if request.method == 'PUT':
				data = json.loads(request.body)
				if data["status"] not in dict(ReturnRequest.STATUSES):
					return returnJson([],0, 400)
				req.status = data["status"]
				req.save()
				return returnJson([dict(req.body())])
		except Seller.DoesNotExist:
			return returnJson([],0,403)

@login_required
def get_seller_sales_in_days(request,dayNum):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)

	end = timezone.now().date()
	start = end - timedelta(days=dayNum-1)
	orders = Order.objects.filter(productSpec__in=specs, time__range=[start,end])
	sales = Decimal(0)
	for order in orders:
		sales += order.totalPrice
	return returnJson([dict(sales=sales)])


@login_required
def get_seller_orders_in_days(request,dayNum):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)

	end = timezone.now().date()
	start = end - timedelta(days=dayNum-1)
	orders = Order.objects.filter(productSpec__in=specs, time__range=[start,end])
	return returnJson([dict(order.body()) for order in orders])


@login_required
def get_seller_sales_by_day(request):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]
	day = data["day"]

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)

	orders = Order.objects.filter(time__year=year, time__month=month, time__day=day)
	sales = Decimal(0)
	for order in orders:
		sales += order.totalPrice
	return returnJson([dict(sales=sales)])


@login_required
def get_seller_orders_by_day(request):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]
	day = data["day"]

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)

	orders = Order.objects.filter(time__year=year, time__month=month, time__day=day)
	return returnJson([dict(order.body()) for order in orders])


@login_required
def get_seller_sales_by_month(request):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)

	orders = Order.objects.filter(time__year=year, time__month=month)
	sales = Decimal(0)
	for order in orders:
		sales += order.totalPrice
	return returnJson([dict(sales=sales)])


@login_required
def get_seller_orders_by_month(request):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)

	orders = Order.objects.filter(time__year=year, time__month=month)
	return returnJson([dict(order.body()) for order in orders])


@login_required
def get_seller_sales_by_year(request):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)
	year = data["year"]

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)

	orders = Order.objects.filter(time__year=year)
	sales = Decimal(0)
	for order in orders:
		sales += order.totalPrice
	return returnJson([dict(sales=sales)])


@login_required
def get_seller_orders_by_year(request):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)
	year = data["year"]

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)

	orders = Order.objects.filter(time__year=year)
	return returnJson([dict(order.body()) for order in orders])