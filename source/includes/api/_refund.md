# Refund Payment

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_refund.md) to edit this section.**

## Request

```python
import requests

AMOUNT = '<AMOUNT>'
PAYMENT_REFERENCE = '<PAYMENT_REFERENCE>'
MERCHANT_NUMBER = '<MERCHANT_NUMBER>'
MERCHANT_TOKEN = '<MERCHANT_TOKEN>'
MERCHANT_SECRET = '<MERCHANT_SECRET>'

URL = 'https://api-beta.bambora.com/payments/{payment_reference}/refund/'

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

URL="https://api-beta.bambora.com/payments/${PAYMENT_REFERENCE}/refund/"
AUTHORIZATION="Authorization: Basic "$(echo -n ${MERCHANT_TOKEN}@${MERCHANT_NUMBER}:${MERCHANT_SECRET} | base64)

curl \
    --header "${AUTHORIZATION}" \
    --header "API-Version: 1" \
    --header "Content-Type: application/json" \
    --data '{"amount": 1000}' \
    "${URL}"
```

> The Python code example requires that the [requests library for Python](https://github.com/kennethreitz/requests/) is installed on the computer that is running the code.

The Refund operation will return the purchase amount, in part or in full, to the customer. A Refund can be done after the purchase amount has been collected from the customer's bank account. In other words, the payment in question needs to have the Captured status in order for a refund to be possible.

You will need the following data in order to make the request:

  * A merchant number.
  * A merchant token.
  * A merchant secret.
  * A payment reference.

You will get access to the merchant number, a merchant token and a
merchant secret after registering with Bambora. The payment reference
refers to the one that you are required set before making a
payment. The maximum length of the payment reference is 2,000
characters.

We have created code examples showing how to refund a payment - one written in python and the other written in bash using cURL. Please note that each placeholder needs to be replaced with real data.

**Please note:**
While it is possible to make a refund operation both through the API and through the web-based admin tool ([https://merchant.bambora.com/](https://merchant.bambora.com/)), we strongly recommend that you only use one of these tools. The reason is that if you refund a payment in the merchant backend, it currently won’t be reflected in the API backend which can result in incorrect answers from the API.

## Response

```Response: 
{
  "region": "string", 
  "state": 'Refunded', 
  "operations": [], 
  "amount": 1000, 
  "operationInProgress': False, 
  "currency": "string", 
  "payment": "string", 
  "refunds": [
    {
      "amount": 1000
    }
  ], 
  "merchant": "string", 
  "captures": [
    {
      "amount": 1000
    }
  ], 
  "comment": "string"
}
```

If you receive an HTTP status code of 200 (OK) you will also find the payment object, in JSON format, in the response body. Any errors or problems will represent themselves as a non-200 status code. You can see those in the [standard error codes](./api.html#errors).
