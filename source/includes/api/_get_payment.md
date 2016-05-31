# Get Payment

Once you have created a payment Authorization you can then get that payment to see its details. You can also run a `GET` after a payment has been captured.

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_get_payment.md) to edit this section.**

## Request

```python
import requests
​
MERCHANT_ACCOUNT = '<MERCHANT_NUMBER>'
MERCHANT_TOKEN = '<MERCHANT_TOKEN>'
MERCHANT_SECRET = '<MERCHANT_SECRET>'
CAPTURE_URL = 'https://api-beta.bambora.com/payments/{payment_reference}/'
​
response = requests.post(
    CAPTURE_URL.format(payment_reference='<PAYMENT_REFERENCE>'),
    auth=('{}@{}'.format(MERCHANT_TOKEN, MERCHANT_NUMBER), MERCHANT_SECRET),
    headers={'API-Version': '1'}
)
```

```shell
PAYMENT_REFERENCE='<PAYMENT_REFERENCE>'
MERCHANT_NUMBER='<MERCHANT_NUMBER>'
MERCHANT_TOKEN='<MERCHANT_TOKEN>'
MERCHANT_SECRET='<MERCHANT_SECRET>'
CAPTURE_URL='https://api-beta.bambora.com/payments/'$PAYMENT_REFERENCE'/'
​
AUTH='Authorization: Basic '$(echo -n $MERCHANT_TOKEN@$MERCHANT_NUMBER:$MERCHANT_SECRET | base64)
​
curl \
    --header "$AUTH" \
    --header 'API-Version: 1' \
    --header 'Content-Type: application/json' \
    $CAPTURE_URL
```


> The Python code example requires that the [requests library for Python.com](https://github.com/kennethreitz/requests/) is installed on the computer that is running the code.

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
  ]
}
```

If receive an HTTP status code of 200 (OK) you will also find the payment object, in JSON format, in the response body. Any errors or problems will represent themselves as a non-200 status code. Along with the [standard error codes](./api.html#errors), these are the specific responses for `GET /{payment}/` that you may encounter:
