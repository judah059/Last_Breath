from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets, generics
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from api.users.permissions import IsUserProfileOwner
from api.users.serializers import MyUserPostSerializer, MyUserProfileSerializer

UserModel = get_user_model()


class ApiRegistration(CreateAPIView):
    model = UserModel
    permission_classes = [permissions.AllowAny]
    serializer_class = MyUserPostSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    permission_classes = (IsAuthenticated, IsUserProfileOwner,)
    serializer_class = MyUserProfileSerializer


class ChangePasswordView(generics.UpdateAPIView):
    queryset = UserModel.objects.all()
    permission_classes = (IsAuthenticated, IsUserProfileOwner,)
    serializer_class = MyUserProfileSerializer
