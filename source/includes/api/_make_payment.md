# Make Payment

Making a payment is the most common operation you will want to perform. This is also called card "*Authorization*", where you reserve the amount to charge a customer. You can do this with an encrypted card, or a tokenized card. Following an authorization you will want to [capture the payment](./api.html#capture-payment).

**Note**: When making a payment request, the amount should be expressed in cents (or equivalent). For example, to make a payment of 10 EUR you would write the amount as `amount=1000`, for 100 SEK you would write `amount=10000`, etc.

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_make_payment.md) to edit this section.**

## Request

There are two card formats that you can use to make a payment: tokenized cards, or encrypted cards.

### Tokenized Cards

```shell

```

### Encrypted Cards

```shell

```

## Response

If the payment was successful you will receive an HTTP status code of 201 (OK). Any errors or problems will represent themselves as a non-200 status code. Along with the [standard error codes](./api.html#errors), these are the specific responses for `POST /{payment}/*` that you may encounter:

Response Code | Meaning
---------- | -------
201 | OK -- Success! The amount specified has been approved.
402 | Cannot Authorize -- The card cannot authorize the amount provided. This payment is thus declined.
409 | Payment operation blocked -- Payment declined.
422 | Invalid payment state transition
