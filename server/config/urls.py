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

routerSeat = routers.SimpleRouter()
routerSeat.register(r'seat', SeatViewSet, basename='seat')

routerCinema = routers.SimpleRouter()
routerCinema.register(r'cinema', CinemaViewSet, basename='cinema')

routerCinemaHall = routers.SimpleRouter()
routerCinemaHall.register(r'cinemahall', CinemaHallViewSet, basename='cinemahall')

routerAddress = routers.SimpleRouter()
routerAddress.register(r'address', AddressViewSet, basename='address')

routerSession = routers.SimpleRouter()
routerSession.register(r'session', SessionViewSet, basename='session')

routerTicket = routers.SimpleRouter()
routerTicket.register(r'ticket', TicketViewSet, basename='ticket')

routerPayment = routers.SimpleRouter()
routerPayment.register(r'payment', PaymentViewSet, basename='payment')

routerSnack = routers.SimpleRouter()
routerSnack.register(r'snack', SnackView, basename='snack')

routerBoughtSnack = routers.SimpleRouter()
routerBoughtSnack.register(r'bought_snack', BoughtSnackView, basename='bought_snack')

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
    path('api/', include(routerMovie.urls)),
    path('api/', include(routerSeat.urls)),
    path('api/', include(routerCinema.urls)),
    path('api/', include(routerAddress.urls)),
    path('api/', include(routerCinemaHall.urls)),
    path('api/', include(routerSession.urls)),
    #path('api/session/seat', SessionSeatViewSet.as_view({"get": "list"})),
    path('api/', include(routerTicket.urls)),
    path('api/filter/session/', SessionFilteredView.as_view()),
    path('api/', include(routerPayment.urls)),
    path('api/', include(routerSnack.urls)),
    path('api/filter/snack/<int:pk_cinema>/', SnackFilterView.as_view()),
    path('api/', include(routerBoughtSnack.urls)),
]
