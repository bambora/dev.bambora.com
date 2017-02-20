---
title: Merchant Quickstart
layout: tutorial

summary: >
Learn how to create, configure, and test your merchant account with our Payment APIs. 

navigation:
  header: na.tocs.na_nav_header
  footer: na.tocs.na_nav_footer
  toc: na.tocs.merchant_quickstart
  header_active: Guides

---

# Merchant Quickstart

Welcome to our setup and configuration guide. Here you will learn how to  create, configure, and test your merchant account with our Payment APIs. 


## 1. Create a test account

You can create a test merchant account [here](/docs/forms/create_test_merchant_account).

## 2. Generate API keys

You will need a Merchant ID (MID) and an API key per API that you wish to test. Your MID can be found in the top-right corner of the screen after logging in to the <a href="https://www.beanstream.com/admin/" target="_blank">Back Office</a>.

You can generate five keys for our five APIs in our Back Office.

* **Payments API Key:** Navigate to `Administration > Account Settings > Order Settings` in the sidebar, then scroll to `Payment Gateway > Security/Authentication`. If the 'API Access Passcode' field is empty, you can generate a new key by clicking the 'Generate New Code' button, scrolling to the bottom of the screen and clicking the 'Update' button.

* **Recurring Billing API Key:** Navigate to `Administration > Account Settings > Order Settings` in the sidebar, then scroll to `Recurring Billing`. If the 'API Access Passcode' field is empty, you can generate a new key by clicking the 'Generate New Code' button, scrolling to the bottom of the screen and clicking the 'Update' button.

* **Reporting API Key:** Navigate to `Administration > Account Settings > Order Settings` in the sidebar, then scroll to `Reporting`. If the 'API Access Passcode' field is empty, you can generate a new key by clicking the 'Generate New Code' button, scrolling to the bottom of the screen and clicking the 'Update' button.

* **Batch File Upload (ACH/EFT Payments) API Key:** Navigate to `Administration > Account Settings > Order Settings` in the sidebar, then scroll to `Batch File Upload`. If the 'API Access Passcode' field is empty, you can generate a new key by clicking the 'Generate New Code' button, scrolling to the bottom of the screen and clicking the 'Update' button.

* **Payment Profile API Key:** Navigate to `Configuration > Payment Profile Configuration` in the sidebar, then scroll to `Security Settings`. If the 'API Access Passcode' field is empty, you can generate a new key by clicking the 'Generate New Code' button, scrolling to the bottom of the screen and clicking the 'Update' button.

## 3. Encode API Passcode
Now that you have your Merchant ID and API keys, you can combine them to create API passcodes required passed in the Authorization header. The format for an API passcode is the Merchant ID followed by the API key, separated with a colon (`merchant_id:api_key`).

You can create encode the passcodes in the form [here](/docs/forms/encode_api_passcode).
