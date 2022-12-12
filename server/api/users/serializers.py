from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from users.models import *


class MyUserPostSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = MyUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            birth_date=validated_data['birth_date'],
        )
        return user

    class Meta:
        model = MyUser
        fields = ('email',
                  'first_name',
                  'last_name',
                  'password',
                  'username',
                  'birth_date',
                  )


class MyUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "birth_date",
            "role",
            "email",
        )


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = MyUser
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance


class PaymentGetSerializer(ModelSerializer):
    user = MyUserProfileSerializer()

    class Meta:
        model = Payments
        fields = (
            'id',
            'user',
            'card_type',
            'last_4',
            'expire_date',
            'stripe_id',
        )


class PaymentPostSerializer(ModelSerializer):
    token = serializers.CharField(max_length=30, required=True)

    class Meta:
        model = Payments
        fields = (
            'token',
        )

    def create(self, validated_data):
        return Payments.save(self, validated_data=validated_data)
