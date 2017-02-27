## 3D Secure

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
```

```python

```

```csharp

```

```java

```

```ruby

```

```php

```

```javascript

```

```go

```

Verified by Visa (VbV), MasterCard SecureCode, and AMEX SafeKey are security features that prompt customers to enter a passcode when they pay by Visa, MasterCard, or AMEX. Merchants that want to integrate VbV, SecureCode, or SafeKey must have signed up for the service through their bank merchant account issuer. This service must also be enabled by our support team.

[//]: # (Use one of these two options to implement 3D Secure:)

[//]: # (* Use our API based 2-Step process.)
[//]: # (* Or use your own authentication process and pass the secure token data to our API.)

See [here](/docs/guides/3D_Secure) for more information on how to implement 3D Secure.
