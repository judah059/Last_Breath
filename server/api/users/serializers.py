import datetime
import math

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
        fields = ("username",
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


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = "__all__"


class CinemaHallSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True, source="seat_set")

    class Meta:
        model = CinemaHall
        fields = ["id", "number", "cinema", "seats"]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class CinemaSerializer(serializers.ModelSerializer):
    cinemahall = CinemaHallSerializer(many=True, read_only=True, source="cinemahall_set")
    location_details = AddressSerializer(many=True, read_only=True, source="address_set")

    class Meta:
        model = Cinema
        fields = ["id", "name", "location", "location_details", "cinemahall"]


class SessionSerializer(serializers.ModelSerializer):
    cinemahall_detail = CinemaHallSerializer(read_only=True, source="cinemahall")
    movie_name = serializers.CharField(read_only=True, source="movie.name")
    movie_poster = serializers.CharField(read_only=True, source="movie.poster")
    class Meta:
        model = Session
        fields = ["id", "date", "start_time", "end_time", "movie", "movie_name", "movie_poster", "cinemahall", "cinemahall_detail"]
