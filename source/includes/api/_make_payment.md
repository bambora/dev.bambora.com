# Make Payment

Making a payment is the most common operation you will want to perform. This is also called card "*Authorization*", where you reserve the amount to charge a customer. You can do this with an encrypted card, or a tokenized card. Following an authorization you will want to [capture the payment](./api.html#capture-payment).

To tokenize a card you will want to use one of our client-side tools: [Android SDK](/android.html), [iOS SDK](/ios.html), or [Checkout](/online.html)

**Note**: When making a payment request, the amount should be expressed in cents (or equivalent). For example, to make a payment of 10 EUR you would write the amount as `amount=1000`, for 100 SEK you would write `amount=10000`, etc.

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_make_payment.md) to edit this section.**


## Request

There are two card formats that you can use to make a payment: tokenized cards, or encrypted cards.

### Tokenized Cards

```shell
CARD_TOKEN="<CARD_TOKEN>"
MERCHANT_NUMBER="<MERCHANT_NUMBER>"
PAYMENT_REFERENCE="<PAYMENT_REFERENCE>"
TOKEN="<TOKEN>"

URL="https://api.bambora.com/v1/merchants/${MERCHANT_NUMBER}/payments/${PAYMENT_REFERENCE}/card_token_authorization/"

curl \
    --request POST \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "API-Version: 1" \
    --header "Content-Type: application/json" \
    --data '{"currency": "EUR",
             "amount": 1000,
             "token": "'"${CARD_TOKEN}"'"}' \
    "${URL}"
```

