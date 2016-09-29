

# Installation
You can install the app either via [JCenter](https://bintray.com/bambora-mobile/maven/bn-payment) or by [Source](https://github.com/bambora/BNPayment-Android).

## JCenter

JCenter is the easiest method to install the SDK into your app.

### Step 1: Add Repository

```groovy
dependencies {
   compile 'com.bambora.bnpayment:bn-payment:1.+'
}
```

Add this dependency under ‘dependencies’ in the app module's build.gradle file:


### Step 2: Set Permissions

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Add the following permission after the **manifest** tag in your **AndroidManifest.xml** file:

## Source

Installing from the source lets you see the source code and make any customizations you may want.

### Step 1: git clone repo

```shell
git clone https://github.com/bambora/BNPayment-Android
```

Type this command in a terminal window of your choice in the directory that you want to clone the SDK to. You will need to have Git installed on your system.


### Step 2: Copy Source to Your Project

```groovy
include ':bn-payment'
```

Place the cloned repository in your app project. You can then include the Payment module in your app project by including it in **settings.gradle**:


### Step 3: Add Dependencies

```groovy
dependencies {
    compile project(':bn-payment')
}
```

You can then add the Payment module as a dependency in your app module by adding it to the app module's **build.gradle** file:

A sample app is included in the cloned repository (BNPayment-Android/app).



<a name="androidsetup"></a>
# Setup

Only a merchant account number is necessary to communicate with Bambora through the SDK. However, you will need an API token to perform server-side captures, cancels and refunds. [See here for more information](server-side.html#authentication).

After signing up for a SDK developer account, you will receive a test merchant account number which you can use to implement the setup code in the example.

The example application includes a test merchant number that can be used for testing Native Payment. Please replace this with your own merchant account number after signing up with Bambora.

## Register Handler

```java
BNPaymentBuilder BNPaymentBuilder = new BNPaymentBuilder(getApplicationContext())
               .merchantAccount(MERCHANT_ACCOUNT)
               .debug(true);

BNPaymentHandler.setupBNPayments(BNPaymentBuilder);
```

Here you register a Handler by using the `BNPaymentBuilder` to build it for you using your Merchant Account.

Add the following code at the beginning of the `onCreate method` in the `MainActivity class`, and be sure to swap out `<MERCHANT_ACCOUNT>` with your test Merchant Account ID. When you launch the app for production use your production Merchant Account ID.

> The debug setting enables logging through logcat if set to true (and disables logging if set to false). The debug setting should be set to false in live applications.

*Note that if you provide a test Merchant Account, the SDK will enter test mode. If you provide a production Merchant Account, the SDK will enter production mode.*


<a name="androidcreditcardregistration"></a>
# Credit Card registration

Credit card registration is done through the registration form. This registration form is displayed if the user hasn't yet registered a card. The credit card details are automatically encrypted before being sent to our servers, this is all done automatically for you. For registering the cards you have the option of:

* [Using the default form](#display-the-default-native-form)
* [Creating a customized form](#or-build-your-own-native-form)
* [Using a hosted web-based form](#web-based-credit-card-registration)




## Display the default native form

This example shows you how to present the default credit card registration form using an activity.

### Create a layout

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

Start by creating a layout file with the name name `activity_native_card_registration`, or choose your own file name. The example shows what the layout file needs to contain. Here we add a `CardRegistrationFormLayout`.


### Create an activity

```java

public class NativeCardRegistrationActivity extends AppCompatActivity implements ICardRegistrationCallback {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_native_card_registration);
        CardRegistrationFormLayout registrationForm = (CardRegistrationFormLayout) findViewById(R.id.registration_form);
        registrationForm.setRegistrationResultListener(this);
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

Next, create an activity and name it `NativeCardRegistrationActivity`. 

To receive callbacks when registration is completed we need to add a listener to the layout. To do this we have the activity implement `ICardRegistrationCallback` and extend the `onCreate` method to set a registration result listener.

Then, in the same `onCreate` method, set the your newly created layout file (`activity_native_card_registration`) as the contentView for the activity, as the code example shows.


### Display the form activity

```java

Intent intent = new Intent(this, NativeCardRegistrationActivity.class);
startActivity(intent);

```

All that's left to show the native credit card registration form is to start the activity. The code example shows how to do it.





<a name="androidmanagingcards"></a>
# Managing credit cards

```java
  BNPaymentHandler.getInstance()
```

You can run standard read, update, and delete operations on the credit card tokens stored on the device by accessing the `BNPaymentHandler.getInstance()` object.

## Get All Cards

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

This code example will get all registered cards on the device and starts by checking if any credit cards have been selected and then proceeds to select the credit card that was registered first. The `getRegisteredCreditCards` function reads all stored credit card tokens from local storage asynchronously and notifies the IOnCreditCardRead listener of the result.



## Get Card Details

```java
// Get credit card alias:
creditCard.getAlias();

// Get truncated credit card number:
creditCard.getTruncatedCardNumber();

// Get credit card token
creditCard.getCreditCardToken();
```

Building on the above example, this code on the right shows how to read information from a credit card object.


## Delete Card Token

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

When a credit card is registered, a credit card token is saved on the device. This token is necessary in order to make a payment, as the code example in the [Making payments](#androidmakingpayments) below shows. This section contains code examples showing how to get and remove credit card tokens from the device.

The `getRegisteredCreditCards` function deletes a specific stored credit card token from local storage.


<a name="androidmakingpayments"></a>

# Making payments

```java
public void makeCreditCardPayment(CreditCard creditCard) {

  // Configure the transaction:
  PaymentSettings paymentSettings = new PaymentSettings();
  paymentSettings.amount = 100;
  paymentSettings.currency = "SEK";
  paymentSettings.creditCardToken = creditCard.getCreditCardToken();

  // Make the transaction:
  BNPaymentHandler.getInstance().makeTransaction("A_UNIQUE_PAYMENT_ID", paymentSettings, new ITransactionCallBack() {
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

Once you have set up card registration, from the previous section, and assuming a credit card token is on the device, you can then use that card make payments in your app. 

All you need to do is create a `PaymentSettings` object and supply it the amount (in cents), the currency, and the card token. You can get the card token by first getting the [CreditCard](https://github.com/bambora/BNPayment-Android/blob/master/bn-payment/src/main/java/com/bambora/nativepayment/models/creditcard/CreditCard.java) (using one of the above Managing Credit Cards operations) and then calling `getCreditCardToken()` on it.

Once you have the settings you can now process the payment. This method requires three parameters:

* `Payment ID` *(String)*: This is a **unique** ID that you generate. It will help you identify and search for transactions later on. 
* `Payment Settings` *(PaymentSettings)*: Your paymentSettings object you just created.
* `Response Callback` *(ITransactionCallBack)*: This is where you handle successful and failed payments.

Successful payments will trigger `onTransactionSuccess()` to be called.

If a payment fails for any reason, the `onTransactionError()` callback method will be called. You can choose what message to show the user, be it a declined purchase or a network error, it is up to you.

The code example shows how to configure and make a payment.


<a name="androiderrorhandling"></a>
## RequestError
```
201 Created: 
    Payment successful

400 Bad Request: 
    The API request was not formatted correctly.

401 Unauthorized: 
    Your API key is wrong or the Authorization header was not set.

402 Payment required: 
    The payment could not be authorized.

409 Payment operation blocked:
    The payment was being modified by another request.
    The attempted operation could be retried again, or the payment 
      could be queried to find out if its properties have changed.

422 Invalid payment state transition:
    The state of the payment could not be changed in the way that the 
      payment operation would require.

500 Internal Server Error: 
    We had a problem with our server. Try again later.
```


The SDK can receive a list of different errors from the back end. All payment related error responses will be of type `RequestResponse` and are visible from the error callbacks. If error is null then the error is undefined. 

The specific error is identified by the type property, if no type is given the standard meaning of the HTTP error is applied. A tip is to use the types for localization keys in order to display messages depending on the type.



<a name="androidtestmode"></a>
# Test mode

**Test mode vs Production mode**

The SDK can be used in one of two modes:

* Test mode allows you to register test cards and make test payments using those cards. Real credit cards cannot be registered in test mode.
* Production mode allows the user to register real credit cards and to make real payments using those cards. Test credit cards cannot be used in production mode.

**How to switch between test and production mode**

To enable test mode, you need to supply a test Merchant Account when creating an instance of BNPaymentBuilder.

To enable production mode, you need to supply a production Merchant Account when creating an instance of BNPaymentBuilder.

You can find a code example in the [Setup](#androidsetup) section above.

