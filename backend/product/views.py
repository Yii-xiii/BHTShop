from django.shortcuts import render
from .models import Product, ProductSpec
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
import json


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


def latest_product_list_by_page(request, pageNum):
    products = Product.objects.all().order_by('-id')[((pageNum - 1) * 10):(pageNum * 10)]
    return returnJson([dict(product.body()) for product in products])

@login_required
def create_product(request):
    if request.method == 'POST':
        if request.COOKIES["user"] == "Seller":
            product = Product.objects.create()
            data = json.loads(request.body)

            product.title = data["title"]
            product.description = data["description"]
            product.seller = request.user
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


def product_spec_list(request, pk):
    productSpecs = ProductSpec.objects.filter(product=pk)
    return returnJson([dict(spec.body()) for spec in productSpecs])


def product_spec_list_by_page(request, pk, pageNum):
    productSpecs = ProductSpec.objects.filter(product=pk)[((pageNum - 1) * 10):(pageNum * 10)]
    return returnJson([dict(spec.body()) for spec in productSpecs])


def latest_product_spec_list(request, pk):
    productSpecs = ProductSpec.objects.filter(product=pk).order_by('-id')
    return returnJson([dict(spec.body()) for spec in productSpecs])


def latest_product_spec_list_by_page(request, pk, pageNum):
    productSpecs = ProductSpec.objects.filter(product=pk).order_by('-id')[((pageNum - 1) * 10):(pageNum * 10)]
    return returnJson([dict(spec.body()) for spec in productSpecs])


@login_required
def create_product_spec(request, pk):
    if request.COOKIES["user"] != "Seller":
        return returnJson([],403)

    spec = ProductSpec.objects.create()
    spec.product = pk

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