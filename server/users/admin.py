from django.contrib import admin

from users.models import MyUser


@admin.register(MyUser)
class AddressAdmin(admin.ModelAdmin):
    pass
