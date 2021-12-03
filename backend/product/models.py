from django.db import models
from user.models import Seller
from django.utils import timezone

# Create your models here.

class Product(models.Model):
    WOMEN_CLOTHES = 'women clothes'
    MEN_CLOTHES = 'men clothes'
    SPORTS = 'sports'
    COSMETICS = 'cosmetics'
    DRINKS = 'drinks'
    SNACKS = 'snacks'
    OTHERS = 'others'

    CATEGORIES = [
        (WOMEN_CLOTHES, 'women clothes'),
        (MEN_CLOTHES, 'men clothes'),
        (SPORTS, 'sports'),
        (COSMETICS, 'cosmetics'),
        (DRINKS, 'drinks'),
        (SNACKS, 'snacks'),
        (OTHERS, 'others'),
    ]

    title = models.CharField(max_length=50,null=False,blank=False)
    description = models.TextField(blank=True,null=False)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, null=False)
    category = models.CharField(max_length=50, choices=CATEGORIES, default=OTHERS)
    soldAmount = models.IntegerField(default = 0)
    rating = models.DecimalField(decimal_places=1, max_digits=2, default=0)

    def __str__(self):
        return self.title

    def body(self):
        return {'id': self.id,
                'seller' : self.seller.body(),
                'title': self.title,
                'description': self.description,
                'soldAmount': self.soldAmount,
                'category' : self.category,
                }


class ProductSpec(models.Model):
    description = models.TextField(null=False)
    price = models.DecimalField(decimal_places=2, max_digits=10,null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.product.title + " - " + self.description

    def body(self):
        return {'id': self.id,
                'product': self.product.body(),
                'description': self.description,
                'price': self.price,
                'stock': self.stock}


class ProductImage(models.Model):
    image = models.ImageField(upload_to="product_images",null = False)
    product = models.ForeignKey(Product, on_delete = models.CASCADE, null = False)

    def __str__(self):
        return self.product.title + " image"

    def body(self):
        return {'id': self.id,
                'product': self.product.body(),
                'image_url': 'http://localhost:8000' + self.image.url}
