# Authentication


```
Authorization: Basic YWJjZGVmZ0AxMjM0NTY3ODk6N0FRdTdGR0IyS3dt
```

You need to sign up with Bambora to use our API. As part of the onboarding process, you will receive a test Merchant Account, once the contract is signed, you'll receive a production Merchant Account as well.

Please send an email to [sales.ecom@bambora.com](mailto:sales.ecom@bambora.com) if you want to sign up.

To perform captures, cancels and refunds, you'll need an API token to communicate with the backend from your server. To do so, go to merchant.bambora.com, sign in with your credentials, then to the left under Settings go to "API users". There you'll be able to create an API User. After the API User is created, make sure to assign the right permissions, namely: "Authorize Subscription", "Capture transaction", "Delete transaction" and "Credit transaction".
Once all that is set you can use the token to perform requests to our backend.


## Requests

Requests to the API use Basic Authentication in the format of: `token@merchantID:secret`. This string is then **base64 encoded**.


> This is an example base64 encoded Auth header: Basic abcdefg@123456789:7AQu7FGB2Kwm

