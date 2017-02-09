---
title: Test Spec Page
layout: spec

summary: An example Spec Page implementation.

nav: na_sdk_nav
name: /content/na/references/sdk/save_customer_data
parent: /content/na/references/sdk/save_customer_data
nav_category: Save Customer Data

language_tabs:
  - shell
  - python
  - csharp
  - java
  - ruby
  - php
  - javascript
  - go

---

# Save Customer Data

#Create a New Profile
##Create a New Profile With a Credit Card

```shell
Definition
POST /v1/profiles HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/profiles \
-H "Content-Type: application/json" \
-H "Authorization: Passcode MzAwMjAwNTc4OkQ5N0QzQkUxRUU5NjRBNjE5M0QxN0E1NzFEOUZCQzgw" \
-d '{
   "language":"en",
   "comments":"hello",
   "card":{  
      "name":"John Doe",
      "number":"4030000010001234",
      "expiry_month":"12",
      "expiry_year":"23",
      "cvd":"123"
  },
  "billing": {
    "name": "joh doe",
    "address_line1": "123 main st",
    "address_line2": "111",
    "city": "victoria",
    "province": "bc",
    "country": "ca",
    "postal_code": "V9A3Z4",
    "phone_number": "25012312345",
    "email_address": "dngache@beanstream.com"
  },
  "custom": {
    "ref1": "test1",
    "ref2": "test2",
    "ref3": "test3",
    "ref4": "test4",
    "ref5": "test5"
  }
}'
```

```javascript
var profile = {
  card:{
    name:"Jon Profile",
    number:"5100000010001004",
    expiry_month:"02",
    expiry_year:"19",
    cvd:"123"
  },
  billing: {
    name: "Jon Profile",
    address_line1: "123 fake street",
    city: "victoria",
    province: "bc",
    postal_code: "V9A3Z4",
    country: "ca",
    email_address: "fake@example.com",
    phone_number:"12345678"
  }
};
beanstream.profiles.createProfile(profile)
  .then(function(response){
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$profile_create = array(
	'billing' => array(
		'name' => 'Profile Billing Name',
		'email_address' => 'email@email.com',
		'phone_number' => '1234567890',
		'address_line1' => '456-123 Billing St.',
		'city' => 'Shippingville',
		'province' => 'BC',
		'postal_code' => 'V8J9I5',
		'country' => 'CA'
	),
	'card' => array(
		'name' => 'John Doe',
		'number' => '4030000010001234',
		'expiry_month' => '07',
		'expiry_year' => '22',
		'cvd' => '123'
	)
);
$profile_id = $beanstream->profiles()->createProfile($profile_create);
```

```ruby
profile = Beanstream.ProfilesAPI.getCreateProfileWithCardTemplate()
profile[:card][:name] = "Bob Test"
profile[:card][:number] = "4030000010001234"
profile[:card][:expiry_month] ="07"
profile[:card][:expiry_year] = "22"
profile[:card][:cvd] = "123"
profile[:billing][:name] = "Bob Test"
profile[:billing][:address_line1] = "123 Fake St."
profile[:billing][:city] = "Victoria"
profile[:billing][:province] = "BC"
profile[:billing][:country] = "CA"
profile[:billing][:postal_code] = "v1v2v2"
profile[:billing][:phone_number] = "12505551234"
profile[:billing][:email_address] = "fake@example.com"

result = Beanstream.ProfilesAPI.create_profile(profile)
```

```python
card = billing.CreditCard(
	'John Doe',
	'4030000010001234',
	'03',
	'2019',
	'123')
billing_address = billing_address = billing.Address(
	'John Doe',
	'john.doe@example.com',
	'555-555-5555',
	'123 Fake Street',
	'',
	'Fake City',
	'ON',
	'A1A1A1',
	'CA')
txn = self.beanstream.create_payment_profile(card, billing_address)
resp = txn.commit()
```

