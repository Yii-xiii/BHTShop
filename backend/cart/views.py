from django.shortcuts import render
from .models import Cart
from product.models import ProductSpec
from user.models import Customer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json 
# Create your views here.


def returnJson(data=None, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data})

# cart
@login_required
def customer_cart_list(request):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	carts = Cart.objects.filter(customer=request.user)

	return returnJson([dict(cart.body()) for cart in carts])


@login_required
def latest_customer_cart_list(request):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	carts = Cart.objects.filter(customer=request.user).order_by('-id')

	return returnJson([dict(cart.body()) for cart in carts])


def latest_customer_cart_list_by_page(request, pageNum):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	carts = Cart.objects.filter(customer=request.user).order_by('-id')[((pageNum-1)*10):(pageNum*10)]

	return returnJson([dict(cart.body()) for cart in carts])


@login_required
def create_customer_cart(request):
	if request.COOKIES["user"] != "Customer":
		return returnJson([],403)

	data = json.loads(request.body)

	try:
		spec = ProductSpec.objects.get(id = data["specId"])
	except ProductSpec.DoesNotExist:
		return returnJson([], 404)

	try:
		cart = Cart.objects.get(productSpec=spec, customer=request.user)
		cart.quantity += data["quantity"]
	except Cart.DoesNotExist:
		cart = Cart.objects.create(productSpec=spec, customer=request.user)
		cart.quantity = data["quantity"]

	return returnJson([dict(cart.body()) for cart in carts])


@login_required
def get_customer_cart(request, pk_spec):
	try:
		spec = ProductSpec.objects.get(id = pk_spec)
	except ProductSpec.DoesNotExist:
		return returnJson([], 404)

	try:
		cart = Cart.objects.get(customer=request.user, productSpec=spec)
	except Cart.DoesNotExist:
		return returnJson([], 404)

	if cart.customer != request.user:
		return returnJson([],403)

	
	return returnJson([dict(cart.body())])


@login_required
def edit_customer_cart(request, pk_spec):
	try:
		spec = ProductSpec.objects.get(id = pk_spec)
	except ProductSpec.DoesNotExist:
		return returnJson([], 404)

	try:
		cart = Cart.objects.get(customer=request.user, productSpec=spec)
	except Cart.DoesNotExist:
		return returnJson([], 404)

	if cart.customer != request.user:
		return returnJson([],403)

	if request.method == 'PUT':
		cart.quantity = data["quantity"]
	elif request.method == 'DELETE':
		cart.delete()
		return returnJson()