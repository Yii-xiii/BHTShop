from django.shortcuts import render
from .models import Order, OrderStatus, ReturnRequest
from product.models import ProductSpec, Product
from user.models import Customer, Seller
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
# Create your views here.


def returnJson(data=None, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data})


def get_order_list(request):
	orders = Order.objects.all()
	return returnJson([dict(order.body()) for order in orders])


def get_latest_order_list_by_page(request, pageNum):
	orders = Order.objects.all().order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders])


def get_latest_customer_order_list_by_page(request, customerId, pageNum):
	try:
		customer = Customer.objects.get(id=customerId)
	except Customer.DoesNotExist:
		return returnJson([],404)

	orders = Order.objects.filter(customer=customer).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders])


def get_latest_product_order_list_by_page(request, productId, pageNum):
	try:
		product = Product.objects.get(id=productId)
	except Product.DoesNotExist:
		return returnJson([],404)

	specs = ProductSpec.objects.filter(product=product)

	orders = Order.objects.filter(productSpec__in=specs).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders])

def get_latest_product_spec_order_list_by_page(request, specId, pageNum):
	try:
		spec = ProductSpec.objects.get(id=specId)
	except ProductSpec.DoesNotExist:
		return returnJson([],404)

	orders = Order.objects.filter(productSpec=spec).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders])


@login_required
def get_seller_order_by_order_status(request):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([], 403)

	data = json.loads(request.body)

	products = Product.objects.filter(seller=seller)
	specs = ProductSpec.objects.filter(product__in=products)
	orders = Order.objects.filter(productSpec__in=specs)
	results = []
	for order in orders:
		status = OrderStatus.objects.filter(order=order).order_by('-id').first()
		if status is not None and status.status == data["status"]:
			results += [status]

	return returnJson([dict(status.body()) for status in results])


@login_required
def get_customer_order_by_order_status(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 403)

	data = json.loads(request.body)

	orders = Order.objects.filter(customer=customer)
	results = []
	for order in orders:
		status = OrderStatus.objects.filter(order=order).order_by('-id').first()
		if status is not None and status.status == data["status"]:
			results += [status]

	return returnJson([dict(status.body()) for status in results])

@login_required
def create_order(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 403)

	data = json.loads(request.body)

	try:
		spec = ProductSpec.objects.get(id=data["specId"])
	except ProductSpec.DoesNotExist:
		return returnJson([],404)

	if (spec.stock < int(data["quantity"])):
		return returnJson([],400)

	quantity = int(data["quantity"])
	totalPrice = data["totalPrice"]
	address = data["address"]
	phoneNumber = data["phoneNumber"]

	order = Order.objects.create(customer=customer, productSpec=spec,quantity=quantity,totalPrice=totalPrice,address=address,phoneNumber=phoneNumber)
	spec.product.soldAmount += quantity
	spec.stock -= quantity
	status = OrderStatus.objects.create(order=order)

	return returnJson([dict(order.body())])

@login_required
def get_order(request,orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	if request.user.id != order.customer.id and request.user.id != order.productSpec.product.seller.id:
		return returnJson([],403)

	return returnJson([dict(order.body())])

@login_required
def edit_order(request,orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	if request.user.id != order.customer.id:
		return returnJson([],403)
	
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
		return returnJson([],404)

	statuses = OrderStatus.objects.filter(order=order)
	return returnJson([dict(status.body()) for status in statuses])


def get_latest_order_status_list(request, orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	statuses = OrderStatus.objects.filter(order=order).order_by('-id')
	return returnJson([dict(status.body()) for status in statuses])


def get_latest_order_status(request, orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	statuses = OrderStatus.objects.filter(order=order).order_by('-id')[:1]
	return returnJson([dict(status.body()) for status in statuses])


@login_required
def create_order_status(request,orderId):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([], 403)

	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	if seller.id != order.productSpec.product.seller.id:
		return returnJson([], 403)

	data = json.loads(request.body)

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
		return returnJson([],404)

	# if request.user is not status.order.customer and request.user is not status.order.product.seller:
	# 	return returnJson([],403)

	return returnJson([dict(status.body())])

@login_required
def edit_order_status(request,orderId,statusId):
	try:
		status = OrderStatus.objects.get(id=statusId)
	except OrderStatus.DoesNotExist:
		return returnJson([],404)

	if request.user.id != status.order.productSpec.product.seller.id:
		return returnJson([],403)
	
	if request.method == 'PUT':
		data = json.loads(request.body)
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
		return returnJson([],404)

	orders = Order.objects.filter(customer=customer)

	reqs = ReturnRequest.objects.filter(order__in=orders).order_by('-id')
	return returnJson([dict(req.body()) for req in reqs])


def get_product_latest_return_request(request, productId):
	try:
		product = Product.objects.get(id=productId)
	except Product.DoesNotExist:
		return returnJson([],404)

	specs = ProductSpec.objects.filter(product=product)

	orders = Order.objects.filter(productSpec__in=specs)

	reqs = ReturnRequest.objects.filter(order__in=orders).order_by('-id')
	return returnJson([dict(req.body()) for req in reqs])


def get_product_spec_latest_return_request(request, specId):
	try:
		spec = ProductSpec.objects.get(id=specId)
	except ProductSpec.DoesNotExist:
		return returnJson([],404)

	orders = Order.objects.filter(productSpec=spec)

	reqs = ReturnRequest.objects.filter(order__in=orders).order_by('-id')
	return returnJson([dict(req.body()) for req in reqs])


@login_required
def create_return_request(request,orderId):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 403)

	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	if request.user.id != order.customer.id:
		return returnJson([],403)

	data = json.loads(request.body)
	reason = data["reason"]
	description = data["description"]

	req = ReturnRequest.objects.create(order=order,reason=reason, description=description)

	return returnJson([dict(req.body())])


def get_return_request(request, orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	try:
		req = ReturnRequest.objects.get(order=order)
	except ReturnRequest.DoesNotExist:
		return returnJson([],404)

	return returnJson([dict(req.body())])


@login_required
def edit_return_request(request, orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	try:
		req = ReturnRequest.objects.get(order=order)
	except ReturnRequest.DoesNotExist:
		return returnJson([],404)

	try:
		customer = Customer.objects.get(id=request.user.id)
		if request.user.id != order.customer.id:
			return returnJson([],403)

		if request.method == 'PUT':
			data = json.loads(request.body)
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
				return returnJson([],403)

			if request.method == 'PUT':
				data = json.loads(request.body)
				req.status = data["status"]
				req.save()
				return returnJson([dict(req.body())])
		except Seller.DoesNotExist:
			return returnJson([],403)


