
# Online
All payment requests are made from the merchant server. You can either call our RESTful Payment API directly, or via one of our API wrapping libraries (our SDKs).

Our RESTful APIs allow you to take payments, analyze payments, create payment profile to record customer details for future payments and create credit card tokens to reduce the scope of your PCI compliance.

You can read the API Spec
<a href="/payments_api_ref.html">here</a>.

In addition to the C#, Java, Python, PHP and Ruby SDKs listed in the right hand column of this page, we also offer SDKs written in Javascript (Node) and Go.

We also have a Hosted Payment Form solution configurable in the Back Office and there are a selection of 3rd-party shopping carts and plugins to speed up your intigration.

#### Get the SDK
```javascript
// Step 1) Install module with NPM
npm install beanstream-node

// Step 2) Import module into your project
var beanstream = require('beanstream-node')('merchantId', 'Payments API key', 'Profiles API key', 'Reporting API key');
```

```php

// Composer
// 1. Edit composer.json
{
    "require": {
        "beanstream/beanstream": "dev-master"
    }
}
// 2. Install the SDK
composer install

// 3. Require in your php file
require 'vendor/autoload.php';
```

```ruby
gem install beanstream --pre
```

```python
// Pip
pip install beanstream
```

```java
// Maven
<repositories>
<repository>
<id>snapshots-repo</id>
<url>https://oss.sonatype.org/content/repositories/snapshots</url>
<releases><enabled>false</enabled></releases>
<snapshots><enabled>true</enabled></snapshots>
</repository>
</repositories>

<dependencies>
<dependency>
<groupId>com.beanstream.api</groupId>
<artifactId>beanstream</artifactId>
<version>1.0.0-SNAPSHOT</version>
</dependency>
</dependencies>

//Gradle
repositories {
    maven { url "https://oss.sonatype.org/content/repositories/snapshots" }
}
dependencies {
    compile("com.beanstream.api:beanstream:1.0.0-SNAPSHOT") {changing=true}
}
```

```csharp
//Nuget
Id: Beanstream

PM> Install-Package Beanstream
```

```go
// Go Get
import beanstream "github.com/Beanstream/beanstream-go"
```

All SDKs support Payments, Profiles and Reporting APIs.

| Language | Source                  | Additional Docs     | Packet Repository  |
| -------- | ----------------------- | ------------------- | ------------------ |
| NodeJS   | [Source][node-source]   |                     | [NPM][node-pm]     |
| PHP      | [Source][php-source]    | [Docs][php-docs]    | [Composer][php-pm] |
| Ruby     | [Source][ruby-source]   |                     | [Gem][ruby-pm]     |
| Python   | [Source][python-source] | [Docs][python-docs] | [PIP][python-pm]   |
| Java     | [Source][java-source]   | [Docs][python-docs] | [Maven][python-pm] |
| C#       | [Source][csharp-source] | [Docs][csharp-docs] | [Nuget][csharp-pm] |
| Go       | [Source][go-source]     |                     |                    |

[node-source]: https://github.com/Beanstream/beanstream-nodejs
[node-docs]: #
[php-source]: https://github.com/Beanstream/beanstream-php
[php-docs]: https://github.com/Beanstream/beanstream-php/wiki
[ruby-source]: https://github.com/Beanstream/beanstream-ruby
[ruby-docs]: #
[python-source]: https://github.com/Beanstream/beanstream-python
[python-docs]: https://github.com/Beanstream/beanstream-python/blob/master/README.markdown
[java-source]: https://github.com/Beanstream/beanstream-java
[java-docs]: https://github.com/Beanstream/beanstream-java/wiki
[csharp-source]: https://github.com/Beanstream/beanstream-dotnet
[csharp-docs]: https://github.com/Beanstream/beanstream-dotnet/wiki
[go-source]: https://github.com/Beanstream/beanstream-go
[go-docs]: #

[node-pm]: https://www.npmjs.com/package/beanstream-node
[php-pm]: https://packagist.org/packages/beanstream/beanstream
[ruby-pm]: https://rubygems.org/gems/beanstream/versions/1.0.0.rc1
[python-pm]: https://pypi.python.org/pypi/beanstream/1.0.1
[java-pm]: https://mvnrepository.com/artifact/com.beanstream.api
[csharp-pm]: https://www.nuget.org/packages/Beanstream/
[go-pm]: #

## Purchases and Pre-Auth's

### Credit Card

