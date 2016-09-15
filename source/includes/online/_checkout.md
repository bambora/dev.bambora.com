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
Bambora makes it easy for you as an online merchant to accept payments in a user friendly payment window providing you with a high conversion rate. You can use the Checkout payment window by doing a manual integration using our Checkout API, but Bambora also provide merchants using Open Source webshops prebuilt integrations getting your business up and running fast.

For more information on how to install the Bambora Checkout in your Open Source system choose the system you use:

**<a href="http://dev.bambora.com/carts.html#woocommerce" target="_blank">WooCommerce with WordPress</a>**

**<a href="http://dev.bambora.com/carts.html#prestashop" target="_blank">Prestashop</a>**

**<a href="http://dev.bambora.com/carts.html#magento-v1" target="_blank">Magento v1</a>**




## Get a Bambora account
This guide assumes that you have a test or live account with Bambora. If you don't have one, get on right now.
<br><br>
**<a href="https://boarding.bambora.com/checkoutaccount-se" target="_blank" class="calltoaction">Get a free test account</a>**


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
The `checkoutrequest` object must contain all objects with all their properties, but only the properties marked in bold are required to have a value set. If you don't have a value for a property set it to `null`.
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
**decline** | String | The url to redirect the customer to if the she clicks cancel in fullscreen mode | Yes
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



##Test payment cards
```
VISA (Sweden)
Card number: 4002 6200 0000 0005
Expiration (month/year): 05/17
CVC: 000

VISA (Norway)
Card number: 4002 7700 0000 0008
Expiration (month/year): 05/17
CVC: 000

VISA (Denmark)
Card number: 4154 2100 0000 0001
Expiration (month/year): 05/17
CVC: 000


MasterCard (Sweden)
Card number: 5125 8600 0000 0006
Expiration (month/year): 05/17
CVC: 000

MasterCard (Norway)
Card number: 5206 8300 0000 0001
Expiration (month/year): 05/17
CVC: 000

MasterCard (Denmark)
Card number: 5156 2300 0000 0004
Expiration (month/year): 05/17
CVC: 000
```

To test the Bambora Checkout payment window you can use the test credit cards listed to the right, when using your test merchant number (Txxxxxxxxx). No real money is charged when using your test merchant number.

**TIP!** As an alternative option the Bambora Checkout payment window has two hidden test cards built in for you to use. Press `Ctrl + q` on your keyboard to reveal the built in test cards and click one of them to fill out the credit card number, expiry and CVC input fields. For mobile devices without a keyboard you can "shake" your device to reveal the built in test credit cards.




##Recieve payment information
When a payment has completed, Bambora will call the URLs you specified in the `callbacks` array in the `checkoutrequest` object, notifying your shop system of the transactions status. If an error occurs while calling your callbacks, for instance if your server is not responding or returns an error, Bambora will attempt to call the callback each hour within the next 24 hours.

Appended to the callback URL is a series of parameters, describing the details of the transaction. A common example is to use this information to update an order to a "payment recieved" status. To prevent others from exploiting this feature, making a fraudulent attempt to set the status of a particular order, the parameters contain a hash value. You can use this hash value to verify that the callback is from Bambora.





### Validate callback
The parameters supplied with the callback can be validated by using the MD5 key generated for the merchant number you are using.

1. Go to the <a href="https://merchant.bambora.com" target="_blank">Bambora Backoffice</a> and login

2. Click **Settings** -> **<a href="https://merchant.bambora.com/merchantnumbers" target="_blank">Merchant numbers</a>** in the left menu

3. Click **Edit** for the particular merchant number you are using for the transaction

4. Locate the MD5 key in the textbox labeled “MD5 key”

5. Concatenate each callback url parameter value, except the hash, and append the MD5 key.

6. Calculate the MD5 hash value from this concatenated string using the "Validate your callback" tool below or this <a href="http://www.miraclesalad.com/webtools/md5.php" target="_blank">MD5 Hash Generator</a>

7. The calculated hash value should be the same as the hash value provided in callback URL’s hash parameter. If your calculated value and the URL hash value do not match, you should never run any logic on your system for example updating an order.


<script type="text/javascript">


function getUrlParameters(url){
		
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = url.substring(url.indexOf('?') + 1);	
	var vars = query.split("&");

	for (var i=0;i<vars.length;i++) {
	  
		var pair = vars[i].split("=");
			// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
			
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	} 

	return query_string;
}

function htmlEncode(value){
	//create a in-memory div, set it's inner text(which jQuery automatically encodes)
	//then grab the encoded contents back out.  The div never exists on the page.
	return $('<div/>').text(value).html();
}

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
g)).finalize(a)}}});var k=m.algo={};return m}(Math);
(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);

