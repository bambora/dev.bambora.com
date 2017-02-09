## Browser SDK (Payfields)
The first step in any payment is for you to collect your customers credit card data. All companies that accept, process, store or transmit credit card information must meet the Payment Card Industry Data Security Standard (PCI DSS). You can limit the burden of the PCI requirements by limiting the extent to which you interact with the raw credit card data.

Our Browser SDK is a client-side JavaScript library that handle credit card input within the your web page. It limits the scope of your PCI compliance by removing the need for you to pass credit card information through your servers.

### How It Works
The script is read and executed as your page loads. It injects a credit card number, a CVV, and an expiry input field into your web page. It recognizes the card type (Mastercard, Visa, etc.) and restricts, formats and validates input accordingly. It tokenizes card data, clears fields, and both re turns the token in a DOM event and appends hidden field containing token to form.

PayFields fires the following events on window.document. It fires event `beanstream_payfields_loaded` to allow custom styling. It fires event `beanstream_payfields_inputValidityChanged` to allow custom error messaging. It fires event `beanstream_payfields_tokenRequested` to allow merchant to update UI if desired. It fires event `beanstream_payfields_tokenUpdated` to allow you to control form submission flow. (By default the form is submitted when the token is appended).


#### Integration

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

The integration example shows placeholders and the data attribute in use. It shows PayFields placeholders within the markup of a Bootstrap styled form.

`pay.php` is an example of your server's API endpoint where you want to handle a payment being processed.

The example uses PayField's default display and behaviour, but it is also possible to configure it:
 * Placeholders can be added to the HTML markup to specify where the fields are injected.  
 * The web page can listen for callbacks from Payfields to handle styling and error states.
 * The 'data-submit-form' attribute on the script tag can be used to specify if the Payflelds should submit the form after tokenization, or just fire an event.
