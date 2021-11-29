from django.contrib import admin
from .models import Product, ProductSpec
# Register your models here.

class ProductAdmin(admin.ModelAdmin):
	list_display = ('title', 'description')

class ProductSpecAdmin(admin.ModelAdmin):
	list_display = ('product', 'description','price','stock')

admin.site.register(Product,ProductAdmin)
admin.site.register(ProductSpec,ProductSpecAdmin)