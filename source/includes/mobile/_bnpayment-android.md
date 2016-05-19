
# Native Payment - Android

This section of the guide will walk you through how to add `Native Payment` to your Android project.

**Edit this Page**

If you have found an issue in this documentation or want to improve it, simply click [here](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/mobile/_bnpayment-android.md), edit the markdown text on that page, and submit a change request. We will review it, accept it, and publish the change automatically.

## Requirements

**Minimum OS Version**

[Android 2.3.3](http://developer.android.com/about/versions/android-2.3.3.html)

**Minimum API Level**

10

**Required Permissions**

Internet (android.permission.INTERNET)

## Recommended IDE

[Android Studio](https://developer.android.com/sdk/index.html) with the [Android Plugin for Gradle](http://developer.android.com/tools/revisions/gradle-plugin.html).

## Installation Via Source

### Step 1: git clone repo

Type this command in a terminal window of your choice in the directory that you want to clone the SDK to. You will need to have Git installed on your system.

```shell
git clone https://github.com/bambora/BNPayment-Android
```

### Step 2: Copy Source to Your Project

Place the cloned repository in your app project. You can then include the Payment module in your app project by including it in **settings.gradle**:

```groovy
include ':bn-payment'
```

### Step 3: Add Dependencies

You can then add the Payment module as a dependency in your app module by adding it to the app module's **build.gradle** file:

```groovy
dependencies {
    compile project(':bn-payment')
}
```

A sample app is included in the cloned repository (BNPayment-Android/app).

## Installation Via JCenter

### Step 1: Add Repository

Add the following dependency under ‘dependencies’ in the app module's build.gradle file:

```groovy
dependencies {
   compile 'com.bambora.bnpayment:bn-payment:1.+'
}
```

### Step 2: Set Permissions

Add the following permission after the **manifest** tag in your **AndroidManifest.xml** file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

<a name="androidsetup"></a>
## Setup

An API token is required in order to communicate with Bambora’s backend through the SDK.

The API token has two purposes: it identifies you as a merchant and it determines whether the SDK should be connected to the test environment or to the production environment. Each environment requires a separate API token.

After signing up for a SDK developer account, you will receive an API token for the test environment. You can then decide to apply for an API token for the production environment.

Once you have an API token, you can use it to implement the setup code in the example.

### Register Handler

Here you register a Handler by using the `BPSBaseLibHandlerBuilder` to build it for you using your API token.

Add the following code at the beginning of the `onCreate method` in the `MainActivity class`, and be sure to swap out `<API_TOKEN>` with your test API token.

*Note that if you provide a test API token, the SDK will enter test mode. If you provide a production API token, the SDK will enter production mode.*

```java
BNPaymentBuilder BNPaymentBuilder = new BNPaymentBuilder(getApplicationContext(),
  API_TOKEN)
  .debug(true);

BNPaymentHandler.setupBNPayments(BNPaymentBuilder);
```
> The debug setting enables logging through logcat if set to true (and disables logging if set to false). The debug setting should be set to false in live applications.

### HTTP Responses

**201 Created** 

**403 Forbidden:** A valid API token is missing.

<a name="androidcreditcardregistration"></a>
## Credit Card registration

Credit card registration is done through a secure web-based registration form, also known as a Hosted Payment Page, that you can easily include in your app as the code example shows.

```java
public class RegisterCreditCardActivity extends AppCompatActivity 
  implements CreditCardRegistrationWebView.IStateChangeListener {

    private CreditCardRegistrationWebView mWebView;
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

### HTTP Responses

**200 OK:** A response body containing a session URL to the Hosted Payment Page is returned.

**403 Forbidden:** Valid credentials are missing.

## How to customize the Hosted Payment Page

You can custom the Hosted Payment Page by:

* Using a custom CSS file to change the look and feel of the page.

* Selecting text to be used in the form.

While there are two different ways of editing the default text in the Hosted Payment Page - using a layout file and setting the text by using code - we recommend using one of these two method (but not both).

### Set a custom CSS file

You can use the `setCssUrl()` method on a CreditCardRegistrationWebView object to provide the URL to a custom CSS file in order to affect the design of the Hosted Payment Page.

```java
myWebView.setCssUrl(CSS_URL)
```

### Custom CSS example

The CSS on the right shows you a working example of custom styling.

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

### Set Hosted Payment Page text using a layout file

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
mWebView.setCardNumberHint("Card Number");
mWebView.setCardExpiryHint("Expiration");
mWebView.setCardCvvHint("CVV");
mWebView.setSubmitButtonText("Register");
```

## Managing credit cards

Here you can run standard read, update, and delete operations on the credit card tokens stored on the device.

### Get All Cards

This code example will get all registered cards on the device and starts by checking if any credit cards have been selected and then proceeds to select the credit card that was registered first. The `getRegisteredCreditCards` function reads all stored credit card tokens from local storage asynchronously and notifies the IOnCreditCardRead listener of the result.

```java
BNPaymentHandler.getInstance().getRegisteredCreditCards(MainActivity.this, new CreditCardManager.IOnCreditCardRead() {
  @Override
  public void onCreditCardRead(List<CreditCard> creditCards) {
    if (creditCards != null && creditCards.size() > 0) {
      
      /* The List object creditCards contains all of the CreditCard objects that have been stored on the device. 
      Each CreditCard object contains a credit card token.
      You can print the creditCards list to the console log like this: */
      Log.d("CreditCardList", creditCards.toString());
      
      // How to get a specific credit card object:  
      String creditCard = creditCards.get(0);
      
    }
  }
}
```

### Get Card Details

Building on the above example, this code on the right shows how to read information from a credit card object.

```java
// Get credit card alias:
creditCard.getAlias();

// Get truncated credit card number:
creditCard.getTruncatedCardNumber();

// Get credit card token
creditCard.getCreditCardToken();
```

### Delete Card Token

When a credit card is registered, a credit card token is saved on the device. This token is necessary in order to make a payment, as the code example in the [Making payments](#androidmakingpayments) below shows. This section contains code examples showing how to get and remove credit card tokens from the device.

The `getRegisteredCreditCards` function deletes a specific stored credit card token from local storage.

```java
public void deleteCreditCard(CreditCard creditCard) {

  BNPaymentHandler.getInstance().deleteCreditCard(this, creditCard.getCreditCardToken(), new IOnCreditCardDeleted() {
    @Override
      public void onCreditCardDeleted() {
         // Credit card was successfully deleted.
      }
  });

}
```

<a name="androidmakingpayments"></a>
## Making payments

*Make sure you've successfully [set up Native Payment](#androidsetup) and implemented [Credit Card Registration](#androidcreditcardregistration) before continuing with this step.*

Assuming a credit card token is registered on the device, it is possible to accept payments in the app. The code example shows how to configure and make a payment.

```java
public void makeCreditCardPayment(CreditCard creditCard) {

  // Configure the transaction:
  PaymentSettings paymentSettings = new PaymentSettings();
  paymentSettings.amount = 100;
  paymentSettings.currency = "SEK";
  paymentSettings.creditCardToken = creditCard.getCreditCardToken();
  
  // Make the transaction:
  BNPaymentHandler.getInstance().makeTransaction("<PAYMENT_ID>", paymentSettings, new ITransactionCallBack() {
    @Override
    public void onTransactionResult(TransactionResult result) {
      switch (result) {
        case TRANSACTION_RESULT_SUCCESS:
          // Payment succeeded.
          break;

        default:
          // Payment failed.
          break;
      }
    }
  });
}
```
> PAYMENT_ID is an identifier for the transaction. It is required and needs to be unique.

### HTTP Responses

**201 Created: Payment successful**

**400 Invalid payment state transition:** The state of the payment could not be changed in the way that the payment operation would require.

**402 Payment required:** The payment could not be authorized.

**409 Payment operation blocked:** The payment was being modified by another request.
The attempted operation could be retried again, or the payment
could be queried to find out if its properties have changed.

<a name="androidtestmode"></a>
## Test mode

**Test mode vs Production mode**

The SDK can be used in one of two modes:

* Test mode allows you to register test cards and make test payments using those cards. Real credit cards cannot be registered in test mode.
* Production mode allows the user to register real credit cards and to make real payments using those cards. Test credit cards cannot be used in production mode.

**How to switch between test and production mode**

To enable test mode, you need to supply a test API token when creating an instance of BPSBaseLibHandlerBuilder.

To enable production mode, you need to supply a production API token when creating an instance of BPSBaseLibHandlerBuilder.

You can find a code example in the [Setup](#androidsetup) section above.

**Test credit cards**

```
VISA (Sweden)
Card number: 4002 6200 0000 0005 
Expiration (month/year): 05/17 
CVC: 000

MasterCard (Sweden) 
Card number: 5125 8600 0000 0006 
Expiration (month/year): 05/17 
CVC: 000

VISA (Norway) 
Card number: 4002 7700 0000 0008 
Expiration (month/year): 05/17 
CVC: 000

MasterCard (Norway) 
Card number: 5206 8300 0000 0001 
Expiration (month/year): 05/17 
CVC: 000
```

You can use these test credit cards for testing registration and purchasing when the SDK is running in test mode (no real money is charged when these test cards are used):
