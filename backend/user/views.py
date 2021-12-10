from django.shortcuts import render
from .models import Customer, Seller, User, Postman
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

	if request.method == 'PUT':
		if request.user.id != customer.id:
			return returnJson([], 403)

		data = json.loads(request.body)

		customer.username = data["username"]
		customer.set_password(data["password"])
		customer.address = data["address"]
		customer.phoneNumber = data["phoneNumber"]

		customer.save()
		return returnJson([dict(customer.body())])

	elif request.method == 'DELETE':
		if request.user.id != customer.id:
			try:
				admin = AdminUser.objects.get(id=request.user.id)
			except AdminUser.DoesNotExist:
				return returnJson([], 403)
		customer.delete()
		return returnJson()


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
	

	if request.method == 'PUT':
		if request.user.id != seller.id:
			return returnJson([], 403)

		data = json.loads(request.body)

		seller.username = data["username"]
		seller.set_password(data["password"])
		seller.address = data["address"]
		seller.phoneNumber = data["phoneNumber"]

		seller.save()
		return returnJson([dict(seller.body())])

	elif request.method == 'DELETE':
		if request.user.id != seller.id:
			try:
				admin = AdminUser.objects.get(id=request.user.id)
			except AdminUser.DoesNotExist:
				return returnJson([], 403)

		seller.delete()
		return returnJson()


def postman_list(request):
	if request.method == 'GET':
		postmans = Postman.objects.all()
		return returnJson([dict(postman.body()) for postman in postmans])


def create_postman(request):
	if request.method == 'POST':
		data = json.loads(request.body)

		try:
			user = User.objects.get(username=data["username"])
		except User.DoesNotExist:
			postman = Postman.objects.create()
			postman.username = data["username"]
			postman.set_password(data["password"])
			postman.address = data["address"]
			postman.phoneNumber = data["phoneNumber"]

			postman.save()
			return returnJson([dict(postman.body())])

		return returnJson([],400)


def postman(request, pk):
	try:
		postman = Postman.objects.get(id=pk)
	except Postman.DoesNotExist:
		return returnJson([], 404)
	return returnJson([dict(postman.body())])


@login_required
def edit_postman(request, pk):
	try:
		postman = Postman.objects.get(id=pk)
	except Postman.DoesNotExist:
		return returnJson([], 404)
	

	if request.method == 'PUT':
		if request.user.id != postman.id:
			return returnJson([], 403)

		data = json.loads(request.body)

		postman.username = data["username"]
		postman.set_password(data["password"])
		postman.address = data["address"]
		postman.phoneNumber = data["phoneNumber"]

		postman.save()
		return returnJson([dict(postman.body())])

	elif request.method == 'DELETE':
		if request.user.id != postman.id:
			try:
				admin = AdminUser.objects.get(id=request.user.id)
			except AdminUser.DoesNotExist:
				return returnJson([], 403)

		postman.delete()
		return returnJson()


def user_login(request):
	data = json.loads(request.body)

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
					postman = Postman.objects.get(username=username)
					return returnJson([dict(postman.body())], 0, {'user' : 'Postman', 'username' : username, 'user_id' : user.id})
				except Postman.DoesNotExist:
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
		return returnJson([dict(seller.body())])
	except Seller.DoesNotExist:
		try : 
			customer = Customer.objects.get(username = username)
			return returnJson([dict(customer.body())])
		except Customer.DoesNotExist:
			try:
				postman = Postman.objects.get(username=username)
				return returnJson([dict(postman.body())])
			except Postman.DoesNotExist:
				try : 
					admin = AdminUser.objects.get(username = username)
					return returnJson([dict(admin.body())])
				except AdminUser.DoesNotExist:
					return returnJson([{'username' : username}])


