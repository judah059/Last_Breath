from django.contrib.auth.models import AbstractUser
from django.db import models

from users.managers import UserManager


class MyUser(AbstractUser):
    USER_ROLES = [
        ('MA', 'Main admin'),
        ('RG', 'Regular'),
        ('CA', 'Cinema admin')
    ]
    birth_date = models.DateField(
        null=True,
        blank=True,
    )
    role = models.CharField(
        max_length=2,
        choices=USER_ROLES,
        default='RE',
    )
    date_joined = models.DateTimeField(
        auto_now=True,
    )
    email = models.EmailField(
        db_index=True,
        unique=True,
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email


class SubscriptionTransactions(models.Model):
    payment = models.DateTimeField(null=False)
    user_id = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=False)
    subscription_type = models.ForeignKey('SubscriptionType', on_delete=models.CASCADE, null=False)


class Movie(models.Model):
    name = models.CharField(max_length=255, null=False)
    video = models.TextField(null=False)  # url
    premier = models.TextField()
    trailer = models.TextField(null=False)  # url
    release_date = models.DateField()
    length = models.IntegerField()
    cast = models.TextField()  # Я бы сделал отдельную таблицу под актёров
    ageLimit = models.TextField()  # или .IntegerField() Если будем сравнивать напрямую с User
    producer = models.TextField()  # тоже что и с актёрами
    language = models.TextField()
    country = models.TextField()

    def __str__(self):
        return self.name


class Comment(models.Model):
    text = models.TextField(null=False)
    userId = models.ForeignKey('MyUser', on_delete=models.PROTECT, null=False)
    movieId = models.ForeignKey('Movie', on_delete=models.CASCADE, null=False)


class Address(models.Model):
    city = models.TextField(null=False)
    street = models.TextField(null=False)
    number = models.IntegerField(null=False)


class Cinema(models.Model):
    name = models.TextField(null=False)
    location = models.ForeignKey('Address', on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.name


class CinemaHall(models.Model):
    number = models.IntegerField()
    seats = models.IntegerField(null=False)
    cinema = models.ForeignKey('Cinema', on_delete=models.CASCADE, null=False)


class Ticket(models.Model):
    seat = models.TextField(null=False)
    date = models.DateTimeField()
    payment = models.DateTimeField(auto_now_add=True)
    isUsed = models.BooleanField()
    user = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=False)
    cinema = models.ForeignKey('Cinema', on_delete=models.PROTECT, null=False)
    show = models.ForeignKey('Show', on_delete=models.PROTECT, null=False)


class Show(models.Model):
    showTime = models.DateTimeField(null=False)
    length = models.IntegerField()
    price = models.IntegerField(null=False)
    cinemaHall = models.ForeignKey('CinemaHall', on_delete=models.CASCADE, null=False)
    Movie = models.ForeignKey('Movie', on_delete=models.CASCADE, null=False)


class SubscriptionType(models.Model):
    type = models.TextField(null=False)
    cost = models.IntegerField(null=False)
    days = models.IntegerField(null=False)
    quality = models.TextField()
    downloadSpeed = models.IntegerField()