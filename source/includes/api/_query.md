# Query Payment
Once a payment has been processed you can access the information concerning it. You'll get a JSON response containing the information.

If you have any questions, please [email](mailto:sdk@bambora.com) our support team.


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

You will need the following data in order to make the request:

  * A merchant number.
  * A merchant token.
  * A merchant secret.
  * A payment reference (the reference that you set in the SDK before the payment in question was made)

You will get access to the merchant number, a merchant token and a merchant secret after registering with Bambora.

The payment reference refers to the one that you are required set in the SDK before making a payment. In order to capture a payment, you need to provide its unique payment reference.

We have created code examples showing how to query a payment - one written in python and the other written in bash using CUrl. Please note that each placeholder needs to be replaced with real data.


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

If the query was successful you will receive an HTTP status code of 200 (OK). Any errors or problems will represent themselves as a non-200 status code. Check the [standard error codes](./api.html#errors) if you get something other than 200. See the response example provided as well.
