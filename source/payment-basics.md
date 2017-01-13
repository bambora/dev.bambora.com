---
title: Payment Basics

toc_above:
  - <a href='index.html'>Getting Started</a>
  - <span>COLLECT CARDS</span>
  - <a href='ios.html'>iOS</a>
  - <a href='android.html'>Android</a>
  - <a href='online.html'>Online</a>
  - <span>CHARGE CARDS</span>
  - <a href='payment-basics.html'>Charge Basics</a>
  

includes:


toc_below:
  - <a href='client-side.html'>Client-Side</a>
  - <a href='server-side.html'>Server-Side</a>
  - <span>APIs</span>
  - <a href='native-payments/index.html'>Payments</a>
  - <span>TOOLS</span>
  - <a href='testcards.html'>Test Cards</a>
  - <a href='carts.html'>Shopping Carts</a>

search: false
---

# Basics

Taking payments requires understanding some simple terminology and choosing what tools will be right for you. 

Here we will cover:

* [Card Tokens](#card-tokens)
* [Authorizations](#authorization)
* [Capture](#capture)
* [Client-side or Server-side](#client-or-server-side)


# Card Tokens

Collecting credit cards consists of getting the card details from the customer and then tokenizing the card. The tokenization process is all handled for you if you use one of our client-side tools:

* [iOS SDK](/ios.html)
* [Android SDK](/android.html)
* [Checkout](/online.html)

Tokenization is performed so that your apps and website do not need to touch real credit card numbers. This way you don't have to worry about having a credit card breach. It also places you in a much easier PCI category that requires a less rigerous security review when it comes time to fill out a Self Assessment Questionnaire.

A credit card token is only useful on the Bambora systems, and each token is directly tied to your merchant account. So even if someone did get your tokens they couldnt use them.

Tokenization must be performed on the client machine, that means that any software you write should not come into contact with a PAN (Primary Account Number, aka card number).


Once you have a token, then you can make one time payments or use the token over and over again for recurring payments.



# Authorization

Payments can be broken into two phases: **Authorization** and **Capture**. Sometimes these are bundled together into what can be called an "Auth-Capture". It is important to note that Authorization when talking about credit cards does not mean API permissions.

An Authorization reserves an amount on the credit card that can be "captured" at a later date and time. Often you may see this at gas stations where you don't know how much you will be filling up when you begin but the gas company wants to know that you do have some money to cover the fill. This paradigm can also be applied online services.

In some geographical regions it is required that a purchase is authorized only until the product has shipped; only then can the payment be captured.

The Bambora Mobile SDKs and Checkout perform authorizations automatically by default. You must always capture the payment after.


# Capture

Capturing a payment is the process of collecting the money that has been reserved on a credit card from an authorization.

You can capture the full amount or a smaller amount of the original auth. This is done through our [APIs](/api.html#capture-payment).


# Client or Server-Side

With Bambora you have the option of taking payments directly from the client applicaiton (iOS, Android, website) or from your server.

Client-side payments are often called "hosted payment solutions" and provide the easiest method to take payments. However, they usually aren't as customizable as server-side payment solutions. Which ever method you use, you must tokenize the card in the client. Some operations, such as refunds, are not possible to do in the client and must be handled from your server talking to the Bambora [API](/server-side.html).

We have split out the rest of the documentation for Charging Cards into [Client-Side](/client-side.html) and [Server-Side](server-side.html) payments.

