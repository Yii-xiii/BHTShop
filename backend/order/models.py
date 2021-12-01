from django.db import models
from product.models import Product
from user.models import Customer
from django.utils import timezone
# Create your models here.

class Order(models.Model):
	product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
	customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=False)
	quantity = models.IntegerField(null=False, blank=False)
	totalPrice = models.DecimalField(decimal_places=2, max_digits=10)
	address = models.TextField(blank=True)
	phoneNumber = models.TextField(blank=True)
	time = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.customer.username + " bought " + self.product.title

	def body(self):
		return {'id': self.id,
				'product' : self.product.body(),
				'customer': self.customer.body(),
				'quantity': self.quantity,
				'totalPrice': self.totalPrice,
				'address': self.address,
				'phoneNumber': self.phoneNumber,
				'time': self.time}

class OrderStatus(models.Model):
	PAID = "Paid"
	DEL_ING = "Delivering"
	DEL_ED = "Delivered"
	RET = "Returned"
	STATUS_CHOICES = [
		(PAID, "Paid"),
		(DEL_ING, "Delivering"),
		(DEL_ED, "Delivered"),
		(RET, "Returned"),
	]

	order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False)
	status = models.CharField(max_length=100, choices=STATUS_CHOICES, default=PAID)
	description = models.TextField()
	time = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.order.customer.username + " bought " + self.order.product.title + " status " + self.status

	def body(self):
		return {'id': self.id,
				'order' : self.order.body(),
				'status': self.status,
				'description': self.description,
				'time': self.time}