from rest_framework import permissions, viewsets, generics, status
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from api.offlineWatch.serializers import MovieSerializer, SeatSerializer, CinemaSerializer, AddressSerializer, \
    CinemaHallSerializer, SessionSerializer, SessionSeatSerializer, TicketSerializer, DevCinemaSerializer, \
    BoughtSnackSerializer, SnackSerializer, TransactionPOSTSerializer, TransactionGETSerializer, RowSerializer
from offlineWatch.models import Movie, Seat, Cinema, Address, CinemaHall, Session, SessionSeat, Ticket, BoughtSnack, \
    Snack, Transaction, Basket, Row
from users.helper import MakeCharge
from users.models import Payments


class MovieViewList(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer


class CinemaViewSet(viewsets.ModelViewSet):
    queryset = Cinema.objects.all()
    serializer_class = CinemaSerializer

    def get_queryset(self):
        qs = super(CinemaViewSet, self).get_queryset()
        print(self.request.query_params.get('city'))
        city = self.request.query_params.get('city')
        if city:
            return qs.filter(location__city=city)
        return qs.all()


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class CinemaHallViewSet(viewsets.ModelViewSet):
    queryset = CinemaHall.objects.all()
    serializer_class = CinemaHallSerializer


class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class SessionSeatViewSet(viewsets.ModelViewSet):
    queryset = SessionSeat.objects.all()
    serializer_class = SessionSeatSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permissions = [IsAuthenticated,]

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user=self.request.user.id)

    def get_object(self):
        try:
            pk = self.kwargs.get('pk')
            if pk:
                return Ticket.objects.get(pk=pk, user=self.request.user.id)
            return Ticket.objects.get(user=self.request.user.id)
        except Ticket.DoesNotExist as e:
            raise APIException({"error": e})


class SessionFilteredView(generics.ListAPIView):
    queryset = Cinema.objects.all()
    serializer_class = DevCinemaSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        cinema = self.request.query_params.get('cinema')
        if cinema:
            return qs.filter(id=cinema)
        return qs.all()


class BoughtSnackView(viewsets.ModelViewSet):
    queryset = BoughtSnack.objects.all()
    serializer_class = BoughtSnackSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user__id=self.request.user.id)


class SnackFilterView(generics.ListAPIView):
    queryset = Snack.objects.all()
    serializer_class = SnackSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(cinema=Cinema.objects.get(id=self.kwargs['pk_cinema']))


class SnackView(viewsets.ModelViewSet):
    queryset = Snack.objects.all()
    serializer_class = SnackSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()

    def create(self, request, *args, **kwargs):
        user = self.request.user
        basket = Basket.objects.get(user=user)
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        # breakpoint()
        payment_id = serializer.validated_data['payment']
        payment = Payments.objects.get(id=payment_id)
        MakeCharge(user=user, basket=basket, payment=payment).pay_basket()
        Transaction.objects.create(basket=basket)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.request.method != 'GET':
            return TransactionPOSTSerializer
        else:
            return TransactionGETSerializer

    def get_queryset(self):
        qs = super(TransactionViewSet, self).get_queryset()
        return qs.filter(basket__user=self.request.user.id)


class RowViewSet(viewsets.ModelViewSet):
    queryset = Row.objects.all()
    serializer_class = RowSerializer
