# Make Payment

Making a payment is the most common operation you will want to perform. This is also called card "*Authorization*", where you reserve the amount to charge a customer. You can do this with an encrypted card, or a tokenized card. Following an authorization you will want to [capture the payment](./api.html#capture-payment).

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_make_payment.md) to edit this section.**


## Request

There are two card formats that you can use to make a payment: tokenized cards, or encrypted cards.

### Tokenized Cards
```shell
PAYMENT_REFERENCE='<PAYMENT_REFERENCE>'
MERCHANT_NUMBER='<MERCHANT_NUMBER>'
MERCHANT_TOKEN='<MERCHANT_TOKEN>'
MERCHANT_SECRET='<MERCHANT_SECRET>'
CAPTURE_URL='https://api-beta.bambora.com/payments/'$PAYMENT_REFERENCE'/card_token_authorization/'
​
AUTH='Authorization: Basic '$(echo -n $MERCHANT_TOKEN@$MERCHANT_NUMBER:$MERCHANT_SECRET | base64)
​
curl \
    --header "$AUTH" \
    --header 'API-Version: 1' \
    --header 'Content-Type: application/json' \
    --data '{"currency": "EUR","amount": 0,"token": "string","comment": "string", "merchant": "string"}' \
    $CAPTURE_URL
```
```python
import requests
​
MERCHANT_ACCOUNT = '<MERCHANT_NUMBER>'
MERCHANT_TOKEN = '<MERCHANT_TOKEN>'
MERCHANT_SECRET = '<MERCHANT_SECRET>'
CAPTURE_URL = 'https://api-beta.bambora.com/payments/{payment_reference}/card_token_authorization/'
​
payload= {
  "currency": "EUR",
  "amount": 0,
  "token": "string",
  "comment": "string",
  "merchant": "string"
}

response = requests.post(
    CAPTURE_URL.format(payment_reference='<PAYMENT_REFERENCE>'),
    auth=('{}@{}'.format(MERCHANT_TOKEN, MERCHANT_NUMBER), MERCHANT_SECRET),
    headers={'API-Version': '1'},
    json=payload
)
```
A tokenized card is when you have already registered a card with us and you're just using the token you received back to pay with it

You will need the following data in order to make the request:

  * A merchant number.
  * A merchant token.
  * A merchant secret.
  * A payment reference (the reference that you set in the SDK before the payment in question was made)

The payment reference refers to the one that you are required set in the SDK before making a payment. In order to capture a payment, you need to provide its unique payment reference.

We have created code examples showing how to query a payment - one written in python and the other written in bash using CUrl. Please note that each placeholder needs to be replaced with real data.

### Encrypted Cards
```shell
PAYMENT_REFERENCE='<PAYMENT_REFERENCE>'
MERCHANT_NUMBER='<MERCHANT_NUMBER>'
MERCHANT_TOKEN='<MERCHANT_TOKEN>'
MERCHANT_SECRET='<MERCHANT_SECRET>'
CAPTURE_URL='https://api-beta.bambora.com/payments/'$PAYMENT_REFERENCE'/encrypted_card_authorization'
​
AUTH='Authorization: Basic '$(echo -n $MERCHANT_TOKEN@$MERCHANT_NUMBER:$MERCHANT_SECRET | base64)
​
curl \
    --header "$AUTH" \
    --header 'API-Version: 1' \
    --header 'Content-Type: application/json' \
    --data '{"currency": "EUR","amount": 0,"comment": "string","merchant": "string","encryptedSessionKeys": [{"fingerprint": "string","sessionKey": "string"}],"encryptedCard": {"cardNumber": "string","cvcCode": "string","expiryMonth": "string","expiryYear": "string"},"token": true}' \
    $CAPTURE_URL
```
```python
import requests
​
MERCHANT_ACCOUNT = '<MERCHANT_NUMBER>'
MERCHANT_TOKEN = '<MERCHANT_TOKEN>'
MERCHANT_SECRET = '<MERCHANT_SECRET>'
CAPTURE_URL = 'https://api-beta.bambora.com/payments/{payment_reference}/encrypted_card_authorization/'
​
payload= {
  "currency": "EUR",
  "amount": 0,
  "comment": "string",
  "merchant": "string",
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
  "token": true
}

response = requests.post(
    CAPTURE_URL.format(payment_reference='<PAYMENT_REFERENCE>'),
    auth=('{}@{}'.format(MERCHANT_TOKEN, MERCHANT_NUMBER), MERCHANT_SECRET),
    headers={'API-Version': '1'},
    json=payload
)
```
An encrypted card will usually be used the first time you make a payment, sending the encrypted card information, in return you will receive a tokenized card.

You will need the following data in order to make the request:

  * A merchant number.
  * A merchant token.
  * A merchant secret.
  * A payment reference (the reference that you set in the SDK before the payment in question was made)

The payment reference refers to the one that you are required set in the SDK before making a payment. In order to capture a payment, you need to provide its unique payment reference.

We have created code examples showing how to query a payment - one written in python and the other written in bash using CUrl. Please note that each placeholder needs to be replaced with real data.

## Response

```Response
{
  "region": "emea_0",
  "merchant": "string",
  "payment": "string",
  "state": "None",
  "currency": "EUR",
  "amount": 0,
  "comment": "string",
  "captures": [
    {
      "amount": 1000,
      "comment": "10 EUR capture"
    }
  ],
  "card": {
    "token": "string",
    "cardNumber": "string",
    "cardType": "VISA",
    "expiryMonth": 0,
    "expiryYear": 0
  }
}
```
If the query was successful and you used the encrypted card method then you will receive a tokenized card in return as well (as seen in the example here, the "card" part).

Otherwise you will only get the first part of the response (not the tokenized card).

If the query was successful you will receive an HTTP status code of 200 (OK). Any errors or problems will represent themselves as a non-200 status code. Check the [standard error codes](./api.html#errors) if you get something other than 200. See the response example provided as well.
