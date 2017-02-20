# Get Payment

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_get_payment.md) to edit this section.**

## Request

```python
MERCHANT_NUMBER = '<MERCHANT_NUMBER>'
PAYMENT_REFERENCE = '<PAYMENT_REFERENCE>'

URL = 'https://api.bambora.com/v1/merchants/{merchant}/payments/{payment}/'

response = oauth_session.get(
    URL.format(merchant=MERCHANT_NUMBER, payment=PAYMENT_REFERENCE),
    headers={'API-Version': '1'}
)
```

```shell
MERCHANT_NUMBER="<MERCHANT_NUMBER>"
PAYMENT_REFERENCE="<PAYMENT_REFERENCE>"
TOKEN="<TOKEN>"

URL="https://api.bambora.com/v1/merchants/${MERCHANT_NUMBER}/payments/${PAYMENT_REFERENCE}/"

curl \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "API-Version: 1" \
    --header "Content-Type: application/json" \
    "${URL}"
```

> The code examples require that you have already retrieved a JSON Web Token. Please see our
[Authentication examples](#authentication) for details. The Python code example requires the packages [OAuthLib](https://pypi.python.org/pypi/oauthlib) and [Requests-OAuthlib](https://pypi.python.org/pypi/requests-oauthlib).

Once you have created a payment Authorization you can then get that payment to see its details. You can also run a `GET` after a payment has been captured.

You will need the following data in order to make the request:

* A valid JSON Web Token.
* A merchant number.
* A payment reference.

You will get access to the merchant number as well as credentials for
requesting JSON Web Tokens after registering with Bambora.

The payment reference refers to the one that you are required to set before
making a payment. The maximum length of the payment reference is 2,000 characters.

We have created code examples showing how to query a payment - one written in python and the other written in bash using cURL. Please note that each placeholder needs to be replaced with real data.

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
      "amount": 100,
      "code": "string",
      "comment": null,
      "currency": "SEK",
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

If you receive an HTTP status code of 200 (OK) you will also find the payment object, in JSON format, in the response body. Any errors or problems will represent themselves as non-200 status codes. You can see those in the [standard error codes](./api.html#errors).
