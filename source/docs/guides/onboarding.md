---
title: Onboarding
layout: tutorial

summary: >
    The Onboarding API allows you to take full control of a user’s onboarding experience. You can design, build, and brand the UI through which a sub-merchants sign up for a Beanstream account.

navigation:
  header: na.tocs.na_nav_header
  footer: na.tocs.na_nav_footer
  toc: false
  header_active: Guides
---

# Onboarding
The Onboarding API allows you to take full control of a user’s onboarding experience. You can design, build, and brand the UI through which a sub-merchants sign up for a Beanstream account. You can reuse the merchant’s information already collected to create a lightweight integration.

You can submit either completed or partially completed applications. This means you can allow your sub-merchant to submit their application in stages or to submit supporting documentation at a later date. This also facilitates tracking of dropped applications.

The API allows the partner to specify which services the new merchant account should be provisioned with. The API supports the onboarding of merchants for card payments in Canada and the US, as well as funds transfer services in Europe, the UK and North America

## Partner integration
**Step 1:** Request a Partner account. Simply complete the form at the bottom of the page and one of our account managers will be in touch.

Once accepted onto our Partner Program, you will be emailed an API access token for Sandbox testing and a pricing package ID that will set the rate the customers are charged for processing.

**Step 2:** Integrate. Now that you have a token, you are ready to integrate. This guide and the API spec will detail how.

**Step 3:** Request a review. When you have finished integrating, it is time to get a review of your site. Contact your account manager to set this up. It usually only takes an hour and can be completed within a business day. This is what you need to show:

Your integration submits complete applications. The required fields are specified in the API spec.
You display or link to the Terms and Conditions.
You display or link to the prices for card processing or EFT/ACH/BACS/SEPA.
Once your integration is accepted you will be emailed an API key for our production environment.
Step 4: Send a test application on Production. Let us know the application ID and onboarding flow for the test app and we will remove it after the test.

**Step 5:** Start processing real applications!

## Sub-merchant application flow
**Step 1:** You submit an application for a sub-merchant via the onBoarding API

**Step 2:** We approve, reject or ask for more information.

**Step 3:** You will track these updates by polling the API as the service does not yet support push notifications.

## Authentication
You will need to include an Authorization Header with an API access token with each request to the API. You send the token in the Authorization Header like so:

```
Authorization: Token YOUR_TOKEN_HERE
```

You will be emailed an API access token when you are approved for a Partner account. You can request a Partner account by completing the form at the bottom of the page.

## API Structure
The API endpoints are organised according to the functionality being requested:

### Funds transfer:
/workflows/ach-usd/applications
/workflows/eft-cad/applications
### Card payments:
/workflows/psp-cad/applications
/workflows/psp-usd/applications
### Gateway:
/workflows/gw-cdn/applications
/workflows/gw-usa/applications

## Functionality
A partner can create, read and update applications. The API does not support application deletion. Let’s look the flow of API calls for an application for a merchant account provisioned to accept card payments in Canadian dollars.

### Create an application
**POST** /workflows/psp-cad/applications
### Read an application
**GET** /workflows/psp-cad/applications/{applicationId}
### Update an application
**PUT** /workflows/psp-cad/applications/{applicationId}
### Upload supporting documents to an application
**PUT** /workflows/psp-cad/applications/{applicationId}/documents/{documentId}

A full description of the parameters accepted and the data returned by these API endpoints is accessible here.

## Required fields
Most, but not all, fields listed in the API spec are required. You do not need to submit all required fields with each request, but in order to get an application to the in_review state, all required fields must be populated.

## Updating and deleting fields
When you update an application all fields that you pass in will be saved. If there are fields that you do not want updated, then simply do not pass them. If there are fields that you previously passed, but now want emptied, then set their value to null or zero. Here is an example JSON request removing some fields:

```
{
    "applicant": {
      "first_name": null,
      "last_name": null
    }
}
```

## API versioning
You should always integrate to the latest version of the API listed on the API spec. If we deploy a new version change the version of the API we will contact you and request that you update to the new version. This change will usually be quite minor and we will give you a window to make any updates, test, and deploy.

To switch between versions you just need to add the version to the header, like so:

```
X-API-Version: SELECTED_VERSION_HERE
```

## Testing
You will want to test your app against the sandbox API before you go Live. To do that just send your API requests to this URL:
https://uat-onboarding-api.beanstream.com/v1/
For example, a request to GET an application would be:

https://uat-onboarding-api.beanstream.com/v1/workflows/psp-cad/applications/{applicationId}
While developing you will want to test the various app states, such as ‘approved’ and ‘rejected’. To do this simply set the company name to:

* **TEST_APPROVED** – to set the app to approved state
* **TEST_REJECTED** – to set the app to rejected state

Note that you will first have to get the app into the in_review state by populating all of the required fields. After that our test service will automatically set the state to the value you specified in the company name.


## Sample Request
You can execute the cURL request below by copying the code into a text editor, replacing the version and authorization placeholders and then pasting and executing the updated request in Terminal.

```curl
Definition
POST /v1/workflows HTTP/1.1

Request
curl https://uat-onboarding-api.beanstream.com/v1/workflows/psp-cad/applications \
-H "Authorization: Token yourToken" \
-H "Content-Type: application/json" \
-H "X-API-Version : SELECTED_VERSION_HERE" \
-d '{
    "pricing_id": "12341234",
    "applicant": {
      "first_name": "John",
      "last_name": "Doe",
      "phone_number": "222-222-2222"
    }
}'
```

