## Voids

```shell
Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments/{transId}/void \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "amount":14.30
}'
```

```javascript
beanstream.payments.voidPayment(transId, {amount: 30})
  .then(function(result) {
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$result = $beanstream->payments()->voidPayment($transaction_id, 12.99);
```

```ruby
void_result = Beanstream.PaymentsAPI.void_payment(transaction_id, 100)
```

```python
resp = beanstream.void_purchase(transaction_id, 12.99)

''' OR for voiding returns: '''
resp = beanstream.void_return(transaction_id, 12.99)
```

```java
PaymentResponse response = beanstream.payments().voidPayment(transactionId, 70.00);
```

```csharp
PaymentResponse response = beanstream.Payments.Void (response.TransactionId, 30);
```

```go
res, err := gateway.Payments().VoidPayment(transactionId, 12.99)
```

## Returns

```shell
Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments/{transId}/returns \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "amount":12.50
}'
```

```javascript
beanstream.payments.returnPayment(transId, {amount: 40})
  .then(function(result) {
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$result = $beanstream->payments()->returnPayment($transaction_id, 12.99, $order_number);
```

```ruby
return_result = Beanstream.PaymentsAPI.return_payment(transaction_id, 100)
```

```python
resp = beanstream.return_purchase(transaction_id, 12.99)
```

```java
PaymentResponse response = beanstream.payments().returnPayment(transactionId, 70.00);
```

```csharp
PaymentResponse response = beanstream.Payments.Return (response.TransactionId, 40.0);
```

```go
res, err := gateway.Payments().ReturnPayment(transactionId, 12.99)
```

### Unreferenced Returns

```shell
Definition
POST /v1/payments/0/returns HTTP/1.1

curl https://www.beanstream.com/api/v1/payments/0/returns\
-H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \
-d '{
   "merchant_id":280001000,
   "order_number":"10000123",
   "amount":500.00,
   "payment_method":"card",
   "card":{
      "name":"John Doe",
      "number":"5100000010001004",
      "expiry_month":"02",
      "expiry_year":"14",
      "cvd":"642"
   }
}'
```

```javascript

```

```php
<?php

$req = curl_init('https://www.beanstream.com/api/v1/payments/0/returns');

$headers = array(
	'Content-Type:application/json',
	'Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ='
);

curl_setopt($req,CURLOPT_HTTPHEADER, $headers);
curl_setopt($req,CURLOPT_RETURNTRANSFER, 1);
curl_setopt($req,CURLOPT_HEADER, 0);

$post = array(
	'merchant_id' => 280001000,
	'order_number' => '10000123',
	'amount' => 500.00,
	'payment_method' => 'card',
	'card' => array(
		'name' => 'John Doe',
		'number' => '5100000010001004',
		'expiry_month' => '02',
		'expiry_year' => '14',
		'cvd' => '642'
	)
);   

curl_setopt($req,CURLOPT_POST, 1);
curl_setopt($req,CURLOPT_POSTFIELDS, json_encode($post));

$res_json = curl_exec($req);
$res = json_decode($res_json);

curl_close($req);

print_r($res);

?>
```

```ruby
require 'open-uri'
require 'net/http'
require 'json'

uri = URI('https://www.beanstream.com/api/v1/payments/0/returns')
req = Net::HTTP::Post.new(uri.path) # Ruby 2.0: use .new(uri) instead
req['Content-Type'] = 'application/json'
req['Authorization'] = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ='

req.body = {
   :merchant_id => 280001000,
   :order_number => '10000123',
   :amount => 500.00,
   :payment_method => 'card',
   :card => {
      :name => 'John Doe',
      :number => '5100000010001004',
      :expiry_month => '02',
      :expiry_year => '14',
      :cvd => '642'
   }
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true) { |http|
    http.request(req)
}

puts "\nUNREFERENCED RETURN"
puts res.inspect
puts res.body
```

```python
from urllib2 import Request, urlopen, HTTPError
import json

req_body = json.dumps({
    'merchant_id': 280001000,
    'order_number': '10000123',
    'amount': 500.00,
    'payment_method': 'card',
    'card': {
        'name': 'John Doe',
        'number': '5100000010001004',
        'expiry_month': '02',
        'expiry_year': '14',
        'cvd': '642'
    }
})

req = Request(
    'https://www.beanstream.com/api/v1/payments/0/returns',
    data=req_body,
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ='
    })

try:
    # HTTP Request success
    response = json.loads(urlopen(req).read())
    print(response)
except HTTPError, e:
    # Handle errors here
    error = json.loads(e.read())
    print(error)
```

```java

```

```csharp

```

```go

```
