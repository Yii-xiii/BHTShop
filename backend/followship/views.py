from django.shortcuts import render
from .models import Followship
from user.models import Seller, Customer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

# Create your views here.


def returnJson(data=None, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data})

# followship
@login_required
def customer_followship_list(request):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	customer = Customer.objects.get(id=request.user.id)

	followships = Followship.objects.filter(customer=customer)

	return returnJson([dict(followship.body()) for followship in followships])


@login_required
def latest_customer_followship_list(request):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	customer = Customer.objects.get(id=request.user.id)

	followships = Followship.objects.filter(customer=customer).order_by('-id')

	return returnJson([dict(followship.body()) for followship in followships])


def latest_customer_followship_list_by_page(request, pageNum):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	customer = Customer.objects.get(id=request.user.id)

	followships = Followship.objects.filter(customer=customer).order_by('-id')[((pageNum-1)*10):(pageNum*10)]

	return returnJson([dict(followship.body()) for followship in followships])


@login_required
def create_customer_followship(request, pk_seller):
	if request.COOKIES["user"] != "Customer":
		return returnJson([],403)

	try:
		seller = Seller.objects.get(id = pk_seller)
	except Seller.DoesNotExist:
		return returnJson([], 404)

	customer = Customer.objects.get(id=request.user.id)

	try:
		followship = Followship.objects.get(seller=seller, customer=customer)
	except Followship.DoesNotExist:
		followship = Followship.objects.create(seller=seller, customer=customer)
		return returnJson([dict(followship.body())])

	return returnJson([],400)


@login_required
def get_customer_followship(request, pk_seller):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	customer = Customer.objects.get(id=request.user.id)

	try:
		seller = Seller.objects.get(id = pk_seller)
	except Seller.DoesNotExist:
		return returnJson([], 404)

	try:
		followship = Followship.objects.get(customer=customer, seller=seller)
	except Followship.DoesNotExist:
		return returnJson([], 404)

	return returnJson([dict(followship.body())])


@login_required
def edit_customer_followship(request, pk_seller):
	if request.COOKIES["user"] != "Customer":
		return returnJson([], 403)

	customer = Customer.objects.get(id=request.user.id)

	try:
		seller = Seller.objects.get(id = pk_seller)
	except Seller.DoesNotExist:
		return returnJson([], 404)

	try:
		followship = Followship.objects.get(customer=customer, seller=seller)
	except Followship.DoesNotExist:
		return returnJson([], 404)

	if request.method == 'DELETE':
		followship.delete()
		return returnJson()