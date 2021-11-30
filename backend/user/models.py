from django.db import models
from django.contrib.auth.models import User
import datetime
from django.utils import timezone


# Create your models here.

class Customer(User):
    address = models.TextField()
    phoneNumber = models.TextField()

    def __str__(self):
        return self.username

    def body(self):
        return {'id': self.id,
        		'user' : 'Customer',
                'username': self.username,
                'address': self.address,
                'phoneNumber': self.phoneNumber}


class Seller(User):
    address = models.TextField()
    phoneNumber = models.TextField()
    joinDate = models.DateField(default=timezone.now)

    def __str__(self):
        return self.username

    def body(self):
        return {'id': self.id,
        		'user' : 'Seller',
                'username': self.username,
                'address': self.address,
                'phoneNumber': self.phoneNumber,
                'joinDate': self.joinDate}
