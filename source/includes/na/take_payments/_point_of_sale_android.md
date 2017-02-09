## Android Integration Guide

This guide explains how to get started using the sproutPOS Android SDK.

Current version: 2.3.0 – The full change log can be viewed here.

If you would like to just jump to some sample code then head to our sample app.

### Working With The Ingenico iCMP
The Ingenico iCMP is the payment terminal that sprout uses.

When you distribute your app you will need to also distribute the payment terminal. We will work with you when you get to that stage of launch.

You do not need this terminal to get started testing. We’ve built in a simulator to the SDK so you can simulate responses from the terminal. Responses such as:

* Successful/failed login
* Approved/declined payments
* Bluetooth errors
* etc.

This simulator will let you test your app using the SDK without needing an actual iCMP pin pad terminal. It will let you choose different responses by popping up a response dialog in the app.

For information on Pairing the iCMP with your phone please head to our Pairing guide. You only need to do this once you receive an actual terminal before final testing.

### Integrating Payments Into your App
#### Android Manifest Permissions
```java
// add the appropriate permissions to the manifest file of your Android project
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```
> Note. You must have the 'Android' tab selected to view this code sample.

The first step is to add the appropriate permissions to the manifest file of your Android project.

'''java
// enable the ingenico services for the Pin Pad device
<application>
...
<service android:name="com.ingenico.pclservice.PclService" />
<service android:name="com.ingenico.pclservice.BluetoothService" />
</application>
'''
> Note. You must have the 'Android' tab selected to view this code sample.

You will also need to enable the ingenico services for the Pin Pad device.

#### Basic Gradle Setup

We use Gradle for dependency management. You can, however, use maven if you wish. Just import the dependencies listed below. In order to get access to the SDK you will need to contact us and we will supply you with a username and password so you can download the EMV SDK libraries.

```java
apply plugin: 'com.android.application'

repositories {
    jcenter()
    maven { //Be sure this is your last repo or you will get extremely long build times.
        credentials {
            username "${bic_artifactory_user}"
            password "${bic_artifactory_password}"
        }
        url "${bic_artifactory_url}"
    }
}

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.2"

    signingConfigs {

        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_7
            targetCompatibility JavaVersion.VERSION_1_7
        }

        packagingOptions {  //This is required
            exclude 'META-INF/ASL2.0'
            exclude 'META-INF/LICENSE'
            exclude 'META-INF/license.txt'
            exclude 'META-INF/NOTICE'
            exclude 'META-INF/notice.txt'
        }
    }   
}

dependencies {
    compile 'com.beanstream.android.sdk:BeanstreamMobileSDK:2.3.0@aar'
    compile 'com.beanstream.android.sdk:BeanstreamTransportSDK:2.3.0@aar'
    compile 'com.beanstream.android.sdk:EMVMobileSDK:2.3.0@aar'
    compile 'com.beanstream.android.sdk:sproutpos-android-apisimulator:1.2.0@aar'
    compile 'de.greenrobot:eventbus:2.4.0'
    compile 'com.squareup.okhttp:okhttp:2.3.0'
    compile 'com.squareup.retrofit:retrofit:1.9.0'
    compile 'com.google.code.gson:gson:2.3.1'
    compile('net.danlew:android.joda:2.8.1') {
        exclude group: 'com.google.android', module: 'support-v4'
    }
    compile('com.squareup.retrofit:converter-simplexml:1.9.0') {
        exclude module: 'stax'
        exclude module: 'stax-api'
        exclude module: 'xpp3'
    }
}
```
> Note. You must have the 'Android' tab selected to view this code sample.

Note that we will supply you with the values for the 3 parameters `${bic_artifactory_user}`, `${bic_artifactory_password}`, and `${bic_artifactory_url}`.

These values can be placed in the `gradle.properties` file

```java
// gradle.properties
bic_artifactory_user=username
bic_artifactory_password=password
bic_artifactory_url=url
```
> Note. You must have the 'Android' tab selected to view this code sample.

