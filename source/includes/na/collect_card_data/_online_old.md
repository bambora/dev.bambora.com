## Browser SDK
The first step in any payment is for you to collect your customers credit card data. All companies that accept, process, store or transmit credit card information must meet the Payment Card Industry Data Security Standard (PCI DSS). You can limit the burden of the PCI requirements by limiting the extent to which you interact with the raw credit card data.

Payfields and Payform are client-side JavaScript libraries that handle credit card input within the your web page. They limit the scope of your PCI compliance by removing the need for you to pass credit card information through your servers.

## Payform
PayForm is a small Javascript library that injects a payment button and an iframe into your web page. When the user clicks the button a payment form is rendered into the iframe with an appearance similar to that of a popover dialog.

### How It Works
The PayForm script is read and executed as your page loads. It injects a payment button and an iframe into your web page. When the user clicks the button a payment form is rendered into the iframe. The payment form may contain input fields for a shipping address, for a billing address and for credit card details. PayForm provides some client-side validation, smart field data formatting, and responsive design.

Once the user has completed all fields with valid input the iframe is removed from the UI and a 'beanstream_payform_complete' event is fired containing the address information and a token for the credit card details.

### Integration
Adding PayForm to your web page could not be easier. You simply add a script element pointing at the PayForm script. PayForm is configured by setting data attributes on the script element. It can be configured to collect shipping and billing addresses in addition to the card details.

The required parameters are:

* data-amount: the amount you are going to charge the customer
* data-currency: the currency

The optional parameters are:

* data-name: your company name
* data-image: your company logo
* data-description: a description of the purchase
* data-shippingAddress: if the shipping address is required - true/false
* data-billingAddress: if the billing address is required - true/false
* data-submitForm: if the form's default action should be executed - true/false

#### Step 1: Add PayForm To Your Form
```html
<form action="/charge" method="POST">
    <script
        src="https://payform.beanstream.com/payform/beanstream_payform.js"
        data-image="https://downloads.beanstream.com/images/payform/cc_placeholder.png"
        data-name="ACME Corp."
        data-description="2 widgets"
        data-amount="2000"
        data-currency="cad"
        data-billingAddress="true"
        data-shippingAddress="true"
        data-submitForm="false">
    </script>
</form>

<script>
    document.addEventListener('beanstream_payform_complete', function(e) {
        // e.eventDetail.cardInfo
        // e.eventDetail.billingAddress
        // e.eventDetail.shippingAddress

        // send payment data to the server here
        // or read it when it is submitted to your server through the form post
    }, false);
</script>
```

