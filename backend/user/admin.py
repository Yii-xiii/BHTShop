from django.contrib import admin
from .models import Customer, Seller, Postman
# Register your models here.

class CustomerAdmin(admin.ModelAdmin):
	list_display = ('username','address','phoneNumber')

class SellerAdmin(admin.ModelAdmin):
	list_display = ('username','address','phoneNumber','joinDate')

class PostmanAdmin(admin.ModelAdmin):
	list_display = ('username',)

admin.site.register(Customer,CustomerAdmin)
admin.site.register(Seller,SellerAdmin)
admin.site.register(Postman,PostmanAdmin)
