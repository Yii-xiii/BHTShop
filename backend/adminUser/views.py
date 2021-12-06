from django.shortcuts import render
from .models import AdminUser, Report
from user.models import Customer, Seller, User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json

# Create your views here.
def returnJson(data=None, errorCode=0, cookies=''):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'cookies': cookies})


@login_required
def get_report_list(request):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([], 403)

	reports = Report.objects.all()
	return returnJson([dict(report.body()) for report in reports])


@login_required
def get_all_latest_customer_reporting_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([], 403)

	customers = Customer.objects.all()

	reports = Report.objects.filter(reportingUser__in=customers).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports])


@login_required
def get_all_latest_reported_customer_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([], 403)

	customers = Customer.objects.all()

	reports = Report.objects.filter(reportedUser__in=customers).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports])


@login_required
def get_all_latest_seller_reporting_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([], 403)

	sellers = Seller.objects.all()

	reports = Report.objects.filter(reportingUser__in=sellers).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports])


@login_required
def get_all_latest_reported_seller_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([], 403)

	sellers = Seller.objects.all()

	reports = Report.objects.filter(reportedUser__in=sellers).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports])


@login_required
def get_latest_customer_reporting_list_by_page(request, pk_customer, pageNum):
	if request.user.id != pk_customer: 
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([], 403)

	try:
		customer = Customer.objects.get(id=pk_customer)
	except Customer.DoesNotExist:
		return returnJson([],404)

	reports = Report.objects.filter(reportingUser=customer).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports])


@login_required
def get_latest_reported_customer_list_by_page(request, pk_customer, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([], 403)

	try:
		customer = Customer.objects.get(id=pk_customer)
	except Customer.DoesNotExist:
		return returnJson([],404)

	reports = Report.objects.filter(reportedUser=customer).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports])


@login_required
def get_latest_seller_reporting_list_by_page(request, pk_seller, pageNum):
	if request.user.id != pk_seller:
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([], 403)

	try:
		seller = Seller.objects.get(id=pk_seller)
	except Seller.DoesNotExist:
		return returnJson([],404)

	reports = Report.objects.filter(reportingUser=seller).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports])


@login_required
def get_latest_reported_seller_list_by_page(request, pk_seller, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([], 403)

	try:
		seller = Seller.objects.get(id=pk_seller)
	except Seller.DoesNotExist:
		return returnJson([],404)

	reports = Report.objects.filter(reportedUser=seller).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports])


@login_required
def getReport(request, pk):
	try:
		report = Report.objects.get(id=pk)
	except Report.DoesNotExist:
		return returnJson([], 404)

	if request.user.id != report.reportingUser.id:
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([], 403)

	return returnJson([dict(report.body())])


@login_required
def createReport(request):
	data = json.loads(request.body)

	try:
		user = User.objects.get(id=data["userId"])
	except User.DoesNotExist:
		return returnJson([], 404)

	reason = data["reason"]
	description = data["description"]

	reportingUser = User.objects.get(id=request.user.id)

	report = Report.objects.create(reportingUser=reportingUser, reportedUser=user, reason=reason, description=description)
	return returnJson([dict(report.body())])


@login_required
def editReport(request, pk):
	try:
		report = Report.objects.get(id=pk)
	except Report.DoesNotExist:
		return returnJson([], 404)

	if request.user != report.reportingUser:
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([], 403)

	if request.method == 'PUT':
		data = json.loads(request.body)
		
		report.reason = data["reason"]
		report.description = data["description"]
		report.save()

		return returnJson([dict(report.body())])

	elif request.method == 'DELETE':
		report.delete()
		return returnJson()
