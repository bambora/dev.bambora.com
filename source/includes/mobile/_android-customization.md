
# Customization

You have the option of creating your own, fully customizable native credit card registration form or even using a hosted registration web page instead. This requires a bit more effort compared to using the default form, but it also gives you more control over the design.

## Custom Native Form

Customizing the native SDK registration form directly is fairly straight forward.

### GUI compontents

```java
<com.bambora.nativepayment.widget.edittext.CardNumberEditText
  android:id="@+id/card_number_edit_text"
  android:layout_width="match_parent"
  android:layout_height="48dp" />

<com.bambora.nativepayment.widget.edittext.ExpiryDateEditText
    android:id="@+id/expiry_date_edit_text"
    android:layout_width="match_parent"
    android:layout_height="48dp" />

<com.bambora.nativepayment.widget.edittext.SecurityCodeEditText
    android:id="@+id/security_code_edit_text"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

The SDK contains bundled EditText classes that help out with input validation and formatting.

`CardNumberEditText`, `ExpiryDateEditText` and `SecurityCodeEditText` are subclasses of `CardFormEditText`, described below, and add functionality for input formatting and automatic validation by using custom TextWatcher classes. Use these classes if you want to customise the look of the registration form but keep our standard formatting and validation of the input.

The example shows how to add the GUI components in a layout file.



### Manual formatting and validation

```java
// Variables
private Pattern validationPattern; // Pattern used for validating the EditText input.
private Pattern formatPattern; // Pattern used for validating the format of the input in EditTest.
private IOnValidationEventListener validationEventListener; // Interface used for validation callbacks.

// Abstract methods
public abstract Integer getMaxLength();
public abstract String getDefaultHint();

// Methods
public void setValidationListener(IOnValidationEventListener validationListener);

@Override
public boolean isFormatted();

@Override
public boolean isValid();
```

`CardFormEditText` is an abstract subclass of EditText with extended functionality that helps out with input validation. `CardFormEditText` introduces three new instance variables and five new methods. Use this class if you want to have full control of formatting and validation.


### Making the request

```java
BNPaymentHandler.getInstance().registerCreditCard(
        getContext(),
        "<CARD_NUMBER_FROM_YOUR_FORM>",
        "<EXPIRY_MONTH_FROM_YOUR_FORM>",
        "<EXPIRY_YEAR_FROM_YOUR_FORM>",
        "<CVC_CODE_FROM_YOUR_FORM>",
        resultListener);
```

The exampe shows how to use the `registerCreditCard` method in `BNPaymentHandler` for encrypting and sending input data from your custom native credit card registration form to our back end for processing.



> **NOTE:** *You are responsible for only sending the form data once since this network call is not idempotent.*

### Callback

```java
ICardRegistrationCallback resultListener = new ICardRegistrationCallback() {
  @Override
  public void onRegistrationSuccess(CreditCard creditCard) {
    // Handle success here.
  }

  @Override
  public void onRegistrationError(RequestError error) {
    // Handle error here.
  }
}
```

The example shows how to create a listener in order to handle the result of an attempted credit card registration.




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



### Register the Activity

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

    /* You can use these callback methods to manage the Hosted Page: */

    @Override
    public void onRegistrationStarted() {
        // Hosted Page started loading.
    }

    @Override
    public void onPageFinished() {
        // Hosted Page finished loading.
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

The first step to using the Hosted Page is to create a new Activity, set the content view, and register a listener, as shown in the code example.

The code examples include callback methods that you can use to manage the Hosted Page.

The callback `onRegistrationCompleted` is triggered when a credit card has been successfully registered. The method is supplied with a [`CreditCard`](https://github.com/bambora/BNPayment-Android/blob/master/bn-payment/src/main/java/com/bambora/nativepayment/models/creditcard/CreditCard.java) object that contains a token you can use to make a payment. To get the token just call `creditCard.getCreditCardToken()`.

The callback `onFailure` is called if there is an error or if a credit card is invalid. It is supplied with a [`RegistrationFormError`](https://github.com/bambora/BNPayment-Android/blob/master/bn-payment/src/main/java/com/bambora/nativepayment/models/creditcard/RegistrationFormError.java) that is an enum of the error type that occurred:

* PAGE_LOAD_ERROR
* SUBMISSION_DECLINED
* SESSION_ERROR
* SYSTEM_ERROR
* UNKNOWN

### Set a custom CSS file

```java
myWebView.setCssUrl(CSS_URL)
```

You can use the `setCssUrl()` method on a `CreditCardRegistrationWebView` object to provide the URL to a custom CSS file in order to affect the design of the Hosted Page.

If no custom CSS file is used, Native Payment will automatically use a default CSS file to style the Hosted Page.

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


### Change Placeholder Text

You can change the placeholder text of the form either with the layout file or through code.

While there are two different ways of editing the default text in the Hosted Page, we recommend using one of the two method (but not both).


#### Layout file

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

Here you can see a custom layout file for setting the text on the form. The other alternative is to set the text from your code, as described in the next section "using code".



#### Using code

```java
myWebView.setCardNumberHint("Card number");
myWebView.setCardExpiryHint("MM/YY");
myWebView.setCardCvvHint("CVV/CVC");
myWebView.setSubmitButtonText("Save card");
```

You can use your Web View object to change the text on the form, as demonstrated in the code example.

