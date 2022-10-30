from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets, generics
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.users.serializers import MyUserPostSerializer, MyUserProfileSerializer, MovieSerializer, \
    ChangePasswordSerializer
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
