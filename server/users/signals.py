from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver

from users.models import Ticket, BoughtSnack, Transaction, MyUser, Basket


@receiver(post_save, sender=Ticket)
def get_ticket_price(sender, instance=None, created=False, **kwargs):
    if created:
        basket = instance.user.basket
        price = instance.total_price
        basket.total_price += price
        basket.save()


@receiver(post_save, sender=BoughtSnack)
def get_snack_price(sender, instance=None, created=False, **kwargs):
    if created:
        basket = instance.user.basket
        price = instance.total_price
        basket.total_price += price
        basket.save()


@receiver(post_save, sender=Transaction)
def transaction_post_save(sender, instance=None, created=False, **kwargs):
    if created:
        basket = instance.basket
        user = instance.basket.user
        for item in user.snacks:
            if not item.is_payed:
                item.is_payed = True
                item.save()
        for item in user.tickets:
            if not item.is_payed:
                item.is_payed = True
                item.save()
        basket.total_price = 0
        basket.save()


@receiver(post_save, sender=MyUser)
def get_snack_price(sender, instance=None, created=False, **kwargs):
    if created:
        Basket.objects.create(user=instance)