```java
try {
	Address billing = new Address();
	billing.setName("JANE DOE");
	billing.setCity("VICTORIA");
	billing.setProvince("BC");
	billing.setCountry("CA");
	billing.setAddressLine1("123 FAKE ST.");
	billing.setPostalCode("V9T2G6");
	billing.setEmailAddress("TEST@BEANSTREAM.COM");
	billing.setPhoneNumber("12501234567");

    Card card = new Card().setName("John Doe")
                    .setNumber("5100000010001004")
                    .setExpiryMonth("12")
                    .setExpiryYear("18")
                    .setCvd("123");

	ProfileResponse createdProfile = beanstream.profiles().createProfile(card, billing);
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
ProfileResponse response = beanstream.Profiles.CreateProfile (
	new Card() {
		Name = "Jane Doe",
		Number = "5100000010001004",
		ExpiryMonth = "12",
		ExpiryYear = "18",
		Cvd = "123"
	},
	new Address() {
		Name = "Jane Doe",
		AddressLine1 = "123 Fake St.",
		City = "victoria",
		Province = "bc",
		Country = "ca",
		PostalCode = "v9t2g6",
		PhoneNumber = "12501234567",
		EmailAddress = "test@beanstream.com"
	});
```

```go
import (
	beanstream "github.com/Beanstream/beanstream-go"
	"github.com/Beanstream/beanstream-go/paymentMethods"
)

config := beanstream.DefaultConfig()
config.MerchantId = "300200578"
config.PaymentsApiKey = "4BaD82D9197b4cc4b70a221911eE9f70"

gateway := beanstream.Gateway{config}
request := beanstream.PaymentRequest{
    PaymentMethod: paymentMethods.CASH,
    OrderNumber:   "order12345b",
    Amount:        12.00}
res, err := gateway.Payments().MakePayment(request)
```

##Create a New Profile With a Single Use Token

```shell
Definition
POST /v1/profiles HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/profiles \
-H "Content-Type: application/json" \
-H "Authorization: Passcode MzAwMjAwNTc4OjRCYUQ4MkQ5MTk3YjRjYzRiNzBhMjIxOTExZUU5Zjcw" \
-d '{
   "language":"en",
   "comments":"hello",
   "token":{  
      "name":"John Doe",
      "code":"1eCe9480a7D94919997071a483505D17",
  },
  "billing": {
    "name": "joh doe",
    "address_line1": "123 main st",
    "address_line2": "111",
    "city": "victoria",
    "province": "bc",
    "country": "ca",
    "postal_code": "V9A3Z4",
    "phone_number": "25012312345",
    "email_address": "example@example.com"
  },
  "custom": {
    "ref1": "test1",
    "ref2": "test2",
    "ref3": "test3",
    "ref4": "test4",
    "ref5": "test5"
  }
}'
```

```javascript
var profile = {
  token: {
     name: "Jon Profile",
     code: response.token
  },
  billing: {
    name: "Jon Profile",
    address_line1: "123 fake street",
    city: "victoria",
    province: "bc",
    postal_code: "V9A3Z4",
    country: "ca",
    email_address: "fake@example.com",
    phone_number:"12345678"
  }
};
beanstream.profiles.createProfile(profile)
  .then(function(response){
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$profile_create_token = array(
    'billing' => array(
        'name' => 'Profile Billing Name',
        'email_address' => 'email@email.com',
        'phone_number' => '1234567890',
        'address_line1' => '456-123 Billing St.',
        'city' => 'Shippingville',
        'province' => 'BC',
        'postal_code' => 'V8J9I5',
        'country' => 'CA'
		),
	'token' => array(
		'name' => 'John Doe',
        'code' => $legatoToken
	)
);
$profile_id = $beanstream->profiles()->createProfile($profile_create_token);
```

```ruby
profile = Beanstream.ProfilesAPI.getCreateProfileWithTokenTemplate()
profile[:token][:name] = "Bob Test"
profile[:token][:code] = token
profile[:billing][:name] = "Bob Test"
profile[:billing][:address_line1] = "123 Fake St."
profile[:billing][:city] = "Victoria"
profile[:billing][:province] = "BC"
profile[:billing][:country] = "CA"
profile[:billing][:postal_code] = "v1v2v2"
profile[:billing][:phone_number] = "12505551234"
profile[:billing][:email_address] = "fake@example.com"

result = Beanstream.ProfilesAPI.create_profile(profile)
```

```python
address = billing.Address(
    'John Doe',
    'john.doe@example.com',
    '555-555-5555',
    '123 Fake Street',
    '',
    'Fake City',
    'ON',
    'A1A1A1',
    'CA')
txn = self.beanstream.create_payment_profile_from_token(token, address)
txn.set_card_owner('Joe Python')
resp = txn.commit()
```

