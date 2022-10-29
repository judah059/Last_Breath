from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets, generics
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from api.users.serializers import MyUserPostSerializer, MyUserProfileSerializer, MovieSerializer
from users.models import Movie

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


class MovieViewList(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
