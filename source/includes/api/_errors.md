# Errors

Standard API error codes:


Error Code | Meaning
---------- | -------
200 | OK -- Successful request, hooray!
400 | Bad Request -- The API request was not formatted correctly.
401 | Unauthorized -- Your API key is wrong or the Authorization header was not set.
402 | Cannot authorize -- The authorization request could not be performed.
404 | Not Found -- Unknown path or resource was not found.
409 | Payment operation blocked -- The payment was being modified by another request. The attempted operation could be retried again, or the payment could be queried to find out if its properties have changed.
422 | Invalid payment state transition -- The state of the payment could not be changed in the way that the payment operation would require.
500 | Internal Server Error -- We had a problem with our server. Try again later.
