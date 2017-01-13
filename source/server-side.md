---
title: Server-Side

language_tabs:
  - shell: cURL
  - python

toc_above:
  - <a href='index.html'>Getting Started</a>
  - <span>COLLECT CARDS</span>
  - <a href='ios.html'>iOS</a>
  - <a href='android.html'>Android</a>
  - <a href='online.html'>Online</a>
  - <span>CHARGE CARDS</span>
  - <a href='payment-basics.html'>Charge Basics</a>
  - <a href='client-side.html'>Client-Side</a>
  - <a href='server-side.html'>Server-Side</a>

includes:
  - api/spec
  - api/authentication
  - api/make_payment
  - api/cancel
  - api/capture
  - api/get_payment
  - api/refund
  - api/errors

toc_below:
  - <span>APIs</span>
  - <a href='native-payments/index.html'>Payments</a>
  - <span>TOOLS</span>
  - <a href='testcards.html'>Test Cards</a>
  - <a href='carts.html'>Shopping Carts</a>


search: false
---

# Overview

This guide will walk you through the capabilities of our payments API for your server-side integration.

Before you process any payments on your server you must first collect the credit card details, in the form of a token, from one of our client-side tools.

Note that this API cannot be used for handling payments made through the Online Checkout. Refer to the [Online Payment API documentation](https://transaction-v1.api.epay.eu/help) for handling online payments.

*Important note: Make sure the URL has a ´/´ (slash) at the end when making an API call, otherwise the URL will not work.*
