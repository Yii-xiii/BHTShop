from django.db import models
from product.models import ProductSpec
from user.models import Customer
from django.utils import timezone
# Create your models here.

class Order(models.Model):
	productSpec = models.ForeignKey(ProductSpec, on_delete=models.CASCADE, null=False)
	customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=False)
	quantity = models.IntegerField(null=False)
	totalPrice = models.DecimalField(decimal_places=2, max_digits=10,null=False)
	address = models.TextField(null=False,blank=True)
	phoneNumber = models.TextField(null=False,blank=True)
	time = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.customer.username + " bought " + self.productSpec.product.title

	def body(self):
		return {'id': self.id,
				'productSpec' : self.productSpec.body(),
				'customer': self.customer.body(),
				'quantity': self.quantity,
				'totalPrice': self.totalPrice,
				'address': self.address,
				'phoneNumber': self.phoneNumber,
				'time': self.time}

class OrderStatus(models.Model):
	PAID = "paid"
	SHP = "shipped"
	DEL = "delivered"
	RET_ING = "returning"
	RET_ED = "returned"
	STATUSES = [
		(PAID, "paid"),
		(SHP, "shipped"),
		(DEL, "delivered"),
		(RET_ING, "returning"),
		(RET_ED, "returned"),
	]

	order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False)
	status = models.CharField(max_length=100, choices=STATUSES, default=PAID)
	description = models.TextField(null=True)
	time = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.order.customer.username + " bought " + self.order.productSpec.product.title + " status " + self.status

	def body(self):
		return {'id': self.id,
				'order' : self.order.body(),
				'status': self.status,
				'description': self.description,
				'time': self.time}

class ReturnRequest(models.Model):
	R1 = "incorrect product"
	R2 = "incorrect spec"
	R3 = "product does not match description"
	R4 = "product was damaged"
	R5 = "product does not meet customer’s expectation"
	R6 = "others"

	REASONS	= [
		(R1, "incorrect product"),
		(R2, "incorrect spec"),
		(R3, "product does not match description"),
		(R4, "product was damaged"),
		(R5, "product does not meet customer’s expectation"),
		(R6, "others"),
	]

	S1 = "pending"
	S2 = "succesful"
	S3 = "failed"

	STATUSES = [
		(S1, "pending"),
		(S2, "succesful"),
		(S3, "failed"),
	]

	order = models.OneToOneField(Order, on_delete=models.CASCADE)
	reason = models.CharField(max_length=50, choices=REASONS, default=R6)
	status = models.TextField(max_length=50, choices=STATUSES, default=S1)
	description = models.TextField(blank=True)
	time = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.order.customer.username + " wants to return " + self.order.productSpec.product.title + " status " + self.status

	def body(self):
		return {'id': self.id,
				'order' : self.order.body(),
				'reason' : self.reason,
				'status': self.status,
				'description': self.description,
				'time': self.time}
