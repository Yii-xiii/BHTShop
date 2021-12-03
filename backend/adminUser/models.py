from django.db import models
from django.contrib.auth.models import User
from user.models import Customer, Seller
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

	reportedUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ReportedUser")
	reportingUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ReportingUser")
	reason = models.CharField(max_length=50, choices=REASONS)
	description = models.TextField(blank=True)

	def __str__(self):
		return self.reportingUser.username + " report " + self.reportedUser.username

	def body(self):
		try:
			user1 = Customer.objects.get(username=self.reportingUser.username)
		except Customer.DoesNotExist:
			user1 = Seller.objects.get(username=self.reportingUser.username)

		try:
			user2 = Customer.objects.get(username=self.reportedUser.username)
		except Customer.DoesNotExist:
			user2 = Seller.objects.get(username=self.reportedUser.username)

		return {'id': self.id,
				'reportingUser': user1.body(),
				'reportedUser': user2.body(),
				'reason': self.reason,
				'description': self.description,}
