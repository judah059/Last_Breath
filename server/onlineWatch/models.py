from django.db import models
from users.models import *


class Genre(models.Model):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class Film(models.Model):
    name = models.CharField(max_length=255, null=False)
    video = models.TextField(null=False)  # url
    poster = models.TextField(default='', null=False)  # url
    trailer = models.TextField(null=False)  # url
    premier = models.TextField()
    release_date = models.DateField()
    length = models.IntegerField()
    cast = models.TextField()
    ageLimit = models.TextField()
    producer = models.TextField()
    language = models.TextField()
    country = models.TextField()
    main_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=False, related_name="film_main_genre")
    genre_list = models.ManyToManyField(Genre, related_name="film_genre_list")

    def __str__(self):
        return self.name


class Serial(models.Model):
    name = models.CharField(max_length=255, null=False)
    poster = models.TextField(default='', null=False)  # url
    trailer = models.TextField(null=False)  # url
    premier = models.TextField()
    release_date = models.DateField()
    length = models.IntegerField()  # TODO: IntegerField -> TextField
    cast = models.TextField()  # Я бы сделал отдельную таблицу под актёров
    ageLimit = models.TextField()  # или .IntegerField() Если будем сравнивать напрямую с User
    producer = models.TextField()  # тоже что и с актёрами
    language = models.TextField()
    country = models.TextField()
    main_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=False, related_name="serial_main_genre")
    genre_list = models.ManyToManyField(Genre, related_name="serial_genre_list")

    def __str__(self):
        return self.name


class Season(models.Model):
    number = models.IntegerField()
    serial = models.ForeignKey('Serial', on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"{self.serial.name} Season #{self.number}"


class Series(models.Model):
    number = models.IntegerField()
    video = models.TextField(null=False)  # url
    season = models.ForeignKey('Season', on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"{self.season.serial.name} Season #{self.season.number} Series #{self.number}"


class Subscription(models.Model):
    SUBSCRIPTION_TYPES = [
        ('ST', 'Standard'),
        ('PR', 'Premium'),
    ]
    sub_type = models.CharField(
        choices=SUBSCRIPTION_TYPES,
        max_length=2,
        default='ST',
    )
    price = models.IntegerField()
    quality = models.CharField(
        max_length=120,
    )
    download_speed = models.CharField(
        max_length=120,
    )
    days = models.IntegerField(
        default=30,
    )

    def __str__(self):
        return self.sub_type


class ClientSubscription(models.Model):
    client = models.ForeignKey(
        MyUser,
        on_delete=models.CASCADE,
        related_name='subscriptions',
    )
    subscription = models.ForeignKey(
        'Subscription',
        on_delete=models.CASCADE,
        related_name='clients',
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    days_to_update = models.IntegerField(
        default=30,
    )
    is_active = models.BooleanField(
        default=True,
    )

