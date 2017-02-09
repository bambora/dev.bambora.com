---
title: Quickstart
layout: tutorial

nav: na_quickstart_nav
name: /content/na/guides/quickstart/partner_quickstart
parent: /content/na/guides/quickstart/partner_quickstart
nav_category: Partner Quickstart

search: false

summary: >
    This will guide you through quickly setting up the portal on your machine, editing some docs, and deploying the change.
---

# Calling the APIs

This will guide you through quickly hitting each of our APIs and verifying the success of the operation in the Back Office.

Each of these API calls will require a distinct authentication passcode. We described how to generate these in the Merchant Setup section.

## cURL

All the examples in this guide use cURL, a lightweight, command-line tool for making HTTP requests. cURL lets you try out various API requests in a command-line interface such as the command prompt in Windows or Terminal on the Mac. You don't need to build a working web application just to try out the APIs. If you are unfamiliar with cURL you can read Zendesk's excellent guide <a href="https://help.zendesk.com/hc/en-us/articles/229136847-Installing-and-using-cURL" target="_blank">here</a>.

## Postman

We also provide a Postman collection for those who prefer the readability of a user friendly interface. Postman is a popular HTTP client that runs as a Chrome app. You can download Postman <a href="https://www.getpostman.com/" target="_blank">here</a>.

You can download our collection and an environment here. You will need to update the environment with your merchant ID and pass codes before you can run any queries. Most queries contain variables that are set from the response of a related (e.g. 'Get Token' sets the returned token in the environment, 'Make Token Payment' sets the token from the environment in its request body).

ToDo: add the samples + content from http://developer.beanstream.com/documentation/rest-api/ here

## 1. Board a sub-merchant

## 2. Take a payment on a sub-merchant's account

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
