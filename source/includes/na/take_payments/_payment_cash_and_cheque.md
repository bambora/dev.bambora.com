## Cash

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

If you receive a cash or cheque payment, you can record it through our REST API. We offer this payment method to help provide a centralized record of all your sales.

## Cheque

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

If you receive a cash or cheque payment, you can record it through our REST API. We offer this payment method to help provide a centralized record of all your sales.
