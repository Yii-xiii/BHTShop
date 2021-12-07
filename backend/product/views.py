from django.shortcuts import render
from .models import Product, ProductSpec, ProductImage
from user.models import Seller
from adminUser.models import AdminUser
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from .serializers import ProductImageSerializer
from rest_framework.viewsets import ModelViewSet
from django.db.models import Count
import json
import os
import random


def returnJson(data=None, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data})


# Create your views here.

def random_product_list(request):
	productList = list(Product.objects.all())
	randoms = random.sample(productList,10)
	return returnJson([dict(random.body()) for random in randoms])

def product_list(request):
	products = Product.objects.all()
	return returnJson([dict(product.body()) for product in products])


def product_list_by_page(request, pageNum):
	products = Product.objects.all()[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in products])


def latest_product_list(request):
	products = Product.objects.all().order_by('-id')
	return returnJson([dict(product.body()) for product in products])


def best_selling_product_list(request):
	products = Product.objects.all().order_by('-soldAmount')[:10]
	return returnJson([dict(product.body()) for product in products])


def latest_product_list_by_page(request, pageNum):
	products = Product.objects.all().order_by('-id')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in products])

@login_required
def seller_latest_product_list(request):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],404)

	products = Product.objects.filter(seller = seller).order_by('-id')
	return returnJson([dict(product.body()) for product in products])


@login_required
def seller_best_selling_product_list(request):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],404)

	products = Product.objects.filter(seller = seller).order_by('-soldAmount')
	return returnJson([dict(product.body()) for product in products])


@login_required
def create_product(request):
	if request.method == 'POST':
		try:
			seller = Seller.objects.get(id=request.user.id)
			data = json.loads(request.body)
			if data["category"] not in dict(Product.CATEGORIES):
				return returnJson([], 400)

			product = Product.objects.create(seller=seller)
			# print(data)
			# print(request.FILES)
			# print(request.stream)

			product.title = data["title"]
			product.description = data["description"]
			product.category = data["category"]
			# product.soldAmount = 0

			product.save()
			return returnJson([dict(product.body())])
			# products = Product.objects.filter(seller = request.user).order_by('-id')
			# return returnJson([dict(product.body()) for product in products])

		except Seller.DoesNotExist:
			return returnJson([], 403)


def product(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	specs = ProductSpec.objects.filter(product=product)
	stock = 0
	for spec in specs:
		stock+=spec.stock

	return returnJson([dict(product.body(), stock=stock)])


@login_required
def edit_product(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	if request.method == 'DELETE':
		if request.user.id != product.seller.id:
			try:
				admin = AdminUser.objects.get(id=request.user.id)
			except AdminUser.DoesNotExist:
				return returnJson([],403)
		product.delete()
		products = Product.objects.all()
		return returnJson([dict(product.body()) for product in products])
	elif request.method == 'PUT':
		if request.user.id != product.seller.id:
			return returnJson([],403)

		data = json.loads(request.body)
		if data["category"] not in dict(Product.CATEGORIES):
				return returnJson([], 400)

		product.title = data["title"]
		product.description = data["description"]
		product.category = data["category"]
		product.save()
		return returnJson([dict(product.body())])


# product spec
def product_spec_list(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	productSpecs = ProductSpec.objects.filter(product=product)
	return returnJson([dict(spec.body()) for spec in productSpecs])


def product_spec_list_by_page(request, pk, pageNum):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	productSpecs = ProductSpec.objects.filter(product=product)[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(spec.body()) for spec in productSpecs])


def latest_product_spec_list(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	productSpecs = ProductSpec.objects.filter(product=product).order_by('-id')
	return returnJson([dict(spec.body()) for spec in productSpecs])


def latest_product_spec_list_by_page(request, pk, pageNum):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	productSpecs = ProductSpec.objects.filter(product=product).order_by('-id')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(spec.body()) for spec in productSpecs])


@login_required
def create_product_spec(request, pk):
	if request.COOKIES["user"] != "Seller":
		return returnJson([],403)

	try:
		product = Product.objects.get(id = pk)
	except Product.DoesNotExist:
		return JsonResponse([], 404)

	data = json.loads(request.body)
	description = data["description"]
	price = data["price"]
	stock = data["stock"]

	spec = ProductSpec.objects.create(product=product, description=description, price=price, stock=stock)

	productSpecs = ProductSpec.objects.filter(product=pk)
	return returnJson([dict(spec.body()) for spec in productSpecs])


def product_spec(request, pk, pk_spec):
	try:
		spec = ProductSpec.objects.get(id=pk_spec)
	except ProductSpec.DoesNotExist:
		return returnJson([], 404)

	return returnJson([dict(spec.body())])


@login_required
def edit_product_spec(request, pk, pk_spec):
	try:
		spec = ProductSpec.objects.get(id=pk_spec)
	except ProductSpec.DoesNotExist:
		return returnJson([], 404)

	if request.method == 'PUT':
		if request.user.id != spec.product.seller.id:
			return returnJson([],403)
			
		data = json.loads(request.body)
		spec.description = data["description"]
		spec.price = data["price"]
		spec.stock = data["stock"]
		spec.save()

		return returnJson([dict(spec.body())])

	elif request.method == 'DELETE':
		if request.user.id != spec.product.seller.id:
			try:
				admin = AdminUser.objects.get(id=request.user.id)
			except AdminUser.DoesNotExist:
				return returnJson([],403)

		spec.delete()
		productSpecs = ProductSpec.objects.filter(product=pk)
		return returnJson([dict(spec.body()) for spec in productSpecs])


# product image
def product_image_list(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	productImages = ProductImage.objects.filter(product=product)
	return returnJson([dict(image.body()) for image in productImages])


@login_required
def create_product_image(request, pk):
	try:
		seller = Seller.objects.get(id=request.user.id)
	except Seller.DoesNotExist:
		return returnJson([],403)

	try:
		product = Product.objects.get(id = pk)
	except Product.DoesNotExist:
		return JsonResponse([], 404)

	if seller.id != product.seller.id:
		return returnJson([],403)

	image = ProductImage.objects.create(product=product,image=request.FILES.get("images"))

	return returnJson([dict(image.body())])


def product_image(request, pk, pk_image):
	try:
		image = ProductImage.objects.get(id=pk_image)
	except ProductImage.DoesNotExist:
		return returnJson([], 404)

	return returnJson([dict(image.body())])

def first_product_image(request, pk):
	try:
		product = Product.objects.get(id = pk)
	except Product.DoesNotExist:
		return JsonResponse([], 404)

	image = ProductImage.objects.filter(product=product).first()

	return returnJson([dict(image.body())])


@login_required
def edit_product_image(request, pk, pk_image):
	try:
		image = ProductImage.objects.get(id=pk_image)
	except ProductImage.DoesNotExist:
		return returnJson([], 404)

	if request.user.id != image.product.seller.id:
		return returnJson([],403)

	# if request.method == 'PUT':
	# 	serializer = ProductImageSerializer(data=request.data, context={'request':request})
	# 	serializer.save()

	# 	return returnJson([dict(image.body())])
	
	if request.method == 'DELETE':
		os.system("rm %s" % image.image.path)
		image.delete()
		return returnJson()


# filter product
def random_product_list_by_category(request):
	data =json.loads(request.body)
	productList = list(Product.objects.filter(category=data["category"]))
	length = len(productList)
	if length > 10:
		length = 10
	randoms = random.sample(productList,length)
	return returnJson([dict(random.body()) for random in randoms])


def latest_product_list_by_category(request, pageNum):
	data =json.loads(request.body)
	products = Product.objects.filter(category=data["category"]).order_by('-id')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in products])


