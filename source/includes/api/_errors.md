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
400 | Invalid card information | The card information sent in the request is invalid. A tip is to notify the user that there might be a typo in the card information provided.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/invalid_card_information>
400 | Expired card | The credit card is expired. A tip is to notify the user about this so that the user can remove the card and register a new one, we're sure that this information is useful for the user.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/expired_card>
400 | Currency not supported | The currency provided for this request is not supported for this operation. This can either mean that you have no agreement that supports this currency or that you are trying to use a currency not supported for this transaction.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/currency_not_supported>
402 | Cannot authorize | This is a general error for authorization requests. This often indicates a configuration error. Please contact support if the error persists.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/cannot_authorize>
402 | Cannot cancel | This is a general error for cancel requests. This often indicates a configuration error. Please contact support if the error persists.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/cannot_cancel>
402 | Cannot capture | This is a general error for capture requests. This often indicates a configuration error. Please contact support if the error persists.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/cannot_capture>
402 | Cannot refund | This is a general error for refund requests. This often indicates a configuration error. Please contact support if the error persists.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/cannot_refund>
402 | Insufficient funds | This error indicates that the account tied to the card is too low on funds. A tip is to tell the user that more money is needed in order to buy this amazing product.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/insufficient_funds>
404 | Payment not found  | No payment could be found, check that you used the correct payment identifier.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/payment_not_found>
451 | 3D secure required | This operation requires 3D secure.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/3d_secure_required>
451 | Card type not accepted | The card type is not accepted in the current agreement.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/card_type_not_accepted>
451 | Invalid card | The card is invalid and will never be usable again. A tip is to tell the user that the card in not valid so that they either can try with a new card of contact their card issuer.<br><br>*Type:*<br><http://api.bambora.com/definitions/payments/invalid_card>
