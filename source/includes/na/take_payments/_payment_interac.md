## Interac Online  
Interac Online is a transaction method available to Canadian merchants only. It allows customers to authenticate direct debits without sharing their debit card details with the merchant. An Interac payment flow is similar to the 3D Secure payment flow. It has three steps:

1. Submit an initial Interac payment request to Beanstream. <br/>You will receive an Interac response with redirect code.
2. Redirect the customer to the bank portal using redirect code received from initial request. <br/>Customer logs in to approve the payment and the bank redirects the customer back to your site with success/failure information.
3. Submit final payment request to Beanstream.

#### APIs

* Initial request: POST https://www.beanstream.com/api/v1/payments
* Final request: POST https://www.beanstream.com/api/v1/payments/{id}/continue

### Step 1: Submit initial payment request
Send a request to Beanstream’s Payment API to initiate the Interac process. The response from this request will provide you with the redirect HTML code that you render to the customer in order to redirect them to the banking portal.

```
// Request object (JSON)
PaymentRequest {
  payment_method (string, max length 20): The exact string is 'interac'. characters(20),
  merchant_id (number, max length 9): ,
  order_number (string, max length 30): ,
  amount (number, max length 9): ,
  language (string, max length 3): ,
  customer_ip (string, max length 30): ,
  term_url (string, max length 256): ,
  comments (string, max length 256): ,
  billing (Address, optional),
  shipping (Address, optional),
  custom (Custom, optional)
}
```

#### Response
```
// Response object (JSON)
{
  merchant_data (string, max length 32): ,
  contents (string): ,
  links (JSON): ,
}
```


### Step 2: Redirect Request
```shell
POST https://www.beanstream.com/api/v1/payments/834387f7-d249-45f9-b191aedba6d67750/continue HTTP/1.1
Content-Type: application/json
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=

{
   "payment_method":"interac",
   "interac_response":{
      "funded":1,       
      "idebit_track2":"3728024906540591214=14010123456789XYZ",
      "idebit_isslang":"en",
      "idebit_version":1,
      "idebit_issconf":"CONF#TEST",
      "idebit_issname":"TestBank2",
      "idebit_amount": 10000,
      "idebit_invoice":"10000123"     
   }
}
```

```javascript

```

```php
<?php

$req = curl_init('https://www.beanstream.com/api/v1/payments/2f86d946-5531-4495-9d82d7e6d83ba93/continue');

$headers = array(
	'Content-Type:application/json',
	'Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ='
);

curl_setopt($req,CURLOPT_HTTPHEADER, $headers);
curl_setopt($req,CURLOPT_RETURNTRANSFER, 1);
curl_setopt($req,CURLOPT_HEADER, 0);

$post = array(
	'payment_method' => 'interac',
	'interac response' => array(
		'funded' => 1,
		'idebit_track2' => '02ed00801f3a28009383252a363535...',
		'idebit_isslang' => 'en',
		'idebit_version' => 1,
		'idebit_issconf' => 'TEST',
		'idebit_issname' => 'Joh Doe Bank',
		'idebit_amount' => 10000,
		'idebit_invoice' => NULL
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

uri = URI('https://www.beanstream.com/api/v1/payments/2f86d946-5531-4495-9d82d7e6d83ba93/continue')
req = Net::HTTP::Post.new(uri.path) # Ruby 2.0: use .new(uri) instead
req['Content-Type'] = 'application/json'
req['Authorization'] = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ='

req.body = {
   :payment_method => 'interac',
   :interac_response => {
      :funded => 1,
      :idebit_track2 => '02ed00801f3a28009383252a363535...',
      :idebit_isslang => 'en',
      :idebit_version => 1,
      :idebit_issconf => 'TEST',
      :idebit_issname => 'Joh Doe Bank',
      :idebit_amount => 10000,
      :idebit_invoice => nil
   }
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true) { |http|
    http.request(req)
}

puts "\nINTERAC ONLINE"
puts res.inspect
puts res.body
```

```python
from urllib2 import Request, urlopen, HTTPError
import json

req_body = json.dumps({
    'payment_method': 'interac',
    'interac_response': {
        'funded': 1,
        'idebit_track2': "02ed00801f3a28009383252a363535...",
        'idebit_isslang': 'en',
        'idebit_version': 1,
        'idebit_issconf': 'TEST',
        'idebit_issname': 'Joh Doe Bank',
        'idebit_amount': 10000,
        'idebit_invoice': None,
    }
})

req = Request(
    'https://www.beanstream.com/api/v1/payments/2f86d946-5531-4495-9d82d7e6d83ba93/continue',
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

In the response you will receive a chunk of HTML. Display this to the customer to redirect them to the Interac login page. Here the customer will log onto their bank account and approve the payment. An approved or declined payment will forward the customer back to the FUNDED or NON_FUNDED URLs (respectively) on your website.

Example response HTML you use to redirect the user:

If the transaction is cancelled or declined at any point, the bank forwards a response to the merchant’s NON_FUNDED URL. Otherwise, the bank response is forwarded to the merchant’s FUNDED URL. The funded and non-funded URLs are values the merchant must provide to Beanstream before account activation. These values are stored internally by Beanstream. Contact our customer support team to set these URLs.

#### Schema
```
RedirectionRequest {
  payment_method (string, max length 16): The exact string is 'interac',
  interac_response (InteracResponse)
}

