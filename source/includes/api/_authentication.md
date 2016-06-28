# Authentication

You need to sign up with Bambora to use our API. As part of the onboarding process, you will receive two merchant numbers (one for test and one for production), a merchant token and a merchant secret. 

Please send an email to [sales.ecom@bambora.com](mailto:sales.ecom@bambora.com) if you want to sign up.

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_authentication.md) to edit this section.**

## Requests

Requests to the API use Basic Authentication in the format of: `token@merchantID:secret`. This string is then **base64 encoded**.

```
Authorization: Basic YWJjZGVmZ0AxMjM0NTY3ODk6N0FRdTdGR0IyS3dt
```

> This is an example base64 encoded Auth header: Basic abcdefg@123456789:7AQu7FGB2Kwm

<form>
    <div class="form-group">
		<label for="merchantId">Merchant ID</label> <input id="merchantId" type="text"/>
	</div>
    <div class="form-group">	
		<label for="merchantToken">Token</label> <input id="merchantToken" type="text"/>
	</div>
    <div class="form-group">
		<label for="merchantSecret">Secret</label> <input id="merchantSecret" type="text"/>
	</div>

</form>