```python
CARD_TOKEN = '<CARD_TOKEN>'
MERCHANT_NUMBER = '<MERCHANT_NUMBER>'
PAYMENT_REFERENCE = '<PAYMENT_REFERENCE>'

PAYLOAD = {
  "currency": 'EUR',
  "amount": 1000,
  "token": CARD_TOKEN
}

URL = 'https://api.bambora.com/v1/merchants/{merchant}/payments/{payment}/card_token_authorization/'

response = oauth_session.post(
    URL.format(merchant=MERCHANT_NUMBER, payment=PAYMENT_REFERENCE),
    headers={'API-Version': '1'},
    json=PAYLOAD
)
```
> The code examples require that you have already retrieved a JSON Web Token. Please see our
[Authentication examples](#authentication) for details. The Python code example requires the packages [OAuthLib](https://pypi.python.org/pypi/oauthlib) and [Requests-OAuthlib](https://pypi.python.org/pypi/requests-oauthlib).

A tokenized card is when you have already registered a card with us and you're just using the token you received back to pay with it.

You will need the following data in order to make the request:

* A valid JSON Web Token.
* Data about the payment including amount, currency and a credit card token.
* A payment reference.
* A merchant number.

You will get access to the merchant number as well as credentials for
requesting JSON Web Tokens after registering with Bambora.

The payment reference refers to the one that you are required to set before
making a payment. The maximum length of the payment reference is 2,000 characters.

We have created code examples showing how to make a payment using a card token - one written in python and the other written in bash using cURL. Please note that each placeholder needs to be replaced with real data.

### Response

```json
{
  "_locked_at": null,
  "_version": 0,
  "external_id": "string",
  "internal_id": "string",
  "merchant_id": "string",
  "operations": [
    {
      "amount": 1000,
      "code": "string",
      "comment": null,
      "currency": "EUR",
      "id": "string",
      "psp": "string",
      "psp_id": "string",
      "psp_reference": "string",
      "success": true,
      "timestamp": "string",
      "token": "string",
      "type": "Authorize token"
    }
  ],
  "schema": 0,
  "state": "Authorized"
}
```

If the payment operation was successful you will receive an HTTP status code of 201 (Created). Any errors or problems will represent themselves as non-200 status codes. You can see those in the [standard error codes](./errors).

### Encrypted Cards

```shell
MERCHANT_NUMBER="<MERCHANT_NUMBER>"
PAYMENT_REFERENCE="<PAYMENT_REFERENCE>"
TOKEN="<TOKEN>"

URL="https://api.bambora.com/v1/merchants/${MERCHANT_NUMBER}/payments/${PAYMENT_REFERENCE}/encrypted_card_authorization/"

curl \
    --request POST \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "API-Version: 1" \
    --header "Content-Type: application/json" \
    --data '{
              "currency": "EUR",
              "amount": 1000,
              "encryptedSessionKeys": [
                {
                  "fingerprint": "string",
                  "sessionKey": "string"
                }
              ],
              "encryptedCard":
                {
                  "cardNumber": "string",
                  "cvcCode": "string",
                  "expiryMonth": "string",
                  "expiryYear": "string"
                },
              "token": true
            }' \
    "${URL}"
```

```python
MERCHANT_NUMBER = '<MERCHANT_NUMBER>'
PAYMENT_REFERENCE = '<PAYMENT_REFERENCE>'

PAYLOAD = {
  "currency": "EUR",
  "amount": 1000,
  "encryptedSessionKeys": [
    {
      "fingerprint": "string",
      "sessionKey": "string"
    }
  ],
  "encryptedCard": {
    "cardNumber": "string",
    "cvcCode": "string",
    "expiryMonth": "string",
    "expiryYear": "string"
  },
  "token": True
}

URL = 'https://api.bambora.com/v1/merchants/{merchant}/payments/{payment}/encrypted_card_authorization/'

response = oauth_session.post(
    URL.format(merchant=MERCHANT_NUMBER, payment=PAYMENT_REFERENCE),
    headers={'API-Version': '1'},
    json=PAYLOAD
)
```

> The code examples require that you have already retrieved a JSON Web Token. Please see our
[Authentication examples](#authentication) for details. The Python code example requires the packages [OAuthLib](https://pypi.python.org/pypi/oauthlib) and [Requests-OAuthlib](https://pypi.python.org/pypi/requests-oauthlib).

*Please note:* The /encrypted_card_authorization/ endpoint is only intended for merchants that have a fully PCI compliant backend. If you fit that description, please contact us at native.support@bambora.com for more information.

An encrypted card will usually be used the first time you make a payment, sending the encrypted card information, in return you will receive a tokenized card.

You will need the following data in order to make the request:

* A valid JSON Web Token.
* A merchant number.
* A payment reference
* A payload consisting of data such as currency, amount and encrypted credit card data.

You will get access to the merchant number as well as credentials for
requesting JSON Web Tokens after registering with Bambora.

The payment reference refers to the one that you are required to set before
making a payment. The maximum length of the payment reference is 2,000 characters.

We have created code examples showing how to make a payment using encrypted card data - one written in python and the other written in bash using cURL. Please note that each placeholder needs to be replaced with real data.

## Response

```json
{
  "_locked_at": null,
  "_version": 0,
  "external_id": "string",
  "internal_id": "string",
  "merchant_id": "string",
  "operations": [
    {
      "amount": 1000,
      "card": {
        "cardNumber": "string",
        "cardType": "string",
        "expiryMonth": 0,
        "expiryYear": 0,
        "token": "string"
      },
      "code": "string",
      "comment": null,
      "currency": "EUR",
      "id": "string",
      "psp": "string",
      "psp_id": "string",
      "psp_reference": "string",
      "success": true,
      "timestamp": "string",
      "token": null,
      "tokenize": true,
      "type": "Authorize card"
    }
  ],
  "schema": 0,
  "state": "Authorized"
}
```

If the query was successful and you used the encrypted card method then you will receive a tokenized card in return (as seen in the example here, the "card" part) if you set `token` to `true` in the payload. If `token` was set to `false` you will only get the first part of the response (not the tokenized card).

If the payment operation was successful you will receive an HTTP status code of 201 (Created). Any errors or problems will represent themselves as non-200 status codes. You can see those in the [standard error codes](./errors).
