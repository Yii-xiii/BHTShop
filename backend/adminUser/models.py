from django.db import models
from django.contrib.auth.models import User
from user.models import Customer, Seller
from product.models import Product
from comment.models import ProductComment
from django.utils import timezone
# Create your models here.

class AdminUser(User):
	def __str__(self):
		return self.username

	def body(self):
		return {'id': self.id,
				'user' : 'Admin',
				'username': self.username}


class Report(models.Model):
	R1 = "scam"
	R2 = "selling prohibited item"
	R3 = "sending offensive messages"
	R4 = "counterfeit"
	R5 = "others"

	REASONS = [
		(R1, "scam"),
		(R2, "selling prohibited item"),
		(R3, "sending offensive messages"),
		(R4, "counterfeit"),
		(R5, "others"),
	]

	PEN = "pending"
	SUC = "succesful"
	REJ = "rejected"

	STATUSES = [
		(PEN, "pending"),
		(SUC, "succesful"),
		(REJ, "rejected"),
	]

	reportingUser = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="ReportingUser", null=True)
	reason = models.CharField(max_length=50, choices=REASONS)
	description = models.TextField(blank=True)
	status = models.CharField(max_length=50, choices=STATUSES, default=PEN)
	time = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.reportingUser.username + " reporting"

	def body(self):
		try:
			report = UserReport.objects.get(id=self.id)
		except UserReport.DoesNotExist:
			try:
				report = ProductReport.objects.get(id=self.id)
			except ProductReport.DoesNotExist:
				try:
					report = ProductCommentReport.objects.get(id=self.id)
				except ProductCommentReport.DoesNotExist:
					try:
						user1 = Customer.objects.get(username=self.reportingUser.username)
					except Customer.DoesNotExist:
						user1 = Seller.objects.get(username=self.reportingUser.username)
					return {'id': self.id,
							'type' : "Unknown",
							'reportingUser': user1.body(),
							'reason': self.reason,
							'status' : self.status,
							'description': self.description,
							'time' : self.time}

		return report.body()

class UserReport(Report):
	reportedUser = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="ReportedUser", null=True)

	def __str__(self):
		return self.reportingUser.username + " report " + self.reportedUser.username

	def body(self):
		if self.reportingUser is None and self.reportedUser is None:
			return {'id': self.id,
					'type' : "UserReport",
					'reason': self.reason,
					'status' : self.status,
					'description': self.description,
					'time' : self.time}

		if self.reportingUser is not None:
			try:
				user1 = Customer.objects.get(username=self.reportingUser.username)
			except Customer.DoesNotExist:
				user1 = Seller.objects.get(username=self.reportingUser.username)

			if self.reportedUser is None:
				return {'id': self.id,
						'type' : "UserReport",
						'reportingUser' : user1.body(),
						'reason': self.reason,
						'status' : self.status,
						'description': self.description,
						'time' : self.time}

			else:
				try:
					user2 = Customer.objects.get(username=self.reportedUser.username)
				except Customer.DoesNotExist:
					user2 = Seller.objects.get(username=self.reportedUser.username)

				return {'id': self.id,
						'type' : "UserReport",
						'reportingUser': user1.body(),
						'reportedUser' : user2.body(),
						'reason': self.reason,
						'status' : self.status,
						'description': self.description,
						'time' : self.time}


		else:
			try:
				user2 = Customer.objects.get(username=self.reportedUser.username)
			except Customer.DoesNotExist:
				user2 = Seller.objects.get(username=self.reportedUser.username)

			return {'id': self.id,
					'type' : "UserReport",
					'reportedUser' : user2.body(),
					'reason': self.reason,
					'status' : self.status,
					'description': self.description,
					'time' : self.time}
		

class ProductReport(Report):
	product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)

	def __str__(self):
		return self.reportingUser.username + " report " + self.product.title

	def body(self):
		if self.reportingUser is None and self.product is None:
			return {'id': self.id,
					'type' : "ProductReport",
					'reason': self.reason,
					'status' : self.status,
					'description': self.description,
					'time' : self.time}

		if self.reportingUser is None:
			return {'id': self.id,
					'type' : "ProductReport",
					'reportedProduct' : self.product.body(),
					'reason': self.reason,
					'status' : self.status,
					'description': self.description,
					'time' : self.time}

		try:
			user1 = Customer.objects.get(username=self.reportingUser.username)
		except Customer.DoesNotExist:
			user1 = Seller.objects.get(username=self.reportingUser.username)

		if self.product is None:
			return {'id': self.id,
					'type' : "ProductReport",
					'reportingUser': user1.body(),
					'reason': self.reason,
					'status' : self.status,
					'description': self.description,
					'time' : self.time}

		return {'id': self.id,
				'type' : "ProductReport",
				'reportingUser': user1.body(),
				'reportedProduct' : self.product.body(),
				'reason': self.reason,
				'status' : self.status,
				'description': self.description,
				'time' : self.time}


class ProductCommentReport(Report):
	comment = models.ForeignKey(ProductComment, on_delete=models.SET_NULL, null=True)

	def __str__(self):
		return self.reportingUser.username + " report " + self.comment.order.customer.username + "'s comment"

	def body(self):
		if self.reportingUser is None and self.comment is None:
			return {'id': self.id,
					'type' : "CommentReport",
					'reason': self.reason,
					'status' : self.status,
					'description': self.description,
					'time' : self.time}

		if self.reportingUser is None:
			return {'id': self.id,
					'type' : "CommentReport",
					'reportedComment' : self.comment.body(),
					'reason': self.reason,
					'status' : self.status,
					'description': self.description,
					'time' : self.time}

		try:
			user1 = Customer.objects.get(username=self.reportingUser.username)
		except Customer.DoesNotExist:
			user1 = Seller.objects.get(username=self.reportingUser.username)

		if self.comment is None:
			return {'id': self.id,
					'type' : "CommentReport",
					'reportingUser': user1.body(),
					'reason': self.reason,
					'status' : self.status,
					'description': self.description,
					'time' : self.time}

		return {'id': self.id,
				'type' : "CommentReport",
				'reportingUser': user1.body(),
				'reportedComment' : self.comment.body(),
				'reason': self.reason,
				'status' : self.status,
				'description': self.description,
				'time' : self.time}