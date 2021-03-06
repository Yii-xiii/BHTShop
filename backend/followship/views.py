from django.shortcuts import render
from .models import Followship
from user.models import Seller, Customer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json

# Create your views here.


def returnJson(data=None, pageCount=0, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'pageCount' : int(pageCount)})

# followship
@login_required
def customer_followship_list(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	followships = Followship.objects.filter(customer=customer)

	return returnJson([dict(followship.body()) for followship in followships])


@login_required
def latest_customer_followship_list(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	followships = Followship.objects.filter(customer=customer).order_by('-id')

	return returnJson([dict(followship.body()) for followship in followships])


def latest_customer_followship_list_by_page(request, pageNum):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	followships = Followship.objects.filter(customer=customer)
	pages = (followships.count()+9)/10
	followships = followships.order_by('-id')[((pageNum-1)*10):(pageNum*10)]

	return returnJson([dict(followship.body()) for followship in followships], pages)


@login_required
def create_customer_followship(request):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	data = json.loads(request.body)

	try:
		seller = Seller.objects.get(id = data["sellerId"])
	except Seller.DoesNotExist:
		return returnJson([],0, 404)

	try:
		followship = Followship.objects.get(seller=seller, customer=customer)
	except Followship.DoesNotExist:
		followship = Followship.objects.create(seller=seller, customer=customer)
		return returnJson([dict(followship.body())])

	return returnJson([],0,400)


@login_required
def get_customer_followship(request, pk_seller):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	try:
		seller = Seller.objects.get(id = pk_seller)
	except Seller.DoesNotExist:
		return returnJson([],0, 404)

	try:
		followship = Followship.objects.get(customer=customer, seller=seller)
	except Followship.DoesNotExist:
		return returnJson([],0, 404)

	return returnJson([dict(followship.body())])


@login_required
def edit_customer_followship(request, pk_seller):
	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],0, 403)

	try:
		seller = Seller.objects.get(id = pk_seller)
	except Seller.DoesNotExist:
		return returnJson([],0, 404)

	try:
		followship = Followship.objects.get(customer=customer, seller=seller)
	except Followship.DoesNotExist:
		return returnJson([],0, 404)

	if request.method == 'DELETE':
		followship.delete()
		return returnJson()


def seller_followship_count(request,pk):
	try:
		seller = Seller.objects.get(id = pk)
	except Seller.DoesNotExist:
		return returnJson([],0, 404)

	followship = Followship.objects.filter(seller=seller)
	return returnJson(dict(count=len(followship)))