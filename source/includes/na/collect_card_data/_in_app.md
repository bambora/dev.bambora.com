## Mobile SDKs (Payform)

### Android

#### Overview
PayForm Android is a native Android SDK for taking payments in your Android app.

PayForm Android is a payment form that provides a clean and smart user experience when accepting payments in your Android app. It is complementary to the Web PayForm SDK. It limits the scope of the merchant’s PCI compliance by removing the need for them to pass the sensitive information (credit card number, CVD, or expiry) through their servers and from having to write and store code that comes in contact with that sensitive information.

This payment form provides some client-side validation and smart field data formatting.

#### How It Works
The PayForm activity is instantiated and presented by your app code. The resulting payment form may contain input fields for a shipping address, for a billing address and for credit card details.

Once the user has completed all fields with valid input an onActivityResult, provided by you, is called and passed a PayFromResult containing address information and a token for the credit card details.

By integrating PayForm a developer can easily provide a way for users to accept payments in an Android app. PayForm provides some client-side validation, smart field data formatting and a design that works in all Android device form factors.


#### Demo App And Source
Use this demo to see how to integrate PayForm for Android.

You can also view the source for PayForm on GitHub.

#### Integration
##### Step 1: Setup Artifactory Credentials
```java
# Artifactory Credentials
bic_artifactory_url=https://beanstream.jfrog.io/beanstream/libs-release

## Replace USERNAME and PASSWORD
bic_artifactory_user=USERNAME
bic_artifactory_password=PASSWORD
```

Add your Artifactory credentials to `[USER_HOME]/.gradle/gradle.properties`

##### Step 2: Import Payform Library
```java
android {
    ...
    repositories {
        jcenter()
        maven {
            credentials {
                username "${bic_artifactory_user}"
                password "${bic_artifactory_password}"
            }
            url "${bic_artifactory_url}"
        }
    }
}

dependencies {
    compile(group: 'com.beanstream.android', name: 'payform', version: '0.1.0', ext: 'aar')
    compile 'com.android.support:appcompat-v7:24.2.1'
    compile 'com.android.support:cardview-v7:24.2.1'
    ...
}
```

Add the following to your app’s `build.gradle`:

##### Step 3: Launch Payform Activity
```java
private void startPayForm() {
  Options options = getOptionsForThisDemo();
  Purchase purchase = getPurchaseForThisDemo();

  Intent intent = new Intent(PayFormActivity.ACTION_PAYFORM_LAUNCH);
  intent.putExtra(PayFormActivity.EXTRA_OPTIONS, options);
  intent.putExtra(PayFormActivity.EXTRA_PURCHASE, purchase);

  startActivityForResult(intent, PayFormActivity.REQUEST_PAYFORM);
}
```

From your app you will need to launch the activity with options and purchase information.

##### Step 4: Get The Results
```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  if (requestCode == PayFormActivity.REQUEST_PAYFORM) {
    String error = "";
    PayFormResult result = null;

    if (resultCode == Activity.RESULT_OK) {
        result = data.getParcelableExtra(PayFormActivity.EXTRA_PAYFORM_RESULT);
    } else if (resultCode == Activity.RESULT_CANCELED) {
        error = getResources().getString(R.string.demo_payform_cancelled);
    } else {
        error = getResources().getString(R.string.demo_payform_error);
        result = data.getParcelableExtra(PayFormActivity.EXTRA_PAYFORM_RESULT);
    }

    showError(error);
    showResults(result);
  }
}
```

You will need to collect the PayFromResult that contains the cardInfo.code that is your payment processing token.

##### Step 5: Process the token
Now that you have tokenized card data on your server, use it to either:

* process or pre-authorize a payment
* create a payment profile.

#### Customization

You can supply several parameters to configure the form, such as your company name, logo, product description, price, currency, and whether billing/shipping addresses should be displayed.

##### Required Parameters
| Parameter | Description                                 |
| --------- | ------------------------------------------- |
| amount    | amount you are going to charge the customer |
| currency  | currency being used for this purchase       |

##### Optional parameters
| Parameter                    | Description                                                |
| ---------------------------- | ---------------------------------------------------------- |
| description                  | your company name                                          |
| companyLogoResourceId        | your company logo                                          |
| companyName                  | the theme hex color to use – default is #067aed            |
| isBillingAddressRequired     | a description of the purchase                              |
| isShippingAddressRequired    | if the shipping address is required – true/false           |
| themeResourceId              | if the billing address is required – true/false            |
| tokenRequestTimeoutInSeconds | the block of code to be executed after a token is received |

### iOS

#### Overview
PayForm iOS is a native iOS SDK for taking payments in your iOS app.

PayForm iOS is a payment form that provides a clean and smart user experience when accepting payments in your iOS app. It is complementary to the Web PayForm SDK. It limits the scope of the merchant’s PCI compliance by removing the need for them to pass the sensitive information (credit card number, CVD, or expiry) through their servers and from having to write and store code that comes in contact with that sensitive information.

This payment form is a small iOS (Swift) framework project that implemented as a view controller that you can add to your app project. Most apps will let users launch PayForm to gather credit card details from something like a button action. It provides some client-side validation and smart field data formatting.

