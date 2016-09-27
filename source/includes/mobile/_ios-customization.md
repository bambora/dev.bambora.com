
# Customization

You have the option of creating your own, fully customizable native credit card registration form or even using a hosted registration web page instead. This requires a bit more effort compared to using the default form, but it also gives you more control over the design.

## Custom Native Form

Customizing the native SDK registration form directly is fairly straight forward.


### GUI compontents

```objective_c
// This property lets us specify a regex used for validating the input text.
@property (nonatomic, strong) NSString *validRegex;

// This property lets us specify a regex used for
// describing which type of input that is allowed.
@property (nonatomic, strong) NSString *inputRegex;

// This method checks if the text property matches the validRegex property.
- (BOOL)hasValidInput;
```

The SDK contains bundled text fields that help you with input validation and formatting.

**BNBaseTextField** is a subclass of `UITextField` with added functionality. You can either choose to use `BNBaseTextField` as is or make your own subclass. `BNBaseTextField` has two additional properties and a additional method compared to `UITextField`:



**BNCreditCardNumberTextField** is a subclass of `BNBaseTextField`. This textfield is tailored for handling credit card number formatting in the format `dddd dddd dddd dddd`. `BNBaseTextField` also contains automatic validation of the input triggered either by calling `hasValidInput` instance method or when the text field resigns first responder.

**BNCreditCardExpiryTextField** is a subclass of `BNBaseTextField`. This textfield is tailored for handling card expiry input in the format `MM/YY"`. `BNBaseTextField` also contains automatic validation of the input triggered either by calling `hasValidInput` instance method or when the text field resigns first responder.

### How to handle input

```objective_c
// A method for applying default style to UITextField.
- (void)applyStyle;

/* A method for styling the textfield.
An invalid textfield will have red text color.
A valid textfield will have black text color. */
- (void)setTextfieldValid:(BOOL)valid;

// Validate card number according regex: ^(?:\\d[ -]*?){16}$
- (BOOL)validCardNumber;

// Validate card CVC according regex: ^[0-9]{3,4}$
- (BOOL)validCVC;

/* Validate card CVC according regex: ^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$.
and that the date is in the future.*/
- (BOOL)validExpiryDate;

// Check if input is a Visa card.
- (BOOL)isVisaCardNumber:(NSString *)cardNumber;

// Check if input is a Visa card.
- (BOOL)isMasterCardNumber:(NSString *)cardNumber;
```

When building your own card registration form you are responsible for handling and formatting the input yourself. We do however include a nifty category called `UITextField+BNCreditCard` which contains a few additional methods.



### Handle encryption

```objective_c
// Collect credit card information
BNCreditCard *creditCard = [BNCreditCard new];
creditCard.cardNumber = @"Your form input here";
creditCard.expMonth = @"Your form input here";
creditCard.expYear = @"Your form input here";
creditCard.cvv = @"Your form input here";

// Encrypt the credit card information
BNRegisterCCParams *params = [[BNRegisterCCParams alloc] initWithCreditCard:creditCard];

```

In order to send the credit card information to our server you must encrypt the data. The code example shows how to do it.



### Handle the network request

```objective_c
[[BNPaymentHandler sharedInstance] registerCreditCard:params completion:^(BNAuthorizedCreditCard *card, NSError *error) {
    if (self.completionBlock && card) {
        self.completionBlock(BNCCRegCompletionDone, card);
    }
}];
```

In order to register you have to generate `BNRegisterCCParams` described in the section above. When you have your params see code example




## Hosted Registration Page

```html
<!DOCTYPE html>
<html>
<head>
    <title>Bambora Hosted Form</title>
    <meta name="viewport" content="width=device-width, maximum-scale=1.0">
</head> 
<body>
    <form>
        <section class="input-group cardnumber">
            <label>{CUSTOM_TEXT}</label>
            <input id="CardNumber" name="CardNumber" placeholder="{CUSTOM_TEXT}" type="tel" value="" />
        </section>
        <section class="input-group expiry">
            <label>{CUSTOM_TEXT}</label>
            <input id="ExpiryDate" name="ExpiryDate" placeholder="{CUSTOM_TEXT}" type="tel" value="" />
        </section>
        <section class="input-group cvc">
            <label>{CUSTOM_TEXT}</label>
            <input id="CardVerification" name="CardVerification" placeholder="{CUSTOM_TEXT}" type="tel" value="" />
        </section>
        <input type="submit" value="{CUSTOM_TEXT}" />
    </form>
</body>
</html>
```

The Hosted Registration Page is a feature of the Native Payment SDK that enables the use of a lightweight card registration webpage that can be loaded in an app. A user will be able to register a credit card using that form and in return the app will receive a `subscriptionid` which can be used for making payments.