#### Instantiating the API
```java
BeanstreamAPI beanstreamAPI = new BeanstreamAPI(getApplicationContext());
```
> Note. You must have the 'Android' tab selected to view this code sample.

Now lets move onto the actual Java code.

The way you get access to the API is through the `BeanstreamAPI` class. The constructor for this requires the applications context. Note: If you supply the activities context, our API will get the application context through that.

#### How To Receive Events
```java
@Override
public void onResume() {
    super.onResume();
    EventBus.getDefault().registerSticky(this);
}

@Override
public void onPause() {
    super.onPause();
    EventBus.getDefault().unregister(this);
}
```
> Note. You must have the 'Android' tab selected to view this code sample.

We use EventBus to return important events. Before you can receive an event, you need to register to receive them when you enter your activity, and then unregister when you leave your activity. All of our events have an interface available in the BeanstreamEvents class. You can use these interfaces to identify what events were triggered specifically by the EMV SDK.

For more information about the event’s available options and their uses, head to the Event Bus documentation.

#### Creating A session
##### **Step 1:**
```java
beanstreamAPI.createSession(companyName, userName, password);
```
> Note. You must have the 'Android' tab selected to view this code sample.

After you instantiate the API, you need to create a session before the other APIs will function. This is where the merchant or employee logs in with their credentials. You will want to create a login window and pass along the Company Name, Username, and Password to this `createSession()` method:

That line of code initiates an asynchronous network call, which when complete, returns an Event.

##### **Step 2:**
```java
public class MyActivity extends AppCompatActivity implements
        BeanstreamEvents.CreateSession {
..
..
public void onEventMainThread(CreateSessionResponse response) {

    //Sticky events are used to ensure you receive the call when needed and survive device rotations.
    //Once you've consumed the event, you will need to remove the event or it will trigger the next time
    //the event bus is registered.
    EventBus.getDefault().removeStickyEvent(response);

    if (response.isAuthorized()) {
        if(response.getMerchant().getTerminalType().equals(CreateSessionResponse.TERMINAL_TYPE_ENCRYPTED)){
            //display a Success or a Logged In message for feedback to the merchant and log them in
        }else{
            //Only encrypted iCMP EMV accounts function with sproutPOS.
            //Other accounts types may create sessions but they will not be able to process transactions.
            //We recommend showing a dialog advising the user that the account they are using is not supported.
        }
    } else {
        //They are not authorized, show the response message
        Toast.makeText(this, response.getMessage(), Toast.LENGTH_LONG).show();
    }
}

public void onEventMainThread(CreateSessionError response) {   
    EventBus.getDefault().removeStickyEvent(response);
    //There was an error, pop up a message to let the merchant know to try to log in again
 }
}
```
> Note. You must have the 'Android' tab selected to view this code sample.

Next we need to handle the events triggered by that call to create a session. The events will listen for success or error messages when trying to initiate the session:

Note: Receiving an ERROR event indicates that something went wrong completing the request e.g. Network errors (codes and messages subject to change).

#### API

* createSession(companyLogin, userName, password)
* createSessionWithRememberMe()
* processTransaction(transactionRequest, transactionOptions)
* searchTransaction(searchTransactionRequest)
* getPrintReceipt(transactionId, language)
* sendEmailReceipt(transactionId, email, language)
* sendEmailReceipt(transactionId, email, updateEmail, language)
* attachSignature(transactionId, bitmap)
* authenticateSession()
* abandonSession()
* initializePinPad()
* updatePinPad()

Note: All of the above networked API calls require authentication and will trigger a SessionInvalidEvent if your session is invalid. Additional events may be triggered if Session Retry functionalities are enabled, as described below.

#### Working With The Ingenico iCMP
##### Establishing a connection to the iCMP

```java
//Start pinpad service
beanstreamAPI.startPinPadService();
```
> Note. You must have the 'Android' tab selected to view this code sample.

After you create a BeanstreamAPI object, you need to establish a connection with the iCMP.

