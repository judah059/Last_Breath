from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.users.serializers import MyUserProfileSerializer
from users.models import *
from onlineWatch.models import *


class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


class FilmSerializer(ModelSerializer):
    class Meta:
        model = Film
        fields = "__all__"


class SerialSerializer(ModelSerializer):
    class Meta:
        model = Serial
        fields = "__all__"


class SeasonSerializer(ModelSerializer):
    class Meta:
        model = Season
        fields = "__all__"


class SeriesSerializer(ModelSerializer):
    class Meta:
        model = Series
        fields = "__all__"


class CommentFilmSerilaizer(ModelSerializer):
    author_name = serializers.CharField(read_only=True, source='user.username')
    author_picture = serializers.CharField(read_only=True, source='user.profile_picture')

    class Meta:
        model = CommentsFilm
        fields = ["id", "comment_type", "comment_text", "film", "author_name", "author_picture"]

    def create(self, validated_data):
        instance = CommentsFilm()
        if validated_data["comment_type"] == "R" and self.context["request"].user.role != "RC":
            raise serializers.ValidationError({"validation_error": "Something going wrong."})
        instance.comment_text = validated_data["comment_text"]
        instance.comment_type = validated_data["comment_type"]
        instance.film = validated_data["film"]
        instance.user = self.context["request"].user
        instance.save()
        return instance


class GetFilmPageSerializer(ModelSerializer):
    main_genre = serializers.CharField(read_only=True, source='main_genre.name')
    genre_list = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    comments = CommentFilmSerilaizer(many=True, read_only=True, source="film_comment")

    class Meta:
        model = Film
        fields = ["id", "name", "video",
                  "poster", "trailer", "premier",
                  "release_date", "length", "cast",
                  "ageLimit", "producer", "language",
                  "country", "main_genre", "genre_list",
                  "comments"]


class GetSerialPageSeriesSerializer(ModelSerializer):
    class Meta:
        model = Series
        fields = "__all__"


class GetSerialPageSeasonSerializer(ModelSerializer):
    series = GetSerialPageSeriesSerializer(many=True, read_only=True, source="series_set")

    class Meta:
        model = Series
        fields = ["number", "series"]


class CommentSerialSerilaizer(ModelSerializer):
    author_name = serializers.CharField(read_only=True, source='user.first_name')
    author_picture = serializers.CharField(read_only=True, source='user.profile_picture')

    class Meta:
        model = CommentsSerial
        fields = ["comment_type", "comment_text", "serial", "author_name", "author_picture"]

    def create(self, validated_data):
        instance = CommentsSerial()
        if validated_data["comment_type"] == "R" and self.context["request"].user.role != "RC":
            raise serializers.ValidationError({"validation_error": "Something going wrong."})
        instance.comment_text = validated_data["comment_text"]
        instance.comment_type = validated_data["comment_type"]
        instance.serial = validated_data["serial"]
        instance.user = self.context["request"].user
        instance.save()
        return instance


class GetSerialPageSerializer(ModelSerializer):
    main_genre = serializers.CharField(read_only=True, source='main_genre.name')
    genre_list = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    seasons = GetSerialPageSeasonSerializer(many=True, read_only=True, source="season_set")
    comments = CommentSerialSerilaizer(many=True, read_only=True, source="serial_comment")

    class Meta:
        model = Serial
        fields = ["id", "name", "poster",
                  "trailer", "premier", "release_date",
                  "length", "cast", "ageLimit", "producer",
                  "language", "country", "main_genre",
                  "genre_list", "seasons", "comments"]


class FilmRelatedToGenreSerializer(ModelSerializer):
    class Meta:
        model = Film
        fields = ["id", "name", "poster", "ageLimit"]


class SerialRelatedToGenreSerializer(ModelSerializer):
    class Meta:
        model = Serial
        fields = ["id", "name", "poster", "ageLimit"]


class GetAllRelatedToGenre(ModelSerializer):
    films = FilmRelatedToGenreSerializer(many=True, read_only=True, source="film_main_genre")
    serials = SerialRelatedToGenreSerializer(many=True, read_only=True, source="serial_main_genre")

    class Meta:
        model = Genre
        fields = ["name", "films", "serials"]


class SubscriptionSerializer(ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'


class ClientSubscriptionPOSTSerializer(ModelSerializer):

    class Meta:
        model = ClientSubscription
        fields = (
            'subscription',
        )


class ClientSubscriptionGETSerializer(ModelSerializer):
    client = MyUserProfileSerializer()
    subscription = SubscriptionSerializer()

    class Meta:
        model = ClientSubscription
        fields = '__all__'
