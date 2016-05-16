---
title: Mobile

toc_above:
  - <a href='index.html'>Getting Started</a>
  - <a href='online.html'>Online</a>
  - <a href='mobile.html'>Mobile</a>
  
includes:
  - mobile/bnpayment-android
  - mobile/bnpayment-ios

  
toc_below:
  - <a href='api.html'>API</a>

  
search: true
---
# Overview

The `Native Payment` SDK from Bambora makes it simple to accept credit card payments in your app.

Specifically, by adding Native Payment to your project you can make it possible for the users of your app to:

* Register credit cards.

* Make purchases using registered credit cards.

The purpose of `Native Payment` is to save you time by providing you with an easy-to-use, up-to-date and actively maintained codebase for interacting with the Native Payment backend.

## Platform support

`Native Payment` is currently available for [Android](mobile.html#native-payment-android) and [iOS](mobile.html#native-payment-ios).

## How it works

This is a brief overview of what Native Payment does. You can find implementation instructions with code samples in the guides for [Android](mobile.html#native-payment-android) and [iOS](mobile.html#native-payment-ios).

### Merchant registration

You need to sign up with Bambora to get an API token in order to use `Native Payment`. Please send an email to [sdk@bambora.com](mailto:sdk@bambora.com) if you want to sign up.

### Setup and authentication

Initially, the SDK connects to the SDK backend and sends in an API token. Based on that API token, the SDK backend identifies and authorizes the SDK. The SDK then registers itself with the SDK backend. After these steps, credit card registration and payment functionality is enabled in the app.

### Registering Credit cards

The user needs to register his/her credit card in the app in order to make a purchase. Credit card registration is done through a secure web-based form, which we refer to as a Hosted Payment Page (HPP). The HPP is opened in a web view in the app and the user then registers his/her credit card on it.

After a successful registration, the HPP will return a credit card token which is automatically saved locally by the SDK. The credit card token can then be used by the SDK in order to make payments with the card in question.

The SDK supports multiple credit card registrations.

### Payments

When a valid credit card that contains sufficient funds has been registered through the SDK, payments can be made.

This is done by making a call to the SDK backend that includes the amount, currency and credit card token.

When an SDK payment is successful, the payment amount becomes reserved in the customer's bank account. It is then up to you as a merchant to capture/withdraw the payment from the customer's bank account (which can be done either through the merchant backend interface or by making an API integration with the Native Payment backend).

## License

The Native Payment SDK is available under the [MIT license](https://opensource.org/licenses/MIT).

## Contact info

We welcome questions and feedback - you can reach us by sending an e-mail to [sdk@bambora.com](mailto:sdk@bambora.com)
