from django.shortcuts import render
from product.models import Product
from order.models import Order
from .models import ProductComment
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

# Create your views here.

def returnJson(data=None, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data})

# product comment
def product_comment_list(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	orders = Order.objects.filter(product=product)

	comments = ProductComment.objects.filter(order__in=orders)
	return returnJson([dict(comment.body()) for comment in comments])


def product_comment_list_by_page(request, pk, pageNum):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	orders = Order.objects.filter(product=product)

	comments = ProductComment.objects.filter(order__in=orders)[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(comment.body()) for comment in comments])


def latest_product_comment_list(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	orders = Order.objects.filter(product=product)

	comments = ProductComment.objects.filter(order__in=orders).order_by('-id')
	return returnJson([dict(comment.body()) for comment in comments])


def latest_product_comment_list_by_page(request, pk, pageNum):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	orders = Order.objects.filter(product=product)

	comments = ProductComment.objects.filter(order__in=orders).order_by('-id')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(comment.body()) for comment in comments])


@login_required
def create_product_comment(request, pk_order):
	if request.COOKIES["user"] != "Customer":
		return returnJson([],403)

	try:
		order = Order.objects.get(id = pk_order)
	except Order.DoesNotExist:
		return returnJson([], 404)

	if request.user != order.customer:
		return returnJson([],403)

	try:
		comment = ProductComment.objects.create(order=order)
	except IntegrityError:
		return returnJson([], 400)

	data = json.loads(request.body)
	comment.description = data["description"]
	comment.rating = data["rating"]
	comment.save()

	comments = ProductComment.objects.filter(product=product)
	size = len(comments)
	product = Product.objects.get(id=order.productSpec.product.id)
	product.rating += (comment.rating - product.rating)/float(size)
	product.save()

	return returnJson([dict(comment.body()) for comment in comments])


def product_comment(request, pk_comment):
	try:
		comment = ProductComment.objects.get(id=pk_comment)
	except ProductComment.DoesNotExist:
		return returnJson([], 404)

	return returnJson([dict(comment.body())])

def order_comment(request, pk):
	try:
		order = Order.objects.get(id = pk)
	except Order.DoesNotExist:
		return returnJson([], 404)

	comment = ProductComment.objects.get(order=order)

	return returnJson([dict(comment.body())])


@login_required
def edit_product_comment(request, pk_comment):
	try:
		comment = ProductComment.objects.get(id=pk_comment)
	except ProductComment.DoesNotExist:
		return returnJson([], 404)

	if request.user != comment.order.customer:
		return returnJson([],403)

	if request.method == 'PUT':
		data = json.loads(request.body)
		comment.description = data["description"]
		comment.rating = data["rating"]
		comment.save()

		return returnJson([dict(comment.body())])

	elif request.method == 'DELETE':
		comment.delete()
		return returnJson()