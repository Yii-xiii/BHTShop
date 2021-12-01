from django.db import models
from user.models import Seller, Customer

# Create your models here.

class Followship(models.Model):
	seller = models.ForeignKey(Seller, on_delete=models.CASCADE, null=False)
	customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=False)

	def __str__(self):
		return self.customer.username + " - " + self.seller.username

	def body(self):
		return {'id': self.id,
				'seller': self.seller.body(),
				'customer': self.customer.body(),}