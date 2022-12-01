from django.contrib import admin

from onlineWatch.models import Subscription, ClientSubscription


@admin.register(Subscription)
class AdminSubscription(admin.ModelAdmin):
    pass


@admin.register(ClientSubscription)
class AdminClientSubscription(admin.ModelAdmin):
    pass
