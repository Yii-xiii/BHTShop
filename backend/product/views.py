from django.shortcuts import render
from .models import Product, ProductSpec, ProductImage
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from .serializers import ProductImageSerializer
import json
import os


def returnJson(data=None, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data})


# Create your views here.

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
	products = Product.objects.filter(seller = request.user).order_by('-id')
	return returnJson([dict(product.body()) for product in products])


@login_required
def seller_best_selling_product_list(request):
	products = Product.objects.filter(seller = request.user).order_by('-soldAmount')
	return returnJson([dict(product.body()) for product in products])


@login_required
def create_product(request):
	if request.method == 'POST':
		if request.COOKIES["user"] == "Seller":
			seller = Seller.objects.get(username=request.user.username)
			product = Product.objects.create(seller=seller)
			data = json.loads(request.body)

			product.title = data["title"]
			product.description = data["description"]
			# product.soldAmount = 0

			product.save()
			return returnJson()
			# products = Product.objects.filter(seller = request.user).order_by('-id')
			# return returnJson([dict(product.body()) for product in products])

		else:
			return returnJson([], 403)


def product(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	return returnJson([dict(product.body())])


@login_required
def edit_product(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	if request.user != product.seller:
		return returnJson([],403)

	if request.method == 'DELETE':
		product.delete()
		products = Product.objects.all()
		return returnJson([dict(product.body()) for product in products])
	elif request.method == 'PUT':
		data = json.loads(request.body)
		product.title = data["title"]
		product.description = data["description"]
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

	spec = ProductSpec.objects.create(product=product)

	data = json.loads(request.body)
	spec.description = data["description"]
	spec.price = data["price"]
	spec.stock = data["stock"]
	spec.save()

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

	if request.user != spec.product.seller:
		return returnJson([],403)

	if request.method == 'PUT':
		data = json.loads(request.body)
		spec.description = data["description"]
		spec.price = data["price"]
		spec.stock = data["stock"]
		spec.save()

		return returnJson([dict(spec.body())])

	elif request.method == 'DELETE':
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
	if request.COOKIES["user"] != "Seller":
		return returnJson([],403)

	try:
		product = Product.objects.get(id = pk)
	except Product.DoesNotExist:
		return JsonResponse([], 404)

	serializer = ProductImageSerializer(data=request.data, context={'request':request})
	serializer.save()

	productImages = ProductImage.objects.filter(product=product)
	return returnJson([dict(image.body()) for image in productImages])


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

	if request.user != image.product.seller:
		return returnJson([],403)

	if request.method == 'PUT':
		serializer = ProductImageSerializer(data=request.data, context={'request':request})
		serializer.save()

		return returnJson([dict(image.body())])

	elif request.method == 'DELETE':
		os.system("rm %s" % image.image.path)
		image.delete()
		
		try:
			product = Product.objects.get(id=pk)
		except Product.DoesNotExist:
			return returnJson([])

		productImages = ProductImage.objects.filter(product=product)
		return returnJson([dict(image.body()) for image in productImages])

# def delete_image(request,pk,pk_image):
# 	try:
# 		image = ProductImage.objects.get(id=pk_image)
# 	except ProductImage.DoesNotExist:
# 		return returnJson([], 404)
# 	os.system("rm %s" % image.image.path)
# 	image.delete()
# 	productImages = ProductImage.objects.filter(product=pk)
# 	return returnJson([dict(image.body()) for image in productImages])
