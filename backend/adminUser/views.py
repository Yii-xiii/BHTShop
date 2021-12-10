from django.shortcuts import render
from .models import AdminUser, Report, UserReport, ProductReport, ProductCommentReport
from product.models import Product
from comment.models import ProductComment
from user.models import Customer, Seller, User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django_db_logger.models import StatusLog
from datetime import timedelta
from django.utils import timezone
import json

# Create your views here.
def returnJson(data=None, pageCount=0, reportCount=0,errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'pageCount': int(pageCount),  'reportCount': reportCount})


@login_required
def get_all_report_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	reports = Report.objects.all()
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


# all reporting filter
@login_required
def get_all_latest_customer_reporting_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	customers = Customer.objects.all()

	reports = Report.objects.filter(reportingUser__in=customers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_all_latest_seller_reporting_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	sellers = Seller.objects.all()

	reports = Report.objects.filter(reportingUser__in=sellers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports], pages,count)


@login_required
def get_all_latest_customer_reporting_user_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	customers = Customer.objects.all()

	reports = UserReport.objects.filter(reportingUser__in=customers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports], pages,count)


@login_required
def get_all_latest_seller_reporting_user_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	sellers = Seller.objects.all()

	reports = UserReport.objects.filter(reportingUser__in=sellers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports], pages,count)


@login_required
def get_all_latest_customer_reporting_product_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	customers = Customer.objects.all()

	reports = ProductReport.objects.filter(reportingUser__in=customers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports], pages,count)


@login_required
def get_all_latest_seller_reporting_product_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	sellers = Seller.objects.all()

	reports = ProductReport.objects.filter(reportingUser__in=sellers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_all_latest_customer_reporting_comment_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	customers = Customer.objects.all()

	reports = ProductCommentReport.objects.filter(reportingUser__in=customers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_all_latest_seller_reporting_comment_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	sellers = Seller.objects.all()

	reports = ProductCommentReport.objects.filter(reportingUser__in=sellers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


# all reported filter
@login_required
def get_all_latest_reported_user_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	reports = UserReport.objects.all()
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports], pages,count)


@login_required
def get_all_latest_reported_customer_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	customers = Customer.objects.all()

	reports = UserReport.objects.filter(reportedUser__in=customers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)



@login_required
def get_all_latest_reported_seller_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	sellers = Seller.objects.all()

	reports = UserReport.objects.filter(reportedUser__in=sellers)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_all_latest_reported_product_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	reports = ProductReport.objects.all()
	count = reports.count()
	pages = (count + 9)/10
	reports = reports.order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_all_latest_reported_comment_list_by_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	reports = ProductCommentReport.objects.all().order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


# reporting filter with user id
@login_required
def get_latest_customer_reporting_list_by_page(request, pk_customer, pageNum):
	if request.user.id != pk_customer: 
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([],0,0, 403)

	try:
		customer = Customer.objects.get(id=pk_customer)
	except Customer.DoesNotExist:
		return returnJson([],0,0,404)

	reports = Report.objects.filter(reportingUser=customer).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_latest_seller_reporting_list_by_page(request, pk_seller, pageNum):
	if request.user.id != pk_seller:
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([],0,0, 403)

	try:
		seller = Seller.objects.get(id=pk_seller)
	except Seller.DoesNotExist:
		return returnJson([],0,0,404)

	reports = Report.objects.filter(reportingUser=seller).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_latest_customer_reporting_user_list_by_page(request, pk_customer, pageNum):
	if request.user.id != pk_customer: 
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([],0,0, 403)

	try:
		customer = Customer.objects.get(id=pk_customer)
	except Customer.DoesNotExist:
		return returnJson([],0,0,404)

	reports = UserReport.objects.filter(reportingUser=customer).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_latest_seller_reporting_user_list_by_page(request, pk_seller, pageNum):
	if request.user.id != pk_seller:
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([],0,0, 403)

	try:
		seller = Seller.objects.get(id=pk_seller)
	except Seller.DoesNotExist:
		return returnJson([],0,0,404)

	reports = UserReport.objects.filter(reportingUser=seller).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)

