import stripe


class MakeCharge:
    def __init__(self, user, basket, payment):
        self.user = user
        self.basket = basket
        self.payment = payment

    def pay_basket(self):
        client = self.user
        customer_id = client.stripe_id
        stripe_id = self.payment.stripe_id
        amount_in_uah = self.basket.total_price * 100
        charge = stripe.Charge.create(
            amount=round(amount_in_uah),
            currency='uah',
            source=stripe_id,
            customer=customer_id
        )
        return charge
