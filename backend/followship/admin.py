from django.contrib import admin
from .models import Followship

# Register your models here.

class FollowshipAdmin(admin.ModelAdmin):
	list_display = ('seller', 'customer')

admin.site.register(Followship,FollowshipAdmin)