InteracResponse {
  funded (string, max length 20): ,
  idebit_notfundedurl (string, max length 256): ,
  idebit_track2 (string, max length 256): ,
  idebit_isslang (string, max length 2): ,
  idebit_version (number, max length 1): ,
  idebit_issconf (string, max length 32): ,

  idebit_merchantdata (string, max length 40): ,
  idebit_fundedurl (string, max length 256): ,


  idebit_issname (string, max length 32): ,
  idebit_amount (number, max length 9): ,
  idebit_invoice (string, max length 20):
}

InteracResponse {
  funded (string, max length 20): ,
  idebit_track2 (string, max length 256): ,
  idebit_isslang (string, max length 2): ,
  idebit_version (number, max length 1): ,
  idebit_issconf (string, max length 32): ,
  idebit_issname (string, max length 32): ,
  idebit_amount (number, max length 9): ,
  idebit_invoice (string, max length 20):
}
```

POST https://www.beanstream.com/api/v1/payments/{id}/continue

#### Redirect Response
```
funded=1&bank_choice=1&merchant_name=Flow+Demo+Test&confirmValue=&headerText=
&IDEBIT_MERCHDATA=2F86D946-5531-4495-9D82D7E6D83BA93&IDEBIT_INVOICE=&IDEBIT_AMOUNT=10000
&IDEBIT_FUNDEDURL=http%3A%2F%2F24.69.140.148%2Fasp%2Fdemo_scripts%2Fflow_demo.asp%3Ffunded%3D1
&IDEBIT_NOTFUNDEDURL=http%3A%2F%2F24.69.140.148%2Fasp%2Fdemo_scripts%2Fflow_demo.asp%3Ffunded%3D0
&IDEBIT_ISSLANG=en&IDEBIT_TRACK2=3728024906540591214%3D12010123456789XYZ&IDEBIT_ISSCONF=CONF%23TEST
&IDEBIT_ISSNAME=TestBank1&IDEBIT_VERSION=1&accountType=Chequing
```

ToDo: Add

You will receive a redirect back from the bank site. A successful payment will redirect to your FUNDED URL and a failed or cancelled payment will redirect back to your NON_FUNDED URL.

You must gather the idebit_ variables they pass in the querystring parameters. This is what a sample response from the bank portal looks like:

You will pass these idebit_ values onto the Beanstream API for one final request.

### Step 3: Submit final payment request

`{id}` = `merchant_data` from the first response (step 2).

Note: `idebit_amount` is in cents.

POST https://www.beanstream.com/api/v1/payments/{id}/continue

```
PaymentRequest {
  payment_method (string, max length 20): The exact string is 'interac'. characters(20),
  interac_response (InteracResponse)
}

InteracResponse {
  funded (string, max length 20): ,
  idebit_track2 (string, max length 256): ,
  idebit_isslang (string, max length 2): ,
  idebit_version (number, max length 1): ,
  idebit_issconf (string, max length 32): ,
  idebit_issname (string, max length 32): ,
  idebit_amount (number, max length 9): ,
  idebit_invoice (string, max length 20):
}
```

#### Final Response
```
PaymentResponse {
  payment_method (string): ,
  id (number, max length 9): ,
  approved (number, max length 1): ,
  message_id (number, max length 3): ,
  message (string, max length 32): ,
  auth_code (string, max length 32): ,
  created (date): ,
  order_number (string, max length 30): ,
  type (string, max length 16): ,
  links (json):
}
```

#### Code Sample
```shell
Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments \
-H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \
-H "Content-Type: application/json" \
-d '{
   "merchant_id":268820000,
   "order_number":"10000123",
   "amount":100.00,
   "payment_method":"interac"     
}'
```

```javascript

```

```php

```

```ruby
require 'open-uri'
require 'net/http'
require 'json'

uri = URI('https://www.beanstream.com/api/v1/payments')
req = Net::HTTP::Post.new(uri)
req["Authorization"] = "Basic dXNlcm5hbWU6cGFzc3dvcmQ="
req["Content-Type"] = 'application/json'

req.body = {
   :merchant_id =&gt; 268820000,
   :order_number =&gt; "10000123",
   :amount =&gt; 100.00,
   :payment_method =&gt; :interac
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl =&gt; true) { |http|
    http.request(req)
}

puts "\nINTERAC ONLINE PURCHASE"
puts res.inspect
puts res.body
```

```python
from urllib2 import Request, urlopen, HTTPError
import json

req_body = json.dumps({
    'merchant_id': 268820000,
    'order_number': '10000123',
    'amount': 100.00,
    'payment_method': 'interac'
})

req = Request(
    'https://www.beanstream.com/api/v1/payments',
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
