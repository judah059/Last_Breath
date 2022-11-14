from datetime import datetime

from django.contrib.auth.base_user import BaseUserManager

import stripe
from django.db import models
from rest_framework.exceptions import ValidationError

import users.models as p


class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None, first_name="", last_name="", birth_date=None):
        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username,
                          email=self.normalize_email(email),
                          first_name=first_name,
                          last_name=last_name,
                          birth_date=birth_date)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        if username is None:
            pass
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class PaymentsManager(models.Manager):

    def get_queryset(self, *args, **kwargs):
        user = kwargs.get('user')
        return super().get_queryset().filter(user=user)

    def create_payment(self, *args, **kwargs):
        token = kwargs.pop('token')
        user = kwargs.pop('user')
        try:
            customer = stripe.Customer.retrieve(user.stripe_id)
        except Exception as e:
            customer = stripe.Customer.create(email=user.email)
        user.stripe_id = customer.id
        user.save()
        try:
            stripe_token = stripe.Token.retrieve(token)
        except Exception:
            raise ValidationError({'detail': 'Invalid token'})
        payment = p.Payments.objects.filter(stripe_id=stripe_token['card']['id'], user=user)
        if not payment:
            card = stripe.Customer.create_source(
                user.stripe_id,
                source=token,
            )
            exp_date = str(card['exp_month']) + '/' + str(card['exp_year'])
            instance = self.create(user=user, stripe_id=card['id'], card_type=card['brand'],
                                   last_4=card['last4'], expire_date=datetime.strptime(exp_date, '%m/%Y'),
                                   fingerprint=card['fingerprint'])
        else:
            payment = p.Payments.objects.get(stripe_id=stripe_token['card']['id'], user=user)
            instance = self.update(user=user, stripe_id=payment['stripe_id'], card_type=payment['card_type'],
                                   last_4=payment['last_4'], expire_date=payment['expire_date'],
                                   fingerprint=payment['fingerprint'])
        return instance
