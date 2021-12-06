from django.db import models
from order.models import Order
from django.utils import timezone

# Create your models here.

class ProductComment(models.Model):    
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=False)
    rating = models.IntegerField()
    description = models.TextField()
    time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.order.productSpec.product.title + " comment"

    def body(self):
        return {'id': self.id,
                'order': self.order.body(),
                'rating': self.rating,
                'description': self.description,
                'time' : self.time}