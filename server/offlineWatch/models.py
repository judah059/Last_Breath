from django.db import models

from users.models import MyUser


class Movie(models.Model):
    name = models.CharField(max_length=255, null=False)
    video = models.TextField(null=False)  # url
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

    def __str__(self):
        return self.name


class Comment(models.Model):
    text = models.TextField(null=False)
    userId = models.ForeignKey(MyUser, on_delete=models.PROTECT, null=False)
    movieId = models.ForeignKey(Movie, on_delete=models.CASCADE, null=False)


class Address(models.Model):
    city = models.TextField(null=False)
    street = models.TextField(null=False)
    number = models.IntegerField(null=False)

    def __str__(self):
        return f'st. {self.street} {self.number} c. {self.city}'


class Cinema(models.Model):
    name = models.TextField(null=False)
    location = models.ForeignKey(Address, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.name


class CinemaHall(models.Model):
    number = models.IntegerField()
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE, null=False, related_name="halls")

    def __str__(self):
        return f'{self.cinema.name} hall #{self.number}'


class Show(models.Model):
    showTime = models.DateTimeField(null=False)
    length = models.IntegerField()
    price = models.IntegerField(null=False)
    cinemaHall = models.ForeignKey(CinemaHall, on_delete=models.CASCADE, null=False)
    Movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=False)


class Row(models.Model):
    row_number = models.IntegerField(null=False)

    hall = models.ForeignKey(CinemaHall, on_delete=models.CASCADE, null=False, related_name='hall_row')

    def __str__(self):
        return f'Row #{self.row_number} in {self.hall}'


class Seat(models.Model):
    number = models.IntegerField(null=False)
    row = models.ForeignKey('Row', on_delete=models.CASCADE, null=False, related_name='row_seat')
    additional_price = models.IntegerField(null=False)


class Session(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=False)
    cinemahall = models.ForeignKey(CinemaHall, on_delete=models.CASCADE, null=False, related_name="sessions")
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    base_price = models.IntegerField()

    def __str__(self):
        return f'{self.movie.__str__()} in {self.cinemahall.__str__()}'


class SessionRow(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE, null=False)
    row = models.ForeignKey(Row, on_delete=models.CASCADE, null=False)


class SessionSeat(models.Model):
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE, null=False)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, null=False)
    row = models.ForeignKey(SessionRow, on_delete=models.CASCADE, null=False, related_name="sessionseat_row")
    is_free = models.BooleanField(default=True)

    def __str__(self):
        return f'Row: {self.row.row.row_number} Number: {self.seat.number}'


class Ticket(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, null=False, related_name='tickets')
    session = models.ForeignKey(Session, on_delete=models.CASCADE, null=False)
    session_seat = models.ForeignKey(SessionSeat, on_delete=models.CASCADE, null=False)
    total_price = models.IntegerField()
    is_payed = models.BooleanField(default=False)


class Snack(models.Model):
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE)
    name = models.TextField()
    logo = models.TextField()  # url picture of Snack
    price = models.IntegerField()


class BoughtSnack(models.Model):
    snack = models.ForeignKey(Snack, on_delete=models.CASCADE)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='snacks')
    amount = models.IntegerField()
    is_payed = models.BooleanField(default=False)
    total_price = models.IntegerField()

    def save(self, *args, **kwargs):
        if not self.total_price:
            self.total_price = self.snack.price * self.amount
        super().save(*args, **kwargs)


class Basket(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, null=True, blank=True, related_name='basket')
    total_price = models.IntegerField(default=0)


class Transaction(models.Model):
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
