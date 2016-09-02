
<script type="text/javascript">

$(document).ready(function () {
	
	bamboraGitHub.getLatestReleaseInfo("https://api.github.com/repos/bambora/checkout-prestashop/releases/latest").then(function(release){
	
		$("#lnkPrestaShop").attr("href", release.downloadLink);
		$("#lnkPrestaShop").prop('title', release.info);
	
	});
});

</script>

# Prestashop

Bambora makes it easy for you as an online merchant using PrestaShop, to accept payments in your webshop by following this simple guide. To accept payments this guide assumes that you have a running PrestaShop site.

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/online/carts/_prestashop.md) to edit this section.**


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




## Install the Checkout module for PrestaShop

### Step 1: Download the module
1. <a href="https://github.com/bambora/checkout-prestashop/releases/latest" id="lnkPrestaShop">Download the latest Checkout module for PrestaShop</a> by right clicking this link and click **Save as...**

2. Choose a destination folder and click **Save**


### Step 2: Login to PrestaShop
1. Go to your PrestaShop administration page and log in. Example url: http://www.yourshop.com/admin


### Step 3: Install the module
1. In the left menu click **Modules and Services** -> **Modules and Services**.

2. Click the **Add a new module** button.

3. In the **Add a new module** section of the page, click the **Choose a file** button and browse to the folder where you saved the file from step 1. Select the file and click **Open**.

4. Click **Upload this module**

5. Locate the module in the **List of modules** and click **Install**

6. Click **Proceed with the installation**

7. Enter and adjust the settings which are described in the **Settings** section.

8. Click **Save** when done and you are ready to use Bambora Checkout



## Settings
### Activate module
Set to **YES** to allow your customers to use Bambora Checkout as a payment option.

### Merchant number
The merchant number you received from Bambora. You can find your merchant number in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/merchantnumbers" target="_blank">Merchant numbers</a>**.
<br/>
Merchant numbers starting with a **T** are for testing and numbers starting with a **P** are for live (Production) use.

### Access token
The Access token is the username of an API user. Enter the Access token for your API user, found in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/apiusers" target="_blank">API users</a>**. If you don’t have an API user, create one and take note of the Access token.

### Secret token
The Secret token is the password of an API user. This token is automatically generated when an API user is created and only displayed once at that time. Therefore you should take note of the Secret token when creating an API user. If you have lost the Secret token you will have to create a new API user in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/apiusers" target="_blank">API users</a>** -> **Create API user**.

### Window ID
Choose the payment window ID to use. Use this to set up different texts and logos for foreign customers. View your payment windows in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/paymentwindows" target="_blank">Payment windows</a>**.

### MD5 key
To enhance the security we recommend that you use the MD5 key. Bambora Checkout will work just fine without, but the MD5 key ensures that no one has modified the data sent from Prestashop to Bambora. You can find the MD5 key in the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> via the menu **Settings** -> **<a href="https://merchant.bambora.com/merchantnumbers" target="_blank">Merchant numbers</a>** -> **Edit**

### Use instant capture
Enable instant capture to capture the payment immediately. You may only use instant capture if your customers receive their products immediately, like digital goods as e-books and the like.

### Enable immediateredirect
Set to **YES** to redirect your customer to the order confirmation page when the payment is complete.<br>
Set to **NO** to keep displaying the payment window allowing the customer to close it.

### Display window as
Choose how to display the payment window. Either as an **overlay** on top of your website or in **full screen**.




<br><br><br><br><br><br><br>
<br><br><br><br><br><br><br>