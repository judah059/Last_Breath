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


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = "__all__"


class CinemaHallSerializer(serializers.ModelSerializer):
    cinema_name = serializers.CharField(read_only=True, source="cinema.name")

    class Meta:
        model = CinemaHall
        fields = ["id", "number", "cinema", "cinema_name"]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class CinemaSerializer(serializers.ModelSerializer):
    cinemahall = CinemaHallSerializer(many=True, read_only=True, source="halls")
    location_details = AddressSerializer(read_only=True, source="location")

    class Meta:
        model = Cinema
        fields = ["id", "name", "location", "location_details", "cinemahall"]


class SessionSeatSerializer(serializers.ModelSerializer):
    seat_id = serializers.IntegerField(read_only=True, source='seat.id')
    seat_number = serializers.IntegerField(read_only=True, source='seat.number')
    seat_row = serializers.IntegerField(read_only=True, source='seat.row')
    seat_additional_price = serializers.IntegerField(read_only=True, source='seat.additional_price')

    class Meta:
        model = SessionSeat
        fields = ["seat_id", "seat_number", "seat_row", "seat_additional_price", "is_free"]


class SessionSerializer(serializers.ModelSerializer):
    cinemahall_detail = CinemaHallSerializer(read_only=True, source="cinemahall")
    movie_name = serializers.CharField(read_only=True, source="movie.name")
    movie_poster = serializers.CharField(read_only=True, source="movie.poster")
    seats = SessionSeatSerializer(many=True, read_only=True, source="sessionseat_set")

    class Meta:
        model = Session
        fields = ["id", "date", "start_time", "end_time", "base_price", "movie", "movie_name", "movie_poster",
                  "cinemahall", "cinemahall_detail", "seats"]

    def create(self, validated_data):
        session_instance = Session(
            date=validated_data['date'],
            start_time=validated_data['start_time'],
            end_time=validated_data['end_time'],
            base_price=validated_data['base_price'],
            movie=validated_data['movie'],
            cinemahall=validated_data['cinemahall']
        )
        session_instance.save()

        seats = Seat.objects.filter(hall=validated_data['cinemahall'])
        for seat in seats:
            session_seat_instance = SessionSeat(
                seat=seat,
                session=session_instance
            )
            session_seat_instance.save()

        return session_instance


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        # fields = ["user", "session_seat", "session"]
        fields = ["session_seat", "session"]

    def create(self, validated_data):
        if not validated_data['session_seat'].is_free:
            raise serializers.ValidationError({"error": "This seat is already taken"})
        if validated_data['session_seat'].session != validated_data['session']:
            raise serializers.ValidationError({"error": "This seat is not belong to this session"})

        ticket_instance = Ticket()
        full_price = validated_data['session_seat'].seat.additional_price + validated_data['session'].base_price

        # ticket_instance.user = validated_data['user']
        ticket_instance.user = self.context['request'].user
        ticket_instance.session_seat = validated_data['session_seat']
        ticket_instance.session = validated_data['session']
        ticket_instance.total_price = full_price

        SessionSeat.objects.filter(id=validated_data['session_seat'].id).update(is_free=False)
        ticket_instance.save()

        return ticket_instance


class DevSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        date = self.context['request'].query_params.get('date')
        if date:
            if response["date"] == self.context['request'].query_params.get('date'):
                return response
            else:
                return '卐 1488'
        return response


class DevCinemaHallSerializer(serializers.ModelSerializer):
    sessions = DevSessionSerializer(many=True, read_only=True)

    class Meta:
        model = CinemaHall
        fields = ["id", "number", "sessions"]


class DevCinemaSerializer(serializers.ModelSerializer):
    halls = DevCinemaHallSerializer(many=True, read_only=True)

    class Meta:
        model = Cinema
        fields = ["id", "halls"]


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


class BoughtSnackSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoughtSnack
        fields = "__all__"


class SnackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snack
        fields = "__all__"