@login_required
def get_latest_customer_reporting_product_list_by_page(request, pk_customer, pageNum):
	if request.user.id != pk_customer: 
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([],0,0, 403)

	try:
		customer = Customer.objects.get(id=pk_customer)
	except Customer.DoesNotExist:
		return returnJson([],0,0,404)

	reports = ProductReport.objects.filter(reportingUser=customer).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_latest_seller_reporting_product_list_by_page(request, pk_seller, pageNum):
	if request.user.id != pk_seller:
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([],0,0, 403)

	try:
		seller = Seller.objects.get(id=pk_seller)
	except Seller.DoesNotExist:
		return returnJson([],0,0,404)

	reports = ProductReport.objects.filter(reportingUser=seller).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_latest_customer_reporting_comment_list_by_page(request, pk_customer, pageNum):
	if request.user.id != pk_customer: 
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([],0,0, 403)

	try:
		customer = Customer.objects.get(id=pk_customer)
	except Customer.DoesNotExist:
		return returnJson([],0,0,404)

	reports = ProductCommentReport.objects.filter(reportingUser=customer).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_latest_seller_reporting_comment_list_by_page(request, pk_seller, pageNum):
	if request.user.id != pk_seller:
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([],0,0, 403)

	try:
		seller = Seller.objects.get(id=pk_seller)
	except Seller.DoesNotExist:
		return returnJson([],0,0,404)

	reports = ProductCommentReport.objects.filter(reportingUser=seller).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


# reported filter with id
@login_required
def get_latest_reported_customer_list_by_page(request, pk_customer, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	try:
		customer = Customer.objects.get(id=pk_customer)
	except Customer.DoesNotExist:
		return returnJson([],0,0,404)

	reports = UserReport.objects.filter(reportedUser=customer).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_latest_reported_seller_list_by_page(request, pk_seller, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	try:
		seller = Seller.objects.get(id=pk_seller)
	except Seller.DoesNotExist:
		return returnJson([],0,0,404)

	reports = UserReport.objects.filter(reportedUser=seller).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_latest_reported_product_list_by_page(request, pk_product, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	try:
		product = Product.objects.get(id=pk_product)
	except Product.DoesNotExist:
		return returnJson([],0,0,404)

	reports = ProductReport.objects.filter(product=product).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_latest_reported_comment_list_by_page(request, pk_comment, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	try:
		comment = ProductComment.objects.get(id=pk_comment)
	except ProductComment.DoesNotExist:
		return returnJson([],0,0,404)

	reports = ProductCommentReport.objects.filter(comment=comment).order_by('-id')
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_report(request, pk):
	try:
		report = UserReport.objects.get(id=pk)
	except Report.DoesNotExist:
		return returnJson([],0,0, 404)

	if request.user.id != report.reportingUser.id:
		try:
			admin = AdminUser.objects.get(id=request.user.id)
		except AdminUser.DoesNotExist:
			return returnJson([],0,0, 403)

	return returnJson([dict(report.body())])

# report create
@login_required
def create_user_report(request):
	data = json.loads(request.body)

	try:
		user = User.objects.get(id=data["userId"])
	except User.DoesNotExist:
		return returnJson([],0,0, 404)

	if data["reason"] not in dict(UserReport.REASONS):
		return returnJson([],0,0, 400)

	reason = data["reason"]
	description = data["description"]

	reportingUser = User.objects.get(id=request.user.id)

	report = UserReport.objects.create(reportingUser=reportingUser, reportedUser=user, reason=reason, description=description, status=Report.PEN)
	return returnJson([dict(report.body())])


@login_required
def create_product_report(request):
	data = json.loads(request.body)

	try:
		product = Product.objects.get(id=data["productId"])
	except Product.DoesNotExist:
		return returnJson([],0,0, 404)

	if data["reason"] not in dict(Report.REASONS):
		return returnJson([],0,0, 400)

	reason = data["reason"]
	description = data["description"]

	reportingUser = User.objects.get(id=request.user.id)

	report = ProductReport.objects.create(reportingUser=reportingUser, product=product, reason=reason, description=description, status=Report.PEN)
	return returnJson([dict(report.body())])


@login_required
def create_product_comment_report(request):
	data = json.loads(request.body)

	try:
		comment = ProductComment.objects.get(id=data["commentId"])
	except ProductComment.DoesNotExist:
		return returnJson([],0,0, 404)

	if data["reason"] not in dict(Report.REASONS):
		return returnJson([],0,0, 400)

	reason = data["reason"]
	description = data["description"]

	reportingUser = User.objects.get(id=request.user.id)

	report = ProductCommentReport.objects.create(reportingUser=reportingUser, comment=comment, reason=reason, description=description, status=Report.PEN)
	return returnJson([dict(report.body())])


@login_required
def edit_report(request, pk):
	try:
		report = Report.objects.get(id=pk)
	except Report.DoesNotExist:
		return returnJson([],0,0, 404)

	if request.method == 'PUT':
		data = json.loads(request.body)
		if request.user.id == report.reportingUser.id:
			if data["reason"] not in dict(Report.REASONS):
				return returnJson([],0,0, 400)
			report.reason = data["reason"]
			report.description = data["description"]
			report.save()
			return returnJson([dict(report.body())])
		else:
			try:
				admin = AdminUser.objects.get(id=request.user.id)
			except AdminUser.DoesNotExist:
				return returnJson([],0,0, 403)

			if data["status"] not in dict(Report.STATUSES):
				return returnJson([],0,0, 400)
			report.status = data["status"]
			report.save()
			return returnJson([dict(report.body())])
	elif request.method == 'DELETE':
		if request.user.id != report.reportingUser.id:
			try:
				admin = AdminUser.objects.get(id=request.user.id)
			except AdminUser.DoesNotExist:
				return returnJson([],0,0, 403)
		report.delete()
		return returnJson()


# filter report by date 
@login_required
def get_report_in_days_by_page(request, dayNum, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	end = timezone.now().date() + timedelta(days=1)
	start = end - timedelta(days=dayNum-1)
	reports = Report.objects.filter(time__range=[start,end])
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_user_in_days_by_page(request, dayNum, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	end = timezone.now().date() + timedelta(days=1)
	start = end - timedelta(days=dayNum-1)
	reports = UserReport.objects.filter(time__range=[start,end])
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_product_in_days_by_page(request, dayNum, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	end = timezone.now().date() + timedelta(days=1)
	start = end - timedelta(days=dayNum-1)
	reports = ProductReport.objects.filter(time__range=[start,end])
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_comment_in_days_by_page(request, dayNum, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	end = timezone.now().date() + timedelta(days=1)
	start = end - timedelta(days=dayNum-1)
	reports = ProductCommentReport.objects.filter(time__range=[start,end])
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)

@login_required
def get_report_by_day_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]
	day = data["day"]

	reports = Report.objects.filter(time__year=year, time__month=month, time__day=day)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_user_by_day_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]
	day = data["day"]

	reports = UserReport.objects.filter(time__year=year, time__month=month, time__day=day)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_product_by_day_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]
	day = data["day"]

	reports = ProductReport.objects.filter(time__year=year, time__month=month, time__day=day)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_comment_by_day_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]
	day = data["day"]

	reports = ProductCommentReport.objects.filter(time__year=year, time__month=month, time__day=day)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_report_by_month_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]

	reports = Report.objects.filter(time__year=year, time__month=month)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_user_by_month_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]

	reports = UserReport.objects.filter(time__year=year, time__month=month)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_product_by_month_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]

	reports = ProductReport.objects.filter(time__year=year, time__month=month)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_comment_by_month_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]
	month = data["month"]

	reports = ProductCommentReport.objects.filter(time__year=year, time__month=month)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_report_by_year_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]

	reports = Report.objects.filter(time__year=year)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_user_by_year_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]

	reports = UserReport.objects.filter(time__year=year)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_product_by_year_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]

	reports = ProductReport.objects.filter(time__year=year)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_comment_by_year_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	year = data["year"]

	reports = ProductCommentReport.objects.filter(time__year=year)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