```shell
# Definition
# POST /v1/payments HTTP/1.1

curl https://www.beanstream.com/api/v1/payments \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
   "order_number":"10000123",
   "amount":100.00,
   "payment_method":"card",
   "card":{
      "name":"John Doe",
      "number":"5100000010001004",
      "expiry_month":"02",
      "expiry_year":"14",
      "cvd":"123"
   }
}'
```

```javascript
var beanstream = require('beanstream-node')('YOUR_MERCHANT_ID', 'YOUR_PAYMENTS_API_PASSCODE');

var cardPayment = {
  order_number: 'order123456abc',
  amount:10.00,
  payment_method:"card",
  card:{
    name:"John Doe",
    number:"5100000010001004",
    expiry_month:"02",
    expiry_year:"19",
    cvd:"123"
  }
};
beanstream.payments.makePayment(cardPayment)
  .then(function(response){
    // display syccess
  })
  .catch(function(error){
    console.log(error);
    // display error
  });
```

```php
$beanstream = new \Beanstream\Gateway('YOUR_MERCHANT_ID', 'YOUR_PAYMENTS_API_PASSCODE', 'www', 'v1');

$payment_data = array(
        'order_number' => 'orderNumber0023',
        'amount' => 19.99,
        'payment_method' => 'card',
        'card' => array(
            'name' => 'Mr. Card Testerson',
            'number' => '4030000010001234',
            'expiry_month' => '07',
            'expiry_year' => '22',
            'cvd' => '123'
        )
);
try {
    $result = $beanstream->payments()->makeCardPayment($payment_data, TRUE); //set to FALSE for Pre-Auth
    print_r( $result );
} catch (\Beanstream\Exception $e) {
    //handle exception
}
```

```ruby
begin
  result = Beanstream.PaymentsAPI.make_payment(
  {
    :order_number => PaymentsAPI.generateRandomOrderId("test"),
    :amount => 100,
    :payment_method => PaymentMethods::CARD,
    :card => {
      :name => "Mr. Card Testerson",
      :number => "4030000010001234",
      :expiry_month => "07",
      :expiry_year => "22",
      :cvd => "123",
      :complete => true
    }
  })
  puts "Success! TransactionID: #{result['id']}"

rescue BeanstreamException => ex
  puts "Exception: #{ex.user_facing_message}"
end
```

```python
beanstream = gateway.Beanstream()
beanstream.configure(
    'YOUR_MERCHANT_ID',
    payment_passcode='YOUR_PAYMENTS_API_PASSCODE')
card = billing.CreditCard(
  'John Doe',
  '4030000010001234',
  '03',
  '2019',
  '123')
trans = beanstream.purchase(51.32, card)
resp = trans.commit()
```

```java
Gateway beanstream = new Gateway("v1",
    YOUR_MERCHANT_ID,
    "YOUR_PAYMENTS_API_PASSCODE");

CardPaymentRequest req = new CardPaymentRequest();
req.setAmount(100.0);
req.setOrderNumber("orderNum000112");
req.getCard()
    .setName("John Doe")
    .setNumber("5100000010001004")
    .setExpiryMonth("12")
    .setExpiryYear("18")
    .setCvd("123");

try {
    PaymentResponse response = beanstream.payments().makePayment(req);
    System.out.println("Card Payment Approved? "+ response.isApproved());

} catch (BeanstreamApiException ex) {
    // todo handle error
}
```

```csharp
Gateway beanstream = new Gateway () {
    MerchantId = YOUR_MERCHANT_ID,
    PaymentsApiKey = "YOUR_PAYMENTS_API_PASSCODE",
    ApiVersion = "1"
};

PaymentResponse response = beanstream.Payments.MakePayment (
    new CardPaymentRequest {
        Amount = 100.00,
        OrderNumber = "orderNum002233",
        Card = new Card {
            Name = "John Doe",
            Number = "5100000010001004",
            ExpiryMonth = "12",
            ExpiryYear = "18",
            Cvd = "123"
        }
    }
);
```

```go
import (
  beanstream "github.com/Beanstream/beanstream-go"
  "github.com/Beanstream/beanstream-go/paymentMethods"
)

config := beanstream.DefaultConfig()
config.MerchantId = "YOUR_MERCHANT_ID"
config.PaymentsApiKey = "YOUR_PAYMENTS_API_PASSCODE"

gateway := beanstream.Gateway{config}
request := beanstream.PaymentRequest{
  PaymentMethod: paymentMethods.CARD,
  OrderNumber:   beanstream.Util_randOrderId(6),
  Amount:        12.99,
  Card: beanstream.CreditCard{
    Name:        "John Doe",
    Number:      "5100000010001004",
    ExpiryMonth: "11",
    ExpiryYear:  "19",
    Cvd:         "123",
    Complete:    true}} // set to false for pre-auth
res, err := gateway.Payments().MakePayment(request)
```

