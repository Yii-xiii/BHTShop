from django.shortcuts import render
from .models import Customer, Seller, User
from adminUser.models import AdminUser
from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
import json


# Create your views here.
def returnJson(data=None, errorCode=0, cookies=''):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'cookies': cookies})


def customer_list(request):
	if request.method == 'GET':
		customers = Customer.objects.all()
		return returnJson([dict(customer.body()) for customer in customers])


def create_customer(request):
	if request.method == 'POST':
		data = json.loads(request.body)

		try:
			user = User.objects.get(username=data["username"])
		except User.DoesNotExist:
			customer = Customer.objects.create()
			customer.username = data["username"]
			customer.set_password(data["password"])
			customer.address = data["address"]
			customer.phoneNumber = data["phoneNumber"]

			customer.save()
			return returnJson([dict(customer.body())])

		return returnJson([],400)


def customer(request, pk):
	try:
		customer = Customer.objects.get(id=pk)
	except Customer.DoesNotExist:
		return returnJson([], 404)
	return returnJson([dict(customer.body())])


@login_required
def edit_customer(request, pk):
	try:
		customer = Customer.objects.get(id=pk)
	except Customer.DoesNotExist:
		return returnJson([], 404)

	if request.user != customer:
		return returnJson([], 403)

	if request.method == 'PUT':
		data = json.loads(request.body)

		customer.username = data["username"]
		customer.set_password(data["password"])
		customer.address = data["address"]
		customer.phoneNumber = data["phoneNumber"]

		customer.save()
		return returnJson([dict(customer.body())])

	elif request.method == 'DELETE':
		customer.delete()
		customers = Customer.objects.all()
		return returnJson([dict(customer.body()) for customer in customers])


def seller_list(request):
	if request.method == 'GET':
		sellers = Seller.objects.all()
		return returnJson([dict(seller.body()) for seller in sellers])


def create_seller(request):
	if request.method == 'POST':
		data = json.loads(request.body)

		try:
			user = User.objects.get(username=data["username"])
		except User.DoesNotExist:
			seller = Seller.objects.create()
			seller.username = data["username"]
			seller.set_password(data["password"])
			seller.address = data["address"]
			seller.phoneNumber = data["phoneNumber"]

			seller.save()
			return returnJson([dict(seller.body())])

		return returnJson([],400)


def seller(request, pk):
	try:
		seller = Seller.objects.get(id=pk)
	except Seller.DoesNotExist:
		return returnJson([], 404)
	return returnJson([dict(seller.body())])


@login_required
def edit_seller(request, pk):
	try:
		seller = Seller.objects.get(id=pk)
	except Seller.DoesNotExist:
		return returnJson([], 404)
	
	if request.user != seller:
		return returnJson([], 403)

	if request.method == 'PUT':
		data = json.loads(request.body)

		seller.username = data["username"]
		seller.set_password(data["password"])
		seller.address = data["address"]
		seller.phoneNumber = data["phoneNumber"]

		seller.save()
		return returnJson([dict(seller.body())])

	elif request.method == 'DELETE':
		seller.delete()
		sellers = Seller.objects.all()
		return returnJson([dict(seller.body()) for seller in sellers])



def user_login(request):
	data = json.loads(request.body)
	print(data)

	username = data["username"]
	password = data["password"]
	user = authenticate(request, username=username, password=password)

	if user is not None:
		login(request, user)
		try:
			seller = Seller.objects.get(username = username)
			return returnJson([dict(seller.body())], 0, {'user' : 'Seller', 'username' : username, 'user_id' : user.id})
		except Seller.DoesNotExist:
			try : 
				customer = Customer.objects.get(username = username)
				return returnJson([dict(customer.body())], 0, {'user' : 'Customer', 'username' : username, 'user_id' : user.id})
			except Customer.DoesNotExist:
				try:
					admin = AdminUser.objects.get(username=username)
					return returnJson([dict(admin.body())], 0, {'user' : 'Admin', 'username' : username, 'user_id' : user.id})
				except AdminUser.DoesNotExist:
					logout(request)
					return returnJson([],403)
	else:
		return returnJson([], 403)


def user_logout(request):
	if request.user.is_authenticated:
		logout(request)
		return returnJson([])
	else:
		return returnJson([],403)


@login_required
def current_user(request):
	username = request.user.username

	try:
		seller = Seller.objects.get(username = username)
		return returnJson([dict(seller.body)])
	except Seller.DoesNotExist:
		try : 
			customer = Customer.objects.get(username = username)
			return returnJson([dict(customer.body)])
		except Customer.DoesNotExist:
			try : 
				admin = AdminUser.objects.get(username = username)
				return returnJson([dict(admin.body)])
			except AdminUser.DoesNotExist:
				return returnJson([{'username' : username}])


