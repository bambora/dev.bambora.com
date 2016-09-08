
# Native Payment - Android

This section of the guide will walk you through how to add `Native Payment` to your Android project.

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/mobile/_bnpayment-android.md) to edit this section.**

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

Only a merchant account number is necessary to communicate with Bambora through the SDK. However, you will need an API token to perform server-side captures, cancels and refunds. [See here for more information](api.html#authentication).

After signing up for a SDK developer account, you will receive a test merchant account number which you can use to implement the setup code in the example.

The example application includes a test merchant number that can be used for testing Native Payment. Please replace this with your own merchant account number after signing up with Bambora.

### Register Handler

Here you register a Handler by using the `BPSBaseLibHandlerBuilder` to build it for you using your Merchant Account.

Add the following code at the beginning of the `onCreate method` in the `MainActivity class`, and be sure to swap out `<MERCHANT_ACCOUNT>` with your test Merchant Account.

*Note that if you provide a test Merchant Account, the SDK will enter test mode. If you provide a production Merchant Account, the SDK will enter production mode.*

```java
BNPaymentBuilder BNPaymentBuilder = new BNPaymentBuilder(getApplicationContext())
               .merchantAccount(MERCHANT_ACCOUNT)
               .debug(true);

BNPaymentHandler.setupBNPayments(BNPaymentBuilder);
```
> The debug setting enables logging through logcat if set to true (and disables logging if set to false). The debug setting should be set to false in live applications.

<a name="androidcreditcardregistration"></a>
## Native Credit Card registration

Native credit card registration is done through a native registration form. The credit card details are then encrypted before being sent to our servers. The Native Payment SDK includes a default native credit card registration form that can be used out of the box. You also have the option of creating a customized form.

### How to display the default native form

This example shows you how to present the default credit card registration form using an activity.

#### Create a layout

Start by creating a layout with a representative name (we'll use the name activity_native_card_registration in this guide). The example shows what the layout file needs to contain.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.bambora.nativepayment.widget.CardRegistrationFormLayout
      android:id="@+id/registration_form"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</RelativeLayout>
```

#### Create an activity

Next, create an activity with a representative name (we'll use NativeCardRegistrationActivity in this guide). Then set the your newly created layout file (activity_native_card_registration) as the contentView for the activity, as the code example shows.

```java
@Override
protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_native_card_registration);
}
```

#### Listen to registration callbacks

To receive callbacks when registration is completed, add a listener to the CardRegistrationFormLayout. First make the activity implement ICardRegistrationCallback as in the code example.

```java

public class NativeCardRegistrationActivity extends AppCompatActivity implements ICardRegistrationCallback {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_native_card_registration);
    }

    @Override
    public void onRegistrationSuccess(CreditCard creditCard) {
        // Card registration completed successfully
    }

    @Override
    public void onRegistrationError(RequestError error) {
        // Card registration failed
    }
}

```

Then, extend the onCreate method to set a registration result listener like in the code example.

```java

@Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_native_card_registration);
        CardRegistrationFormLayout registrationForm = (CardRegistrationFormLayout) findViewById(R.id.registration_form);
        registrationForm.setRegistrationResultListener(this);
    }

```

#### Display the form activity

All that's left to show the native credit card registration form is to start the activity. The code example shows how to do it.

```java

Intent intent = new Intent(this, NativeCardRegistrationActivity.class);
startActivity(intent);

```

### How to build your own native form
You have the option of creating your own, fully customizable native credit card registration form. This requires a bit more effort compared to using the default form, but it also gives you control over the design.

#### GUI compontents

The SDK contains bundled EditText classes that help out with input validation and formatting.

`CardNumberEditText`, `ExpiryDateEditText` and `SecurityCodeEditText` are subclasses of `CardFormEditText` described below and add functionality for input formatting and automatic validation by using custom TextWatcher classes. Use these classes if you want to customise the look of the registration form but keep our standard formatting and validation of the input.

The example shows how to add the GUI components in a layout file.

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

#### Manual formatting and validation

`CardFormEditText` is an abstract subclass of EditText with extended functionality that helps out with input validation. `CardFormEditText` introduces three new instance variables and five new methods. Use this class if you want to have full control of formatting and validation.

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

#### Handling user input and network requests

Once you have your own shiny form set up, you need to encrypt the input from the form and send it to our back end for processing.

#### Making the request

The exampe shows how to use the `registerCreditCard` method in `BNPaymentHandler` for encrypting and sending input data from your custom native credit card registration form to our back end for processing.

```java
BNPaymentHandler.getInstance().registerCreditCard(
        getContext(),
        "<CARD_NUMBER_FROM_YOUR_FORM>",
        "<EXPIRY_MONTH_FROM_YOUR_FORM>",
        "<EXPIRY_YEAR_FROM_YOUR_FORM>",
        "<CVC_CODE_FROM_YOUR_FORM>",
        resultListener);
