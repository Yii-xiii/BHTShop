from django.contrib import admin
from .models import Collection

# Register your models here.

class CollectionAdmin(admin.ModelAdmin):
	list_display = ('product', 'customer')

admin.site.register(Collection,CollectionAdmin)