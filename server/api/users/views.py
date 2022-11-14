from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets, generics
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.users.serializers import *
from users.models import *

UserModel = get_user_model()


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
            "password": "Password has been changed successfully.",
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
#         city = self.request.GET.get('city')
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
    queryset = CinemaHall.objects.all()
    serializer_class = CinemaSessionsSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        date = self.request.query_params.get('date')
        cinema = self.request.query_params.get('cinema')
        print(bool(date and cinema))
        print(bool(cinema))
        print(bool(date))
        if date and cinema:
            print("1")
            return qs.filter(sessions__date=date, cinema=cinema)
        if cinema:
            print("2")
            return qs.filter(cinema=cinema)
        if date:
            print("3")
            return qs.filter(sessions__date=date)

        return qs.all()