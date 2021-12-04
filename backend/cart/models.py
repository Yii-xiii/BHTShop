from django.db import models
from product.models import ProductSpec
from user.models import Customer

# Create your models here.

class Cart(models.Model):
	productSpec = models.ForeignKey(ProductSpec, on_delete=models.CASCADE, null=False)
	customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=False)
	quantity = models.IntegerField(default=1)

	def __str__(self):
		return self.customer.username + " - " + self.productSpec.description

	def body(self):
		return {'id': self.id,
				'productSpec': self.productSpec.body(),
				'customer': self.customer.body(),
				'quantity' : self.quantity}