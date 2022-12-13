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
            "password": "Password has been changed successfully",
        }
        return Response(result)


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