#### Pre-Auth and Complete

```shell
# Definition
# POST /v1/payments HTTP/1.1

curl https://www.beanstream.com/api/v1/payments \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
   "order_number":"10000123",
   "amount":100.00,
   "payment_method":"card",
   "card":{
      "name":"John Doe",
      "number":"5100000010001004",
      "expiry_month":"02",
      "expiry_year":"14",
      "cvd":"123",
      "complete":false
   }
}'

#
# completion:
#

Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments/{transId}/completions \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "amount":59.33
}'
```

```javascript
var cardPayment = {
  order_number: 'order123456abc',
  amount:80.00,
  payment_method:"card",
  card:{
    name:"John Doe",
    number:"5100000010001004",
    expiry_month:"02",
    expiry_year:"19",
    cvd:"123",
    complete: false // false for pre-auth
  }
};
beanstream.payments.makePayment(cardPayment)
  .then(function(response){
    // approved
  })
  .catch(function(error){
    console.log(error);
  });

// capture/complete a lesser amount
beanstream.payments.completePayment(transId, {amount: 50.50})
  .then(function(result) {
    // payment captured/completed
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$beanstream = new \Beanstream\Gateway('300200578', '4BaD82D9197b4cc4b70a221911eE9f70', 'www', 'v1');

$payment_data = array(
    'order_number' => 'orderNumber002y',
    'amount' => 19.99,
    'payment_method' => 'card',
    'card' => array(
        'name' => 'Mr. Card Testerson',
        'number' => '4030000010001234',
        'expiry_month' => '07',
        'expiry_year' => '22',
        'cvd' => '123'
    )
);
try {
    $result = $beanstream->payments()->makeCardPayment($payment_data, FALSE); //set to FALSE for Pre-Auth
    $transaction_id = $result['id'];
    // complete payment
    $result = $beanstream->payments()->complete($transaction_id, 12.5);
    print_r( $result );
} catch (\Beanstream\Exception $e) {
    //todo handle exception
}
```

```ruby
begin
  result = Beanstream.PaymentsAPI.make_payment(
    {
      :order_number => PaymentsAPI.generateRandomOrderId("test"),
      :amount => 100,
      :payment_method => PaymentMethods::CARD,
      :card => {
        :name => "Mr. Card Testerson",
        :number => "4030000010001234",
        :expiry_month => "07",
        :expiry_year => "22",
        :cvd => "123",
        :complete => false #false makes it a pre-auth
      }
    }
  )
  puts "pre-authorized success: #{result}"
  transaction_id = result['id']
  puts "TransactionId: #{transaction_id}"

  result = Beanstream.PaymentsAPI.complete_preauth(transaction_id, 59.50)
  puts "completion success: #{result}"

rescue BeanstreamException => ex
  puts "Exception: #{ex.user_facing_message}" # declined
end
```

```python
beanstream = gateway.Beanstream()
beanstream.configure(
    '300200578',
    payment_passcode='4BaD82D9197b4cc4b70a221911eE9f70')
card = billing.CreditCard(
    'John Doe',
    '4030000010001234',
    '03',
    '2019',
    '123')
trans = beanstream.preauth(51.32, card)
resp = trans.commit()
trans2 = beanstream.preauth_completion(resp.transaction_id(), 25.00)
resp2 = trans2.commit()
```

```java
Gateway beanstream = new Gateway("v1",
    300200578,
    "4BaD82D9197b4cc4b70a221911eE9f70");
CardPaymentRequest paymentRequest = new CardPaymentRequest();
paymentRequest.setAmount(90.0);
paymentRequest.setMerchantId("300200578");
paymentRequest.setOrderNumber("order00345");
paymentRequest.getCard()
        .setName("John Doe")
        .setNumber("5100000010001004")
        .setExpiryMonth("12")
        .setExpiryYear("18")
        .setCvd("123");

try {
    PaymentResponse response = beanstream.payments().preAuth(paymentRequest);
    PaymentResponse authResp = beanstream.payments().preAuthCompletion(response.id, 43.50, null);
} catch (BeanstreamApiException ex) {
}
```

