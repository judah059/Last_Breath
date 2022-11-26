from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

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


class GetFilmPageSerializer(ModelSerializer):
    main_genre = serializers.CharField(read_only=True, source='main_genre.name')
    genre_list = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = Film
        fields = ["id", "name", "video",
                  "poster", "trailer", "premier",
                  "release_date", "length", "cast",
                  "ageLimit", "producer", "language",
                  "country", "main_genre", "genre_list"]


class GetSerialPageSeriesSerializer(ModelSerializer):
    class Meta:
        model = Series
        fields = "__all__"


class GetSerialPageSeasonSerializer(ModelSerializer):
    series = GetSerialPageSeriesSerializer(many=True, read_only=True, source="series_set")

    class Meta:
        model = Series
        fields = ["number", "series"]


class GetSerialPageSerializer(ModelSerializer):
    main_genre = serializers.CharField(read_only=True, source='main_genre.name')
    genre_list = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    seasons = GetSerialPageSeasonSerializer(many=True, read_only=True, source="season_set")

    class Meta:
        model = Serial
        fields = ["id", "name", "poster",
                  "trailer", "premier", "release_date",
                  "length", "cast", "ageLimit", "producer",
                  "language", "country", "main_genre",
                  "genre_list", "seasons"]


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
