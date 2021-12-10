from django.shortcuts import render
from .models import Cart
from product.models import ProductSpec
from user.models import Customer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json 
# Create your views here.


def returnJson(data=None, pageCount=0, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'pageCount' : int(pageCount)})

# cart
@login_required
def customer_cart_list(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 0, 403)

	carts = Cart.objects.filter(customer=customer)

	return returnJson([dict(cart.body()) for cart in carts])


@login_required
def latest_customer_cart_list(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 0, 403)

	carts = Cart.objects.filter(customer=customer).order_by('-id')

	return returnJson([dict(cart.body()) for cart in carts])


def latest_customer_cart_list_by_page(request, pageNum):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 0, 403)

	carts = Cart.objects.filter(customer=customer)
	pages = (carts.count()+9)/10
	carts = carts.order_by('-id')[((pageNum-1)*10):(pageNum*10)]

	return returnJson([dict(cart.body()) for cart in carts],pages)


@login_required
def create_customer_cart(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 0, 403)

	data = json.loads(request.body)

	try:
		spec = ProductSpec.objects.get(id = data["specId"])
	except ProductSpec.DoesNotExist:
		return returnJson([], 0, 404)

	if spec.stock < int(data["quantity"]):
		return returnJson([], 0, 400)

	try:
		cart = Cart.objects.get(productSpec=spec, customer=customer)
		cart.quantity += int(data["quantity"])
		cart.save()
	except Cart.DoesNotExist:
		cart = Cart.objects.create(productSpec=spec, customer=customer)
		cart.quantity = data["quantity"]
		cart.save()

	return returnJson([dict(cart.body())])


@login_required
def get_customer_cart(request, pk_spec):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 0, 403)

	try:
		spec = ProductSpec.objects.get(id = pk_spec)
	except ProductSpec.DoesNotExist:
		return returnJson([], 0, 404)

	try:
		cart = Cart.objects.get(customer=customer, productSpec=spec)
	except Cart.DoesNotExist:
		return returnJson([], 0, 404)

	if cart.customer.id != request.user.id:
		return returnJson([], 0,403)

	
	return returnJson([dict(cart.body())])


@login_required
def edit_customer_cart(request, pk_spec):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 0, 403)

	try:
		spec = ProductSpec.objects.get(id = pk_spec)
	except ProductSpec.DoesNotExist:
		return returnJson([], 0, 404)

	try:
		cart = Cart.objects.get(customer=customer, productSpec=spec)
	except Cart.DoesNotExist:
		return returnJson([], 0, 404)

	if request.method == 'PUT':
		data = json.loads(request.body)
		if spec.stock < int(data["quantity"]):
			return returnJson([], 0, 400)
		cart.quantity = data["quantity"]
		cart.save()
		return returnJson([dict(cart.body())])
	elif request.method == 'DELETE':
		cart.delete()
		return returnJson()