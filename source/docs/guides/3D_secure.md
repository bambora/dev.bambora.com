---
title: 3D Secure
layout: tutorial

summary: >
    Verified by Visa (VbV), MasterCard SecureCode, and AMEX SafeKey are security features that prompt customers to enter a 
    passcode when they pay by Visa, MasterCard, or AMEX. Merchants that want to integrate VbV, SecureCode, or SafeKey must 
    have signed up for the service through their bank merchant account issuer. This service must also be enabled by our 
    support team.

navigation:
  header: na.tocs.na_nav_header
  footer: na.tocs.na_nav_footer
  toc: false
  header_active: Guides
---

# 3D Secure

Verified by Visa (VbV), MasterCard SecureCode, and AMEX SafeKey are security features that prompt customers to enter a 
passcode when they pay by Visa, MasterCard, or AMEX. Merchants that want to integrate VbV, SecureCode, or SafeKey must 
have signed up for the service through their bank merchant account issuer. This service must also be enabled by our 
support team.

For assistance, you can send a message to Client Services or call 1-888-472-0811.

With a VbV, SecureCode, or SafeKey transaction, a customer is redirected to a bank portal to enter their secure pin 
number before a transaction is processed. The bank then returns an authentication response which must be forwarded to 
our API for a transaction to complete.

<!-- Use one of these two options to implement 3D Secure: -->

## 1. Use our 2-Step process

Use our RESTful Payments API to initiate the Payment and to complete the transaction request. In this standard 
integration, the VbV, SecureCode, and SafeKey process requires two transaction requests.

In addition to this guide feel free to check out our REST API Demo implementation on GitHub here:

https://github.com/Beanstream/rest-api-demo

**Step 1:** Submit a payment request and process the first result.

The merchant’s processing script forwards the transaction details to our REST API. The request includes a special 
'term_url' variable. This term_url variable allows the merchant to specify the URL where the bank VbV or SC, or SafeKey 
response is returned, after the customer enters their PIN and it is verified on the bank portal.

```shell
Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "payment_method":"token",
    "order_number":"MyOrderId000011223344",
    "amount":15.99,
    "token":{
        "code":"gt7-0f2f20dd-777e-487e-b688-940b526172cd",
        "name":"John Doe"
    },
    "term_url": "https://my.merchantserver.com/redirect/3d-secure"
}'

Response (HTTP status code 302 redirect)

{
  "merchant_data": "2ccd7715-9e97-4f11-9fff36e6584e3200",
  "contents": "%3cHTML%3e%3cHEAD%3e%3c%2fHEAD%3e%3cBODY%3e%3cFORM+action%3d%22https%3a%2f%2fdevweb-sven.beanstream.com%2factiveMerchantEmulator%2fgateway.asp%22+method%3d%22POST%22+id%3d%22form1%22+name%3d%22form1%22%3e%3cINPUT+type%3d%22hidden%22+name%3d%22PaReq%22+value%3d%22TEST_paRaq%22%3e%3cinput+type%3d%22hidden%22+name%3d%22merchant_name%22+value%3d%22Seven+Sparrow+Inc.%22%3e%3cinput+type%3d%22hidden%22+name%3d%22trnDatetime%22+value%3d%222%2f23%2f2017+5%3a05%3a42+PM%22%3e%3cinput+type%3d%22hidden%22+name%3d%22trnAmount%22+value%3d%22100.00%22%3e%3cinput+type%3d%22hidden%22+name%3d%22trnEncCardNumber%22+value%3d%22XXXX+XXXX+XXXX+3312%22%3e%3cINPUT+type%3d%22hidden%22+name%3d%22MD%22+value%3d%222CCD7715-9E97-4F11-9FFF36E6584E3200%22%3e%3cINPUT+type%3d%22hidden%22+name%3d%22TermUrl%22+value%3d%22http%3a%2f%2f10.240.9.64%3a5000%2fpayment%2fenhanced%2fredirect%2f3d-secure%22%3e%3c%2fFORM%3e%3cSCRIPT+language%3d%22JavaScript%22%3edocument.form1.submit()%3b%3c%2fSCRIPT%3e%3c%2fBODY%3e%3c%2fHTML%3e",
  "links": [ 
    {
      "rel": "continue",
      "href":"https://www.beanstream.com/api/v1/payments/2ccd7715-9e97-4f11-9fff36e6584e3200/continue","method":"POST"
    }
  ]
}
```