```java
Address billing = new Address();
billing.setName("JANE DOE");
billing.setCity("VICTORIA");
billing.setProvince("BC");
billing.setCountry("CA");
billing.setAddressLine1("123 FAKE ST.");
billing.setPostalCode("V9T2G6");
billing.setEmailAddress("TEST@BEANSTREAM.COM");
billing.setPhoneNumber("12501234567");
Token token = new Token("John Doe", "myLegatoToken");

ProfileResponse createdProfile = beanstream.profiles().createProfile(token, billing);
```

```csharp
ProfileResponse response = beanstream.Profiles.CreateProfile (
  new Token() {
    Name = "Jane Doe",
    Code = "myLegatoToken"
  },
  new Address() {
    Name = "Jane Doe",
    AddressLine1 = "123 Fake St.",
    City = "victoria",
    Province = "bc",
    Country = "ca",
    PostalCode = "v9t2g6",
    PhoneNumber = "12501234567",
    EmailAddress = "test@beanstream.com"
  });
```

```go
request := beanstream.Profile{
	Token: beanstream.Token{
		Name:  "John Doe",
		Token: token},
	BillingAddress: beanstream.Address{
		"John Doe",
		"123 Fake St.",
		"suite 3",
		"Victoria",
		"BC",
		"CA",
		"V8T4M3",
		"12505550123",
		"test@example.com"}}

res, err := gateway.Profiles().CreateProfile(request)
```

#Retrieve a Profile

```shell
Definition
GET /v1/profiles/{id} HTTP/1.1

Request
curl -X GET https://www.beanstream.com/api/v1/profiles/{id}\
-H "Authorization: Passcode bWVyY2hhbnRfaWQ6cGFzc2NvZGU=" \
```

```javascript
beanstream.profiles.getProfile(profileId)
  .then(function(profile){
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$result = $beanstream->profiles()->getProfile($profile_id);
```

```ruby
result = Beanstream.ProfilesAPI.get_profile(customer_code)
```

```python
txn = self.beanstream.get_payment_profile(customer_code) #customer_code = profile ID
resp = txn.commit()
```

```java
try {
	  PaymentProfile paymentProfile = beanstream.profiles().getProfileById(profileId);
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
PaymentProfile profile = beanstream.Profiles.GetProfile (profileId);
```

```go
profile, err := gateway.Profiles().GetProfile(profileId)
```

#Update a Profile

```shell
Definition
PUT /v1/profiles/{id} HTTP/1.1

Request
curl https://www.beanstream.com/api/v1/profiles/{id} \
-H "Content-Type: application/json" \
-H "Authorization: Passcode bWVyY2hhbnRfaWQ6cGFzc2NvZGU=" \
-d '{
   "billing": {
    "name": "joh doe",
    "address_line1": "123 main st",
    "address_line2": "111",
    "city": "victoria",
    "province": "bc",
    "country": "ca",
    "postal_code": "V8T4M3",
    "phone_number": "25012312345",
    "email_address": "dngache@beanstream.com"
  },
  "language": "en",
  "comment": "updated account"
}'
```

```javascript
var updatedProfile = {
  billing: {
    address_line1: "123 fake street"
  }
};

beanstream.profiles.updateProfile(updatedProfile, profileId)
  .then(function(response){
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$profile_data = array(
    'billing' => array(
        'name' => 'Bobby Bob Jr',
        'email_address' => 'email@email.com',
        'phone_number' => '1234567890',
        'address_line1' => '456-123 Shipping St.',
        'city' => 'Shippingville',
        'province' => 'BC',
        'postal_code' => 'V8J9I5',
        'country' => 'CA'
		)
	);
$result = $beanstream->profiles()->updateProfile($profile_id, $profile_data);
```

```ruby
# get profile
profile1 = Beanstream.ProfilesAPI.get_profile(customer_code)

# update profile
profile1['billing']['name'] = "Gizmo test"
profile1['language'] = "en"
profile1['comments'] = "test profile"
profile1['custom']['ref1'] = "i wish"
profile1['custom']['ref2'] = "i was"
profile1['custom']['ref3'] = "an oscar"
profile1['custom']['ref4'] = "mayer"
profile1['custom']['ref5'] = "weiner"
result = Beanstream.ProfilesAPI.update_profile(profile1)
```

