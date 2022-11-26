from django.shortcuts import render
from rest_framework import viewsets, generics

from onlineWatch.models import *
from onlineWatch.serializers import *


class DevGenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class DevFilmViewSet(viewsets.ModelViewSet):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer


class DevSerialViewSet(viewsets.ModelViewSet):
    queryset = Serial.objects.all()
    serializer_class = SerialSerializer


class DevSeasonViewSet(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer


class DevSeriesViewSet(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer


class GetFilmPage(generics.RetrieveAPIView):
    queryset = Film.objects.all()
    serializer_class = GetFilmPageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(pk=self.kwargs['pk'])


class GetSerialPage(generics.RetrieveAPIView):
    queryset = Serial.objects.all()
    serializer_class = GetSerialPageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(pk=self.kwargs['pk'])


class MainPageView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GetAllRelatedToGenre
