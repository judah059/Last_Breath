from django.urls import path, include
from rest_framework import routers

from api.offlineWatch.views import MovieViewSet, SeatViewSet, CinemaViewSet, CinemaHallViewSet, AddressViewSet, \
    SessionViewSet, TicketViewSet, SnackView, BoughtSnackView, TransactionViewSet, RowViewSet, MovieViewList, \
    SessionFilteredView, SnackFilterView

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

routerSnack = routers.SimpleRouter()
routerSnack.register(r'snack', SnackView, basename='snack')

routerBoughtSnack = routers.SimpleRouter()
routerBoughtSnack.register(r'bought_snack', BoughtSnackView, basename='bought_snack')

routerTransaction = routers.SimpleRouter()
routerTransaction.register(r'transaction', TransactionViewSet, basename='transaction')

routerRow = routers.SimpleRouter()
routerRow.register(r'row', RowViewSet, basename='row')

urlpatterns = [
    path('offline/filmlist/', MovieViewList.as_view()),
    path('offline/', include(routerMovie.urls)),
    path('offline/', include(routerAddress.urls)),
    path('offline/', include(routerCinema.urls)),
    path('offline/', include(routerCinemaHall.urls)),
    path('offline/', include(routerRow.urls)),
    path('offline/', include(routerSeat.urls)),

    path('offline/', include(routerSession.urls)),
    path('offline/', include(routerTicket.urls)),
    path('offline/filter/session/', SessionFilteredView.as_view()),

    path('offline/', include(routerSnack.urls)),
    path('offline/filter/snack/<int:pk_cinema>/', SnackFilterView.as_view()),
    path('offline/', include(routerBoughtSnack.urls)),
    path('offline/', include(routerTransaction.urls)),
]
