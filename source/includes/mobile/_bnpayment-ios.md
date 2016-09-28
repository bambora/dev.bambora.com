
<h1 id="ios-installation">Installation</h1>

To install the iOS Native Payment SDK, we recommend using either CocoaPods or Carthage.

## CocoaPods


CocoaPods is a dependency manager for third-party libraries.

We recommend following [this guide](https://guides.cocoapods.org/using/getting-started.html#getting-started) for installing CocoaPods.

### Step 1: Create Project
Create or select an Xcode project. Then open a terminal window and `cd` into the project directory.

### Step 2: Create Podfile

```shell
pod init
```

Create a Podfile by running the following command in the OS X Terminal from the folder where your Xcode project file (`.xcodeproj`) is:


### Step 3: Modify Podfile

```ruby
source 'https://github.com/CocoaPods/Specs.git'

platform :ios, '8.0'

pod "BNPayment"
```

Add this information to the Podfile:


### Step 4: Install Pod

```shell
pod install
```

Install the pod by running this command in the OS X Terminal from the same folder as the Podfile:


### Step 5: Load project
Re-open the project through the newly created `.xcworkspace` file.

## Carthage

Carthage is a is a dependency manager for third-party libraries. It is an alternative to using CocoaPods.

We recommend following [these instructions](https://github.com/Carthage/Carthage#installing-carthage) for installing Carthage.

### Step 1: Create Project
Create or select an Xcode project. Then open a terminal window and `cd` into the project directory

### Step 2: Create Cartfile

```shell
touch Cartfile
```

Create a Cartfile by running the following command in the OS X Terminal from the folder where your Xcode project file (`.xcodeproj`) is:



### Step 3: Edit Cartfile

```shell
github "bambora/BNPayment-iOS"
```

Open the newly created Cartfile in the text editor of your choice, and enter the following text:


### Step 4: Update Project

```shell
carthage update
```

Run the `carthage update` command in the OS X Terminal.

This will create a file called `BNPayment.framework` that you can find by going to `Carthage/Build/iOS`.


### Step 5: Link Framework
Add `BNPayment.framework` to `Target -> General -> Linked Frameworks and Libraries` in Xcode.

### Step 6: Add Run Script

```shell
/usr/local/bin/carthage copy-frameworks
```

Go to `Target -> Build Phase` in Xcode. Add a `New Run Script Phase` and then enter the following script line:


### Step 7: Configure

```
$(SRCROOT)/Carthage/Build/iOS/BNPayment.framework
```

Add the `BNPayment.framework` line under `Input Files`:


### Step 8: Build
Build and run the project in Xcode.


# Setup

Only a merchant account number is necessary to communicate with Bambora through the SDK. However, you will need an API token to perform server-side captures, cancels and refunds. [See here for more information](api.html#authentication).

After signing up for a SDK developer account, you will receive a test merchant account number which you can use to implement the setup code in the example.

The example application includes a test merchant number that can be used for testing Native Payment. Please replace this with your own merchant account number after signing up with Bambora.

## Step 1: Import

```objective_c
#import <BNPayment/BNPayment.h>
```

Create a file called [AppDelegate.m[(https://github.com/bambora/BNPayment-iOS/blob/master/Example/BNPayment-Example/AppDelegate.m) and import the SDK.



## Step 2: Setup

```objective_c
NSError *error;
[BNPaymentHandler setupWithMerchantAccount:@"<MERCHANT_ACCOUNT>" // Required.
                            baseUrl:nil // Optional. Overrides the URL to the SDK backend.
                              debug:NO // Optional. Enables logging in Xcode when set to YES.
                              error:&error];
```

Add the following setup code to `application:didFinishLaunchingWithOptions:` method in AppDelegate.m.

If you provide a test Merchant Account, the SDK will enter **test mode**. If you provide a production Merchant Account, the SDK will enter **production mode**.

The debug setting should be set to NO in live applications.

Any errors will be set to the `error` variable passed in. You can find a full example of [AppDelegate.m[(https://github.com/bambora/BNPayment-iOS/blob/master/Example/BNPayment-Example/AppDelegate.m) on our GitHub page.


# Credit Card Registration

*Make sure you've successfully set up the [`Native Payment SDK`](#setup) before implementing this functionality.*

Native credit card registration is done through a native registration form. You can either choose to use the default card registration form contained in `BNCreditCardRegistrationVC` or [create your own](#customization). All credit card details will automatically be encrypted before they are sent to our servers and the app will use card Tokens to perform any payment processing.

## Display the form

```objective_c
// Create an instance of `BNCreditCardRegistrationVC`
BNCreditCardRegistrationVC *vc = [BNCreditCardRegistrationVC new];
vc.completionBlock = ^(BNCCRegCompletion completion, BNAuthorizedCreditCard *card){
    // Handle completion here
};

[self.navigationController pushViewController:vc animated:YES];
```

The first step is to display the Card Registration form. The SDK comes with a default form that you can use. If you would like to customize the look and feel then you can jump to the section on [customization](#customization).

Displaying the default form is done by creating a view controller using `BNCreditCardRegistrationVC `, as demonstrated in the sample code.

When a credit card is successfully registered you will receive a [BNAuthorizedCreditCard](https://github.com/bambora/BNPayment-iOS/blob/master/BNPayment/Core/Models/BNAuthorizedCreditCard.h). From that you can retrieve a `creditCardToken` that can be used to [make a payment](#making-payments).

The method `registerCreditCard` in the [example app](https://github.com/bambora/BNPayment-iOS/blob/master/Example/BNPayment-Example/ViewController.m)) shows how to handle card registration.



# Managing Credit Cards

```objective_c
// Get a list of all registered credit cards
NSArray<BNAuthorizedCreditCard *> *registeredCards = [[BNPaymentHandler sharedInstance] authorizedCards];

// Check if any credit card token has been registered:
if (registeredCards.count > 0) {
    // One or more credit cards have been registered in the app
}

// Get a specific registered credit card (in this case, the first one in the list):
BNAuthorizedCreditCard *creditCard = [registeredCards firstObject];

// Remove a registered credit card from the device:
BNPaymentHandler *paymentHandler = [BNPaymentHandler sharedInstance];
[paymentHandler removeAuthorizedCreditCard:creditCard];

```

With the SDK you can:

* get all cards
* get a specific card
* remove a card

The example code here shows how to do all of those operations.

You can also check out the example app and see what it does to [manage](https://github.com/bambora/BNPayment-iOS/blob/master/Example/BNPayment-Example/ViewController.m) the registered cards.



# Making payments

```objective_c
// Get a list of all authorized credit card tokens
NSArray<BNAuthorizedCreditCard *> *registeredCards = [[BNPaymentHandler sharedInstance] authorizedCards];

// Get a specific registered credit card (in this case, the first one in the list):
BNAuthorizedCreditCard *creditCard = [registeredCards objectAtIndex:0];

BNPaymentParams *paymentSettings = [BNPaymentParams new];
paymentSettings.paymentIdentifier = <UNIQUE_ID>; // A unique string to identify the payment
paymentSettings.currency = <CURRENCY>; // A currency code in ISO-4217 format.
paymentSettings.amount = <AMOUNT>; // Payment amount expressed in cents.
paymentSettings.token = creditCard.creditCardToken;
paymentSettings.comment = <COMMENT>; // Comment about the payment

// This function makes the payment based on the above settings and then returns a result.
[[BNPaymentHandler sharedInstance]
    makePaymentWithParams:paymentSettings
    result:^(BNPaymentResult result, NSError *error) {
        if (result == BNPaymentSuccess) {
            // Payment succeeded
        } else {
            // Payment failed
            // Use *error parameter to get the message to display to the user
        }
    }];
}
```

*Make sure you've successfully implemented [Credit Card Registration](#credit-card-registration) before continuing with this step.*

Assuming a credit card token is registered on the device, it is possible to accept payments in the app.

The first step is to build up a list of payment parameters in a [BNPaymentParams](https://github.com/bambora/BNPayment-iOS/blob/master/BNPayment/Core/Models/BNPaymentParams.h). You will use `BNAuthorizedCreditCard.creditCardToken` as the card token identifier when making the payment. This is set in the `token` parameter of BNPaymentParams.

Here are the parameters you must supply:

* `paymentIdentifier`: A unique ID string to identify the payment
* `currency`: A currency code in ISO-4217 format.
* `amount`: Payment amount expressed in cents. For example 100 SEK would be 100000.
* `token`: The token from the [BNAuthorizedCreditCard](https://github.com/bambora/BNPayment-iOS/blob/master/BNPayment/Core/Models/BNAuthorizedCreditCard.h).
* `comment`: A comment about the payment.

With the BNPaymentParams created you can pass it, along with a code block callback, to `makePaymentWithParams: result:`. The code block callback is where you will handle the result of the payment.

A successful payment will set the `BNPaymentSuccess` parameter; a failed payment will set the `NSError` parameter.


## Error Responses


**201 Created:** Payment successful

**400 Invalid payment state transition:** The state of the payment could not be changed in the way that the payment operation would require.

**402 Payment required:** The payment could not be authorized.

**409 Payment operation blocked:** The payment was being modified by another request. The attempted operation could be retried again, or the payment
could be queried to find out if its properties have changed.


# Sample app

```bash
git clone https://github.com/bambora/BNPayment-iOS
```

The SDK [repository](https://github.com/bambora/BNPayment-iOS/blob/master/Example/BNPayment-Example) contains a basic sample application. Using the sample app and inspecting its source code can be useful if you wish to try the features and get an overview of how Native Payment SDK can be implemented.

Use the `git clone` command in a terminal window of your choice in the directory that you want to clone the repository to (Git needs to be installed on your computer for this to work).


Open the `BNPayment-iOS` folder on your computer and double-click the `BNPayment.xcworkspace` file. This will open the workspace in Xcode.

Select `BNPayment-Example` and a simulator (or device) in the toolbar in Xcode and then use the Run command.



# Error handling

The SDK can receive a list of different errors from the back end. All payment related error codes will be of type [BNErrorResponse](https://github.com/bambora/BNPayment-iOS/blob/master/BNPayment/Core/Models/BNErrorResponse.h) and can be retrieved using the `NSError+BNError` category. The specific error is identidied by the type property, if no type is given the standard meaning of the HTTP error is applied. A tip is to use the types for localization keys in order to display messages depending on the type.



# Test Mode

The SDK can be used in one of two modes:

* Test mode allows you to register test cards and make test payments using those cards. Real credit cards cannot be registered in test mode.
* Production mode allows the user to register real credit cards and to make real payments using those cards. Test credit cards cannot be used in production mode.


## Switch Modes

To enable test mode, you need to use a test Merchant Account as the initial parameter in the setupWithMerchantAccount: method of the BNPaymentHandler class.

To enable production mode, you need to provide a production Merchant Account as the initial parameter in the setupWithMerchantAccount: method of the BNPaymentHandler class.

You can find a code example in the [Setup section](#step-2-setup) above.

You can use the [Test Cards](testcards.html) for your testing.

