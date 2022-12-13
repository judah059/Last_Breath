from rest_framework import serializers

from offlineWatch.models import Movie, Seat, CinemaHall, Address, Cinema, SessionSeat, Row, SessionRow, Session, Ticket, \
    Snack, BoughtSnack, Transaction


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
    seat_additional_price = serializers.IntegerField(read_only=True, source='seat.additional_price')

    class Meta:
        model = SessionSeat
        fields = ["id", "seat_id", "seat_number", "seat_additional_price", "is_free"]


class RowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Row
        fields = "__all__"


class SessionRowSerializer(serializers.ModelSerializer):
    seats = SessionSeatSerializer(many=True, read_only=True, source="sessionseat_row")
    number = serializers.IntegerField(source='row.row_number')

    class Meta:
        model = SessionRow
        fields = ['id', 'number', 'seats']


class SessionSerializer(serializers.ModelSerializer):
    cinemahall_detail = CinemaHallSerializer(read_only=True, source="cinemahall")
    movie_name = serializers.CharField(read_only=True, source="movie.name")
    movie_poster = serializers.CharField(read_only=True, source="movie.poster")
    rows = SessionRowSerializer(many=True, read_only=True, source="sessionrow_set")

    class Meta:
        model = Session
        fields = ["id", "date", "start_time", "end_time", "base_price", "movie", "movie_name", "movie_poster",
                  "cinemahall", "cinemahall_detail", "rows"]

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

        seats = Seat.objects.filter(row__hall=validated_data['cinemahall'])
        rows = Row.objects.filter(hall=validated_data['cinemahall'])
        for row in rows:
            session_row_instance = SessionRow(
                row=row,
                session=session_instance
            )
            session_row_instance.save()

            for seat in seats:
                if seat.row == row:
                    session_seat_instance = SessionSeat(
                        seat=seat,
                        row=session_row_instance,
                        session=session_instance
                    )
                    session_seat_instance.save()
        return session_instance

    def update(self, instance, validated_data):
        instance.date = validated_data['date']
        instance.start_time = validated_data['start_time']
        instance.end_time = validated_data['end_time']
        instance.base_price = validated_data['base_price']
        instance.movie = validated_data['movie']
        instance.cinemahall = validated_data['cinemahall']
        SessionSeat.objects.filter(session=instance).delete()
        SessionRow.objects.filter(session=instance).delete()

        instance.save()

        seats = Seat.objects.filter(row__hall=validated_data['cinemahall'])
        rows = Row.objects.filter(hall=validated_data['cinemahall'])

        for row in rows:
            session_row_instance = SessionRow(
                row=row,
                session=instance
            )
            session_row_instance.save()

            for seat in seats:
                if seat.row == row:
                    session_seat_instance = SessionSeat(
                        seat=seat,
                        row=session_row_instance,
                        session=instance
                    )
                    session_seat_instance.save()

        return instance


class SessionWithoutSeatsSerializer(serializers.ModelSerializer):
    cinemahall_detail = CinemaHallSerializer(read_only=True, source="cinemahall")
    movie_name = serializers.CharField(read_only=True, source="movie.name")
    movie_poster = serializers.CharField(read_only=True, source="movie.poster")

    class Meta:
        model = Session
        fields = ["id", "date", "start_time", "end_time", "base_price", "movie", "movie_name", "movie_poster",
                  "cinemahall", "cinemahall_detail"]


class TicketSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    is_payed = serializers.BooleanField(read_only=True)
    total_price = serializers.IntegerField(read_only=True)
    seat_detail = SessionSeatSerializer(read_only=True, source="session_seat")
    session_detail = SessionWithoutSeatsSerializer(read_only=True, source="session")

    class Meta:
        model = Ticket
        fields = ["id", "total_price", "is_payed", "session", "session_seat", "seat_detail", "session_detail"]

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
                return None
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


class SnackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snack
        fields = "__all__"


class BoughtSnackSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    is_payed = serializers.BooleanField(read_only=True)
    total_price = serializers.IntegerField(read_only=True)
    snack_detail = SnackSerializer(read_only=True, source="snack")

    class Meta:
        model = BoughtSnack
        fields = ["id", "amount", "is_payed", "snack", "snack_detail","total_price",  "user"]


class TransactionPOSTSerializer(serializers.ModelSerializer):
    payment = serializers.IntegerField()

    class Meta:
        model = Transaction
        fields = (
            'payment',
        )


class TransactionGETSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = (
            'created_at',
        )