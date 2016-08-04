<a name="hosted-payment-page"></a>
# HPP: Hosted Payment Page

The Hosted Payment Page (HPP) is a feature of the Native Payment SDK that enables the use of a lightweight payment webpage that can be loaded in an app. A user will be able to register a credit card using that form and in return the app will receive a subscriptionid which can be used for recurring payments.

The code example shows how the HTML structure of how the HPP looks. The placeholders "{CUSTOM_TEXT}" show where text can be customized.

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

The default CSS can be used out of the box, but in case you wish to brand the HPP to your own style you may do so by sending a custom CSS (See below).

This is how the HPP looks with the default CSS:

![HPP](/images/hpp.png)

## Web-based credit card registration

*Make sure you've successfully [set up `Native Payment` (iOS)](#native-payment-ios) [(Android)](#native-payment-android) before implementing this functionality.*

Credit card registration is done through a secure web-based registration form, also known as a Hosted Payment Page, that you can easily include in your app as the code example shows.

The code examples include callback methods that you can use to manage the Hosted Payment Page.

```java
public class RegisterCreditCardActivity extends AppCompatActivity
  implements CreditCardRegistrationWebView.IStateChangeListener {

    private CreditCardRegistrationWebView myWebView;
    private static final String CSS_URL = "<CSS_URL>";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_register_credit_card);
        myWebView = (CreditCardRegistrationWebView) findViewById(R.id.register_credit_card_webview);
        myWebView.setStateChangeListener(this);
        myWebView.setCssUrl(CSS_URL);
    }

    /* You can use these callback methods to manage the Hosted Payment Page: */

    @Override
    public void onRegistrationStarted() {
        // Hosted Payment Page started loading.
    }

    @Override
    public void onPageFinished() {
        // Hosted Payment Page finished loading.
    }

    @Override
    public void onRegistrationCompleted(CreditCard creditCard) {
        // Credit card registration succeeded.
    }

    @Override
    public void onFailure(RegistrationFormError error) {
        // Credit card registration failed.
    }

}
```

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

### HTTP Responses

**200 OK:** A response body containing a session URL to the Hosted Payment Page is returned.

**403 Forbidden:** You are not authorized for this operation with the authentication you have provided.

## HPP customization on iOS

### Set a custom CSS file and custom placeholder text

The code example shows how to specify a CSS file and how to set default placeholder values for the card registration text fields and the submit button in the HPP:

If no custom CSS file is used, Native Payment will automatically use a default CSS file to style the Hosted Payment Page.

```objective_c
BNCCHostedFormParams customizationSettings = [BNCCHostedFormParams hostedFormParamsWithCSS:@"CSS_URL>"
  cardNumberPlaceholder:@"Card number"
      expiryPlaceholder:@"MM/YY"
         cvvPlaceholder:@"CVV/CVC" submitText:@"Save card"];

BNCCHostedRegistrationFormVC *ccHostedRegistrationVC =
  [[BNCCHostedRegistrationFormVC alloc] initWithHostedFormParams:customizationSettings];
```

### Set custom header and footer views

You can specify a custom header view (to be displayed above the HPP) and a custom footer view (to be displayed under the HPP).

```objective_c
ccHostedRegistrationVC.webviewDelegate = self;
[ccHostedRegistrationVC addHeaderView:<HEADER_VIEW>]; // Set a custom header view
[ccHostedRegistrationVC addFooterView:<FOOTER_VIEW>]; // Set a custom footer view
```

## HPP customization on Android

### Set a custom CSS file

You can use the `setCssUrl()` method on a CreditCardRegistrationWebView object to provide the URL to a custom CSS file in order to affect the design of the Hosted Payment Page.

If no custom CSS file is used, Native Payment will automatically use a default CSS file to style the Hosted Payment Page.

```java
myWebView.setCssUrl(CSS_URL)
```

### Set custom placeholder text using a layout file

Here you can see a custom layout file for setting the text on the form. The other alternative is to set the text from your code, as described in the next section.

```xml
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".MainActivity">

    <com.bambora.bpstransactionlib.webview.CreditCardRegistrationWebView
        android:id="@+id/register_credit_card_webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:card_number_hint="Card number"
        app:card_expiry_hint="MM/YY"
        app:card_cvv_hint="CVV/CVC"
        app:submit_button_text="Save card" />

</RelativeLayout>
```

### Set the Hosted Payment Page text using code

```java
myWebView.setCardNumberHint("Card number");
myWebView.setCardExpiryHint("MM/YY");
myWebView.setCardCvvHint("CVV/CVC");
myWebView.setSubmitButtonText("Save card");
```

While there are two different ways of editing the default text in the Hosted Payment Page - using a layout file and setting the text by using code - we recommend using one of these two method (but not both).

## HPP Responses

This section describes the structure of common answers that are sent from the Hosted Payment Page to the Native Payment SDK.

### Successful credit card registration

Returned after a card has been successfully registered through the HPP.

```javascript
{
    "expmonth": int,
    "expyear": int,
    "meta": {
        "action": {
            "code": int,
            "source": string,
            "type": string
        },
        "message": {
           "enduser": string,
           "merchant": string,
        },
        "result": int
    }
    "paymenttype": string,
    "subscriptionid": string,
    "truncatedcardnumber": string
}
```

## Customization overview

You can customize the Hosted Payment Page by:

* Using a custom CSS file to change the look and feel of the page. If no custom CSS file is used, Native Payment will automatically use a default CSS file to style the Hosted Payment Page.

* Selecting text to be used in the form.

* Setting a custom header and footer

## Default CSS example


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

The content type of your CSS file should be text/css.