#### How It Works
The PayForm controller is instantiated and presented by your app code. The resulting payment form may contain input fields for a shipping address, for a billing address and for credit card details.

Once the user has completed all fields with valid input a processing closure, provided by you, is executed and is passed address information and a token for the credit card details. The processing closure is intended to allow the app developer to define a block of code to do any additional background processing and then dismiss the form.


#### Demo App And Source
Use this demo to see how to integrate PayForm.

#### Integration
Adding PayForm to your app could not be easier. You simply use CocoaPods and our Artifactory repository to add the PayForm framework. PayForm is configured by setting properties on the PayFormViewController instance you create and present. It can be configured to collect shipping and billing addresses in addition to the card details.

##### Step 1: Setup Dev Tools
```
#  setup the Artifactory plugin
gem install cocoapods-art

#  Add the Beanstream CocoaPods repo
pod repo-art add beanstream-public "https://beanstream.jfrog.io/beanstream/api/pods/beanstream-public"
```

This project was compiled with Xcode 7.3.1 and uses Swift 2.2.

The first step is to install CocoaPods on your development machine. Then you will also need to install an Artifactory plugin for CocoaPods. You will then add the needed Beanstream Cocoapods repository and add the PayForm pod to your app project. You can also supply several parameters to configure the form, such as your company name, logo, product description, price, currency, and whether billing/shipping addresses should be displayed.

Go to https://cocoapods.org on how to setup CocoaPods. This framework was validated with CocoaPods v1.0.1.

1. Setup the Artifactory plugin
2. Add the Beanstream CocoaPods repo
3. execute a ‘pod init’ in your iOS project directory

```objective_c
use_frameworks!

plugin 'cocoapods-art', :sources => [
  'beanstream-public'
]

target 'MyProject' do
  pod 'PayForm'
end
```

4. add the Artifactory plugin and PayForm pod to your Podfile (see code sample)
5. execute the standard ‘pod install’ command

After having executed a ‘pod init’ in your iOS project directory, add the Artifactory plugin and PayForm pod to your Podfile as follows and then execute the standard ‘pod install’ command.

Note that ‘pod update’ alone does not update Artifactory based pod indexes as expected. Use ‘pod repo-art update beanstream-public’ first and then use ‘pod update’.

##### Step 2: Add Payform To Your App
Here is an example, written in Swift of how PayForm is wired to a button action that simply updated a status label.

```objective_c
@IBAction func buttonAction(sender: AnyObject) {
    let bundle = NSBundle.init(forClass: PayFormViewController.classForCoder())
    let storyboard = UIStoryboard(name: "PayForm", bundle: bundle)
    if let controller = storyboard.instantiateInitialViewController() as? PayFormViewController {
        self.statusLabel.text = ""

        controller.name = "Lollipop Shop"
        controller.amount = NSDecimalNumber(double: 100.00)
        controller.currencyCode = "CAD"
        controller.purchaseDescription = "item, item, item..."
        //controller.image = UIImage(named: "icon")
        //controller.primaryColor = UIColor.blueColor()       // default: "#067aed"
        //controller.shippingAddressRequired = true           // default: true
        //controller.billingAddressRequired = true            // default: true
        //controller.tokenRequestTimeoutSeconds = 6           // default: 6

        controller.processingClosure = { (result: Dictionary<String, AnyObject>?, error: NSError?) -> Void in
            if let error = error {
                let msg  = "error (\(error.code)): \(error.localizedDescription)"
                self.statusLabel.text = msg
            }
            else if let result = result {
                if let cardInfo = result["cardInfo"] as? Dictionary<String, String>, let token = cardInfo["code"] as String! {
                    self.statusLabel.text = "token: \(token)"
                }
                else {
                    self.statusLabel.text = "No Token!"
                }

                if let shippingInfo = result["shippingAddress"] as? Dictionary<String, String> {
                    print("shipping: \(shippingInfo)")
                }

                if let billingInfo = result["billingAddress"] as? Dictionary<String, String> {
                    print("billing: \(billingInfo)")
                }
            }
            else {
                let msg = "No error and no result data!"
                self.statusLabel.text = msg
            }

            self.dismissViewControllerAnimated(true, completion: nil)
            self.view.setNeedsLayout() // Needed in case of view orientation change
        }

        self.presentViewController(controller, animated: true, completion: nil)
    }
}
```

###### Required Parameters
| Parameter | Description                                 |
| --------- | ------------------------------------------- |
| amount    | amount you are going to charge the customer |
| currency  | currency being used for this purchase       |

###### Optional parameters
| Parameter               | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| name                    | your company name                                          |
| image                   | your company logo                                          |
| primaryColor            | the theme hex color to use – default is #067aed            |
| purchaseDescription     | a description of the purchase                              |
| shippingAddressRequired | if the shipping address is required – true/false           |
| billingAddressRequired  | if the billing address is required – true/false            |
| processingClosure       | the block of code to be executed after a token is received |

##### Step 3: Process The Payment
Whether you collect the tokenized card data and send it asynchronously to your server, or take any other action, you will need to collect the cardInfo code string value that is your token to process the payment with.

Now that you have tokenized card data on your server, use it to either process or pre-authorize a payment, or create a payment profile.
