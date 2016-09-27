
<script type="text/javascript">

$(document).ready(function () {
	
	/*
	bamboraGitHub.getLatestReleaseInfo("https://api.github.com/repos/bambora/bambora-online-magento-v2.x/releases/latest").then(function(release){
	
		$("#lnkMagentoV2").attr("href", release.downloadLink);
		$("#lnkMagentoV2").prop('title', release.info);
	
	});
	*/
});

</script>




# Magento v2
Bambora makes it easy for you as an online merchant using Magento v2.x, to accept payments in your webshop by following this simple guide. This guide assumes that you have a running Magento v2.x site.
**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/online/carts/_magento.md) to edit this section.**




## Create an API user
To connect to Bambora your system must authenticate itself on your behalf. Using your Merchant number, Access token and Secret token allows Bambora to identify your system and grant it access to the Bambora Checkout.

1. Go to the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> and login

2. Select the Merchant number (test or production merchant number), in the top right corner, you want to create an API user for.

3. Click **Settings** -> **<a href="https://merchant.bambora.com/apiusers" target="_blank">API users</a>** in the left menu

4. Click **Create API user**

5. Enter an e-mail address and a description

6. Click **Create API user**

7. The system will now display your **Access token** and **Secret token**.
<br/>
**IMPORTANT!** Take note of the **Secret token** as it will only be displayed once.




## Install the Checkout Module for Magento v2.x

### Step 1: Install using Composer
1. Log into your Linux server terminal

2. Navigate to your Magento 2 root folder

3. Run the command `composer require bambora/module-payment-magento2`

4. Run the command `php bin/magento setup:upgrade`

5. Run the command `php bin/magento cache:flush`


### Step 2: Login to Magento
1. Go to your Magento administration page and log in. Example url: http://www.yourshop.com/admin


### Step 3: Configure the module
1. In the left menu click **Stores** -> **Configuration**

2. Expand **Sales** and click **Payment Methods**

2. Click the **Configure** button below the Bambora online logo

3. Enter and adjust the settings which are described in the Settings section.



## Settings
### Enabled
Set to **Yes** to allow your customers to use Bambora Checkout as a payment option.

### Title
The name of the payment option. This is the name your customers will see at checkout. Example “Pay with Bambora Checkout”.

### Merchant number
The merchant number you received from Bambora. You can find your merchant number in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/merchantnumbers" target="_blank">Merchant numbers</a>**.
<br/>
Merchant numbers starting with a **T** are for testing and numbers starting with a **P** are for live (Production) use.

### Access token
The Access token is the username of an API user. Enter the Access token for your API user, found in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/apiusers" target="_blank">API users</a>**. If you don’t have an API user, create one and take note of the Access token.

### Secret token
The Secret token is the password of an API user. This token is automatically generated when an API user is created and only displayed once at that time. Therefore you should take note of the Secret token when creating an API user. If you have lost the Secret token you will have to create a new API user in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/apiusers" target="_blank">API users</a>** -> **Create API user**.

### MD5 key
To enhance the security we recommend that you use the MD5 key. Bambora Checkout will work just fine without, but the MD5 key ensures that no one has modified the data sent from Prestashop to Bambora. You can find the MD5 key in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/merchantnumbers" target="_blank">Merchant numbers</a>** -> **Edit**

### Window ID
Choose the payment window ID to use. Use this to set up different texts and logos for foreign customers. View your payment windows in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/paymentwindows" target="_blank">Payment windows</a>**. 

### Instant capture
Enable instant capture to capture the payment immediately. You may only use instant capture if your customers receive their products immediately, like digital goods as e-books and the like.

### Immediate Redirect
Set to **YES** to redirect your customer to the order confirmation page when the payment is complete.<br>
Set to **NO** to keep displaying the payment window allowing the customer to close it.

