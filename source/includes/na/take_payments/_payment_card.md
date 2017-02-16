
## Purchases and Pre-Auth's

A Payment processes the credit card right away. A Pre-authorization (aka “pre-auth”) checks to see if the customer has the funds available without actually charging them. After a pre-auth you will want to “complete” the payment for less than or equal to the original pre-auth amount.

Set the Credit Card object’s “complete” value to true to complete a payment after a pre-auth, or to just push the payment through in the first place without pre-auth.

## Credit Card
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

**Test Cards**<br/>
If you are using a test account, or a production account that is still in its initial 'test' mode, you’ll need to use test card numbers. You’ll be able to view the transaction process from beginning to end without sending real information to the banking network. See [here](http://support.beanstream.com/olm/w/docs/using-test-card-numbers.htm) for a list of test card numbers.

**Required Parameters**<br/>
Please refer to the [API Spec](../../merchant_api) for full details on parameters.

**Approved and declined responses**<br/>
If you are using an SDK an approved payment will return a payment response object. A declined payment will throw an exception or return an error. If you are using the rest API directly then an approved payment will return a 200 OK http status response as well as a response object.

You can view the data model of the response below in the REST API section. The data model there is the same in the REST response as well as the SDKs.

The response objects will contain all of the relevant payment information as well as a transaction ID.

**Note:**<br/>

* For a regular credit card payment, set "complete" to "true"
* For a pre-authorization, set "complete" to "false"
* For a pre-authorization completion, set "complete" to "true"


### Pre-Auth and Complete

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

For completions you will have to supply the Transaction Id {TransId} to the URL when using REST. The transId is returned from the pre-auth.