def highest_rating_product_list_by_category(request, pageNum):
	data =json.loads(request.body)
	products = Product.objects.filter(category=data["category"]).order_by('-rating')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in products])


def lowest_rating_product_list_by_category(request, pageNum):
	data =json.loads(request.body)
	products = Product.objects.filter(category=data["category"]).order_by('rating')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in products])


def cheapest_product_list_by_category(request, pageNum):
	data =json.loads(request.body)
	specs = ProductSpec.objects.order_by('price')
	products = []
	size = 0
	for spec in specs:
		if spec.product.category == data["category"] and spec.product not in products:
			products += [spec.product]
			size += 1
			if size == pageNum*10:
				break

	products = products[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in products])


def most_expensive_product_list_by_category(request, pageNum):
	data =json.loads(request.body)
	specs = ProductSpec.objects.order_by('-price')
	products = []
	size = 0
	for spec in specs:
		if spec.product.category == data["category"] and spec.product not in products:
			products += [spec.product]
			size += 1
			if size == pageNum*10:
				break

	products = products[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in products])


def random_product_by_price_range_and_category(request):
	data = json.loads(request.body)
	specs = ProductSpec.objects.filter(price__gte=data["minPrice"],price__lte=data["maxPrice"])
	products = []
	for spec in specs:
		if spec.product.category == data["category"]:
			products += [spec.product]
	products = set(products)
	length = len(products)
	if length > 10:
		length = 10
	results = random.sample(products,length)
	return returnJson([dict(product.body()) for product in results])


def highest_rating_product_list(request, pageNum):
	products = Product.objects.all().order_by('-rating')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in products])

def lowest_rating_product_list(request, pageNum):
	products = Product.objects.all().order_by('rating')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in products])


def cheapest_product_list(request, pageNum):
	specs = ProductSpec.objects.all().order_by('price')
	products = []
	size = 0
	for spec in specs:
		if spec.product not in products:
			products += [spec.product]
			size += 1
			if size == pageNum*10:
				break

	products = products[-10:]
	return returnJson([dict(product.body()) for product in products])


def most_expensive_product_list(request, pageNum):
	specs = ProductSpec.objects.all().order_by('-price')
	products = []
	size = 0
	for spec in specs:
		if spec.product not in products:
			products += [spec.product]
			size += 1
			if size == pageNum*10:
				break

	products = products[-10:]
	return returnJson([dict(product.body()) for product in products])


def random_product_by_price_range(request):
	data = json.loads(request.body)
	specs = ProductSpec.objects.filter(price__gte=data["minPrice"],price__lte=data["maxPrice"])
	products = []
	for spec in specs:
		products += [spec.product]
	products = set(products)
	length = len(products)
	if length > 10:
		length = 10
	results = random.sample(products,length)
	return returnJson([dict(product.body()) for product in results])


def search_product(request, pageNum):
	data = json.loads(request.body)
	specs = ProductSpec.objects.filter(description__contains=data["keyword"])
	products = []
	for spec in specs:
		products += [spec.product]
	products += Product.objects.filter(title__contains=data["keyword"])
	products += Product.objects.filter(description__contains=data["keyword"])
	products = set([product.id for product in products])
	results = Product.objects.filter(id__in=products).order_by('-soldAmount')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(product.body()) for product in results])


