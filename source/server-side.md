---
title: Server-Side

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
  
  - <span>REFERENCES</span>
  - <a href='api/index.html'>API</a>
  - <a href='testcards.html'>Test Cards</a>
  - <span>TOOLS</span>
  - <a href='carts.html'>Shopping Carts</a>

search: false
---

# Overview

This guide will walk you through the capabilities of our payments API for your server-side integration.

Before you process any payments on your server you must first collect the credit card details, in the form of a token, from one of our client-side tools.

*Important note: Make sure the URL has a ´/´ (slash) at the end when making an API call, otherwise the URL will not work.*