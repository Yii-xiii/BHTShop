from django.shortcuts import render
from .models import Collection
from product.models import Product
from user.models import Customer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import Count
import json

# Create your views here.


def returnJson(data=None, pageCount=0, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'pageCount' : int(pageCount)})


# collection
@login_required
def customer_collection_list(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	collections = Collection.objects.filter(customer=customer)

	return returnJson([dict(collection.body()) for collection in collections])


@login_required
def latest_customer_collection_list(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	collections = Collection.objects.filter(customer=customer).order_by('-id')

	return returnJson([dict(collection.body()) for collection in collections])


def latest_customer_collection_list_by_page(request, pageNum):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	collections = Collection.objects.filter(customer=customer)
	pages = (collections.count()+9)/10
	collections = collections.order_by('-id')[((pageNum-1)*10):(pageNum*10)]

	return returnJson([dict(collection.body()) for collection in collections],pages)


@login_required
def create_customer_collection(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)

	try:
		product = Product.objects.get(id = data["productId"])
	except Product.DoesNotExist:
		return returnJson([],0, 404)

	try:
		collection = Collection.objects.get(customer=customer, product=product)
	except Collection.DoesNotExist:
		collection = Collection.objects.create(product=product, customer=customer)
		return returnJson([dict(collection.body())])

	return returnJson([],0, 400)


@login_required
def get_customer_collection(request, pk_product):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	try:
		product = Product.objects.get(id = pk_product)
	except Product.DoesNotExist:
		return returnJson([],0, 404)

	try:
		collection = Collection.objects.get(customer=customer, product=product)
	except Collection.DoesNotExist:
		return returnJson([],0, 404)

	
	return returnJson([dict(collection.body())])


@login_required
def edit_customer_collection(request, pk_product):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	try:
		product = Product.objects.get(id = pk_product)
	except Product.DoesNotExist:
		return returnJson([],0, 404)

	try:
		collection = Collection.objects.get(customer=customer, product=product)
	except Collection.DoesNotExist:
		return returnJson([],0, 404)

	if request.method == 'DELETE':
		collection.delete()
		return returnJson()


def most_popular_product_list_by_page(request,pageNum):
	products = Product.objects.annotate(count = Count('collection'))
	pages = (products.count()+9)/10
	products = products.order_by('-count')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(product.body()) for product in products], pages)

def most_popular_product_list_by_category_and_page(request,pageNum):
	data = json.loads(request.body)
	products = Product.objects.filter(category=data["category"]).annotate(count = Count('collection'))
	pages = (products.count()+9)/10
	products = products.order_by('-count')[((pageNum-1)*10):(pageNum*10)]

	return returnJson([dict(product.body()) for product in products], pages)