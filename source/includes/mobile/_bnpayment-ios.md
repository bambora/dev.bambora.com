# Native Payment - iOS

This section of the guide will walk you through how to add Native Payment to your iOS project.

**Edit this Page**

If you have found an issue in this documentation or want to improve it, simply click [here](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/mobile/_bnpayment-ios.md), edit the markdown text on that page, and submit a change request. We will review it, accept it, and publish the change automatically.

## Language and Requirements

Native Payment is written in Objective-C.

If you're interested in using `Native Payment` in a Swift-based app, please see [iOS Developer Library](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html) for details on how to use Objective-C and Swift together.

**Minimum deployment target:** iOS 8.0


## Installation - CocoaPods

To install Native Payment, we recommend using either CocoaPods or Carthage.

CocoaPods is a dependency manager for third-party libraries.

We recommend following [this guide](https://guides.cocoapods.org/using/getting-started.html#getting-started) for installing CocoaPods.

### Step 1: Create Project
Create or select an Xcode project. Then open a terminal window and `cd` into the project directory

### Step 2: Create Podfile
Create a Podfile by running the following command in the OS X Terminal from the folder where your Xcode project file (`.xcodeproj`) is:

```shell
pod init
```
### Step 3: Modify Podfile
Add this information to the Podfile:

```ruby
source 'https://github.com/CocoaPods/Specs.git'

platform :ios, '8.0'

pod "BNPayment"
```

### Step 4: Install Pod
Install the pod by running this command in the OS X Terminal from the same folder as the Podfile:

```shell
pod install
```
### Step 5: Load project
Re-open the project through the newly created `.xcworkspace` file.

## Installation - Carthage

Carthage is a is a dependency manager for third-party libraries. It is an alternative to using CocoaPods.

We recommend following [these instructions](https://github.com/Carthage/Carthage#installing-carthage) for installing Carthage.

### Step 1: Create Project
Create or select an Xcode project. Then open a terminal window and `cd` into the project directory

### Step 2: Create Cartfile
Create a Cartfile by running the following command in the OS X Terminal from the folder where your Xcode project file (`.xcodeproj`) is:

```shell
touch Cartfile
```

### Step 3: Edit Cartfile
Open the newly created Cartfile in the text editor of your choice, and enter the following text:

```shell
github "bambora/BNPayment-iOS-internal" "develop"
```
### Step 4: Update Project
Run the following command in the OS X Terminal:

```shell
carthage update
```
This will create a file called BNPayment.framework that you can find by going to Carthage/Build/iOS.

### Step 5: Link Framework
Add BNPayment.framework to Target -> General -> Linked Frameworks and Libraries in Xcode.

### Step 6: Add Run Script
Go to Target -> Build Phase in Xcode. Add a New Run Script Phase and then enter the following script line: 

```shell
/usr/local/bin/carthage copy-frameworks 
```
### Step 7: Configure
Add the following line under Input Files: 

```
$(SRCROOT)/Carthage/Build/iOS/BNPayment.framework
```
### Step 8: Build
Build and run the project in Xcode.

## How to run the sample app

This repository contains a basic sample application. Using the sample app and inspecting its source code can be useful if you wish to try the features and get an overview of how `Native Payment` can be implemented.

Type the following command in a terminal window of your choice in the directory that you want to clone the repository to (Git needs to be installed on your computer for this to work):

```bash
git clone https://github.com/bambora/BNPayment-iOS
```

Open the `BNPayment-iOS` folder on your computer and double-click the `BNPayment.xcworkspace` file. This will open the workspace in Xcode.

Select `BNPayment-Example` and a simulator (or device) in the toolbar in Xcode and then use the Run command.

<a name="iossetup"></a>
## Setup

An API token is required in order to communicate with Bambora’s backend through the SDK.

The API token has two purposes: it identifies you as a merchant and it determines whether the SDK should be connected to the test environment or to the production environment. Each environment requires a separate API token.

After signing up for a SDK developer account, you will receive an API token for the test environment. You can then decide to apply for an API token for the production environment.

Once you have an API token, you can use it to implement the setup code in the example.

### Step 1: Import
Import the SDK in AppDelegate.m:

```objective_c
#import <BNPayment/BNPayment.h>
```

### Step 2: Setup
Add the following setup code to `application:didFinishLaunchingWithOptions:` method in AppDelegate.m.

If you provide a test API token, the SDK will enter test mode. If you provide a production API token, the SDK will enter production mode. 

The debug setting should be set to NO in live applications.

```objective_c
NSError *error;
[BNPaymentHandler setupWithApiToken:@"<API_TOKEN>" // Required.
                            baseUrl:nil // Optional. Overrides the URL to the SDK backend.
                              debug:NO // Optional. Enables logging in Xcode when set to YES.
                              error:&error];
```

### HTTP Responses

**201 Created** 

**403 Forbidden:** A valid API token is missing.

<a name="ioscreditcardregistration"></a>
## Credit Card Registration

*Make sure you've successfully [set up `Native Payment`](#iossetup) before implementing this functionality.*

Credit card registration is done through a secure web-based registration form, also known as a Hosted Payment Page, that you can easily include in your app through the class `BNCCHostedRegistrationFormVC` as the code example shows.

### Add Hosted Page
This will add the Hosted Payment Page to a navigation controller:

```objective_c
__weak UIViewController *weakSelf = self;

// Create the view controller for the Hosted Payment Page:
BNCCHostedRegistrationFormVC *ccHostedRegistrationVC = 
    [[BNCCHostedRegistrationFormVC alloc] initWithHostedFormParams:<CUSTOM_HOSTED_FORM_SETTINGS>];
    /* Instructions for creating <CUSTOM_HOSTED_FORM_SETTINGS> can found further down on this page in the section "How to customize the Hosted Payment Page" */

// Display the Hosted Payment Page:
[self.navigationController pushViewController:ccHostedRegistrationVC animated:YES];
```
### Callbacks

This defines the callback methods for the Hosted Payment Page that you can use to handle the responses.

```objective_c
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

**403 Forbidden:** Valid credentials are missing.

## Customize Hosted Payment Page

You can customize the Hosted Payment Page by:

* Using a custom CSS file to change the look and feel of the page.

* Selecting text to be used in the form.

* Setting a custom header and footer.

### CSS and Text
Specify a CSS file and update text

```objective_c
BNCCHostedFormParams customizationSettings = [BNCCHostedFormParams hostedFormParamsWithCSS:@"<CSS_URL>"
                                                                     cardNumberPlaceholder:@"Card number"
                                                                         expiryPlaceholder:@"Expiration"
                                                                            cvvPlaceholder:@"CVV"
                                                                                submitText:@"Submit"];

BNCCHostedRegistrationFormVC *ccHostedRegistrationVC = 
  [[BNCCHostedRegistrationFormVC alloc] initWithHostedFormParams:[BNCCHostedFormParams customizationSettings]];
```

### Custom CSS example
This is some example CSS that you can use as a reference for customizing the layout of the payment page.

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

### Header and Footer
Set a custom header view and a custom footer view:

```objective_c
ccHostedRegistrationVC.webviewDelegate = self;
[ccHostedRegistrationVC addHeaderView:<HEADER_VIEW>]; // Set a custom header view
[ccHostedRegistrationVC addFooterView:<FOOTER_VIEW>]; // Set a custom footer view
```

## Managing Credit Cards

When a credit card is registered using `BNCCHostedRegistrationFormVC`, a credit card token is saved on the device. This token is necessary in order to make a payment, as the code example in the [Making payments](#iosmakingpayments) below shows. This section contains code examples showing how to get and remove credit card tokens from the device.

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

<a name="iosmakingpayments"></a>
## Making payments

*Make sure you've successfully [set up Native Payment](#iossetup) and implemented [Credit Card Registration](#ioscreditcardregistration) before continuing with this step.*

Assuming a credit card token is registered on the device, it is possible to accept payments in the app. The code example shows how to configure and make a payment.

```objective_c
// Get a list of all authorized credit card tokens
NSArray<BNAuthorizedCreditCard *> *registeredCards = [[BNPaymentHandler sharedInstance] authorizedCards];

// Get a specific registered credit card (in this case, the first one in the list):
BNAuthorizedCreditCard *creditCard = [registeredCards objectAtIndex:0];

BNPaymentParams *paymentSettings = [BNPaymentParams new];
paymentSettings.currency = <CURRENCY>; // A currency code in ISO-4217 format.
paymentSettings.amount = <AMOUNT>; // Payment amount expressed in cents.
paymentSettings.token = creditCard.creditCardRecurringPaymentId;
paymentSettings.comment = <COMMENT>; // Comment about the payment

// An example of how to create a random payment identifier:
NSString *paymentIdentifier = [NSString stringWithFormat:@"%u", arc4random_uniform(INT_MAX)];

// This function makes the payment based on the above settings and then returns a result.    
[[BNPaymentHandler sharedInstance] 
    makePaymentWithPaymentParams:paymentSettings
        identifier:paymentIdentifier
            result:^(BNPaymentResult result) {
                if (result == BNPaymentSuccess) {
                    // Payment succeeded
                } else {
                      // Payment failed
                  }
            }];
}
```

### HTTP Responses

**201 Created: Payment successful**

**400 Invalid payment state transition:** The state of the payment could not be changed in the way that the payment operation would require.

**402 Payment required:** The payment could not be authorized.

**409 Payment operation blocked:** The payment was being modified by another request.
The attempted operation could be retried again, or the payment
could be queried to find out if its properties have changed.

<a name="iostestmode"></a>
## Test Mode

The SDK can be used in one of two modes:

* Test mode allows you to register test cards and make test payments using those cards. Real credit cards cannot be registered in test mode.

* Production mode allows the user to register real credit cards and to make real payments using those cards. Test credit cards cannot be used in production mode.

### Switch Modes

To enable test mode, you need to use a test API token as the initial parameter in the setupWithApiToken: method of the BNPaymentHandler class.

To enable production mode, you need to provide a production API token as the initial parameter in the setupWithApiToken: method of the BNPaymentHandler class.

You can find a code example in the [Setup section](#iossetup) above.

### Test credit cards

You can use the following test credit cards for testing registration and purchasing when the SDK is running in test mode (no real money is charged when these test cards are used):

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
