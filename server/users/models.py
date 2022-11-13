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
    poster = models.TextField(default='', null=False)  # url
    trailer = models.TextField(null=False)  # url
    premier = models.TextField()
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

    def __str__(self):
        return f'st. {self.street} {self.number} c. {self.city}'


class Cinema(models.Model):
    name = models.TextField(null=False)
    location = models.ForeignKey('Address', on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.name


class CinemaHall(models.Model):
    number = models.IntegerField()
    cinema = models.ForeignKey('Cinema', on_delete=models.CASCADE, null=False, related_name="halls")

    def __str__(self):
        return f'{self.cinema.name} hall #{self.number}'


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


class Seat(models.Model):
    number = models.IntegerField(null=False)
    row = models.IntegerField(null=False)
    additional_price = models.IntegerField(null=False)

    hall = models.ForeignKey('CinemaHall', on_delete=models.CASCADE, null=False)


class Session(models.Model):
    movie = models.ForeignKey('Movie', on_delete=models.CASCADE, null=False)
    cinemahall = models.ForeignKey('CinemaHall', on_delete=models.CASCADE, null=False, related_name="sessions")
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    base_price = models.IntegerField()

    def __str__(self):
        return f'{self.movie.__str__()} in {self.cinemahall.__str__()}'


class SessionSeat(models.Model):
    seat = models.ForeignKey('Seat', on_delete=models.CASCADE, null=False)
    session = models.ForeignKey('Session', on_delete=models.CASCADE, null=False)
    is_free = models.BooleanField(default=True)

    def __str__(self):
        return f'Row: {self.seat.row} Number: {self.seat.number}'


class Ticket(models.Model):
    user = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=False)
    session = models.ForeignKey('Session', on_delete=models.CASCADE, null=False)
    session_seat = models.ForeignKey('SessionSeat', on_delete=models.CASCADE, null=False)
    total_price = models.IntegerField()


# class Snack(models.Model):
#     name = models.CharField(null=False)
#     price = models.IntegerField()


