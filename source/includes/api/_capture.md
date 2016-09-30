# Capture Payment
When you charge a customer you have the option of reserving the amount of the purchase without actually deducting that amount from their credit card. In most cases this is the default setting when using the Bambora Native SDKs. When you want to deduct that amount from the customer's card, that is called a **Capture**. You can capture for the full amount or a smaller amount.

There is a time limit on how long you have hold the payment. Eventually the purchase will expire and you won't be able to capture it. This can depend on the card issuer and the acquiring bank. Usually you will have about 1 week to capture the payment. For specifics on this time frame, please [email](mailto:native.support@bambora.com) our support team.

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_capture.md) to edit this section.**

## Request

```python
import requests

AMOUNT = <AMOUNT>
PAYMENT_REFERENCE = '<PAYMENT_REFERENCE>'
MERCHANT_NUMBER = '<MERCHANT_NUMBER>'
MERCHANT_TOKEN = '<MERCHANT_TOKEN>'
MERCHANT_SECRET = '<MERCHANT_SECRET>'

URL = 'https://api-beta.bambora.com/payments/{payment_reference}/capture/'

response = requests.post(
    URL.format(payment_reference=PAYMENT_REFERENCE),
    auth=('{}@{}'.format(MERCHANT_TOKEN, MERCHANT_NUMBER), MERCHANT_SECRET),
    headers={'API-Version': '1'},
    json={'amount': AMOUNT}
)
```

```shell
PAYMENT_REFERENCE="<PAYMENT_REFERENCE>"
MERCHANT_NUMBER="<MERCHANT_NUMBER>"
MERCHANT_TOKEN="<MERCHANT_TOKEN>"
MERCHANT_SECRET="<MERCHANT_SECRET>"

URL="https://api-beta.bambora.com/payments/${PAYMENT_REFERENCE}/capture/"
AUTHORIZATION="Authorization: Basic "$(echo -n ${MERCHANT_TOKEN}@${MERCHANT_NUMBER}:${MERCHANT_SECRET} | base64)

curl \
    --header "${AUTHORIZATION}" \
    --header 'API-Version: 1' \
    --header 'Content-Type: application/json' \
    --data '{"amount": 1000}' \
    "${URL}"
```

> The Python code example requires that the [requests library for Python.com](https://github.com/kennethreitz/requests/) is installed on the computer that is running the code.

Our REST API contains a /capture/ endpoint that you can use in order to capture specific payments.

You will need the following data in order to make the request:

* The amount to be captured specified in cents (or equivalent).
* A payment reference.
* A merchant number.
* A merchant token.
* A merchant secret.

You will get access to the merchant number, a merchant token and a merchant secret after registering with Bambora.

The payment reference refers to the one that you are required set
before making a payment. In order to capture a payment, you need to
provide its unique payment reference. The maximum length of the
payment reference is 2,000 characters.

We have created code examples showing how to capture a payment - one written in python and the other written in bash using cURL. Please note that each placeholder needs to be replaced with real data.

**Please note:**
While it is possible to make a capture operation both through the API and through the web-based admin tool ([https://merchant.bambora.com/](https://merchant.bambora.com/)), we strongly recommend that you only use one of these tools. The reason is that if you capture a payment in the merchant backend, it currently won’t be reflected in the API backend which can result in incorrect answers from the API.

## Response

```Response
{
    "region": "string",
    "merchant": "string",
    "payment": "string",
    "state": "Captured",
    "currency": "EUR",
    "amount": 1000,
    "comment": "string",
    "captures": [{
        "capture": {
            "amount": 1000,
            "comment": "string"
        }
    }]
}
```

If the capture was successful you will receive an HTTP status code of 201 (Created). Any errors or problems will represent themselves as a non-200 status code. Along with the [standard error codes](./api.html#errors), these are the specific responses for `/capture` that you may encounter:
