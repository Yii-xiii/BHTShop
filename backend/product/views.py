from django.shortcuts import render
from .models import Product
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
        products = Product.objects.all()
        return JsonResponse([dict(product.body()) for product in products], safe = False)
