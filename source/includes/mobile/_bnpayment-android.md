
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

##Recommended IDE

[Android Studio](https://developer.android.com/sdk/index.html) with the [Android Plugin for Gradle](http://developer.android.com/tools/revisions/gradle-plugin.html).

## Installation

### Option 1: Clone the repository
> ### Step 1: Type the following command in a terminal window of your choice in the directory that you want to clone the SDK to:

```
git clone git@github.com:bambora/BMPS-Android-SDK.git -b develop
```

> ### Step 2: Place the cloned repository in your app project. You can then include the Base library and the Transaction library in your app project by including the modules in **settings.gradle** like this:

```groovy
include ':bps-base-lib'
include ':bps-transaction'
```

> ### Step 3: Add the following groovy code to the app module's **build.gradle** file:

```groovy
dependencies {
    compile project(':bps-transaction')
}
```

> A sample app is included in the cloned repository (BMPS-Android-SDK/app).

*This is the only installation method at this point since JCenter distribution is not yet in place for `Native Payment`.*

### Option 2: Install through JCenter
> ### Step 1: Enter the following under **allprojects -> repositories** either in the top-level **build.gradle file** or in the **build.gradle** file that contains one or more dependencies to the SDK:

```groovy
<TO_BE_ADDED>
```
> ### Step 2: Add the following under **dependencies** in the **app-specific build.gradle file**:

```groovy
compile project('<TO_BE_ADDED>')
```
> ### Step 3: Add the following permission after the **manifest** tag in your **AndroidManifest.xml** file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```
*This distribution method is currently not yet in place for `Native Payment`. At this point, we recommend that you clone the repository instead (please see instructions above).*

<a name="androidsetup"></a>
## Setup

> ### Add the following code at the beginning of the **onCreate method** in the **MainActivity class**:

```java
BPSBaseLibHandlerBuilder builder = new BPSBaseLibHandlerBuilder(getApplicationContext(), <API_TOKEN>).debug(false);

BPSBaseLibHandler.setupBpsBaseLibHandler(builder, new ISetupCallback() {
  @Override
  public void onSetupCompleted(boolean hasAuthenticator) {
    if (hasAuthenticator) {
      // Authentication done.
    } else {
        UserModel userModel = new UserModel();
        BPSBaseLibHandler.getInstance().registerUser(userModel, new IRegisterUserCallback() {
          @Override
          public void onRegisterUserFinished(RegistrationResult result) {
              // Authentication done
          }
        });
      }
    }
});
```
> If you provide a test API token, the SDK will enter test mode. If you provide a production API token, the SDK will enter production mode.

> The debug setting enables logging through logcat if set to true (and disables logging if set to false). The debug setting should be set to false in live applications.

An API token is required in order to communicate with Bambora’s backend through the SDK.

The API token has two purposes: it identifies you as a merchant and it determines whether the SDK should be connected to the test environment or to the production environment. Each environment requires a separate API token.

After signing up for a SDK developer account, you will receive an API token for the test environment. You can then decide to apply for an API token for the production environment.

Once you have an API token, you can use it to implement the setup code in the example.

<a name="androidcreditcardregistration"></a>
## Credit Card registration
> ### How to accept credit card registrations

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
Credit card registration is done through a secure web-based registration form, also known as a Hosted Payment Page, that you can easily include in your app as the code example shows.

### How to customize the Hosted Payment Page
> ### Set a custom CSS file
> You can use the setCssUrl() method on a CreditCardRegistrationWebView object to provide the URL to a custom CSS file in order to affect the design of the Hosted Payment Page.

```java
myWebView.setCssUrl(CSS_URL)
```
> ### Custom CSS example

```css
body {
    margin-top: 0pt;
    padding: 0pt;
}

form{
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

> ### Set Hosted Payment Page text using a layout file

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
> ### Set the Hosted Payment Page text using code

```
mWebView.setCardNumberHint("Card Number");
mWebView.setCardExpiryHint("Expiration");
mWebView.setCardCvvHint("CVV");
mWebView.setSubmitButtonText("Register");
```

> While there are two different ways of editing the default text in the Hosted Payment Page - using a layout file and setting the text by using code - we recommend using one of these two method (but not both).

You can custom the Hosted Payment Page by:

* Using a custom CSS file to change the look and feel of the page.

* Selecting text to be used in the form.

### Managing credit cards

> ### How to get all registered credit card objects
> The following code example starts by checking if any credit cards have been selected and then proceeds to select the credit card that was registered first. The `getRegisteredCreditCards` function reads all stored credit card tokens from local storage asynchronously and notifies the IOnCreditCardRead listener of the result.

```java
new BPSTransactionLibHandler().getRegisteredCreditCards(MainActivity.this, new CreditCardManager.IOnCreditCardRead() {
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
> ### How to get details about a credit card object
> Building on the above example, here's how to read information from a credit card object:

```java
// Get credit card alias:
creditCard.getAlias();

// Get truncated credit card number:
creditCard.getTruncatedCardNumber();

// Get credit card token
creditCard.getCreditCardToken();
```

> ### How to delete a registered credit card token from the device
> The `getRegisteredCreditCards` function deletes a specific stored credit card token from local storage.

```java
public void deleteCreditCard(CreditCard creditCard) {

  BPSTransactionLibHandler transactionHandler = BPSTransactionLibHandler.getInstance();
    
  transactionHandler.deleteCreditCard(this, creditCard.getCreditCardToken(), new IOnCreditCardDeleted() {
    @Override
      public void onCreditCardDeleted() {
         // Credit card was successfully deleted.
      }
  });

}
```
When a credit card is registered, a credit card token is saved on the device. This token is necessary in order to make a payment, as the code example in the [Making payments](#androidmakingpayments) below shows. This section contains code examples showing how to get and remove credit card tokens from the device.

<a name="androidmakingpayments"></a>
## Making payments
```java
public void makeCreditCardPayment(CreditCard creditCard) {

  // Configure the transaction:
  PaymentSettings paymentSettings = new PaymentSettings();
  paymentSettings.amount = 100;
  paymentSettings.currency = "SEK";
  paymentSettings.creditCardToken = creditCard.getCreditCardToken();
  
  // Make the transaction:
  new BPSTransactionLibHandler().makeTransaction("<PAYMENT_ID>", paymentSettings, new ITransactionCallBack() {
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

*Make sure you've successfully [set up `Native Payment`](#androidsetup) and implemented [Credit Card Registration](#androidcreditcardregistration) before continuing with this step.*

Assuming a credit card token is registered on the device, it is possible to accept payments in the app. The code example shows how to configure and make a payment.

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

You can use the following test credit cards for testing registration and purchasing when the SDK is running in test mode (no real money is charged when these test cards are used):

VISA (Sweden)
<br />Card number: 4002 6200 0000 0005 
<br />Expiration (month/year): 05/17 
<br />CVC: 000

MasterCard (Sweden) 
<br />Card number: 5125 8600 0000 0006 
<br />Expiration (month/year): 05/17 
<br />CVC: 000

VISA (Norway) 
<br />Card number: 4002 7700 0000 0008 
<br />Expiration (month/year): 05/17 
<br />CVC: 000

MasterCard (Norway) 
<br />Card number: 5206 8300 0000 0001 
<br />Expiration (month/year): 05/17 
<br />CVC: 000