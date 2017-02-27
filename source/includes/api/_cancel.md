# Cancel Payment

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_cancel.md) to edit this section.**

## Request

```python
MERCHANT_NUMBER = '<MERCHANT_NUMBER>'
PAYMENT_REFERENCE = '<PAYMENT_REFERENCE>'

URL = 'https://api.bambora.com/v1/merchants/{merchant}/payments/{payment}/cancel/'

response = oauth_session.post(
    URL.format(merchant=MERCHANT_NUMBER, payment=PAYMENT_REFERENCE),
    headers={'API-Version': '1'}
)
```

```shell
MERCHANT_NUMBER="<MERCHANT_NUMBER>"
PAYMENT_REFERENCE="<PAYMENT_REFERENCE>"
TOKEN="<TOKEN>"

URL="https://api.bambora.com/v1/merchants/${MERCHANT_NUMBER}/payments/${PAYMENT_REFERENCE}/cancel/"

curl \
    --request POST \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "API-Version: 1" \
    "${URL}"
```

> The code examples require that you have already retrieved a JSON Web Token. Please see our
[Authentication examples](#authentication) for details. The Python code example requires the packages [OAuthLib](https://pypi.python.org/pypi/oauthlib) and [Requests-OAuthlib](https://pypi.python.org/pypi/requests-oauthlib).

The Cancel operation interrupts a transaction before the purchase amount has been collected from the customer's bank account. In other words, cancelling a payment means that the reserved purchase amount is made available to the customer again.

The cancel operation can only be used on payments that have the Authorized status.

You will need the following data in order to make the request:

* A valid JSON Web Token.
* A merchant number.
* A payment reference.

You will get access to the merchant number as well as credentials for
requesting JSON Web Tokens after registering with Bambora.

The payment reference refers to the one that you are required to set before
making a payment. The maximum length of the payment reference is 2,000 characters.

We have created code examples showing how to cancel a payment - one written in python and the other written in bash using cURL. Please note that each placeholder needs to be replaced with real data.

**Please note:**
While it is possible to make a cancel operation both through the API and through the web-based admin tool ([https://merchant.bambora.com/](https://merchant.bambora.com/)), we strongly recommend that you only use one of these tools. The reason is that if you cancel a payment in the merchant backend, it currently won’t be reflected in the API backend which can result in incorrect answers from the API.

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
      "currency": "string",
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
      "code": "string",
      "comment": null,
      "id": "string",
      "references": "string",
      "success": true,
      "timestamp": "string",
      "type": "Cancel"
    }
  ],
  "schema": 0,
  "state": "Canceled"
}
```

If you receive an HTTP status code of 201 (Created) you will also find the payment object, in JSON format, in the response body. Any errors or problems will represent themselves as non-200 status codes. You can see those in the [standard error codes](./api.html#errors).
