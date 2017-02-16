---
title: Merchant Quickstart
layout: tutorial

summary: >
    This will guide you through quickly hitting each of our Payments APIs and verifying the success of the operation in the Back Office.
    
navigation:
  header: na.tocs.na_nav_header
  footer: na.tocs.na_nav_footer
  toc: na.tocs.merchant_quickstart
  header_active: Guides
---

# Calling the Payment APIs

This will guide you through quickly hitting each of our Payments APIs and verifying the success of the operation in the Back Office.

Each of these API calls will require a distinct authentication passcode. We described how to generate these in the Merchant Setup section.

## cURL

All the examples in this guide use cURL, a lightweight, command-line tool for making HTTP requests. cURL lets you try out various API requests in a command-line interface such as the command prompt in Windows or Terminal on the Mac. You don't need to build a working web application just to try out the APIs. If you are unfamiliar with cURL you can read Zendesk's excellent guide <a href="https://help.zendesk.com/hc/en-us/articles/229136847-Installing-and-using-cURL" target="_blank">here</a>.

## Postman

We also provide a Postman collection for those who prefer the readability of a user friendly interface. Postman is a popular HTTP client that runs as a Chrome app. You can download Postman <a href="https://www.getpostman.com/" target="_blank">here</a>.

You can download our collection and an environment here. You will need to update the environment with your merchant ID and pass codes before you can run any queries. Most queries contain variables that are set from the response of a related (e.g. 'Get Token' sets the returned token in the environment, 'Make Token Payment' sets the token from the environment in its request body).

## 1. Tokenize a credit card
If you accept credit cards, you must be in compliance with PCI Security Council standards. You can reduce the scope of your compliance by minimizing your application's contact with the card data. You can remove the need to pass credit card details to your server by tokenization the card data in the browser. You can create a single use token from the browser/mobile app through our Tokenization API.

You can further reduce the scope of your compliance by removing the need for your code to interact with card data by using our hosted Payfields library validate and tokenize all card data.

```
curl https://www.beanstream.com/scripts/tokenization/tokens  \
  -H "Content-Type: application/json" \
  -d '{
     "number":"4030000010001234",
     "expiry_month":"02",
     "expiry_year":"20",
     "cvd":"123"
  }'
```

## 2. Create a Payment Profile
Now that you have a single use token you can either take a one-off payment or create a multi use token to store the card data for future payments.

```
curl https://www.beanstream.com/api/v1/profiles  \
  -H "Authorization: Passcode your_payment_profile_passcode"  \
  -H "Content-Type: application/json" \
  -d '{
      "token":{  
        "name":"John Doe",
        "code":"your_card_token",
      }
  }'
```

## 3. Take a payment
You now have a multi-use token, it's time to charge the card.

You should recieve a HTTP response with a status code 200 and a payment response object with code:1, message:approved.

If your transaction was not approved you can easily isolate the problem by cheking the HTTP response code and the message in the payment response object. Our payment gateway emulator only returns two codes, 1:success and 7:declined.

HTTP status codes 200 and 402 indicate your request reached the emulator. All other HTTP status codes indicate that your request did not reach the emulator. You can read a full list of response codes here.

```
curl https://www.beanstream.com/api/v1/payments  \
  -H "Authorization: Passcode your_payment_passcode"  \
  -H "Content-Type: application/json" \
  -d '{
     "amount":100.00,
     "payment_method":"payment_profile",
     "payment_profile":{
       "customer_code":"John Doe",
       "card_id":"your_customer_token",
       "complete":"true"
     }
  }'
```

## 4. Query the transaction
The response body of a transaction request contains a transaction id. You can request a transaction at a later date using the same Payments API.

```
curl -X GET https://www.beanstream.com/api/v1/payments/{your_transaction_id} \
  -H "Authorization: Passcode your_payment_passcode" \
  -H "Accept: application/json"
```

You can also query transactions by date and any combination of the 24 other fields of a transaction record.

```
curl https://www.beanstream.com/api/v1/reports \
-H "Authorization: Passcode your_reporting_passcode"  \
-H "Content-Type: application/json" \
-d "{
     "name": "Search",
     "start_date": "2017-01-01T01:01:03",
     "end_date": "2018-06-05T16:05:00",   
     "start_row": "1",
     "end_row": "2"
   }"
```