```python
txn = self.beanstream.modify_payment_profile(customer_code)
txn.set_status('disabled')
resp = txn.commit()
```

```java
try {
	  // get profile
    PaymentProfile paymentProfile = beanstream.profiles().getProfileById(profileId);

    // change the profile to francais
    paymentProfile.setLanguage("fr");

    // update profile
    beanstream.profiles().updateProfile(paymentProfile);
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
PaymentProfile profile = beanstream.Profiles.GetProfile (response.Id);

profile.Billing.City = "penticton";
response = beanstream.Profiles.UpdateProfile (profile);
```

```go
// get profile
profile, err := gateway.Profiles().GetProfile(profileId)

// update profile
profile.BillingAddress.AddressLine1 = "456 Dingle Bingle Road"
res2, err2 := gateway.Profiles().UpdateProfile(profile)
```

#Delete a Profile

```shell
Definition
DELETE /v1/profiles/{id} HTTP/1.1

Request
curl -X DELETE https://www.beanstream.com/api/v1/profiles/{id}\
-H "Authorization: Passcode bWVyY2hhbnRfaWQ6cGFzc2NvZGU=" \
```

```javascript
beanstream.profiles.deleteProfile(profileId)
  .then(function(response){
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$result = $beanstream->profiles()->deleteProfile($profile_id);
```

```ruby
result = Beanstream.ProfilesAPI.delete_profile(customer_code)
```

```python
txn = self.beanstream.delete_payment_profile(customer_code) #customer_code = profile ID
resp = txn.commit()
```

```java
try {
	  beanstream.profiles().deleteProfileById(profileId);
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
beanstream.Profiles.DeleteProfile (response.Id);
```

```go
res, err := gateway.Profiles().DeleteProfile(profile.Id)
```

#Add Card to a Profile

```shell
Definition
POST /v1/profiles/{id}/cards HTTP/1.1

Request
curl -X POST https://www.beanstream.com/api/v1/profiles/{id}/cards \
-H "Content-Type: application/json" \
-H "Authorization: Passcode bWVyY2hhbnRfaWQ6cGFzc2NvZGU=" \
-d '{
   "card":{
      "name":"John Doe",
      "number":"5100000010001004",
      "expiry_month":"02",
      "expiry_year":"14"    
   }
}'
```

```javascript
var card2 = {
  name:"Jon Profile",
  number:"4030000010001234",
  expiry_month:"04",
  expiry_year:"20",
  cvd:"123"
};
beanstream.profiles.addCard(profileId, card2)
  .then(function(response){
    // card successfully added
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$card_data = array(
    'card' => array(
        'name' => 'Test Testerson',
        'number' => '4030000010001234',
        'expiry_month' => '07',
        'expiry_year' => '22',
        'cvd' => '123'
		)
	);
$result = $beanstream->profiles()->addCard($profile_id, $card_data);
```

```ruby
card2 = {
  :card => {
    :name => "Hilary Test",
    :number => "4030000010001234",
    :expiry_month => "07",
    :expiry_year => "22",
    :cvd => "123"
  }
}
insert_card = Beanstream.ProfilesAPI.add_profile_card(profile,card2) #profile hash with a 'customer_code' key
```

```python
card = billing.CreditCard('John Doe', '5100000010001004', '3', '2019', '123')
txn = self.beanstream.add_card_to_payment_profile(customer_code, card)
resp = txn.commit()
```

```java
try {
    Card newCard = new Card()
      .setCvd("123")
      .setName("Tester Doe")
      .setNumber("4030000010001234")
      .setExpiryMonth("01")
      .setExpiryYear("19");
    ProfileResponse newCardResp = beanstream.profiles().addCard(profileId, newCard);
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
ProfileResponse response = profile.AddCard (beanstream.Profiles, new Card {
  Name = "Jane Doe",
  Number = "4030000010001234",
  ExpiryMonth = "03",
  ExpiryYear = "22",
  Cvd = "123"
});
```

```go
card2 := beanstream.CreditCard{
		Name:        "Jane Doe",
		Number:      "4030000010001234",
		ExpiryMonth: "03",
		ExpiryYear:  "18",
		Cvd:         "123"}
res, err := gateway.Profiles().AddCard(profile.Id, card2)
```

#Retrieve Cards in a Profile