```csharp
Gateway beanstream = new Gateway () {
    MerchantId = 300200578,
    PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70",
    ApiVersion = "1"
};

PaymentResponse response = beanstream.Payments.PreAuth (
    new CardPaymentRequest {
        Amount = 100.00,
        OrderNumber = getRandomOrderId("test"),
        Card = new Card {
            Name = "John Doe",
            Number = "5100000010001004",
            ExpiryMonth = "12",
            ExpiryYear = "18",
            Cvd = "123"
        }
    }
);

PaymentResponse response2 = beanstream.Payments.PreAuthCompletion (response.TransactionId, 35.99);
```

```go
import (
	beanstream "github.com/Beanstream/beanstream-go"
	"github.com/Beanstream/beanstream-go/paymentMethods"
)

config := beanstream.DefaultConfig()
config.MerchantId = "300200578"
config.PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70"

gateway := beanstream.Gateway{config}
request := beanstream.PaymentRequest{
	PaymentMethod: paymentMethods.CARD,
	OrderNumber:   beanstream.Util_randOrderId(6),
	Amount:        12.99,
	Card: beanstream.CreditCard{
		Name:        "John Doe",
		Number:      "5100000010001004",
		ExpiryMonth: "11",
		ExpiryYear:  "19",
		Cvd:         "123",
		Complete:    false}} // false for pre-auth
res, err := gateway.Payments().MakePayment(request)
// complete payment
res2, err2 := gateway.Payments().CompletePayment(res.ID, 5.67)
```

### Single-use Token

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
        "name":"John Doe",
        "complete":true
    }
}'
```

```javascript
var tokenPayment = {
  order_number: 'order123456abc',
  amount:12.00,
  payment_method:"token",
  token:{
    name:"John Doe",
    code: myTokenString,
    complete: true
  }
};
beanstream.payments.makePayment(tokenPayment)
  .then(function(response){
    // display success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$beanstream = new \Beanstream\Gateway('300200578', '4BaD82D9197b4cc4b70a221911eE9f70', 'www', 'v1');

$legato_payment_data = array(
    'order_number' => "orderNum45678",
    'amount' => 100.0,
    'name' => 'Mrs. Legato Testerson'
);
try {
    $result = $beanstream->payments()->makeLegatoTokenPayment($token, $legato_payment_data, TRUE);
    print_r( $result );
} catch (\Beanstream\Exception $e) {
    //handle exception
}
```

```ruby
begin
  result = Beanstream.PaymentsAPI.make_payment(
    {
      :order_number => PaymentsAPI.generateRandomOrderId("test"),
      :amount => 13.99,
      :payment_method => PaymentMethods::TOKEN,
      :token => {
        :name => "Craig Test",
        :code => token, # add your token here
        :complete => true
      }
    }
  )
  puts "Success: #{result}"

rescue BeanstreamException => ex
  puts "Error: #{ex.user_facing_message()}"
end
```

```python
beanstream = gateway.Beanstream()
beanstream.configure(
        '300200578',
        payment_passcode='4BaD82D9197b4cc4b70a221911eE9f70')
txn = beanstream.purchase_with_token(22.13, token)
txn.set_cardholder_name("Gizmo")
resp = txn.commit()
```

```java
Gateway beanstream = new Gateway("v1",
    300200578,
    "4BaD82D9197b4cc4b70a221911eE9f70");

TokenPaymentRequest tokenReq = new TokenPaymentRequest();
tokenReq.setAmount(100.00);
tokenReq.setOrderNumber("myOrder9999");
tokenReq.getToken()
        .setName("John Doe")
        .setCode(myLegatoToken);

try {
    PaymentResponse response = beanstream.payments().makePayment(tokenReq);
    System.out.println("Token Payment Approved? "+ response.isApproved());

} catch (BeanstreamApiException ex) {
    //TODO handle exception
}
```

```csharp
Gateway beanstream = new Gateway () {
    MerchantId = 300200578,
    PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70",
    ApiVersion = "1"
};

PaymentResponse response = beanstream.Payments.MakePayment (
    new TokenPaymentRequest ()
    {
        Amount = 30.0,
        OrderNumber = "myOrder88888",
        Token = new Token {
            Code = token, // your Legato token
            Name = "John Doe"
        }
    }
);
```

```go
import (
	beanstream "github.com/Beanstream/beanstream-go"
	"github.com/Beanstream/beanstream-go/paymentMethods"
)

config := beanstream.DefaultConfig()
config.MerchantId = "300200578"
config.PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70"

gateway := beanstream.Gateway{config}
request := beanstream.PaymentRequest{
    PaymentMethod: paymentMethods.TOKEN,
    OrderNumber:   "order0012345",
    Amount:        15.99,
    Token: beanstream.Token{
        token,
        "John Doe",
        true}} // set to false for pre-auth
res, err := gateway.Payments().MakePayment(request)
```

#### Pre-Auth and Complete

```shell
Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "payment_method":"token",
    "order_number":"MyOrderId000011223355",
    "amount":15.99,
    "token":{
        "code":"gt7-0f2f20dd-777e-487e-b688-940b526172cd",
        "name":"John Doe",
        "complete":false
    }
}'

#
# completion:
#

Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments/{transId}/completions \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "amount":9.33
}'
```

```javascript
var tokenPayment = {
  order_number: 'order123456abc',
  amount:12.00,
  payment_method:"token",
  token:{
    name:"John Doe",
    code: myTokenString,
    complete: false // false for pre auth
  }
};
beanstream.payments.makePayment(tokenPayment)
  .then(function(response){
    // display success
  })
  .catch(function(error){
    console.log(error);
  });