## Processing payments and sending money on behalf of a sub-merchant
When an application is approved, your sub account will be activated. You can now process payments and send money on their behalf.

To do this you can log into your merchant Backoffice and view the newly registered sub account’s security configuration settings. You will have to take the Payments API key and use that to process the transaction, as well as their merchant ID.

## Application state
Applications will go through several states until they are finally approved and the merchant account is live.

When an application is created it will begin in the ‘in_progress’ state. It will stay in this state until all required fields are populated. At that time it will automatically move into the ‘in_review’ state. When being reviewed the data cannot be changed. After review the application will be moved to ‘approved’ or ‘rejected’. If an application was rejected, you can simply get the application info, create a new one and copy the info into it to go through the approval process again. Only do this if you are changing information that you believe may be in error or incorrectly entered.

## Terms and conditions api
You need to either display or link to the Terms and Conditions in your UI. The API requires that you specify the exact version of the Terms And Conditions that your sub-merchant has agreed to and the date/time at which they agreed.

[Note: you may request the terms doc in either html or pdf format. The version id is specific to the format.]

Here are the two steps:
Query the latest version id of the doc
https://uat-onboarding-api.beanstream.com/v1/workflows/{{flow}}/terms/default/{{format}}/version/
e.g. https://uat-onboarding-api.beanstream.com/v1/workflows/psp-usd/terms/default/html/version/
Retrieve the doc
https://uat-onboarding-api.beanstream.com/v1/workflows/{{flow}}/terms/default/{{format}}/version/{{version}}
e.g. https://uat-onboarding-api.beanstream.com/v1/workflows/psp-usd/terms/default/html/version/Oj0iO3b5W8iZJ2b61LU2dgGI7sqV1FYA
On the same page that you display the terms you must also either display or link to the pricing. You must clearly tell the customer what rate they are paying. This can just be your regular pricing page, but it must state that there are processing fees and the fees themselves.

### Terms and conditions versioning
The API requires that you submit the T&C version as part of the application agreement. Querying the latest version of the terms returns a JSON object with ‘name’ and ‘version’ attributes. You need to reference these values then you update the ‘agreement’ on the main application.

e.g. If https://uat-onboarding-api.beanstream.com/v1/workflows/psp-usd/terms/default/html/version returns:

```json
{
  "name": "psp-usd/default/html/2016-08-29_21:46:10",
  "version": "Oj0iO3b5W8iZJ2b61LU2dgGI7sqV1FYA"
}
Your ‘agreement’ attribute on the main application will be:
"agreement": {
  "name": "psp-usd/default/html/2016-08-29_21:46:10",
  "version": "Oj0iO3b5W8iZJ2b61LU2dgGI7sqV1FYA",
  "timestamp": "2010-10-25 23:48:46 UTC"
}
```
[Note: We will review your onboarding page(s) to ensure you displaying the terms and pricing correctly before giving you an API key for our Production environment.]


## FAQ
* **What fields do i need to set on the application?**
 * All fields must be set for an application to move into the in_review state. Not all fields need to be set on each request however. You can save the application many times adding values for the new fields each time.
* **The api spec lists some id attributes, what do i do with them?**
 * In the various application objects are read-only ID attributes. You do not need to set these. When you create an application they will be generated for you. The only IDs you will need to set are the Pricing IDs.
* **How do I test the applications?**
 * There is a UAT (User Acceptance Test) URL you can use to test application creation: https://uat-onboarding-api.beanstream.com/. You can also set the company name to some specific values (such as TEST_APPROVED) to automatically set the approved/rejected status of an app. The app must first be fully populated with all the requiref fields before this will occur.
* **Is there a different url for the production version of the api?**
 * There is a separate production URL and a separate API token: https://onboardingapi.beanstream.com/
* **What date format do I use?**
 * All dates must be in ISO-8601 format with a time: YYYY-MM-DDThh:mm:ssTZD or 1994-11-05T08:15:30-05:00
For birthdays or dates that you don’t know the time just set any time of the day, or just zeros.
* **How do I set my account to live?**
 * When you have finished testing your integration contact your Beanstream account manager to arrange for a review of your onboarding pages. We need to ensure you have the right terms and conditions listed and have the price for any fees listed. Once approved, you will receive a production API key and can begin using the API to onboard customers.
* **How long does it take to approve a merchant once their application goes into in_review status?**
 * This usually occurs within the day. If there are missing files, such as photo ID, then our team will reach out to the customer and ensure all the information needed is collected.
* **How do i attach documents to the application?**
 * Some applications require documents such as photo ID or a void cheque. These can come in various image formats and can be attached using the POST /workflows/abc-xyz/applications/{applicationId}/documents URL end point. Documents must be base64 encoded when added to the message body. Not all application types require documents. Refer to the API spec to see if you need them.
* **Can I re-use data from one application type for another for the same customer?**
 * You absolutely can. It is common to enable several payment options for a single customer and to make this easy you can re-use the information from one application for another. Many of the fields are the same, but there are different Terms and Conditions so you must make sure to display both.
* **How do i know if an application has been approved?**
 * At the moment you must query the API using the HTTP GET verb and the application ID to get the application state. We are adding in web hooks to the API so you will receive notifications automatically as soon as an application is approved.
