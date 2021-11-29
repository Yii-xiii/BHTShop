from django.contrib import admin
from .models import Customer, Seller
# Register your models here.

class CustomerAdmin(admin.ModelAdmin):
	list_display = ('username','address','phoneNumber')

class SellerAdmin(admin.ModelAdmin):
	list_display = ('username','address','phoneNumber','joinDate')

admin.site.register(Customer,CustomerAdmin)
admin.site.register(Seller,SellerAdmin)