```java
public void onEventMainThread(PinPadStateChangeEvent event){
	/*
	Use this to change icons and give visual queues in the app.
	E.G. Disable the payment button when disconnected.  

	Note - It is not recommended to initiate an initialization or EMV transaction based on this event.
	The change to connected status does not always mean the iCMP is "ready" to initialize or process a
	transaction. During initial reboot there is a small delay between when it says it's ready, and when
	it's actually ready. Attempting to trigger an initialization or transaction while it's rebooting and
	initially indicating a connected status, will fail. However, if you simply turn your bluetooth on/off
	it will be ready when the event triggers. Unfortunately we do not know if the state change is happening
	during a reboot.
	*/

	if (event.isAlive()) {
		paymentButton.setEnabled(true);
	} else {
		paymentButton.setEnabled(false);
	}   
}
```
> Note. You must have the 'Android' tab selected to view this code sample.

We recommend that service is start/stopped within the Android onPause/onResume life cycles. This helps ensure it gets closed down when the app is minimized. Additionally there should be a special check to not stop it if a transaction is processing. See below under “Current Recommended Approach” for further details.

After the service has started, you will start receiving events whenever the connection status changes. This event is available in the interface BeanstreamEvents.PinPadState

```java
beanstreamAPI.isPinPadConnectionAlive();
```
> Note. You must have the 'Android' tab selected to view this code sample.

You can also manually query the status of the connection at any time using:

##### Initializing the ICMP
```java
beanstreamAPI.initializePinPad();

public void onEventMainThread(InitCardReaderResponse initCardReaderResponse) {
    EventBus.getDefault().removeStickyEvent(initCardReaderResponse);

    if (initCardReaderResponse.isSuccessful() && initCardReaderResponse.isInitialized()) {
        //optional: Show a toast saying that the device is initialized
    } else {
        //do something else
    }
}
```
> Note. You must have the 'Android' tab selected to view this code sample.

After you establish a connection to the iCMP you need to initialize it. This configures the iCMP so it can begin processing transactions. The iCMP’s screen changes and displays Welcome after you run the initialization.

You can only initialize the iCMP after it has booted up and it is in its ready state. If the iCMP has already been initialized, it cannot be initialized again until you reboot the terminal. You do not need to initialize it again if it’s already initialized. Any attempt to initialize a second time will return that it has failed to initialize, since it already is initialized.

The beanstreamAPI.processTransaction() API will also attempt to initialize the iCMP before every transaction. If it is initialized, this doesn’t slow anything down.

Manually initializing the iCMP gives your users more control and makes things easier to troubleshoot. If you don’t want this functionality though, you can simply let the system initialize itself when processing a transaction

If initialization fails, the iCMP displays a message indicating it failed. At this point you need to reboot the terminal and try again––you cannot process a transaction through the iCMP if this state is reached.

You can only initialize an iCMP with it’s associated merchant account. Attempting to initialize a different iCMP will fail

Note: When the iCMP fails to initialize, it will persist the state across app restarts to prevent transactions from attempting to process. When you reboot the iCMP and successfully initialize it, the flag will be cleared and processing can continue. There is one edge case where the flag will not clear properly, and that is if you reboot the terminal and then initialize it from a different mobile device. When this happens, the original device will still believe the iCMP is in a failed state and will not function until the iCMP is rebooted and initialized successfully by the original android device that thinks it failed.

##### Processing a transaction on the iCMP
```java
TransactionRequest transactionRequest = new TransactionRequest();
transactionRequest.setTrans_Type(TransactionTypes.PURCHASE);
transactionRequest.setPaymentMethod(PaymentMethods.CREDIT_EMV);
transactionRequest.setAmount("10.00");
beanstreamAPI.processTransaction(transactionRequest,
	new TransactionOptions(TransactionOptions.MODE_DEFAULT));
```
> Note. You must have the 'Android' tab selected to view this code sample.

After you are connected, you can send a transaction to the iCMP by creating a `TransactionRequest` and setting the payment method to `PaymentMethods.CREDIT_EMV` or `PaymentMethods.DEBIT_EMV`.

