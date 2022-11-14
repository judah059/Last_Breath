from django.contrib.auth.models import AbstractUser
from django.db import models

import users.managers as manager


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
    stripe_id = models.CharField(
        max_length=30
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = manager.UserManager()

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
    user = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=False, related_name='tickets')
    session = models.ForeignKey('Session', on_delete=models.CASCADE, null=False)
    session_seat = models.ForeignKey('SessionSeat', on_delete=models.CASCADE, null=False)
    total_price = models.IntegerField()
    is_payed = models.BooleanField(default=False)


class Snack(models.Model):
    cinema = models.ForeignKey('Cinema', on_delete=models.CASCADE)
    name = models.TextField()
    logo = models.TextField()  # url picture of Snack
    price = models.IntegerField()


class BoughtSnack(models.Model):
    snack = models.ForeignKey('Snack', on_delete=models.CASCADE)
    user = models.ForeignKey('MyUser', on_delete=models.CASCADE, related_name='snacks')
    amount = models.IntegerField()
    is_payed = models.BooleanField(default=False)
    total_price = models.IntegerField()

    def save(self, *args, **kwargs):
        if not self.total_price:
            self.total_price = self.snack.price * self.amount
        super().save(*args, **kwargs)


class Transaction(models.Model):
    basket = models.ForeignKey('Basket', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Basket(models.Model):
    user = models.OneToOneField('MyUser', on_delete=models.CASCADE, null=True, blank=True, related_name='basket')
    total_price = models.IntegerField(default=0)


class Payments(models.Model):
    user = models.ForeignKey(
        'MyUser',
        on_delete=models.SET_NULL,
        related_name='payments',
        null=True,
    )
    stripe_id = models.CharField(
        max_length=30,
        null=True,
    )
    date_created = models.DateField(
        auto_now_add=True,
    )
    card_type = models.CharField(
        max_length=31,
        default='Visa',
    )
    last_4 = models.CharField(
        max_length=10,
        default='0000',
    )
    expire_date = models.DateField(
        null=True,
        blank=True,
    )
    fingerprint = models.CharField(
        max_length=30,
        null=True,
        blank=True,
    )

    objects = models.Manager()
    payment_objects = manager.PaymentsManager()
