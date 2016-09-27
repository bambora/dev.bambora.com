# Errors

### Client errors
Error Code | Title   | Decription
---------- | ------- | ----------
400 | Bad Request | The API request was not formatted correctly.
401 | Unauthorized | Your API key is wrong or the Authorization header was not set.
403 | Forbidden | You are not authorized for this operation with the authentication you have provided.
404 | Not Found | Unknown path or resource was not found.
409 | Payment operation blocked | The payment was being modified by another request. The attempted operation could be retried again, or the payment could be queried to find out if its properties have changed.
422 | Invalid payment state transition | The state of the payment could not be changed in the way that the payment operation would require.

### Server errors
Error Code | Title   | Decription
---------- | ------- | ----------
500 | Internal Server Error | We had a problem with our server. Try again later.
502 | Bad Gateway | The server was acting as a gateway or proxy and received an invalid response from the upstream server
503 | Service Unavailable | The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.
504 | Gateway Timeout | The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.

### Payment errors

Payments are identified by the type recieved in the error response body.

Error Code | Title   | Decription
---------- | ------- | ----------
400 | Invalid card information | The supplied card information is not valid. <br>Tip: Check if there are any typos in the supplied card information.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/invalid_card_information>
400 | Expired card | The card is expired and will never be usable again.<br>Tip: Only non-expired cards are accepted.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/expired_card>
400 | Currency not supported | The specified currency is not supported in your merchant account.<br>Tip: You can only use currencies that are supported in your merchant account.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/currency_not_supported>
402 | Cannot authorize | This payment cannot be authorized.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/cannot_authorize>
402 | Cannot cancel | This payment cannot be canceled.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/cannot_cancel>
402 | Cannot capture | This payment cannot be captured.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/cannot_capture>
402 | Cannot refund | This payment cannot be refunded.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/cannot_refund>
402 | Insufficient funds | The account tied to the card has insufficient funds.<br>Tip: Funds need to be added to the card in order for this operation to work.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/insufficient_funds>
404 | Payment not found  | The specified payment cannot be found.<br>Tip: Check that you're using a correct payment identifier.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/payment_not_found>
409 | Payment operation blocked | The payment was being modified by another request. <br>Tip: The attempted operation could be retried or the payment could be queried to check if its properties have changed.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/payment_operation_blocked>
422 | Invalid payment state transition | This operation cannot be performed due to the state of the payment.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/invalid_payment_state_transition>
451 | Blocked by Issuer | This operation has been blocked by the issuing bank.<br>Tip: It may be possible for the cardholder to bypass this by manually allowing Internet purchases through his/her Internet bank or banking app.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/blocked_by_issuer >
451 | Card type not accepted | The specified card type is not supported in your merchant account.<br>Tip: You can only use card types that are supported in your merchant account.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/card_type_not_accepted>
451 | Invalid card | The card is invalid and will never be usable again.<br>Tip: Only valid cards are accepted.<br><br>*Type:*<br><https://api.bambora.com/definitions/payments/invalid_card>
