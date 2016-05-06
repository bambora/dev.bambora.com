
# Checkout - Android

This section of the guide will walk you through accepting payments inside of your native Android app.

**Edit this Page**

If you have found an issue in this documentation or want to improve it, simply click [here](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/mobile/_checkout_android.md), edit the markdown text on that page, and submit a change request. We will review it, accept it, and publish the change automatically.

## Installation

### Step 1: Add the repository

```groovy
maven {
  url "https://dl.bintray.com/oskarbambora/maven/"
}
```

Enter the following under **allprojects -> repositories** either in the top-level `build.gradle file` or in the `build.gradle` file that contains one or more dependencies to the SDK.


### Step 2: Add the SDK modules

```groovy
compile "net.zebragiraffe.bpsbaselib:bps-base-lib:0.+"
compile "net.zebragiraffe.bpstransaction:bps-transaction:0.+"
compile "net.zebragiraffe.bpsuserregistration:bps-user-registration:0.+"
```

Specify which SDK modules you would like to include under **dependencies** in the app-specific `build.gradle` file.

By including the following three lines, you include all currently available modules:



### Step 3: Add the necessary permissions

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Add the following after the **manifest** tag in your `AndroidManifest.xml` file:


## Setup

```java
import com.bambora.bpsbaselib.handlers.BPSBaseLibHandler;
import com.bambora.bpsbaselib.handlers.BPSBaseLibHandler.BPSBaseLibHandlerBuilder;
import com.bambora.bpsbaselib.interfaces.IAuthenticatorLoader;
```
Import the following to the `MainActivity.java` class.

### Create Handler
```java
BPSBaseLibHandlerBuilder builder = new BPSBaseLibHandlerBuilder(getApplicationContext(), <APP_ID>, <COUNTRY>).debug(true);
BPSBaseLibHandler.setupBpsBaseLibHandler(builder);
```

The next step is to setup the Base Library handler. Add the following code at the beginning of the onCreate method in the `MainActivity.java` class.

### Setup Authenticator
```java
BPSBaseLibHandler.getInstance().hasAuthenticator(new IAuthenticatorLoader() {
  @Override
  public void onAuthenticatorLoaded(boolean success) {
    if (!success) {
      // Fetch an Authenticator
      Intent i = new Intent(MainActivity.this, RegisterUserActivity.class); 
    }
  }
});
```

Finally, check if an Authenticator is present (and fetch one if none is present).



## User Registration
User registration is where the user signs up with your app in order to save their credit card information. It is very lightweight and is just here for user verification the next time they visit your site.

### Step 1 - Import the necessary classes

```java
import com.bambora.bpsuserregistrationlib.interfaces.IRequestSmsVerificationCodeCallback;
import com.bambora.bpsuserregistrationlib.interfaces.IVerifySmsCodeCallback;
import com.bambora.bpsuserregistrationlib.services.UserRegistrationService;
```
In your java class you will need to import the bambora SDK libraries. Add these lines to the top of your file along with the other import statements.

### Step 2 - Send an SMS message containing a verification code to the user

```java
private void requestSmsCode(String msisdn) {
  UserRegistrationService.getInstance().requestSmsVerificationCode(msisdn, new IRequestSmsVerificationCodeCallback() {
    @Override
    public void onRequestSmsCodeVerificationFinished(RegistrationResult result) {
      if (result == RegistrationResult.REGISTRATION_RESULT_SUCCESS) {
        // Success: An SMS was sent
      } else {
        // Failure: An SMS could not be sent
        }
    }
  });
}
```

In this step you listen to the SDK for an event to be fired notifying you if the SMS verification code was successfully sent. If all was okay, you don't need to do anything. If there was a problem then you can display an error message and have the user try again.


### Step 3 - Verify that the verification code that the user has entered is correct

```java
private void verifySmsCode(String code) {
  UserRegistrationService.getInstance().verifySmsCode(code, new IVerifySmsCodeCallback() {
    @Override
    public void onVerifySmsCodeFinished(boolean success) {
      if (success) {
        // Success: The user is registered. 
      } else {
          // Failure: The user could not be registered.
        }
    }
  });
}
```

## Make a Payment

This function requires that a credit card is registered to the user.

```java
private void buyItem(final TransactionObject transactionObject, final Product product) {
        TransactionService.getInstance().makeTransaction(transactionObject, "reserve", new ITransactionCallBack() {
            @Override
            public void onTransactionFinished(TransactionResult result) {
                if (result == TransactionResult.TRANSACTION_RESULT_SUCCESS) {
                  // Payment succeeded.
                } else if (result == TransactionResult.TRANSACTION_RESULT_UNREGISTERED_PAYMENT_METHOD) {
                    // No Credit Card is registered to the user.
                } else {
                    // Payment failed.
                }
            }
        });
    }
```

### Check if a Credit Card is registered to the user

```java
private void checkCreditCardRegistrationStatus() {
  CreditCardService.getInstance().checkCreditCardRegistrationStatus(new ICreditCardRegistrationStatusCallback() {
    @Override
    public void onInitiateCreditCardRegistrationFinished(boolean registered) {
      if (registered) {
        // A Credit Card is registered to the user.
      } else {
          // No Credit Card is registered to the user.
        }
    }
  });
}
```

Confirm a user has a credit card registered to their account.

### Credit Card Registration

```java
private void loadCreditCardRegistration() {
  CreditCardService.getInstance().registerCreditCard(new IRegisterCreditCardCallback() {
    @Override
    public void onInitiateCreditCardRegistrationFinished(String url) {
      if (url != null) {
        // Load the URL into a WebView to initiate the Credit Card registration process.
      }
    }
  });
}
```

This will register a credit card to a user.

### Unregister Credit Card

```java
private void unregisterCreditCard() {
  CreditCardService.getInstance().unregisterCreditCard(new IUnregisterCreditCardCallback() {
    @Override
    public void onUnregisterCreditCardFinished(boolean success) {
      if (success) {
        // No Credit Card is registered to the user.
      } else {
          // A Credit Card is still registered to the user.
        }
    }
  });
}
```

Here you can unregister a credit card for a user.

## Recommended IDE

[Android Studio](https://developer.android.com/sdk/index.html) with the [Android Plugin for Gradle](http://developer.android.com/tools/revisions/gradle-plugin.html).

## Requirements

**Minimum OS Version**

[Android 2.3.3](http://developer.android.com/about/versions/android-2.3.3.html)

**Minimum API Level**

10

**Android Permissions**

> Internet (android.permission.INTERNET)

You will need to set some permissions in your android manifest file for the SDK to function properly. Add these permissions to ```AndroidManifest.xml```