```

> **NOTE:** *You are responsible for only sending the form data once since this network call is not idempotent.*

#### Callback

The example shows how to create a listener in order to handle the result of an attempted credit card registration.

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

### HTTP Responses

**201 Created:** Successful payment!

**400 Bad Request:** The API request was not formatted correctly.

**401 Unauthorized:** Your Merchant Account or the API key provided is wrong.

**402 Cannot authorize:** The authorization request could not be performed.

**403 Forbidden: You are not authorized for this operation with the authentication you have provided..**

**404 Not Found:** Unknown path or resource was not found.

**409 Payment operation blocked:** The payment was being modified by another request. The attempted operation could be retried again, or the payment could be queried to find out if its properties have changed.

**422 Invalid payment state transition:** The state of the payment could not be changed in the way that the payment operation would require.

**500 Internal Server Error:** We had a problem with our server. Try again later.

## Web-based credit card registration

See the dedicated page concerning the [Hosted Payment Page](#hosted-payment-page)

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
    public void onTransactionSuccess() {
      // Handle payment success here.
    }

    @Override
    public void onTransactionError(RequestError error) {
      // Payment payment errors here.
    }
  });
}
```
> PAYMENT_ID is an identifier for the transaction. It is required and needs to be unique.

### HTTP Responses

**201 Created: Payment successful**

**400 Bad Request: The API request was not formatted correctly.**

**401 Unauthorized: Your API key is wrong or the Authorization header was not set.**

**402 Payment required:** The payment could not be authorized.

**409 Payment operation blocked:** The payment was being modified by another request.
The attempted operation could be retried again, or the payment
could be queried to find out if its properties have changed.

**422 Invalid payment state transition:** The state of the payment could not be changed in the way that the payment operation would require.

**500 Internal Server Error: We had a problem with our server. Try again later.**

<a name="androiderrorhandling"></a>

The SDK can receive a list of different errors from the back end. All payment related error responses will be of type `RequestResponse` and are visible from the error callbacks. If error is null then the error is undefined. The specific error is identified by the type property, if no type is given the standard meaning of the HTTP error is applied. A tip is to use the types for localization keys in order to display messages depending on the type.

### Standard HTTP error types

* about:blank

### Payment error types

* <http://api.bambora.com/definitions/payments/payment_not_found>
* <http://api.bambora.com/definitions/payments/invalid_payment_state_transition>
* <http://api.bambora.com/definitions/payments/payment_operation_blocked>
* <http://api.bambora.com/definitions/payments/cannot_authorize>
* <http://api.bambora.com/definitions/payments/3d_secure_required>
* <http://api.bambora.com/definitions/payments/card_type_not_accepted>
* <http://api.bambora.com/definitions/payments/invalid_card_information>
* <http://api.bambora.com/definitions/payments/invalid_card>
* <http://api.bambora.com/definitions/payments/insufficient_funds>
* <http://api.bambora.com/definitions/payments/expired_card>
* <http://api.bambora.com/definitions/payments/currency_not_supported>

<a name="androidtestmode"></a>
## Test mode

**Test mode vs Production mode**

The SDK can be used in one of two modes:

* Test mode allows you to register test cards and make test payments using those cards. Real credit cards cannot be registered in test mode.
* Production mode allows the user to register real credit cards and to make real payments using those cards. Test credit cards cannot be used in production mode.

**How to switch between test and production mode**

To enable test mode, you need to supply a test Merchant Account when creating an instance of BPSBaseLibHandlerBuilder.

To enable production mode, you need to supply a production Merchant Account when creating an instance of BPSBaseLibHandlerBuilder.

You can find a code example in the [Setup](#androidsetup) section above.

###Test credit cards

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