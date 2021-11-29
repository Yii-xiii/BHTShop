from django.shortcuts import render
from .models import Customer, Seller
from django.http import JsonResponse
import json

# Create your views here.

def customerList(request):
	if request.method == 'GET':
		customers = Customer.objects.all()
		return JsonResponse([dict(customer.body()) for customer in customers], safe = False)

def createCustomer(request):
	if request.method == 'POST':
		data = json.loads(request.body)

		customer = Customer.objects.create()
		customer.username = data["username"]
		customer.set_password(data["password"])
		customer.address = data["address"]
		customer.phoneNumber = data["phoneNumber"]

		customer.save()
		return JsonResponse([dict(customer.body())], safe = False)

def customer(request,pk):
	if request.method == 'PUT':
		data = json.loads(request.body)

		customer = Customer.objects.get(id = pk)
		customer.username = data["username"]
		customer.set_password(data["password"])
		customer.address = data["address"]
		customer.phoneNumber = data["phoneNumber"]

		customer.save()
		return JsonResponse([dict(customer.body())], safe = False)

	elif request.method == 'DELETE':
		customer = Customer.objects.get(id = pk)
		customer.delete()
		customers = Customer.objects.all()
		return JsonResponse([dict(customer.body()) for customer in customers], safe = False)

	elif request.method == 'GET':
		customer = Customer.objects.get(id = pk)
		return JsonResponse([dict(customer.body())], safe = False)

def sellerList(request):
	if request.method == 'GET':
		sellers = Seller.objects.all()
		return JsonResponse([dict(seller.body()) for seller in sellers], safe = False)

def createSeller(request):
	if request.method == 'POST':
		data = json.loads(request.body)

		seller = Seller.objects.create()
		seller.username = data["username"]
		seller.set_password(data["password"])
		seller.address = data["address"]
		seller.phoneNumber = data["phoneNumber"]

		seller.save()
		return JsonResponse([dict(seller.body())], safe = False)

def seller(request,pk):
	if request.method == 'PUT':
		data = json.loads(request.body)

		seller = Seller.objects.get(id = pk)
		seller.username = data["username"]
		seller.set_password(data["password"])
		seller.address = data["address"]
		seller.phoneNumber = data["phoneNumber"]

		seller.save()
		return JsonResponse([dict(seller.body())], safe = False)

	elif request.method == 'DELETE':
		seller = Seller.objects.get(id = pk)
		seller.delete()
		sellers = Seller.objects.all()
		return JsonResponse([dict(seller.body()) for seller in sellers], safe = False)

	elif request.method == 'GET':
		seller = Seller.objects.get(id = pk)
		return JsonResponse([dict(seller.body())], safe = False)