Note: Accounts that have been flagged to work with the PIN pad may only process credit card transactions via the PIN pad. Only credit card refunds may be done using `PaymentMethods.CREDIT_CARD_NOT_PRESENT`. For information on how your account is set up please contact our support staff.

There are three types of transaction modes which determine how the iCMP will behave.

* `MODE_DEFAULT` Allows chip, swipe and contactless transactions.
* `MODE_NO_CONTACTLESS` Allows chip and swipe transactions.
* `MODE_TIPS_NO_CONTACTLESS` Allows chip and swipe transactions and enables tips on the iCMP.

When the transaction completes, there are four things you should check for EMV transactions.

* `transactionResponse.isSuccessful()` indicates if the call completed correctly and XML was returned.
* `transactionResponse.isApproved()` is returned if the transaction was approved or declined.
* `transactionResponse.isSignatureRequired()` informs you that the iCMP indicates a signature is required for the transaction. Obtaining the signature is an EMV requirement. The transaction will complete without it, however, if you don’t obtain a signature, you cannot dispute any fraud claims that may occur for the transaction.
 * Beanstream will review and confirm that this functionality is working correctly before allowing merchants to be onboarded.
* `transactionResponse.isUpdateKeyEncryption()` to determine if a mandatory PIN pad update is required

During transaction processing, if you let the iCMP auto-initialize itself and it fails, you will receive a TransactionError event with error type Initialization.

##### Attaching a signature
When the transaction response indicates a signature is required, you need to call `beanstreamApi.attachSignature(transactionId, bitmap)`. When you receive the response, you can check if it completed successfully by calling `isSignatureAttached()`

It is recommended that you confirm the image has been attached correctly and is showing what you expect by logging into the back office and loading the transaction on the transaction details screen. We will be checking this as part of our certification

See our SignatureFragment and SignatureView in the sample app for an example.

##### Cleaning up when you are finished
```java
beanstreamAPI.stopPinPadService();
```

When you are finished with the connection to the iCMP, you need to close the connection or it will continue to run in the background. Stopping it when you leave the app is ideal, that way it is always ready while the app is open, but saves power when it’s closed.

Special Note: If you stop the service when you know a transaction is in the middle of being processed, it will kill the transaction. This includes things like accidental app closures, and phone calls interrupting the transaction. An EMV transaction must not be interrupted once started, with the exception of the app being force closed from a task manager, so be sure to take this into account!

##### Special note on starting/stoping the pin pad service
It is currently possible to cause the iCMP service to start and not stop, if you start/stop the service in very rapid succession, multiple times. If a service gets into this state, the only way to shut it down is to force close the app.

In order to avoid this, you should make sure the service has fully stopped before attempting to restart again. A scenario where this can happen is if you turn the service off if someone leaves the app, and turn it back on when they open it. Opening/closing the app repeatedly may cause the error.

This may also cause an Android Not Responding error.

##### Currently recommend approach to ensure things function correctly
```java
public void activityPaused() {
     Runnable stopped = new Runnable() {
        @Override
        public void run() {
            activitiesResumed--;
            if (activitiesResumed == 0 && beanstreamAPI != null) {
                beanstreamAPI.stopPinPadService();
                wasStopped = true;
            }
        }
    };
    handler.postDelayed(stopped, 300);
}

public void activityResumed() {
    activitiesResumed++;
    Runnable resumed = new Runnable() {
        @Override
        public void run() {
            if (activitiesResumed > 0 && beanstreamAPI != null && wasStopped && isBluetoothEnabled) {
                beanstreamAPI.startPinPadService();
                wasStopped = false;
            }
        }
    };
    handler.postDelayed(resumed, 1500);
}
```
> Note. You must have the 'Android' tab selected to view this code sample.

In some cases you may only want the service to shut down when there are no active activities, so we track how many are open and shut it down if none remain, with a slight delay. The delay is to prevent a trigger while switching between two activities. Then we delay restarting it if we want to restart it to avoid the potential ANR.

