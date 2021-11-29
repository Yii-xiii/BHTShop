from django.shortcuts import render
from .models import Product, ProductSpec
from django.http import JsonResponse
import json


# Create your views here.

def product_list(request):
    products = Product.objects.all()
    return JsonResponse([dict(product.body()) for product in products], safe = False)


def create_product(request):
    if request.method == 'POST':
        product = Product.objects.create()
        data = json.loads(request.body)
        product.title = data["title"]
        product.description = data["description"]
        product.save()
        products = Product.objects.all()
        return JsonResponse([dict(product.body()) for product in products], safe=False)


def product(request, pk):
    if request.method == 'DELETE':
        product = Product.objects.get(id=pk)
        product.delete()
        products = Product.objects.all()
        return JsonResponse([dict(product.body()) for product in products], safe = False)
    elif request.method == 'GET':
        products = Product.objects.filter(id=pk)
        return JsonResponse([dict(product.body()) for product in products], safe = False)
    elif request.method == 'PUT':
        product = Product.objects.get(id=pk)
        data = json.loads(request.body)
        product.title = data["title"]
        product.description = data["description"]
        product.save()
        return JsonResponse([dict(product.body())], safe = False)

def product_spec_list(request, pk):
    productSpecs = ProductSpec.objects.filter(product = pk)
    return JsonResponse([dict(spec.body()) for spec in productSpecs], safe = False)

def create_product_spec(request,pk):
    if request.method == 'POST':
        spec = ProductSpec.objects.create()
        spec.product = pk

        data = json.loads(request.body)
        spec.description = data["description"]
        spec.price = data["price"]
        spec.stock = data["stock"]
        spec.save()

        productSpecs = ProductSpec.objects.filter(product = pk)
        return JsonResponse([dict(spec.body()) for spec in productSpecs], safe=False)

def product_spec(request,pk,pk_spec):
    if request.method == 'PUT':
        spec = ProductSpec.objects.get(id = pk_spec)

        data = json.loads(request.body)
        spec.description = data["description"]
        spec.price = data["price"]
        spec.stock = data["stock"]
        spec.save()

        return JsonResponse([dict(spec.body())], safe=False)

    elif request.method == 'DELETE':
        spec = ProductSpec.objects.get(id = pk_spec)
        spec.delete()

        productSpecs = ProductSpec.objects.filter(product = pk)
        return JsonResponse([dict(spec.body()) for spec in productSpecs], safe=False)

    elif request.method == 'GET':
        spec = ProductSpec.objects.get(id = pk_spec)
        return JsonResponse([dict(spec.body())], safe=False)