# How to capture payments

This section of the guide will walk you through how to capture payments through our API.

**Edit this Page**

If you have found an issue in this documentation or want to improve it, simply click [here](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/mobile/_how-to-capture-payments.md), edit the markdown text on that page, and submit a change request. We will review it, accept it, and publish the change automatically.

## Introduction

When a payment is successfully made using the `Native Payment` SDK, the payment amount becomes reserved in the customer's bank account. 

In order to then withdraw the payment amount from the customer's bank account, you need to perform a capture operation through our API.

## Merchant registration

You need to sign up with Bambora to use our API. As part of the onboarding process, you will receive two merchant numbers (one for test and one for production), a merchant token and a merchant secret. 

Please send an email to [sales.ecom@bambora.com](mailto:sales.ecom@bambora.com) if you want to sign up.

## Calling the API

Our REST API contains a /capture/ endpoint that you can use in order to capture specific payments.

You will need the following data in order to make the request:

* A merchant number.

* A merchant token. 

* A merchant secret.

* A payment reference (the reference that you set in the SDK before the payment in question was made)

You will get access to the merchant number, a merchant token and a merchant secret after registering with Bambora.

The payment reference refers to the one that you are required set in the SDK before making a payment. In order to capture a payment, you need to provide its unique payment reference.

We have created two code examples showing how to capture a payment - one written in bython and the other written in bash.

### Python example

This code example makes it possible to make a capture call to our API using Python. 

Please note that:

* Each placeholder needs to be replaced with real data.

* The code example requires that the [requests library for Python.com](https://github.com/kennethreitz/requests/) is installed on the computer that is running the code.

```python
import requests
​
PAYMENT_REFERENCE='<PAYMENT_REFERENCE>'
MERCHANT_ACCOUNT = '<MERCHANT_NUMBER>'
MERCHANT_TOKEN = '<MERCHANT_TOKEN>'
MERCHANT_SECRET = '<MERCHANT_SECRET>'
CAPTURE_URL = 'https://api-beta.bambora.com/payments/{payment_reference}/capture/'
​
response = requests.post(
    CAPTURE_URL.format(payment_reference='<PAYMENT_REFERENCE>'),
    auth=('{}@{}'.format(MERCHANT_TOKEN, MERCHANT_NUMBER), MERCHANT_SECRET),
    json={'amount': 2000},
    headers={'API-Version': '1'}
)
```

### Bash example

This code example shows how to make a capture call through bash.

Please note that each placeholder needs to be replaced with real data.

```shell
PAYMENT_REFERENCE='<PAYMENT_REFERENCE>'
MERCHANT_NUMBER='<MERCHANT_NUMBER>'
MERCHANT_TOKEN='<MERCHANT_TOKEN>'
MERCHANT_SECRET='<MERCHANT_SECRET>'
CAPTURE_URL='https://api-beta.bambora.com/payments/'$PAYMENT_REFERENCE'/capture/'
​
AUTH='Authorization: Basic '$(echo -n $MERCHANT_TOKEN@$MERCHANT_NUMBER:$MERCHANT_SECRET | base64)
​
curl \
    --header "$AUTH" \
    --header 'API-Version: 1' \
    --header 'Content-Type: application/json' \
    --data '{"amount": 2000}' \
    $CAPTURE_URL
```