This is done by extending the `Application` class, and having all activities calling back to it so we can track if any are open. We do not callback to it when closing the app while on our processing fragment.

It’s also useful to only start the service if Bluetooth is enabled.

See our sample on GitHub for full implementation of this in GoldenEggsApplication

##### Tips
```java
int[] tipPresets = new int[]{10,20,30}; //Max 3 presets. Must be between 0 and 99

TransactionRequest transactionRequest = new TransactionRequest();
transactionRequest.setTrans_type(TransactionTypes.PURCHASE);
transactionRequest.setPaymentMethod(PaymentMethods.CREDIT_EMV)
transactionRequest.setAmount("10.00");
beanstreamAPI.processTransaction(transactionRequest,
	new TransactionOptions(TransactionOptions.MODE_TIPS_NO_CONTACTLESS, tipPresets));
```
> Note. You must have the 'Android' tab selected to view this code sample.

You can add tips functionality to the transaction flow on the iCMP. This allows the customer the option of adding a tip to the payment on the actual iCMP pin pad device.

To enable tips you must enable them in the constructor of the `ProcessTransaction` object.

##### Multi terminal support
```java
ArrayList<PinPad> pinPads = beanstreamAPI.getPairedPinPads();
beanstreamAPI.setActivePinPad(pinPads.get(index).getPinPadName());
```
> Note. You must have the 'Android' tab selected to view this code sample.

If you have more than one PIN pad paired to the same android device it will, by default, select the first one it sees unless you specifically tell it which one to use.

To get a list of paired PIN pads, you can call the method `beanstreamAPI.getPairedPinPads();`. This will return an `ArrayList<PinPad>` of all currently paired devices. Each PinPad has a name, and flag indicating if it’s the activated PIN pad.

To change the activated device, you can call `beanstreamAPI.setActivePinPad("pinPadsName");`

If you call beanstreamAPI.setActivePinPad while the PIN pad service is running, it stops the service in order to make the change, and then restarts it.

To persist the activated device across app restarts, you will need to save the name, and set it again when the app is restarted. If that device is no longer paired, it will revert to selecting the first device in it’s list.

If the selected PIN pad is not properly configured on the Beanstream system, an error will be returned when you attempt to initialize the PIN pad or process a transaction.

See the HardwarePreferenceFragment.java and GoldenEggsApplication.java files in our sample app for examples of this functionality.

##### Session management
```java
getMerchantId()
getSessionId()
getSavedCompanyLogin()
getSavedUserName()
```
> Note. You must have the 'Android' tab selected to view this code sample.

After you successfully create a session, the Beanstream SDK handles the session management on API calls for you. You can leave sessionId and merchantId off all request objects, as they are automatically populated if called via BeanstreamAPI.

Sessions will terminate after 24 hours of not being used. If the same credentials are used to generate a session, any previous valid session expires. It is important to ensure you have a valid session while performing network calls. You can use the Remember Me functionality, or the Session Retry Without Remember Me Enabled. Both are described below to help ensure calls do not fail due to invalid sessions.

If you need to query for this info directly, the following method calls are available from BeanstreamAPI

##### Remember me functionality
```java
//Methods
public boolean setRememberMe(boolean rememberMe)
public boolean isRememberMe()
public boolean isPasswordSaved()

//Events
SessionInvalidEvent()
RememberMeEncryptionError()

//Interface
BeanstreamEvents.RememberMe
```
> Note. You must have the 'Android' tab selected to view this code sample.

The SDK can save your user’s password if you want to enable this functionality. It will always remember the company login and user name of the last user.

If you set RememberMe to true, when the session is created, it will securely save the credentials using the Android KeyChain (requires an Android 4.3+ device). From then on, you can call createSessionFromSavedCredentials without needing to submit any details. We recommend calling isPasswordSaved() first to ensure the password is available.

Attempting to set Remember Me on a device prior to Android version 4.3 will cause the method to return a Boolean value of false. If you set Remember Me to false, it will purge the password from the system.

