from django.contrib import admin
from .models import ProductComment
# Register your models here.


class ProductCommentAdmin(admin.ModelAdmin):
	list_display = ('order', 'rating', 'description')


admin.site.register(ProductComment,ProductCommentAdmin)