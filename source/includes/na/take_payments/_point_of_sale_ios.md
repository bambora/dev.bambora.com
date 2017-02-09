## iOS Integration Guide

This guide explains how to get started using the sproutPOS iOS SDK.

### Working with the Ingenico iCMP
The Ingenico iCMP is the payment terminal that sprout uses. When you distribute your app you will need to also distribute the payment terminal. We will work with you when you get to that stage of launch.

You do not need this terminal to get started testing. We’ve built in a simulator to the SDK so you can simulate responses from the terminal. Responses such as:

* Successful/failed login
* Approved/declined payments
* Bluetooth errors
* etc.

This simulator will let you test your app using the SDK without needing an actual iCMP pin pad terminal. It will let you choose different responses by popping up a response dialog in the app.

For information on Pairing the iCMP with your phone please head to our Pairing guide. You only need to do this once you receive an actual terminal before final testing.

### Setup
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>
    <string>com.ingenico.easypayemv.printer</string>
    <string>com.ingenico.easypayemv.barcodereader</string>
    <string>com.ingenico.easypayemv.spm-transaction</string>
    <string>com.ingenico.easypayemv.spm-configuration</string>
    <string>com.ingenico.easypayemv.spm-networkaccess</string>
    <string>com.ingenico.easypayemv.spm-sppchannel</string>
</array>
</plist>
```

Ensure that your iOS project file has an Other Linker Flag option set with -ObjC. The Beanstream API makes use of Grand Central Dispatch (GCD) based Blocks to implement an asynchronous request/response mechanism.

The Ingenico iCMP device is connected to via Bluetooth using MFi based protocols. As such any new apps will need to be authorized for use by Beanstream with Apple and related app submissions will need to reference a valid MFi specific identifier in their app submission metadata to be approved in iTunes Connect. To be able to connect with an Ingenico iCMP device an app will need to declare the following in its `info.plist`:

### Taking Payments
#### 1. Instantiate the API
```objective_c
BICBeanstreamAPI *api = [[BICBeanstreamAPI alloc] init];
```
> Note. You must have the 'Objective C' tab selected to view this code sample.

All API calls are made accessible through the BICBeanstreamAPI class.

#### 2. Take a Payment
```objective_c
[api createSession:companyLogin username:username password:password completion:^(BICCreateSessionResponse *response, NSError *error) {
    if (error) {
        // Optionally do something with the error.
    }
    else {
        if (response.code == 1) {
            // Optionally do something with the completely successful response.
        }
        else {
            // Optionally do something with the response that completed normally
            // but that indicates some kind of potential issue.
        }
    }
}];
```

In order to execute any subsequent API calls you first need a valid session.

#### 3. Connect to an EMV pin pad
```objective_c
[api connectToPinPad]; // Initiates a connection to a Pin Pad

[api isPinPadConnected]; // Returns YES or NO based on Pin Pad connection status

[api closePinPadConnection]; // Closes and cleans up an active connection
```
> Note. You must have the 'Objective C' tab selected to view this code sample.

The next step is to initialize the connection to the Ingenico iCMP pin pad. The SDK will communicate to it via bluetooth.

#### 4. Process Transaction
```objective_c
BICTransactionRequest *request = [[BICTransactionRequest alloc] init];
request.transType = @"C";
request.emvEnabled = YES;
request.amount = @"10.00";
request.paymentMethod = @"C";

[api processTransaction:request completion:^(BICTransactionResponse *response, NSError *error) {
    if (error) {
        // Optionally do something with the error.
    }
    else {
        if (response.trnApproved) {
            // Optionally do something with the completely successful response based on
            // response.code values.
        }
        else {
            // Optionally do something with the response that completed normally
            // but that indicates some kind of potential issue.
        }
    }
}];
```
> Note. You must have the 'Objective C' tab selected to view this code sample.

The last, and most exciting piece, is to trigger a payment:

### Search Transaction
```objective_c
NSDate *now = [NSDate date];
BICSearchTransactionsRequest *request = [[BICSearchTransactionsRequest alloc] init];
request.reportStartDate = [now dateByAddingTimeInterval:-3*24*60*60]; // show txn's from up to 3 days ago
request.reportEndDate = now;
request.reportSortOrder = BICSortOrderByTransactionId;

[api searchTransactions:request completion:^(BICSearchTransactionsResponse *response) {
    if (error) {
        // Optionally do something with the error.
    }
    else {
        if (response.code == 1) {
            // Optionally do something with the completely successful response.
        }
        else {
            // Optionally do something with the response that completed normally
            // but that indicates some kind of potential issue.
        }
    }
}];
```
> Note. You must have the 'Objective C' tab selected to view this code sample.

The SDK also allows you to search all past transactions so you can display them in the app. You use `BICTransactionsRequest` to do this.
