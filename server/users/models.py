from django.contrib.auth.models import AbstractUser
from django.db import models

import users.managers as manager


class MyUser(AbstractUser):
    USER_ROLES = [
        ('MA', 'Main admin'),
        ('RG', 'Regular'),
        ('CA', 'Cinema admin'),
        ('RC', 'Recensor')
    ]
    birth_date = models.DateField(
        null=True,
        blank=True,
    )
    role = models.CharField(
        max_length=2,
        choices=USER_ROLES,
        default='RG',
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
    profile_picture = models.CharField(
        max_length=100 # url
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


class SubscriptionType(models.Model):
    type = models.TextField(null=False)
    cost = models.IntegerField(null=False)
    days = models.IntegerField(null=False)
    quality = models.TextField()
    downloadSpeed = models.IntegerField()


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
