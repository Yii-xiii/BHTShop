from django.contrib import admin
from .models import Order, OrderStatus
# Register your models here.

class OrderAdmin(admin.ModelAdmin):
	list_display = ('productSpec', 'customer', 'totalPrice')

class OrderStatusAdmin(admin.ModelAdmin):
	list_display = ('order', 'status', 'description')

admin.site.register(Order,OrderAdmin)
admin.site.register(OrderStatus,OrderStatusAdmin)