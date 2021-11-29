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

class ProductSpec(models.Model):
    description = models.TextField()
    price = models.DecimalField(decimal_places = 2, max_digits = 10)
    product = models.ForeignKey(Product, on_delete = models.CASCADE, null = False)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.product.title + " - " + self.description

    def body(self):
        return {'id': self.id,
                'product_id': self.product.id,
                'description': self.description,
                'price': self.price,
                'stock': self.stock}