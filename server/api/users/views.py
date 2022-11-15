import stripe
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets, generics, status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.users.serializers import *
from users.models import *

UserModel = get_user_model()
stripe.api_key = settings.STRIPE_SECRET_KEY


class ApiRegistration(CreateAPIView):
    model = UserModel
    permission_classes = [permissions.AllowAny]
    serializer_class = MyUserPostSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = MyUserProfileSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(id=self.request.user.id)

    def get_object(self):
        try:
            return UserModel.objects.get(pk=self.request.user.id)
        except UserModel.DoesNotExist:
            raise UserModel()


class ChangePasswordView(generics.UpdateAPIView):
    queryset = UserModel.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(id=self.request.user.id)

    def get_object(self):
        try:
            return UserModel.objects.get(pk=self.request.user.id)
        except UserModel.DoesNotExist:
            raise UserModel()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        result = {
            "password": "卐",
        }
        return Response(result)


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

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user=self.request.user.id)

    def get_object(self):
        try:
            return Ticket.objects.get(user=self.request.user.id)
        except Ticket.DoesNotExist:
            raise Ticket()


class SessionFilteredView(generics.ListAPIView):
    queryset = Cinema.objects.all()
    serializer_class = DevCinemaSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        cinema = self.request.query_params.get('cinema')
        if cinema:
            return qs.filter(id=cinema)
        return qs.all()


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payments.objects.all()

    def get_serializer_class(self):
        if self.request.method != 'GET':
            return PaymentPostSerializer
        else:
            return PaymentGetSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = MyUser.objects.get(pk=self.request.user.pk, email=self.request.user.email)
        token = serializer.validated_data['token']
        Payments.payment_objects.create_payment(user=user, token=token)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        user = MyUser.objects.get(pk=self.request.user.pk, email=self.request.user.email)
        return Payments.payment_objects.get_queryset(user=user)


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
