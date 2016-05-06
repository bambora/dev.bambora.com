# Checkout - iOS

The Bambora Checkout iOS library enables support for credit card registrations and payments in the Bambora Native SDK for iOS. Checkout-iOS depends on  [BNBase](https://github.com/MobilePaymentSolutionsAB/BMPS-iOS-BaseLibrary/) (which is installed by default when using CocoaPods).

The SDK currently consists of two libraries: [BNBase](https://github.com/MobilePaymentSolutionsAB/BMPS-iOS-BaseLibrary/) which provides networking functionality and the [BNPayment](https://github.com/MobilePaymentSolutionsAB/BMPS-iOS-PaymentLibrary) which provides payment functionality.

**Edit this Page**

If you have found an issue in this documentation or want to improve it, simply click [here](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/mobile/_checkout_ios.md), edit the markdown text on that page, and submit a change request. We will review it, accept it, and publish the change automatically.

## Language

The Bambora Native SDK is written in Objective-C.

If you're interested in including the Bambora Native SDK in a Swift-based app, then please see the [iOS Developer Library](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html) for details on how to use Objective-C and Swift together.

## Installation

### Step 1: Install CocoaPods

We recommend following [this guide](https://guides.cocoapods.org/using/getting-started.html#getting-started) for installing CocoaPods.

### Step 2: Create a Podfile
```
pod init
```
Run the following command in the OS X Terminal from the folder where your Xcode project file (.xcodeproj) is:


### Step 3: Edit the Podfile

```ruby
source 'https://github.com/MobilePaymentSolutionsAB/BMPS-Pod-Spec.git'

platform :ios, '8.0'

pod "BNPayment"
```

Add this information to the Podfile:


### Step 4: Install the pod

``` shell
pod install
```

Run this command in the OS X Terminal from the same folder as the Podfile:


## Setup

```objective_c
#import <BNBase/BNBase.h>
```
To use the SDK you will need to import the authentication handler to your app delegate header (.h) file.

The first time the app starts, it needs to register with our backend. When registering, the app will receive a persistent authenticator that can be used for automatic authentication on future app launches.


### Option 1: SDK Registration

```objective_c
NSString *apiToken = <API_TOKEN>; // You will receive a merchant API token as part of the onboarding process.
NSString *myBaseURL = <CUSTOM_URL>; // Optional: Overrides the default base URL for the API.
BOOL debugSetting = <DEBUG_SETTING>; // Optional: Enables logging in Xcode when set to YES.

NSError *error;
[BNHandler setupWithApiToken:apiToken baseUrl:myBaseURL debug:debugSetting error:&error];

if (![[BNHandler sharedInstance] isRegistered]) {
    
    // Optionals parameters:
    BNUser *userObject = [BNUser new];
    userObject.name = <NAME>;
    userObject.email = <EMAIL>;
    userObject.phoneNumber = <PHONE_NUMBER>;
    userObject.reference = <CUSTOM_REFERENCE>;
    
    [[BNHandler sharedInstance] registerUser:userObject completion:^(BOOL success) {
        // Registration succeeded.
    }];  
}
```

The app user registration is made using the API implementation in the SDK.

Add this code at the top of the function `application:didFinishLaunchingWithOptions:` in your app delegate implementation (.m) file.


### Option 2: Do-It-Yourself registration

```objective_c
NSError *error;
[BNHandler setupWithApiToken:<API_TOKEN> baseUrl:<BASE_URL> debug:<DEBUG_SETTING> error:&error];

if (![[BNHandler sharedInstance] isRegistered]) {
    [[BNHandler sharedInstance] registerAuthenticator:authenticator];
}
```

This option assumes that you manage user registration through an API implementation in your own system.

First, get an authenticator through your own implementation (consisting of a uuid and a secret) and then pass it to the registerAuthenticator method.

Add this code at the top of the function `application:didFinishLaunchingWithOptions:` in your app delegate implementation (.m) file.



## Credit Card Management

Credit card registration is done through a secure web-based registration form, called a hosted form, that you can easily include in your app.

### Accept Credit Card Registrations


```objective_c
#import <BNPayment/BNPayment.h>

// (...)

__weak BNViewController *weakSelf = self;

// Create the view controller for the hosted form:
BNCCHostedRegistrationFormVC *ccRegistrationVC = 
    [[BNCCHostedRegistrationFormVC alloc] initWithHostedFormParams:<CUSTOM_HOSTED_FORM_SETTINGS>];
    /* Instructions for creating an object with <CUSTOM_HOSTED_FORM_SETTINGS> can found further down 
    under "Customize the Credit Card registration view" */

// Display the credit card registration view:
[self.navigationController pushViewController:ccRegistrationVC animated:YES];

ccRegistrationVC.completionBlock = ^(BNCCRegCompletion completion) {

        if (completion == BNCCRegCompletionDone) {
            // Credit card registration successful. Dismiss the hosted form:
            [weakSelf.navigationController popViewControllerAnimated:YES];
        } else if (completion == BNCCRegCompletionCancelled) {
            // The Credit Card registration process was cancelled.
        }

};
```

The SDK includes a default view controller for credit card registration: all you need to do is present it and listen for the callback. The view controller automatically saves the authorized credit card for you.

Here's an example of how to use the hosted form within a navigation controller:


### Customize Registration view

```objective_c
[ccRegistrationVC addHeaderView:<HEADER_VIEW>]; // Set a custom header view
[ccRegistrationVC addFooterView:<FOOTER_VIEW>]; // Set a custom footer view
```

Building on the the previous example, you can optionally set a custom header view and a custom footer view for the credit card registration view if you wish:

### Using Custom CSS

```objective_c
#import <BNPayment/BNPayment.h>

// (...)

// This method returns an object with custom settings for the hosted form:
- (BNCCHostedFormParams *)customHostedFormSettings {
    BNCCHostedFormParams *params = [BNCCHostedFormParams new];

    params.cssURL = <URL_TO_CSS>; // URL to custom CSS file.
    params.platform = @"ios";
    params.submitButtonText = @"Save card"; // Text on the save button.

    BNCCFormInputGroup *cardNumberInputGroup = [BNCCFormInputGroup new];
    cardNumberInputGroup.name = @"cardnumber";
    cardNumberInputGroup.placeholder = @"Card number"; // Text in the card number field.

    BNCCFormInputGroup *cvvInputGroup = [BNCCFormInputGroup new];
    cvvInputGroup.name = @"cardexpiry";
    cvvInputGroup.placeholder = @"MM/YY"; // Text in the month/year field.

    BNCCFormInputGroup *expiryDateInputGroup = [BNCCFormInputGroup new];
    expiryDateInputGroup.name = @"cardverification";
    expiryDateInputGroup.placeholder = @"CVV/CVC"; // Text in the CVV/CVC field.
    
    params.inputGroups = @[cardNumberInputGroup,cvvInputGroup,expiryDateInputGroup];

    return params;
}

// You can then use this method when creating the view controller for the hosted form:
BNCCHostedRegistrationFormVC *ccRegistrationVC = 
    [[BNCCHostedRegistrationFormVC alloc] initWithHostedFormParams:[self customHostedFormSettings]];

```

You can also affect the design of the credit card registration view by supplying a URL to your own CSS file. You can also decide which text that should be displayed in the form elements on the hosted form.

Here's how to both specify which CSS file to use and which text to display on the hosted form:

### Example CSS

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

.invalid-field {
    border-bottom: 1px solid red;
}
```

Here's an example of what a custom CSS file could contain:



## Working With Registered Cards

```objective_c
#import <BNPayment/BNPayment.h>

// (...)

// Get a list of all registered credit card tokens
NSArray<BNAuthorizedCreditCard *> *registeredCards = [[BNPaymentHandler sharedInstance] authorizedCards];

// Check if any credit card token has been registered:
if (registeredCards.count > 0) {
    // One or more credit cards have been registered in the app
}

// Get a specific registered credit card (in this case, the first one in the list):
BNAuthorizedCreditCard *creditCard = [registeredCards objectAtIndex:0];

// Remove a registered credit card from the device:
BNPaymentHandler *paymentHandler = [BNPaymentHandler sharedInstance];
[paymentHandler removeAuthorizedCreditCard:creditCard];

```
When a credit card is registered in the hosted form, a recurring payment id is saved on the device. Here are some useful ways of working with the authorized credit cards:

* Get all registered cards
* Get a single card
* Remove a card

## Payments


```objective_c
// Get a list of all authorized credit card tokens
NSArray<BNAuthorizedCreditCard *> *registeredCards = [[BNPaymentHandler sharedInstance] authorizedCards];

// Get a specific registered credit card (in this case, the first one in the list):
BNAuthorizedCreditCard *creditCard = [registeredCards objectAtIndex:0];

BNPaymentParams *paymentSettings = [BNPaymentParams new];
paymentSettings.currency = <CURRENCY>; // A currency code in ISO-4217 format.
paymentSettings.amount = <AMOUNT>; // Payment amount expressed in cents.
paymentSettings.token = creditCard.creditCardToken;
paymentSettings.comment = <COMMENT>; // Comment about the payment

// An example of how to create a random payment identifier:
NSString *paymentIdentifier = [NSString stringWithFormat:@"%u", arc4random_uniform(INT_MAX)];
paymentSettings.paymentIdentifier = paymentIdentifier;

// This function makes the payment based on the above settings and then returns a result.    
[[BNPaymentHandler sharedInstance] 
    makePaymentWithPaymentParams:paymentSettings
                          result:^(BNPaymentResult result) {
                if (result == BNPaymentSuccess) {
                    // Payment succeeded
                } else {
                      // Payment failed
                }
    }];
}
```

With the credit card registered, you now want to take a payment. This code shows how you do that.

## Requirements

**Minimum deployment target**

iOS 8.0