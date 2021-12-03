from django.contrib import admin
from .models import AdminUser, Report

# Register your models here.

class AdminUserAdmin(admin.ModelAdmin):
	list_display = ('username',)

class ReportAdmin(admin.ModelAdmin):
	list_display = ('reportedUser','reportingUser', 'reason')

admin.site.register(AdminUser,AdminUserAdmin)
admin.site.register(Report,ReportAdmin)
