from rest_framework import viewsets, generics

from api.onlineWatch.serializers import GenreSerializer, FilmSerializer, SerialSerializer, SeasonSerializer, \
    SeriesSerializer, GetFilmPageSerializer, GetSerialPageSerializer, GetAllRelatedToGenre, CommentFilmSerilaizer, \
    CommentSerialSerilaizer, SubscriptionSerializer, ClientSubscriptionPOSTSerializer, ClientSubscriptionGETSerializer
from onlineWatch.models import Genre, Film, Serial, Season, Series, CommentsFilm, CommentsSerial, Subscription, \
    ClientSubscription


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


class CommentFilmViewSet(viewsets.ModelViewSet):
    queryset = CommentsFilm.objects.all()
    serializer_class = CommentFilmSerilaizer


class CommentSerialViewSet(viewsets.ModelViewSet):
    queryset = CommentsSerial.objects.all()
    serializer_class = CommentSerialSerilaizer


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer


class ClientSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = ClientSubscription.objects.all()

    def get_serializer_class(self):
        if self.request.method != 'GET':
            return ClientSubscriptionPOSTSerializer
        else:
            return ClientSubscriptionGETSerializer

    def get_queryset(self):
        qs = super(ClientSubscriptionViewSet, self).get_queryset()
        user = self.request.user
        return qs.filter(client=user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(client=user)
