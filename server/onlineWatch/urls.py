from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from onlineWatch.views import *

routerGenre = routers.SimpleRouter()
routerGenre.register(r'genre', DevGenreViewSet, basename='genre')

routerFilm = routers.SimpleRouter()
routerFilm.register(r'film', DevFilmViewSet, basename='film')

routerSerial = routers.SimpleRouter()
routerSerial.register(r'serial', DevSerialViewSet, basename='serial')

routerSeason = routers.SimpleRouter()
routerSeason.register(r'season', DevSeasonViewSet, basename='season')

routerSeries = routers.SimpleRouter()
routerSeries.register(r'series', DevSeriesViewSet, basename='series')

routerSubscription = routers.SimpleRouter()
routerSubscription.register(r'subscription', SubscriptionViewSet, basename='subscription')

routerClientSub = routers.SimpleRouter()
routerClientSub.register(r'client-subscription', ClientSubscriptionViewSet, basename='client-subscription')

urlpatterns = [
    path('online/', include(routerGenre.urls)),
    path('online/', include(routerFilm.urls)),
    path('online/', include(routerSerial.urls)),
    path('online/', include(routerSeason.urls)),
    path('online/', include(routerSeries.urls)),
    path('online/watch/film/<int:pk>/', GetFilmPage.as_view()),
    path('online/watch/serial/<int:pk>/', GetSerialPage.as_view()),
    path('online/watch/', MainPageView.as_view()),
    path('online/', include(routerSubscription.urls)),
    path('online/', include(routerClientSub.urls)),

]
