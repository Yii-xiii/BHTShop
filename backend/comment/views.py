from django.shortcuts import render
from product.models import Product, ProductSpec
from order.models import Order
from user.models import Customer
from .models import ProductComment
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db import IntegrityError
from decimal import Decimal
import json

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

	specs = ProductSpec.objects.filter(product=product)

	orders = Order.objects.filter(productSpec__in=specs)

	comments = ProductComment.objects.filter(order__in=orders)
	return returnJson([dict(comment.body()) for comment in comments])


def product_comment_list_by_page(request, pk, pageNum):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	specs = ProductSpec.objects.filter(product=product)

	orders = Order.objects.filter(productSpec__in=specs)

	comments = ProductComment.objects.filter(order__in=orders)[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(comment.body()) for comment in comments])


def latest_product_comment_list(request, pk):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	specs = ProductSpec.objects.filter(product=product)

	orders = Order.objects.filter(productSpec__in=specs)

	comments = ProductComment.objects.filter(order__in=orders).order_by('-id')
	return returnJson([dict(comment.body()) for comment in comments])


def latest_product_comment_list_by_page(request, pk, pageNum):
	try:
		product = Product.objects.get(id=pk)
	except Product.DoesNotExist:
		return returnJson([], 404)

	specs = ProductSpec.objects.filter(product=product)

	orders = Order.objects.filter(productSpec__in=specs)

	comments = ProductComment.objects.filter(order__in=orders).order_by('-id')[((pageNum - 1) * 10):(pageNum * 10)]
	return returnJson([dict(comment.body()) for comment in comments])


@login_required
def create_product_comment(request, pk_order):
	try:
		order = Order.objects.get(id = pk_order)
	except Order.DoesNotExist:
		return returnJson([], 404)

	try:
		customer = Customer.objects.get(id=request.user.id)
	except Customer.DoesNotExist:
		return returnJson([],403)

	if order.customer.id != customer.id:
		return returnJson([], 403)

	data = json.loads(request.body)
	description = data["description"]
	rating = int(data["rating"])

	try:
		comment = ProductComment.objects.create(order=order, description=description, rating=rating)
	except IntegrityError:
		return returnJson([], 400)

	specs = ProductSpec.objects.filter(product=order.productSpec.product)

	orders = Order.objects.filter(productSpec__in = specs)

	comments = ProductComment.objects.filter(order__in=orders)
	size = len(comments)
	product = Product.objects.get(id=order.productSpec.product.id)
	product.rating += (comment.rating - product.rating)/Decimal(size)
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

	if request.user.id != comment.order.customer.id:
		return returnJson([],403)

	if request.method == 'PUT':
		data = json.loads(request.body)

		specs = ProductSpec.objects.filter(product=comment.order.productSpec.product)
		orders = Order.objects.filter(productSpec__in = specs)
		comments = ProductComment.objects.filter(order__in=orders)
		size = len(comments)
		product = Product.objects.get(id=comment.order.productSpec.product.id)
		product.rating += (Decimal(data["rating"]) - comment.rating)/Decimal(size)
		product.save()

		comment.description = data["description"]
		comment.rating = data["rating"]
		comment.save()

		return returnJson([dict(comment.body())])

	elif request.method == 'DELETE':
		specs = ProductSpec.objects.filter(product=comment.order.productSpec.product)
		orders = Order.objects.filter(productSpec__in = specs)
		comments = ProductComment.objects.filter(order__in=orders)
		size = len(comments)
		product = Product.objects.get(id=comment.order.productSpec.product.id)
		product.rating += (product.rating - comment.rating)/Decimal(size-1)
		product.save()
		comment.delete()
		return returnJson()