This is an alternative to using the default form or the customized native form.

The code example shows how the HTML structure of how the HPP looks. The placeholders "{CUSTOM_TEXT}" show where text can be customized.

The default CSS can be used out of the box, but in case you wish to brand the HPP to your own style you may do so by sending a custom CSS (See below).

This is how the hosted page looks with the default CSS:

![HPP](/images/hpp.png)


## Create View Controller

```objective_c
__weak UIViewController *weakSelf = self;

// Create the view controller for the Hosted Payment Page:
BNCCHostedRegistrationFormVC *ccHostedRegistrationVC =
    [[BNCCHostedRegistrationFormVC alloc] initWithHostedFormParams:<CUSTOM_HOSTED_FORM_SETTINGS>];
    /* Instructions for creating <CUSTOM_HOSTED_FORM_SETTINGS> can found further down on this page in the section "How to customize the Hosted Payment Page" */

// Display the Hosted Payment Page:
[self.navigationController pushViewController:ccHostedRegistrationVC animated:YES];

/* You can use these callback methods to manage the Hosted Payment Page: */

- (void)BNPaymentWebview:(BNPaymentWebview *)webview didStartOperation:(BNPaymentWebviewOperation)operation {
  // Lets you know that an operation (such as loading the hosted payment page) has started.
}

- (void)BNPaymentWebview:(BNPaymentWebview *)webview didFinishOperation:(BNPaymentWebviewOperation)operation {
  // Lets you know when an operation (such as loading the hosted payment page) has finished.
}

- (void)BNPaymentWebview:(BNPaymentWebview *)webview didRegisterAuthorizedCard:(BNAuthorizedCreditCard *)authorizedCard {
  /* Lets you know that a credit card registration attempt succeeded.
  This method Also lets you access the card token (through authorizedCard). */
}

- (void)BNPaymentWebview:(BNPaymentWebview *)webview didFailOperation:(BNPaymentWebviewOperation)operation withError:(NSError *)error {
   // Lets you know that a credit card registration attempt failed.
}
```

The form has several callbacks that you can listen to for various events that occur in the form.


### Custom CSS and text

```objective_c
BNCCHostedFormParams customizationSettings = [BNCCHostedFormParams hostedFormParamsWithCSS:@"CSS_URL>"
  cardNumberPlaceholder:@"Card number"
      expiryPlaceholder:@"MM/YY"
         cvvPlaceholder:@"CVV/CVC" submitText:@"Save card"];

BNCCHostedRegistrationFormVC *ccHostedRegistrationVC =
  [[BNCCHostedRegistrationFormVC alloc] initWithHostedFormParams:customizationSettings];
```
The code example shows how to specify a CSS file and how to set default placeholder values for the card registration text fields and the submit button in the Hosted Page:

If no custom CSS file is used, the SDK will automatically use a default CSS file to style the Hosted Page.



#### Example CSS

```css
body {
    margin-top: 0pt;
    padding: 0pt;
}

form {
    width: 100%;
}

#container {
    padding-top: 10pt;
}

.cardnumber {
    width: 100%;
}

.expiry {
    float: left;
    width: 50%;
}

.expiry input {
    border-top: 0pt;
    border-right: 0.5pt solid #dcddde;
}

.cvc {
    float: right;
    width: 50%;
}

.cvc input {
    border-top: 0pt;
    border-left: 0.5pt solid #dcddde;
}

.input-group {
    margin-bottom: 0pt;
    padding: 0pt;
}

[type=submit] {
    width: 100%;
    font-size: 12pt;
    color: white;
    background-color: #40245f;
    height: 36pt;
    margin-top: 5pt;
    border: 0px;
    border-radius: 0pt;
}

input {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -moz-tap-highlight-color: rgba(0,0,0,0);
    tap-highlight-color: rgba(0,0,0,0);

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    color: #4f5355;
    font-size: 10pt;
    box-sizing: border-box;
    width: 100%;
    height: 30pt;
    border-radius: 1px;
    border: 1pt solid #dcddde;
    padding-left: 10pt;
    padding-right: 10pt;
}

input:focus {
    border-bottom: 1pt solid #8c9091;
}

.invalid {
    border-bottom: 1px solid red;
}
```

The example shows you the default CSS settings. This can be used as the basis for making your own customizations.

The content type of your CSS file should be `text/css`.


### Set custom header and footer views


```objective_c
ccHostedRegistrationVC.webviewDelegate = self;
[ccHostedRegistrationVC addHeaderView:<HEADER_VIEW>]; // Set a custom header view
[ccHostedRegistrationVC addFooterView:<FOOTER_VIEW>]; // Set a custom footer view
```

You can specify a custom header view (to be displayed above the Hosted Page) and a custom footer view (to be displayed under the Hosted Page).