```shell
Definition
GET /v1/profiles{id}/cards HTTP/1.1

Request
curl -X GET https://www.beanstream.com/api/v1/profiles/{id}/cards \
-H "Authorization: Passcode bWVyY2hhbnRfaWQ6cGFzc2NvZGU=" \
```

```javascript
beanstream.profiles.getCards(profileId)
  .then(function(cards){
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$result = $beanstream->profiles()->getCards($profile_id);
```

```ruby
card = Beanstream.ProfilesAPI.get_profile_card(profile) #profile: a hash with a 'customer_code' key
```

```python
txn = self.beanstream.get_cards_from_payment_profile(customer_code)
resp = txn.commit()
```

```java
try {
	  List<Card> profileCards = beanstream.profiles().getCards(profileId);
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
IList<Card> cards = profile.getCards (beanstream.Profiles);
```

```go
cards, err := gateway.Profiles().GetCards(profile.Id)
```

#Update a Card in a Profile

```shell
Definition
PUT /v1/profiles/{id}/cards/{card_id} HTTP/1.1

Request
curl -X PUT https://www.beanstream.com/api/v1/profiles/{id}/cards/{card_id} \
-H "Content-Type: application/json" \
-H "Authorization: Passcode bWVyY2hhbnRfaWQ6cGFzc2NvZGU=" \
-d '{
   "card":{
      "name":"John Doe",
      "expiry_month":"02",
      "expiry_year":"14"    
   }
}'
```

```javascript
var updatedCard = {
  expiry_year:"20"
};

beanstream.profiles.updateCard(profileId, 2, updatedCard)
  .then(function(response){
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$card_data = array(
    'card' => array(
        'name' => 'Test Testerson',
        'expiry_month' => '07',
        'expiry_year' => '22',
        'cvd' => '123'
    )
);
$result = $beanstream->profiles()->updateCard($profile_id, 1, $card_data); // update the 1st card
```

```ruby
updated_card = {
  :card => {
    :name => "Brent Test",
    :expiry_month => "07",
    :expiry_year => "20",
    :cvd => "123"
  }
}
update_card = Beanstream.ProfilesAPI.update_profile_card(profile,1,updated_card) #update card 1
```

```python
card = billing.CreditCard('John Doe', '5100XXXXXXXX1004', '06', '2019', '123') #this masked card number will not be updated, but the other data will
txn = self.beanstream.update_card_on_payment_profile(customer_code, 2, card) # replace card 2 with new data
resp = txn.commit()
```

```java
try {
    // get card
    Card cardUpdated = beanstream.profiles().getCard(profileId, "1");

    // update card
    cardUpdated.setExpiryMonth("04");
    beanstream.profiles().updateCard(profileId, cardUpdated);
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
// get card #1
Card card = profile.getCard (beanstream.Profiles, 1);

// update card
card.ExpiryYear = "20";
profile.UpdateCard (beanstream.Profiles, card);
```

```go
// get card
card, err := profile.GetCard(gateway.Profiles(), 1) // the first card is always #1

// update card
card.ExpiryMonth = "04"
res, err2 := profile.UpdateCard(gateway.Profiles(), *card)
```

#Delete a Card from a Profile

```shell
Definition
DELETE /v1/profiles/{id}/cards/{card_id} HTTP/1.1

Request
curl -X DELETE https://www.beanstream.com.com/api/v1/profiles/{id}/cards/{card_id} \
-H "Authorization: Passcode bWVyY2hhbnRfaWQ6cGFzc2NvZGU=" \
```

```javascript
beanstream.profiles.deleteCard(profileId, 2)
  .then(function(response){
    // success
  })
  .catch(function(error){
    console.log(error);
  });
```

```php
$result = $beanstream->profiles()->deleteCard($profile_id, 2); // delete card #2
```

```ruby
delete_card = Beanstream.ProfilesAPI.delete_profile_card(profile,1) #delete card 1
```

```python
txn = self.beanstream.delete_card_on_payment_profile(customer_code, 2)
resp = txn.commit()
```

```java
try {
    ProfileResponse result = beanstream.profiles().removeCard(profileId, "2");
} catch (BeanstreamApiException ex) {
    //TODO handle error
}
```

```csharp
ProfileResponse response = profile.RemoveCard (beanstream.Profiles, 2); // delete card #2
```

```go
res, err := profile.DeleteCard(gateway.Profiles(), cardId)
```

#Errors
