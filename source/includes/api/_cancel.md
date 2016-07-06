# Cancel Payment

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_cancel.md) to edit this section.**

## Request

```python
import requests

PAYMENT_REFERENCE = '<PAYMENT_REFERENCE>'
MERCHANT_NUMBER = '<MERCHANT_NUMBER>'
MERCHANT_TOKEN = '<MERCHANT_TOKEN>'
MERCHANT_SECRET = '<MERCHANT_SECRET>'

URL = 'https://api-beta.bambora.com/payments/{payment_reference}/cancel/'

response = requests.post(
    URL.format(payment_reference=PAYMENT_REFERENCE),
    auth=('{}@{}'.format(MERCHANT_TOKEN, MERCHANT_NUMBER), MERCHANT_SECRET),
    headers={'API-Version': '1'}
)
```

```shell
PAYMENT_REFERENCE="<PAYMENT_REFERENCE>"
MERCHANT_NUMBER="<MERCHANT_NUMBER>"
MERCHANT_TOKEN="<MERCHANT_TOKEN>"
MERCHANT_SECRET="<MERCHANT_SECRET>"

URL="https://api-beta.bambora.com/payments/${PAYMENT_REFERENCE}/cancel/"
AUTHORIZATION="Authorization: Basic "$(echo -n ${MERCHANT_TOKEN}@${MERCHANT_NUMBER}:${MERCHANT_SECRET} | base64)

curl \
    -X POST \
    --header "${AUTHORIZATION}" \
    --header "API-Version: 1" \
    --header "Content-Type: application/json" \
    "${URL}"
```

> The Python code example requires that the [requests library for Python](https://github.com/kennethreitz/requests/) is installed on the computer that is running the code.

The Cancel operation interrupts a transaction before the purchase amount has been collected from the customer's bank account. In other words, cancelling a payment means that the reserved purchase amount is made available to the customer again.

The cancel operation can only be used on payments that have the Authorized status.

You will need the following data in order to make the request:

  * A merchant number.
  * A merchant token.
  * A merchant secret.
  * A payment reference.

You will get access to the merchant number, a merchant token and a merchant secret after registering with Bambora. The payment reference refers to the one that you are required set before making a payment. 

We have created code examples showing how to cancel a payment - one written in python and the other written in bash using cURL. Please note that each placeholder needs to be replaced with real data.

**Please note:**
While it is possible to make a cancel operation both through the API and through the web-based admin tool ([https://merchant.bambora.com/](https://merchant.bambora.com/)), we strongly recommend that you only use one of these tools. The reason is that if you cancel a payment in the merchant backend, it currently won’t be reflected in the API backend which can result in incorrect answers from the API.

## Response

```Response: 
{
  "payment": "string", 
  "currency": "EUR", 
  "state": "Canceled", 
  "operations": [], 
  "region": "string", 
  "merchant": "string", 
  "comment": "string", 
  "captures": [], 
  "operationInProgress": False, 
  "refunds": [], 
  "amount": 100
}
```

If you receive an HTTP status code of 200 (OK) you will also find the payment object, in JSON format, in the response body. Any errors or problems will represent themselves as a non-200 status code. You can see those in the [standard error codes](./api.html#errors).
