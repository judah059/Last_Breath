from django.urls import include, path
from rest_framework import routers

from api.users.views import ApiRegistration

router = routers.SimpleRouter()
router.register('registration', ApiRegistration)

urlpatterns = [
    path('', include(router.urls)),

]