The first step is to create an HTML form that will submit the payment data to your server. In that form you add a `<script>` element that points to [https://payform.beanstream.com/payform/beanstream_payform.js](https://payform.beanstream.com/payform/beanstream_payform.js). You can also supply several parameters to configure the form, such as your company name, logo, product description, price, currency, and whether billing/shipping addresses should be displayed.

This will inject a button in the location of the `<form>` and when the customer clicks on it, the PayForm will pop up. As soon as the customer fills out the information and hits the **Pay** button at the end, PayForm will tokenize the card data and submit the form. Just before the form is submitted it will fire an event called `beanstream_payform_complete` that you can listen to so you can retrieve a JSON format of the form data to send to your server. This event also allows you to perform an asynchronous AJAX call to your server to process the payment if you want. This is described in the next section: Response Fields.

Note that the `<form action="/charge">` element, where `/charge` is your service processing the payment, will have the payment data posted to it only if you set the data attribute `data-submitForm="true"`.

#### Step 2: Response Fields
```json
 {
  "isTrusted":false,
  "eventDetail":{
    "cardInfo":{
      "code":"a01-ae366cb9-3efa-4c82-b955-0bf59e2df359",
      "name":"Joe Smith",
      "email":"joe@example.com"
    },
    "billingAddress":{
      "name":"Joe Smith",
      "address_line1":"123 Fake St",
      "postal_code":"123 456",
      "city":"Victoria",
      "province":"BC",
      "country":"Canada"
    },
    "shippingAddress":{
      "name":"Joe Smith",
      "address_line1":"123 Fake St",
      "postal_code":"123 456",
      "city":"Victoria",
      "province":"BC",
      "country":"Canada"
    }
}}
 ```

There are two ways to collect the card token and form data. This is controlled by the `data-submitForm="false"` attribute. If you set it to false, then the 'beanstream_payform_complete' event will be triggered and you can send the data to your server asynchronously. The JSON blob will be in the `eventDetail` section of the event data. The card token will be `eventDetail.cardInfo.code`.

If `data-submitForm="true"` then the data collected is injected into hidden fields in the `<form>` element wrapping the PayForm script element. The whole message looks like this:


#### Step 3: Process The Payment

Whether you collect the card data from the event and send it asynchronously to your server, or receive it directly on your server via form POST, you will need to collect the `eventDetail.cardInfo.code` string vale, that is your token that you will process the payment with. In the above output example the token is *a01-ae366cb9-3efa-4c82-b955-0bf59e2df359**.

Now that you have tokenized card data on your server, use it to either [process or pre-authorize a payment](http://developer.beanstream.com/documentation/take-payments/purchases/take-payment-legato-token/), or create a [payment profile](http://developer.beanstream.com/tokenize-payments/create-new-profile/).

## Payfields
PayFields is very similar to PayForm, but it allows you to design your own form. It simply:
 * Injects input fields into page. (credit card number, CVD, or expiry).
 * Recognizes card type (Mastercard, Visa, etc.) and restricts, formats and validates input accordingly.   
 * Tokenizes card data, clears fields, and appends hidden field containing token to form.
 * Fires events on document. Fires event `beanstream_payfields_loaded` to allow custom styling. Fires event `beanstream_payfields_inputValidityChanged` to allow custom error messaging. Fires event `beanstream_payfields_tokenRequested` to allow merchant to update UI if desired. Fires event `beanstream_payfields_tokenUpdated` to allow merchant to control form submission flow. (By default the form is submitted when the token is appended).


#### Integration
#### Minimal
```html
<form action='pay.php'>
  <script src='https://payform.beanstream.com/payfields/beanstream_payfields.js'></script>
  <button type='submit'>Submit</button>
</form>
```

The minimal integration involves adding the script tag to a webpage within a form containing a submit button.

`pay.php` is an example of your server's API endpoint where you want to handle a payment being processed.

The above example uses PayField's default display and behaviour, but it is also possible to configure it:
 * Placeholders can be added to the HTML markup to specify where the fields are injected.  
 * The web page can listen for callbacks from Payfields to handle styling and error states.
 * The 'data-submit-form' attribute on the script tag can be used to specify if the Payflelds should submit the form after tokenization, or just fire an event.

#### Real world
```javascript
<form action='pay.php'>
  <div class='form-group'>
    <label>Card Number</label>
    <div data-beanstream-target='ccNumber_input'></div>
    <div data-beanstream-target='ccNumber_error' class='help-block'></div>
  </div>
  <div class='form-group'>
    <label>Expiry (MM/YY)</label>
    <div data-beanstream-target='ccExp_input'></div>
    <div data-beanstream-target='ccExp_error' class='help-block'></div>
  </div>
  <div class='form-group'>
    <label>CVV</label>
    <div data-beanstream-target='ccCvv_input'></div>
    <div data-beanstream-target='ccCvv_error' class='help-block'></div>
  </div>
  <script src='https://payform.beanstream.com/payfields/beanstream_payfields.js'     
          data-submit-form='false'></script>
  <button type='submit' class='btn btn-default'>Submit</button>
</form>
```

The integration below shows placeholders and the data attribute in use. It shows PayFields placeholders within the markup of a Bootstrap styled form.
