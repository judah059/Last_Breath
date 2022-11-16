from django.db import transaction
from django.db.models.signals import post_save, post_delete
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
        print(user.snacks.all().filter(is_payed=False))
        print(user.snacks)
        if user.snacks.all().filter(is_payed=False):
            for item in user.snacks.all():
                if not item.is_payed:
                    item.is_payed = True
                    item.save()
        print(user.tickets.all())
        if user.tickets.all():
            for item in user.tickets.all():
                if not item.is_payed:
                    item.is_payed = True
                    item.save()
        basket.total_price = 0
        basket.save()


@receiver(post_save, sender=MyUser)
def get_snack_price(sender, instance=None, created=False, **kwargs):
    if created:
        Basket.objects.create(user=instance)


@receiver(post_delete, sender=Ticket)
def del_ticket(sender, instance=None, created=False, **kwargs):
    basket = instance.user.basket
    price = instance.total_price
    if not instance.is_payed:
        basket.total_price -= price
    session_seat = instance.session_seat
    session_seat.is_free = True
    session_seat.save()
    basket.save()


@receiver(post_delete, sender=BoughtSnack)
def get_snack_price(sender, instance=None, created=False, **kwargs):
    basket = instance.user.basket
    price = instance.total_price
    if not instance.is_payed:
        basket.total_price -= price
    basket.save()