Due to how the Keychain works in Android, if you change your lockscreen authentication method (e.g. Pin-> Pattern) it will remove the stored credentials from the Keychain. This may be being addressed in Android 6.0, but until then, you will need to re-enter credentials when this happens.

If the password fails to decrypt while calling createSessionFromSavedCredentials it will return a createSessionError with an error type of ERROR_TYPE.DECRYPTION.

Note:There is a bug with the KeyChain where it can become locked, incorrectly preventing you from saving new credentials. This can only happen when new user credentials are being submitted. Using the saved credentials, or manually entering the same password to login will not trigger it.

When this happens you will receive a RememberMeEncryptionError during a createSession call, but the network call will authenticate successfully. Some combination of: uninstalling the app, adding/removing their lockscreen and rebooting the device typically resolves the issue. It’s inconsistent, but uninstalling and then changing the lockscreen seems to be the most successful method. Using this event to inform the user what is happening is recommended, otherwise it will look like there is no reason why the feature isn’t working.

See this link for details and star the issue to assist in getting this resolved.

###### Session retry
Remember Me also enables a single re-attempt on all API’s if they failed due to authentication issues. It will create a new session with the saved credentials and attempt to re-send the request. This can happen if a session has expired unexpectedly, and will help prevent any interruption to the user flow.

If the retry fails, it will send back a SessionInvalidEvent(). You can use this event to send them back to your login screen, attempt to create a new session, or some other appropriate task.

##### Session retry without remember me enabled
```java
//Methods
public void enablePasswordRetryWhenRememberMeOff()
public void disablePasswordRetryWhenRememberMeOff()
public void cancelPasswordRetry()
public void sendRetryPassword(String password)

//Events
SessionInvalidEvent()
PasswordRequiredEvent()

//Interface
BeanstreamEvents.RememberMe
```
> Note. You must have the 'Android' tab selected to view this code sample.

Users who do not enable Remember Me, risk having their session being invalid when they make an API call. Scenarios where this could happen are: if you haven’t authenticated their session recently; or they’ve used the same credentials on another mobile device, invalidating their other session. When this happens their API calls will fail due to invalid session.

If you call BeanstreamAPI.enablePasswordRetryWhenRememberMeOff, the SDK will intercept all failed network calls due to authentication issues. When this happens it will trigger a PasswordRequiredEvent() and wait for you to return a new password via with BeanstreamAPI.sendRetryPassword(String password). At this point you can present the user with a dialog, or some other way to submit a password. If the password is incorrect, it will trigger the event two more times in an attempt to be successful. Each attempt will wait for 2 minutes before it cancels itself, but will only wait the full 2 minutes once. If the transaction is successful with the new password, it will then proceed normally and return the success response.

You can also allow the user to cancel the request by calling BeanstreamAPI.cancelPasswordRetry().

If the retry attempts fail, cancelled, or the feature is disabled, it will return the failed response in addition to triggering a SessionInvalidEvent(). You can use this event to send them back to your login screen, attempt to create a new session, or some other appropriate task.

##### Updating the pinpad
The PIN pad will occasionally require firmware updates to continue working. Typically this is due to primary encryption keys being changed. When an update is required InitCardReaderResponse.isUpdateKeyEncryption() and TransactionResponse.isUpdateKeyEncryption() will return true.

When an update is available, it is critical that the PIN pad be updated as soon as possible, as the keys will expire within 30 days. When the keys expire, the PIN pad will not process transactions until it is updated. The update process takes under two minutes to complete and can be initiated with BeanstreamAPI.updatePinpad(context)

During the update process, the PIN pad will reboot once, and then auto initialize itself to complete the process.

Given that not all merchants use the hardware daily, it is possible that when they see the notice the keys could already be expired or expiring very soon.

##### Additional considerations and FAQ
ADDITIONAL CONSIDERATIONS AND FAQ
The Ingenico terminal is designed to work on ARM based chipsets. It will not work on all x86 based devices. It may work on some, depending on if the device manufacture adds ARM support.
