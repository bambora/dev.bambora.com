
## Payment Profile

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

Payment Profiles provide a secure method of taking payments that reduces your PCI scope. You can take a payment using a token the same as you would take a payment with a credit card, the main difference being you have to supply the Profile’s customer_code.

Before processing a transaction using a 'Payment Profile', you need to have created a one. See [here](../save_customer_data).

A multi-use payment profile token is distinct from a single-use card token. See [here](../save_card_data).

### Pre-Auth and Complete

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
