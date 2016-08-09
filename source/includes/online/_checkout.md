<script type="text/javascript">

$(document).ready(function () {
	
	// Encoding the API key
	$('#txtAccessToken, #txtMerchantNumber, #txtSecretToken').on('keyup', function() {
		
		var unencoded = $('#txtAccessToken').val() + '@' + $('#txtMerchantNumber').val() + ':' + $('#txtSecretToken').val();
		//console.log(unencoded);
		
		var encoded = btoa(encodeURIComponent(unencoded).replace(/%([0-9A-F]{2})/g, function(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
		
		//console.log(encoded);
		
		$('#lblEncodedKey').text(encoded);
	})
	
});


</script>

# Checkout
Bambora makes it easy for you as an online merchant to accept payments by following this simple guide.

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/online/_checkout.md) to edit this section.**


## Get a Bambora account
This guide assumes that you have a test or live account with Bambora. If you do not have an account you can 
**<a href="https://boarding.bambora.com/checkoutaccount-se" target="_blank">Get a free test account</a>**


## Create an API key

```
Before encoding: Basic accesstoken@merchantnumber:secrettoken
After encoding: Basic YWNjZXNzdG9rZW5AbWVyY2hhbnRudW1iZXI6c2VjcmV0dG9rZW4=
```

To connect to Bambora your system must authenticate itself on your behalf. Using your Merchant number, Access token and Secret token allows Bambora to identify your system and grant it access to the Bambora Checkout. To secure the communication with the Checkout, Bambora use Basic Authentication to verify your identity. Set the `Authorization` header to a Base64 encoded representation of your API key in the format `accesstoken@merchantnumber:secrettoken`. Follow these steps to create an encoded API key.

1. Go to the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> and login

2. Select the Merchant number (test or production merchant number), in the top right corner, you want to create an API user for.

3. Click **Settings** -> **<a href="https://merchant.bambora.com/apiusers" target="_blank">API users</a>** in the left menu

4. Click **Create API user**

5. Enter an e-mail address and a description

6. Click **Create API user**

7. The system will now display your **Access token** and **Secret token**.
<br/>
**IMPORTANT!** Take note of the **Secret token** as it will only be displayed once.


<section>
	<strong>Generate your encoded API key</strong><br>
	<small>Copy and paste in your access token, merchant number and secret token to generate your encoded API key.</small>
	
	<br>
	
	<label>access token</label>
	<input type="text" id="txtAccessToken" value="Ex. 2rpTmY4gHc8F8Vv9cSYE"/>
	
    <label>merchant number</label>
	<input type="text" id="txtMerchantNumber" value="Ex. T123456789"/>
	
    <label>secret token</label>
	<input type="text" id="txtSecretToken" value="Ex. akCfvFhC1N4GdaJSmLkhJn2oIN6S15Y6SDltDjpQ"/>
	
	<br><br>
	
	<label><strong>Your encoded API key is:</strong></label>
	<div id="lblEncodedKey" class="text"><i>Copy and paste in your access token, merchant number and secret token</i></div>
		
</section>

<aside class="warning">
Remember to keep your API key secret!
</aside>



## Start a payment session
To process a payment, you simply submit information about the purchase to Bambora and in return you will receive an URL to the payment window. Redirecting your customer to this URL allows her to enter credit card information or other data necessary to complete the purchase.
You provide Bambora with information about the purchase in the form of a `checkoutrequest` object described below.
The `checkoutrequest` object must contain all objects with all their properties, but only the properties marked in bold are required to have a value set.
<br>
**Note!** All property names are in lower case.


###Request

```json
{
	"capturemulti": true,
	"customer": {
		"email": "String content",
		"phonenumber": "String content",
		"phonenumbercountrycode": "String content"
	},
	"instantcaptureamount": 9223372036854775807,
	"language": "String content",
	"order": {
		"billingaddress": {
			"att": "String content",
			"city": "String content",
			"country": "String content",
			"firstname": "String content",
			"lastname": "String content",
			"street": "String content",
			"zip": "String content"
		},
		"currency": "String content",
		"lines": [{
			"description": "String content",
			"id": "String content",
			"linenumber": "String content",
			"quantity": 1.26743233E+15,
			"text": "String content",
			"totalprice": 2147483647,
			"totalpriceinclvat": 2147483647,
			"totalpricevatamount": 2147483647,
			"unit": "String content",
			"unitprice": 2147483647,
			"unitpriceinclvat": 2147483647,
			"unitpricevatamount": 2147483647,
			"vat": 1.26743233E+15
		}],
		"ordernumber": "String content",
		"shippingaddress": {
			"att": "String content",
			"city": "String content",
			"country": "String content",
			"firstname": "String content",
			"lastname": "String content",
			"street": "String content",
			"zip": "String content"
		},
		"total": 9223372036854775807,
		"vatamount": 9223372036854775807
	},
	"paymentwindowid": 2147483647,
	"url": {
		"accept": "String content",
		"callbacks": [{
			"url": "String content"
		}],
		"decline": "String content",
		"immediateredirecttoaccept": 2147483647
	}
}
```

Property name | Datatype | Description | Required |
-------------- | -------------- | -------------- | :--------------:
language | String | The culture and country code as ISO 639x ex. “da-DK” | No
capturemulti | Bool | Setting this to true will allow you to capture further later. Default is false | No
instantcaptureamount | Long | Specify how much of the Order.total you wish to capture right away | No
customer | Customer | See Customer parameters table | No
**order** | Order | See Order parameters table| Yes
paymentwindowid | Double | The ID of the payment window to display | No
**url** | Url | See Url parameters table | Yes
<small>Supported languages are sv-SE, da-DK, nb-NO, fi-FI and en-US. If the specified language is not supported the browsers language will be used to infer the language. If no match is found, en-US is used.</small>


<br><br>Customer parameters

Property name | Datatype | Description | Required |
-------------- | -------------- | -------------- | :--------------:
**email** | String | The customers e-mail address | Yes
**phonenumber** | String | The customers phone number | Yes
**phonenumbercountrycode** | String | The country code as either ISO3166 ex. “DK” or calling code ex. “45” | Yes
<small>If you have no customer information you can set the customer property on the checkoutrequst object to null. (checkoutrequest.customer = null;)</small>


<br><br>Order parameters

Property name | Datatype | Description | Required |
-------------- | -------------- | -------------- | :--------------:
billingaddress | Address | Address to send bill to | No
**currency** | String | Currency code as ISO-4217. Ex. DKK, SEK | Yes
**lines** | Orderline array | A list of orderlines | Yes for invoice
**ordernumber** | String | The order identifier. Must be unique | Yes
**shippingaddress** | Address | Address to send goods to | Yes for invoice
**total** | Long | The total amount to be paid in minor units | Yes
**vatamount** | Long | The vat of the total amount in minor units to be paid | Yes


<br><br>Address parameters

Property name | Datatype | Description | Required |
-------------- | -------------- | -------------- | :--------------:
**att** | String | Max 255 characters | No
**city** | String | Max 255 characters | Yes
**country** | String | Max 255 characters | Yes
**firstname** | String | Max 255 characters | Yes
**lastname** | String | Max 255 characters | Yes
**street** | String | Max 255 characters | Yes
**zip** | String | Max 255 characters | Yes


<br><br>Orderline parameters

Property name | Datatype | Description | Required |
-------------- | -------------- | -------------- | :--------------:
**description** | String | Product description | No
**id** | String | ID of the product | Yes
**linenumber** | String | Order of the line | Yes
**quantity** | Double | Number of this particular product | Yes
**text** | String | Product text | Yes
**totalprice** | Int | Total price of this line | Yes
**totalpriceinclvat** | Int | Total price of this line including VAT | Yes
**totalpricevatamount** | Int | The amount of VAT contained in this line | Yes
**unit** | String | The unit of the products price | Yes
**unitprice** | Int | Price of a single product | Yes
**unitpriceinclvat** | Int | Price of a single product including VAT | Yes
**unitpricevatamount** | Int | The amount of VAT contained in the unitprice | Yes
**vat** | Double | The VAT percentage | Yes


<br><br>Url parameters

Property name | Datatype | Description | Required |
-------------- | -------------- | -------------- | :--------------:
**accept** | String | The url to redirect the customer to when the payment is complete | Yes
**decline** | String | The url to redirect the customer to if the payment failed | Yes
**callbacks** | Callback array | A list of url’s Bambora will call when the session ends either successfully or not | Yes
**immediateredirecttoaccept** | Int | Currency code as ISO-4217. Ex. DKK, SEK | No



###Send the request
```c#
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public class BamboraCheckout
{
    // Properties
    public string PaymentWindowUrl{ get; private set; }
    public string ServiceEndPoint { get { return _serviceEndPoint; } }


    // Members
    private string _serviceEndPoint = "https://api.v1.checkout.bambora.com/checkout";
    private string _apiKey = "Basic RGV2ZWxvcGVyTWVy... <replace with your api key>”;
    private string _checkoutRequest = @"{... <information about the purchase> ... }”;


    // Methods
    public void StartPaymentSession()
    {
        string request = CreateAndValidateRequest();

		using (HttpClient client = new HttpClient())
		{
			// Set header and API key
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
			string apiKeyWithoutBasic = _apiKey.Replace("Basic", "").Trim();
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", apiKeyWithoutBasic);


			// Send the request
			HttpResponseMessage response = client.PostAsync(_serviceEndPoint, new StringContent(request, Encoding.UTF8, "application/json")).Result;
			Task<string> responseContent = response.Content.ReadAsStringAsync();


			// Retrieve the url from the response
			dynamic responseObject = JToken.Parse(responseContent.Result);
			PaymentWindowUrl = responseObject.url;
		}
    }

    private string CreateAndValidateRequest()
    {
		try
		{
			// Parsing to a JSON object validates the _checkoutRequest structure
			dynamic validatedRequest = JToken.Parse(_checkoutRequest);
			return JsonConvert.SerializeObject(validatedRequest);
		}
		catch (JsonReaderException ex)
		{
			// Handle faulty requestobject
			throw ex;
		}
    }
}
```

Once you have created a `checkoutrequest`, containing information about the purchase being made, you will send it to Bambora. For this example, all the Bambora Checkout functionality is contained in the BamboraCheckout class, encapsulating key information about the API endpoint `_serviceEndPoint ` and the API key `_apiKey` along with the `_checkoutRequest`. This class also contains two methods, one private `CreateAndValidateRequest` and one public `StartPaymentSession`.

Before sending the `checkoutrequest` you should always validate that it is in a valid JSON format otherwise you will receive an error. Use the method `StartPaymentSession` to send the request and retrieve the URL to the payment window. Pass the URL to your front-end for it to display the payment window. This can be done by inserting the URL into a hidden field on your checkout page.


### Response
```json
{
	"meta": {
		"action": {
			"code": "String content",
			"source": "String content",
			"type": "String content"
		},
		"message": {
			"enduser": "String content",
			"merchant": "String content"
		},
		"paging": {
			"itemsreturned": 9223372036854775807,
			"lastevaluatedkey": "String content"
		},
		"result": true
	},
	"token": "String content",
	"url": "String content"
}
```

Upon recieving the response you should inspect the `result` property to check if the request was successfull. If the request was unsuccessful you can get more information from the `meta.message.merchant` property, which may contain information that should not be displayed for your customer. Use the property `meta.message.enduser` to display any information about the payment to your customer.

The `url` property contains the URL to the payment window, which you will provide to your front-end to display the payment window.


##Display the payment window
Insert the Bambora Checkout Payment Window script right after the &lt;BODY&gt; tag. The script will provide you with the function `window.bam` to preload and open the payment window.

```html
<!-- Bambora Checkout Payment Window script -->
<script type="text/javascript">
(function (n, t, i, r, u, f, e) { n[u] = n[u] || function() {
(n[u].q = n[u].q || []).push(arguments)}; f = t.createElement(i);
e = t.getElementsByTagName(i)[0]; f.async = 1; f.src = r; e.parentNode.insertBefore(f, e)})(window, document, "script", 
"https://v1.checkout.bambora.com/assets/paymentwindow-v1.min.js", "bam");
</script>
```


```html
<script type="text/javascript">
$(document).ready(function () {
		
	var options = {
		windowstate: 2,
		backgroundRgba: "0,0,0,0.5",
		appendToElementId: "",
		event: null
	}
	
	var paymentWindowUrl = $("#hidPaymentWindowUrl").val();
	window.bam('preload', paymentWindowUrl, options);
	
	$("#btnDisplayPaymentWindow").on("click", function(event) {
	
		var options = {
			windowstate: 2,
			backgroundRgba: "0,0,0,0.5",
			appendToElementId: "",
			event: event
		}
		window.bam("open", paymentWindowUrl, options);
	});
});
</script>

<input type="hidden" id="hidPaymentWindowUrl" value="<URL FETCHED FROM THE API>"/>
<input type="button" id="btnDisplayPaymentWindow" value="Pay now"/>
```


<br><br>Bam parameters

Property name | Datatype | Description | Required |
-------------- | -------------- | -------------- | :--------------:
action | String | "preload" = Load payment window but remain hidden. <br>"open" = Load and display payment window. <br>"clear" = Removes the payment window from the page. | Yes
url | String | The URL returned in the Bambora Checkout response | Yes
options | Options | The display options | No


<br><br>Options parameters

Property name | Datatype | Description | Default |
-------------- | -------------- | -------------- | :--------------:
windowstate | Number | 1 = Redirect to new page (fullscreen) <br>2 = Display over page content (overlay) <br>3 = Display in-line with page content | 2
backgroundRgba | String | The color of the surrounding overlay | 0,0,0,0.5
appendToElementId | String | The ID of the HTML element to put the payment window into (used with windowstate 3) | null
event | Object | The mouse click event | null




##Recieve payment information
When a payment has completed, Bambora will call the URLs you specified in the `callbacks` array in the `checkoutrequest` object, notifying your shop system of the transactions status. If an error occurs while calling your callbacks, for instance if your server is not responding or returns an error, Bambora will attempt to call the callback each hour within the next 24 hours.

Appended to the callback URL is a series of parameters, describing the details of the transaction. A common example is to use this information to update an order to a "payment recieved" status. To prevent others from exploiting this feature, making a fraudulent attempt to set the status of a particular order, the parameters contain a hash value. You can use this hash value to verify that the callback is from Bambora.



###Validate Callback

The parameters supplied with the callback can be validated by using the MD5 key generated for the merchant number you are using.

1. Go to the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> and login

2. Click **Settings** -> **<a href="https://merchant.bambora.com/merchantnumbers" target="_blank">Merchant numbers</a>** in the left menu

3. Click **Edit** for the particular merchant number you are using for the transaction

4. Locate the MD5 key in the textbox labeled “MD5 key”

5. Concatenate each callback url parameter value, except the hash, and append the MD5 key.

6. Create a MD5 hash value from this concatenated string. You can use online tools for this. Ex. <a href="http://www.miraclesalad.com/webtools/md5.php" target="_blank">MD5 Hash Generator</a>

7. The calculated hash value should be the same as the hash value provided in callback URL’s hash parameter. If your calculated value and the URL hash value do not match, you should never run any logic on your system for example updating an order.

<aside class="notice text">
An example MD5 key and callback URL may look like the following:<br><br>

<strong>MD5 Key:</strong> 7MG8B4Rkw7pw510KB8gB3<br><br>

<strong>Callback URL:</strong>
https://yourshop.com/callback?txnid=58443393440303104&orderid=934315976&reference=066799300800&amount=100&currency=208&date=20160307&time=0212&feeid=3&txnfee=0&paymenttype=4&cardno=445421XXXXXX0001&result=1&hash=eeb94608a2677c1005d755535f2adc04<br><br>

<strong>Concatenated values without the hash and the MD5 key appended:</strong>
58443393440303104934315976066799300800100208201603070212304415421XXXXXX000117MG8B4Rkw7pw510KB8gB3
</aside>


###Callback parameters

Property name | DataType | Description | Always returned |
-------------- | -------------- | -------------- | :--------------:
**txnid** | Number | Transaction ID | Yes
**orderid** | String | The merchants order ID | Yes
**reference** | String | Reference used by some acquirers ex. Evry | Yes
**amount** | Number | The amount to be paid in minor units | Yes
**currency** | String | Currency code as ISO-4217. Ex. DKK, SEK | Yes
**date** | Number | In the format yyyyMMdd | Yes
**time** | Number | In the format HHmm | Yes
**feeid** | Number | The agreement and payment type used in the transaction | Yes
**txnfee** | Number | The fee amount in minor units | Yes
**paymenttype** | Number | Ex. Visa, MasterCard, Invoice | Yes
**cardno** | String | Card number | No
**expmonth** | Number | Expire month 1-12. Only present when the payment created a subscription | No
**expyear** | Number | Expire year 0-99. Only present when the payment created a subscription | No
**subscriptionid** | Number | Only present when the payment created a subscription | No
**eci** | String | Electronic Commerce Indicator | No
**result** | Number | 0 (failed) or 1 (successful) | No
**hash** | String | The hashed value of all parameters plus the MD5 key | Yes







<br><br><br><br><br><br><br>
<br><br><br><br><br><br><br>