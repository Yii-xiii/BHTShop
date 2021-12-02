from django.shortcuts import render
from .models import Collection
from product.models import Product
from user.models import Customer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

# Create your views here.


def returnJson(data=None, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data})

# collection
@login_required
def customer_collection_list(request):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	collections = Collection.objects.filter(customer=request.user)

	return returnJson([dict(collection.body()) for collection in collections])


@login_required
def latest_customer_collection_list(request):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	collections = Collection.objects.filter(customer=request.user).order_by('-id')

	return returnJson([dict(collection.body()) for collection in collections])


def latest_customer_collection_list_by_page(request, pageNum):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	collections = Collection.objects.filter(customer=request.user).order_by('-id')[((pageNum-1)*10):(pageNum*10)]

	return returnJson([dict(collection.body()) for collection in collections])


@login_required
def create_customer_collection(request, pk_product):
	if request.COOKIES["user"] != "Customer":
		return returnJson([],403)

	try:
		product = Product.objects.get(id = pk_product)
	except Product.DoesNotExist:
		return returnJson([], 404)

	collection = Collection.objects.create(product=product, customer=request.user)

	return returnJson([dict(collection.body()) for collection in collections])


@login_required
def get_customer_collection(request, pk_product):
	try:
		product = Product.objects.get(id = pk_product)
	except Product.DoesNotExist:
		return returnJson([], 404)

	try:
		collection = Collection.objects.filter(customer=request.user).get(product=product)
	except Collection.DoesNotExist:
		return returnJson([], 404)

	if collection.customer != request.user:
		return returnJson([],403)

	
	return returnJson([dict(collection.body())])


@login_required
def edit_customer_collection(request, pk_product):
	try:
		product = Product.objects.get(id = pk_product)
	except Product.DoesNotExist:
		return returnJson([], 404)

	try:
		collection = Collection.objects.filter(customer=request.user).get(product=product)
	except Collection.DoesNotExist:
		return returnJson([], 404)

	if collection.customer != request.user:
		return returnJson([],403)

	if request.method == 'DELETE':
		collection.delete()
		return returnJson()