In the 302 response above, the 'merchant_data' attribute value should be saved in the current users session.

The merchant’s process URL decodes the response redirect and displays the information in the customer’s web browser. 
This forwards the client to the VbV or SC, or SafeKey banking portal. On the bank portal, the customer enters their 
secure credit card pin number in the fields provided on the standard banking interface.

The bank forwards a response to the merchant’s TERM URL including the following variables:
- PaRes (Authentication Code)
- MD (Unique Payment ID)

**Step 2:**  Process Transaction Auth Request

The merchant takes the data posted to the TERM URL and posts the PaRes and MD (merchant_data) values to our REST 
Payments API on its 'continue' endpoint.

If the transaction fails VbV or SC, or SafeKey it is declined immediately with messageId=311 (3D Secure Failed). If the 
transaction passes, it is forwarded to the banks for processing. On completion, an approved or declined message is sent 
to the merchant processing script.

Upon success the term_url callback is called with following form encoded name/value params:

- ('trnAmount', '15.99')
- ('merchant_name', 'Your Merchant Inc.') 
- ('password', '')
- ('opResponse', '') 
- ('MD', 'C82A76AB-238D-48D8-BEEDCAAB19566C00') 
- ('trnDatetime', '2/23/2017 5:52:23 PM')
- ('PaRes', 'TEST_PaRes')
- ('termUrl', 'http://10.240.9.64:5000/payment/enhanced/redirect/3d-secure') 
- ('trnEncCardNumber', 'XXXX XXXX XXXX 3312')
- ('PAC', 'TEST_PAC')
- ('retryAttempt', '0')

```shell
Request

https://www.beanstream.com/api/v1/payments/2ccd7715-9e97-4f11-9fff36e6584e3200/continue

{
  "payment_method": "credit_card", 
  "card_response": {
    "pa_res": "TEST_PaRes"
  }
}

Response

{
  "id": "10000026",
  "approved": "1",
  "message_id": "1",
  "message": "Approved",
  "auth_code": "TEST",
  "created": "2017-02-23T17:26:26",
  "order_number": "MyOrderId000011223344",
  "type": "PA",
  "payment_method": "CC",
  "amount": 15.99,
  "custom": {
    "ref1": "",
    "ref2": "",
    "ref3": "",
    "ref4": "",
    "ref5": ""
  },
  "card": {
    "card_type": "VI",
    "last_four": "3312",
    "address_match": 0,
    "postal_result": 0,
    "avs_result": "0",
    "cvd_result": "1"
  },
  "links": [
    {
      "rel": "complete",
      "href": "https://www.beanstream.com/api/v1/payments/10000026/completions",
      "method": "POST"
    }
  ]
}
```
<!--
## 2. Use your own process

Some large merchants complete the Verified by Visa (VbV), MasterCard SecureCode, or AMEX SafeKey certification to handle 
authentication on their own side. These merchants can use their existing VbV, SecureCode, or SafeKey authentication 
process, and send the results of the bank authentication to Beanstream with their standard transaction request. To do 
this, the merchant must integrate using a server-to-server type connection.

Note: This option must be enabled by Beanstream. Contact support if you want to use this method.

The VbV, SecureCode, or SafeKey bank authentication results must be sent with the transaction request using these three 
system variables:

| Attribute | Description |
| --- | --- |
| secure_xid | Include the 20-digit 3D Secure transaction identifier. |
| secure_eci | SecureECI is a 1-digit status code: 5 – authenticated; 6 – attempted, not completed. |
| secure_cavv | Include the 40-character Cardholder Authentication Verification Value. |
-->