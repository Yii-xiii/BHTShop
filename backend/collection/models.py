from django.db import models
from product.models import Product
from user.models import Customer

# Create your models here.

class Collection(models.Model):
	product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
	customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=False)

	def __str__(self):
		return self.customer.username + " - " + self.product.title

	def body(self):
		return {'id': self.id,
				'product': self.product.body(),
				'customer': self.customer.body(),}