# filter with status
@login_required
def get_report_by_status_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	status = data["status"]

	reports = Report.objects.filter(status=status)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_user_by_status_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	status = data["status"]

	reports = UserReport.objects.filter(status=status)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_product_by_status_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	status = data["status"]

	reports = ProductReport.objects.filter(status=status)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


@login_required
def get_reported_comment_by_status_and_page(request, pageNum):
	try:
		admin = AdminUser.objects.get(id=request.user.id)
	except AdminUser.DoesNotExist:
		return returnJson([],0,0, 403)

	data = json.loads(request.body)
	status = data["status"]

	reports = ProductCommentReport.objects.filter(status=status)
	count = reports.count()
	pages = (count + 9)/10
	reports = reports[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(report.body()) for report in reports],pages,count)


#logging
def user_get_request(request,pk):
	try:
		user = User.objects.get(id=pk)
	except User.DoesNotExist:
		return returnJson([],0,0,404)

	logs = StatusLog.objects.filter(msg__contains='%s : "GET' % user.username)
	return returnJson([dict(acttime=log.create_datetime, msg=log.msg, level=log.level) for log in logs])


def user_illegal_operation(request,pk):
	try:
		user = User.objects.get(id=pk)
	except User.DoesNotExist:
		return returnJson([],0,0,404)

	logs = StatusLog.objects.exclude(msg__contains="response_code:2").filter(msg__contains='%s : "' % user.username)
	return returnJson([dict(acttime=log.create_datetime, msg=log.msg, level=log.level) for log in logs])


def illegal_operation(request):
	logs = StatusLog.objects.exclude(msg__contains="response_code:2")
	return returnJson([dict(acttime=log.create_datetime, msg=log.msg, level=log.level) for log in logs])


def anonymous_user_illegal_login(request):
	logs = StatusLog.objects.filter(msg__contains='AnonymousUser : "POST /users/login/')
	return returnJson([dict(acttime=log.create_datetime, msg=log.msg) for log in logs])