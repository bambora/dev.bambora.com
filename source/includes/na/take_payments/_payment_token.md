## Single-use Token

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

Single-use tokens provide a secure method of taking payments that reduces your PCI scope. You can take a payment using a token the same as you would take a payment with a credit card, the main difference being the ‘payment_method’ parameter and supplying the token.

To process a transaction using a token, you first need to have created a token. You can wither do this from the browser/client using the [Tokenization API](../../merchant_API) or using the [Mobile or Browser SDKs](../collect_card_data).

A single-use token is a 'single-use nonce'. It is distinct from a multi-use Payment Profile token. See [here](../save_card_data).


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
