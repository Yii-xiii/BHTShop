from django.db import models


# Create your models here.

class Product(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.title

    def body(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                }