$(document).ready(function () {
	
	$('#txtMd5, #txtCallback').on('keyup', function() {
		
		var md5Key = $('#txtMd5').val();
		var callback = $('#txtCallback').val().trim();
		var parameters = getUrlParameters(callback);
		
		var concat = "", htmlConcat = "", htmlParameters = "";
		for (var p in parameters) {
			if (parameters.hasOwnProperty(p)) {

				if(p === "hash"){
					continue;
				}
			   
			   concat += htmlEncode(parameters[p]);
			   htmlConcat += '<li>' + htmlEncode(parameters[p]) + '</li>';
			   htmlParameters += '<li>' + p + '</li>';
			   htmlParameters += '<li>=</li>';
			   htmlParameters += '<li>' + htmlEncode(parameters[p]) + '</li>';
			}
		}
		
		// Append the MD5 key
		concat += htmlEncode(md5Key);
		htmlConcat += '<li>' + htmlEncode(md5Key) + '</li>';
		
		
		// Display the parameters and concatenated values
		$('#lblValues').html(htmlConcat);
		$('#urlParameters').html(htmlParameters);
		
		
		// Hash comparison
		var calculatedHash = CryptoJS.MD5(concat).toString();
		if(calculatedHash === parameters.hash){
			
			$('#lblCalculatedHash').attr('class', 'valid');
			$('#lblIsCallbackValid').text("Your callback is valid");
		}else{
			
			$('#lblCalculatedHash').attr('class', 'not-valid');
			$('#lblIsCallbackValid').text("Your callback is NOT valid");
		}
		
		$('#lblCalculatedHash').text(calculatedHash);
		
		if(parameters.hash){
			$('#lblCallbackHash').text(parameters.hash);
		}else{
			$('#lblCallbackHash').text('No hash parameter was found in callback');
		}
			
	})
	
});

</script>


<section>
	<strong>Validate your callback</strong><br>
	<small>Copy and paste your MD5 key and the callback you recieved.</small>
	
	<br>
	
	<label>MD5 key &nbsp;&nbsp;<small><a href="https://merchant.bambora.com/merchantnumbers" target="_blank" title="Find your MD5 key in the Merchant Backoffice">Find my key</a></small></label>
	<input type="text" id="txtMd5" value="7MG8B4Rkw7pw510KB8gB3"/>
	
    <label>Callback</label>
	
	<textarea id="txtCallback" rows="6">https://yourshop.com/callback?txnid=58443393440303104&orderid=934315976&reference=066799300800&amount=100&amp;currency=208&date=20160307&time=0212&feeid=3&txnfee=0&paymenttype=4&cardno=445421XXXXXX0001&hash=12e1195844402ae1ab5c77cb7870d4a6</textarea>
	
	<br><br><br>
	<strong id="lblIsCallbackValid">Your callback is...</strong>
	<div class="hash-comparison">
		<div>
			<span>Calculated hash: </span>
			<span id="lblCalculatedHash"></span>
		</div>
		<div>
			<span>Callback hash: </span>
			<span id="lblCallbackHash"></span>
		</div>
	</div>
	
	<br><br><br>
    <small>Callback parameters and values</small>
	<ul id="urlParameters" class="url-parameters">
		<i>Copy and paste your MD5 key and the callback you recieved.</i>
	</ul>
	
	
	<br><br>
    <small>Concatenated values with MD5 appended</small>
	<ul id="lblValues" class="alternatingList">
		<i>Copy and paste your MD5 key and the callback you recieved.</i>
	</ul>
	
	

</section>




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
**hash** | String | The hashed value of all parameters plus the MD5 key | Yes


## FAQ - Frequently Asked Questions
<section class="faq">
<h3>Why don't I recieve callbacks?</h3>

<ul>
	<li>
		Make sure that you listen for callbacks on either port 80 (http) or 443 (https).
	</li>

	<li>
		Make sure that you listen for callbacks on the domain you registered for your account.
	</li>

	<li>
		Make sure that you use the correct MD5 key to <a href="/online.html#validate-callback">validate callback parameters</a>.
	</li>

	<li>
		Make sure that your traffic is not redirected to another page, if for example your webshop is running in a "Opening soon" or "Maintenance" mode.
	</li>
</ul>

</section>

<section class="faq">
<h3>Why don't my credit card work when testing?</h3>

<ul>
	<li>
		Only test cards are accepted when using your Txxxxxxxxx merchant number (Test mode). Use these <a href="/online.html#test-payment-cards">test cards</a> or press "Ctrl + q"
		to display test cards in the Checkout.
	</li>
</ul>

</section>



<br><br><br><br><br><br><br>
<br><br><br><br><br><br><br>