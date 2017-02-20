# Refund Payment

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_refund.md) to edit this section.**

## Request

```python
AMOUNT = <AMOUNT>
MERCHANT_NUMBER = '<MERCHANT_NUMBER>'
PAYMENT_REFERENCE = '<PAYMENT_REFERENCE>'

URL = 'https://api.bambora.com/v1/merchants/{merchant}/payments/{payment}/refund/'

response = oauth_session.post(
    URL.format(merchant=MERCHANT_NUMBER, payment=PAYMENT_REFERENCE),
    headers={'API-Version': '1'},
    json={'amount': AMOUNT,
          'currency': 'EUR'}
)
```

```shell
MERCHANT_NUMBER="<MERCHANT_NUMBER>"
PAYMENT_REFERENCE="<PAYMENT_REFERENCE>"
TOKEN="<TOKEN>"

URL="https://api.bambora.com/v1/merchants/${MERCHANT_NUMBER}/payments/${PAYMENT_REFERENCE}/refund/"

curl \
    --request POST \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "API-Version: 1" \
    --header "Content-Type: application/json" \
    --data '{"amount": 1000,
             "currency": "EUR"}' \
    "${URL}"
```

> The code examples require that you have already retrieved a JSON Web Token. Please see our
[Authentication examples](#authentication) for details. The Python code example requires the packages [OAuthLib](https://pypi.python.org/pypi/oauthlib) and [Requests-OAuthlib](https://pypi.python.org/pypi/requests-oauthlib).

The Refund operation will return the purchase amount, in part or in full, to the customer. A Refund can be done after the purchase amount has been collected from the customer's bank account. In other words, the payment in question needs to have the Captured status in order for a refund to be possible.

You will need the following data in order to make the request:

* A valid JSON Web Token.
* A merchant number.
* A payment reference.
* The amount to capture.
* The currency of the payment in question.

You will get access to the merchant number as well as credentials for
requesting JSON Web Tokens after registering with Bambora.

The payment reference refers to the one that you are required to set before
making a payment. The maximum length of the payment reference is 2,000 characters.

We have created code examples showing how to refund a payment - one written in python and the other written in bash using cURL. Please note that each placeholder needs to be replaced with real data.

**Please note:**
While it is possible to make a refund operation both through the API and through the web-based admin tool ([https://merchant.bambora.com/](https://merchant.bambora.com/)), we strongly recommend that you only use one of these tools. The reason is that if you refund a payment in the merchant backend, it currently won’t be reflected in the API backend which can result in incorrect answers from the API.

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
    },
    {
      "amount": 1000,
      "code": "string",
      "comment": null,
      "currency": "EUR",
      "id": "string",
      "references": "string",
      "success": true,
      "timestamp": "string",
      "type": "Capture"
    },
    {
      "amount": 1000,
      "code": "string",
      "comment": null,
      "currency": "EUR",
      "id": "string",
      "references": "string",
      "success": true,
      "timestamp": "string",
      "type": "Refund"
    }
  ],
  "schema": 0,
  "state": "Refunded"
}
```

If you receive an HTTP status code of 201 (Created) you will also find the payment object, in JSON format, in the response body. Any errors or problems will represent themselves as non-200 status codes. You can see those in the [standard error codes](./api.html#errors).
