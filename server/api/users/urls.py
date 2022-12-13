from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView

from api.auth.serializers import CustomJWTSerializer
from api.users.views import *

routerPayment = routers.SimpleRouter()
routerPayment.register(r'payment', PaymentViewSet, basename='payment')

urlpatterns = [
    path('user/token/', TokenObtainPairView.as_view(serializer_class=CustomJWTSerializer), name='token_obtain_pair'),
    path('user/registration/', ApiRegistration.as_view()),
    path('user/profile/', UserViewSet.as_view({'get': 'list',
                                              'put': 'update',
                                              'delete': 'destroy'})),
    path('user/change_password/', ChangePasswordView.as_view(), name='auth_change_password'),
    path('user/', include(routerPayment.urls)), # TODO: test it
]