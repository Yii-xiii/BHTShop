from django.contrib import admin
from .models import AdminUser, Report, UserReport, ProductReport, ProductCommentReport

# Register your models here.

class AdminUserAdmin(admin.ModelAdmin):
	list_display = ('username',)

class ReportAdmin(admin.ModelAdmin):
	list_display = ('reportingUser', 'reason', 'status')

class UserReportAdmin(admin.ModelAdmin):
	list_display = ('reportedUser','reportingUser', 'reason', 'status')

class ProductReportAdmin(admin.ModelAdmin):
	list_display = ('product','reportingUser', 'reason', 'status')

class ProductCommentReportAdmin(admin.ModelAdmin):
	list_display = ('comment','reportingUser', 'reason', 'status')

admin.site.register(AdminUser,AdminUserAdmin)
admin.site.register(Report,ReportAdmin)
admin.site.register(UserReport,UserReportAdmin)
admin.site.register(ProductReport,ProductReportAdmin)
admin.site.register(ProductCommentReport,ProductCommentReportAdmin)
