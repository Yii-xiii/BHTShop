from django.shortcuts import render
from .models import Collection
from product.models import Product
from user.models import Customer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json

# Create your views here.


def returnJson(data=None, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data})

# collection
@login_required
def customer_collection_list(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 403)

	collections = Collection.objects.filter(customer=customer)

	return returnJson([dict(collection.body()) for collection in collections])


@login_required
def latest_customer_collection_list(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 403)

	collections = Collection.objects.filter(customer=customer).order_by('-id')

	return returnJson([dict(collection.body()) for collection in collections])


def latest_customer_collection_list_by_page(request, pageNum):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 403)

	collections = Collection.objects.filter(customer=customer).order_by('-id')[((pageNum-1)*10):(pageNum*10)]

	return returnJson([dict(collection.body()) for collection in collections])


@login_required
def create_customer_collection(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 403)

	data = json.loads(request.body)

	try:
		product = Product.objects.get(id = data["productId"])
	except Product.DoesNotExist:
		return returnJson([], 404)

	try:
		collection = Collection.objects.get(customer=customer, product=product)
	except Collection.DoesNotExist:
		collection = Collection.objects.create(product=product, customer=customer)
		return returnJson([dict(collection.body())])

	return returnJson([], 400)


@login_required
def get_customer_collection(request, pk_product):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 403)

	try:
		product = Product.objects.get(id = pk_product)
	except Product.DoesNotExist:
		return returnJson([], 404)

	try:
		collection = Collection.objects.get(customer=customer, product=product)
	except Collection.DoesNotExist:
		return returnJson([], 404)

	
	return returnJson([dict(collection.body())])


@login_required
def edit_customer_collection(request, pk_product):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([], 403)

	try:
		product = Product.objects.get(id = pk_product)
	except Product.DoesNotExist:
		return returnJson([], 404)

	try:
		collection = Collection.objects.get(customer=customer, product=product)
	except Collection.DoesNotExist:
		return returnJson([], 404)

	if request.method == 'DELETE':
		collection.delete()
		return returnJson()


def most_popular_product_list_by_page(request,pageNum):
	collections = Collection.objects.annotate(count = Count('product')).order_by('-count')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(collection.product.body()) for collection in collections])

def most_popular_product_list_by_category_and_page(request,pageNum):
	collections = Collection.objects.annotate(count = Count('product')).order_by('-count')
	data = json.loads(request.body)

	products = []
	category = data["category"]
	for collection in collections:
		if collection.product.category == category:
			products += [collection.product]
			if len(products) == pageNum*10:
				break
	return returnJson([dict(product.body()) for product in products])