"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView

from api.auth.serializers import CustomJWTSerializer
from api.users.views import *

# routerUser = routers.SimpleRouter()
# routerUser.register(r'profile', UserViewSet, basename='profile')

routerMovie = routers.SimpleRouter()
routerMovie.register(r'film', MovieViewSet, basename='film')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(serializer_class=CustomJWTSerializer), name='token_obtain_pair'),
    path('api/registration/', ApiRegistration.as_view()),
    #path('api/', include(routerUser.urls)),
    path('api/profile/', UserViewSet.as_view({'get': 'list',
                                              'put': 'update',
                                              'delete': 'destroy'})),
    path('api/change_password/', ChangePasswordView.as_view(), name='auth_change_password'),
    path('api/filmlist/', MovieViewList.as_view()),
    path('api/', include(routerMovie.urls))
]