// capture/complete a lesser amount
beanstream.payments.completePayment(transId, {amount: 50.50})
  .then(function(result) {
    // payment captured/completed
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$beanstream = new \Beanstream\Gateway('300200578', '4BaD82D9197b4cc4b70a221911eE9f70', 'www', 'v1');

$legato_payment_data = array(
    'order_number' => "orderNum45678",
    'amount' => 100.0,
    'name' => 'Mrs. Legato Testerson'
);
try {
    $result = $beanstream->payments()->makeLegatoTokenPayment($token, $legato_payment_data, FALSE);//set to FALSE for Pre-Auth
    $transaction_id = $result['id'];
    // complete payment
    $result = $beanstream->payments()->complete($transaction_id, 12.5);
    print_r( $result );
} catch (\Beanstream\Exception $e) {
    //todo handle exception
}
```

```ruby
begin
  result = Beanstream.PaymentsAPI.make_payment(
    {
      :order_number => PaymentsAPI.generateRandomOrderId("test"),
      :amount => 13.99,
      :payment_method => PaymentMethods::TOKEN,
      :token => {
        :name => "Gizmo Test",
        :code => token, # add your token here
        :complete => false #false makes it a pre-auth
      }
    }
  )
  puts "result: #{result}"
  transaction_id = result['id']

  result = Beanstream.PaymentsAPI.complete_preauth(transaction_id, 10.33)
  puts "completion result: #{result}"
rescue BeanstreamException => ex
  puts "Error: #{ex.user_facing_message()}"
end
```

```python
beanstream = gateway.Beanstream()
beanstream.configure(
    '300200578',
    payment_passcode='4BaD82D9197b4cc4b70a221911eE9f70')
txn = beanstream.preauth_with_token(50.0, token)
txn.set_cardholder_name("Gizmo")
resp = txn.commit()
# complete payment
trans2 = beanstream.preauth_completion(resp.transaction_id(), 25.00)
resp2 = trans2.commit()
```

```java
Gateway beanstream = new Gateway("v1",
    300200578,
    "4BaD82D9197b4cc4b70a221911eE9f70");

TokenPaymentRequest req = new TokenPaymentRequest();
req.setAmount(80.00);
req.setOrderNumber("myOrder77777");
req.getToken()
    .setName("John Doe")
    .setCode(myLegatoToken);

try {
    PaymentResponse response = beanstream.payments().preAuth(req);
	// complete payment
    response = beanstream.payments().preAuthCompletion(response.id, 55.30, response.orderNumber);
} catch (BeanstreamApiException ex) {
    //todo handle error
}
```

```csharp
Gateway beanstream = new Gateway () {
    MerchantId = 300200578,
    PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70",
    ApiVersion = "1"
};

PaymentResponse response = beanstream.Payments.PreAuth (
    new TokenPaymentRequest ()
    {
        Amount = 30,
        OrderNumber = "orderNumber66666",
        Token = new Token {
            Code = token, // your Legato token
            Name = "John Doe"
        }
    }
);

response = beanstream.Payments.PreAuthCompletion (response.TransactionId, 15.45);
```

```go
import (
	beanstream "github.com/Beanstream/beanstream-go"
	"github.com/Beanstream/beanstream-go/paymentMethods"
)

config := beanstream.DefaultConfig()
config.MerchantId = "300200578"
config.PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70"

gateway := beanstream.Gateway{config}
request := beanstream.PaymentRequest{
    PaymentMethod: paymentMethods.TOKEN,
    OrderNumber:   "order0012345",
    Amount:        15.99,
    Token: beanstream.Token{
        token, // add your Legato token here
        "John Doe",
        false}} // false for pre-auth
res, err := gateway.Payments().MakePayment(request)
// complete payment
res2, err2 := gateway.Payments().CompletePayment(res.ID, 5.67)
```

### Payment Profile

```shell
Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "payment_method":"payment_profile",
    "order_number":"UPDQWX1429722203",
    "amount":12.99,
    "payment_profile":{
        "customer_code":"053EF0CFD9b847dE8115ED21C2b1e7df",
        "card_id":1,
        "complete":true
    }
}'
```

```javascript
var profilePayment = {
    order_number: 'order123456abc',
    amount:3.00,
    payment_method:"payment_profile",
    payment_profile:{
      customer_code: profileCustomerCode,
      card_id: 1,
      complete: true
    },
    comment: 'making a payment with a tokenized card on a payment profile.'
  };
beanstream.payments.makePayment(profilePayment)
  .then(function(response){
    // display success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$beanstream = new \Beanstream\Gateway('300200578', '4BaD82D9197b4cc4b70a221911eE9f70', 'www', 'v1');

$profile_payment_data = array(
    'order_number' => "abc123",
    'amount' => 75.50
);
try {
    $result = $beanstream->payments()->makeProfilePayment($profile_id, 1, $profile_payment_data, TRUE); //set to FALSE for Pre-Auth
    print_r( $result );
} catch (\Beanstream\Exception $e) {
    //handle exception
}
```

```ruby
begin
  profile_payment = Beanstream.PaymentsAPI.getProfilePaymentRequestTemplate()
  profile_payment[:payment_profile][:customer_code] = profile_id
  profile_payment[:amount] = 77.50
  result = Beanstream.PaymentsAPI.make_payment(profile_payment)
rescue BeanstreamException => ex
  puts "Error: #{ex.user_facing_message()}"
end
```

```python
beanstream = gateway.Beanstream()
beanstream.configure(
    '300200578',
    payment_passcode='4BaD82D9197b4cc4b70a221911eE9f70')
trans = beanstream.purchase_with_payment_profile(50.43, profile_id)
resp = trans.commit()
```

```java
Gateway beanstream = new Gateway("v1",
    300200578,
    "4BaD82D9197b4cc4b70a221911eE9f70");

ProfilePaymentRequest req = new ProfilePaymentRequest();
req.setProfile(new ProfilePaymentRequestData()
    .setCardId(1)
    .setCustomerCode(profile.getId()));
req.setAmount(13);
req.setOrderNumber("myOrderId00002");

try {
    PaymentResponse response = beanstream.payments().makePayment(req);
    System.out.println("Card Payment Approved? "+ response.isApproved());

} catch (BeanstreamApiException ex) {
    // todo handle error
}
```

```csharp
Gateway beanstream = new Gateway () {
    MerchantId = 300200578,
    PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70",
    ApiVersion = "1"
};

PaymentResponse payment = beanstream.Payments.MakePayment (new ProfilePaymentRequest() {
    Amount = 40.95,
    OrderNumber = "myOrder002233",
    PaymentProfile = new PaymentProfileField() {
        CardId = 1,
        CustomerCode = profile_id
    }
});
```

```go
import (
	beanstream "github.com/Beanstream/beanstream-go"
	"github.com/Beanstream/beanstream-go/paymentMethods"
)

config := beanstream.DefaultConfig()
config.MerchantId = "300200578"
config.PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70"

gateway := beanstream.Gateway{config}
payment := beanstream.PaymentRequest{
	PaymentMethod: paymentMethods.PROFILE,
	OrderNumber:   "orderId000345",
	Amount:        12.99,
	Profile: beanstream.ProfilePayment{
		res.Id,
		1,
		true}} // set to false for pre-auth
res, err := gateway.Payments().MakePayment(payment)
```

#### Pre-Auth and Complete

```shell
Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "payment_method":"payment_profile",
    "order_number":"UPDQWX1429722203",
    "amount":12.99,
    "payment_profile":{
        "customer_code":"053EF0CFD9b847dE8115ED21C2b1e7df",
        "card_id":1,
        "complete":false
    }
}'

#
# completion:
#

Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments/{transId}/completions \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "amount":9.20
}'
```

```javascript
var profilePayment = {
    order_number: 'order123456abc',
    amount:3.00,
    payment_method:"payment_profile",
    payment_profile:{
      customer_code: profileCustomerCode,
      card_id: 1,
      complete: false
    },
    comment: 'making a payment with a tokenized card on a payment profile.'
  };
beanstream.payments.makePayment(profilePayment)
  .then(function(response){
    // display success
  })
  .catch(function(error){
    console.log(error);
  });

// capture/complete a lesser amount
beanstream.payments.completePayment(transId, {amount: 50.50})
  .then(function(result) {
    // payment captured/completed
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$beanstream = new \Beanstream\Gateway('300200578', '4BaD82D9197b4cc4b70a221911eE9f70', 'www', 'v1');

$profile_payment_data = array(
    'order_number' => "abc123",
    'amount' => 75.50
);
try {
    $result = $beanstream->payments()->makeProfilePayment($profile_id, 1, $profile_payment_data, FALSE); // FALSE for Pre-Auth
    $transaction_id = $result['id'];
    // complete payment
    $result = $beanstream->payments()->complete($transaction_id, 12.5);
    print_r( $result );
} catch (\Beanstream\Exception $e) {
    //todo handle exception
}
```

```ruby
begin
  # pre-auth
  profile_payment = Beanstream.PaymentsAPI.getProfilePaymentRequestTemplate()
  profile_payment[:amount] = 80
  profile_payment[:payment_profile][:customer_code] = profile_id
  profile_payment[:payment_profile][:complete] = false #false for pre-auth
  result = Beanstream.PaymentsAPI.make_payment(profile_payment)

  #complete pre-auth
  result = Beanstream.PaymentsAPI.complete_preauth(result['id'], 40.50)
  puts "success: #{result}"
rescue BeanstreamException => ex
  puts "Error: #{ex.user_facing_message()}"
end
```

```python
txn = beanstream.preauth_profile(60, customer_code)
resp = txn.commit()
trans = beanstream.preauth_completion(resp.transaction_id(), 25.00)
```

```java
Gateway beanstream = new Gateway("v1",
    300200578,
    "4BaD82D9197b4cc4b70a221911eE9f70");

ProfilePaymentRequest req = new ProfilePaymentRequest();
req.setProfile(new ProfilePaymentRequestData()
    .setCardId(1)
    .setCustomerCode(profile.getId()));
req.setAmount(130);
req.setOrderNumber("myOrderId00002");

try {
    PaymentResponse result = beanstream.payments().preAuth(paymentRequest);

    // complete the pre-auth
    result = beanstream.payments().preAuthCompletion(result.id, 100, null);

} catch (BeanstreamApiException ex) {
    // todo handle error
}
```

```csharp
Gateway beanstream = new Gateway () {
    MerchantId = 300200578,
    PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70",
    ApiVersion = "1"
};
// pre-auth
PaymentResponse payment = beanstream.Payments.PreAuth (new ProfilePaymentRequest() {
    Amount = 50,
    OrderNumber = "myFancyOrderID-1234",
    PaymentProfile = new PaymentProfileField() {
        CardId = 1,
        CustomerCode = response.Id
    }
});
// complete payment
payment = beanstream.Payments.PreAuthCompletion (payment.TransactionId, 15.12);
```

```go
import (
	beanstream "github.com/Beanstream/beanstream-go"
	"github.com/Beanstream/beanstream-go/paymentMethods"
)

config := beanstream.DefaultConfig()
config.MerchantId = "300200578"
config.PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70"

gateway := beanstream.Gateway{config}
payment := beanstream.PaymentRequest{
	PaymentMethod: paymentMethods.PROFILE,
	OrderNumber:   "orderId000345",
	Amount:        12.99,
	Profile: beanstream.ProfilePayment{
		res.Id,
		1,
		false}} // false for pre-auth
res, err := gateway.Payments().MakePayment(payment)
// complete payment
res2, err2 := gateway.Payments().CompletePayment(res.ID, 5.67)
```

### Cash

```shell
Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "payment_method":"cash",
    "order_number":"MyOrderId000011223344",
    "amount":15.00
}'
```

```javascript

```

```php
$beanstream = new \Beanstream\Gateway('300200578', '4BaD82D9197b4cc4b70a221911eE9f70', 'www', 'v1');

$legato_payment_data = array(
    'order_number' => "orderNum45678",
    'amount' => 100.0,
    'name' => 'Mrs. Testerson'
);
```

```ruby

```

```python
beanstream = gateway.Beanstream()
beanstream.configure(
        '300200578',
        payment_passcode='4BaD82D9197b4cc4b70a221911eE9f70')

txn = self.beanstream.record_cash_purchase(20)
resp = txn.commit()
```

```java
Gateway beanstream = new Gateway("v1",
    300200578,
    "4BaD82D9197b4cc4b70a221911eE9f70");

CashPaymentRequest cashReq = new CashPaymentRequest();
cashReq.setAmount(123.45);
cashReq.setOrderNumber("fancyPantsOrder001");

try {
    PaymentResponse response = beanstream.payments().makePayment(cashReq);
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
Gateway beanstream = new Gateway () {
    MerchantId = 300200578,
    PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70",
    ApiVersion = "1"
};
PaymentResponse response = beanstream.Payments.MakePayment (
    new CashPaymentRequest () {
        Amount = 50.00,
        OrderNumber = "orderNum-GobBluth"
    }
);
```

```go
import (
	beanstream "github.com/Beanstream-DRWP/beanstream-go"
	"github.com/Beanstream-DRWP/beanstream-go/paymentMethods"
)

config := beanstream.DefaultConfig()
config.MerchantId = "300200578"
config.PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70"

gateway := beanstream.Gateway{config}
request := beanstream.PaymentRequest{
    PaymentMethod: paymentMethods.CASH,
    OrderNumber:   "order12345b",
    Amount:        12.00}
res, err := gateway.Payments().MakePayment(request)
```

### Cheque

```shell
Definition
POST /v1/payments HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/payments \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-H "Content-Type: application/json" \
-d '{
    "payment_method":"cheque",
    "order_number":"MyOrderId000011223344",
    "amount":15.00
}'
```

```javascript

```

```php
$beanstream = new \Beanstream\Gateway('300200578', '4BaD82D9197b4cc4b70a221911eE9f70', 'www', 'v1');

$payment_data = array(
    'order_number' => "987654321",
    'amount' => 10.50
);

$result = $beanstream->payments()->makeChequePayment($payment_data);
```

```ruby

```

```python
beanstream = gateway.Beanstream()
beanstream.configure(
        '300200578',
        payment_passcode='4BaD82D9197b4cc4b70a221911eE9f70')

txn = self.beanstream.record_cheque_purchase(20)
resp = txn.commit()
```

```java
Gateway beanstream = new Gateway("v1",
    300200578,
    "4BaD82D9197b4cc4b70a221911eE9f70");

ChequePaymentRequest chequeReq = new ChequePaymentRequest();
chequeReq.setAmount(12.99);
chequeReq.setOrderNumber("fancyPantsOrder002");

try {
    PaymentResponse response = beanstream.payments().makePayment(chequeReq);
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
Gateway beanstream = new Gateway () {
    MerchantId = 300200578,
    PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70",
    ApiVersion = "1"
};
PaymentResponse response = beanstream.Payments.MakePayment (
    new ChequePaymentRequest () {
        Amount = 50.00,
        OrderNumber = "orderNum-TobiasFunke"
    }
);
```

```go
import (
	beanstream "github.com/Beanstream-DRWP/beanstream-go"
	"github.com/Beanstream-DRWP/beanstream-go/paymentMethods"
)

config := beanstream.DefaultConfig()
config.MerchantId = "300200578"
config.PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70"

gateway := beanstream.Gateway{config}
request := beanstream.PaymentRequest{
    PaymentMethod: paymentMethods.CHEQUE,
    OrderNumber:   "order12345b",
    Amount:        12.00}
res, err := gateway.Payments().MakePayment(request)
```

### Interac
ToDo: Add full code sample. No full code sample in WP site.
ToDo: Add redirection code sample. see: http://developer.beanstream.com/documentation/take-payments/redirection/

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

### 3D Secure
ToDo: Add code sample. No code sample in WP site.
ToDo: Add redirection code sample. see: http://developer.beanstream.com/documentation/take-payments/redirection/

```shell

```

```javascript

```

```php

```

```ruby

```

```python

```

```java

```

```csharp

```

```go

```

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

## Unreferenced Returns

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

## Errors
