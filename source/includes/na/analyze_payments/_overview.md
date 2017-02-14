# Analyze Payments

Our Secure Payment Profile service allows merchants to create secure payment accounts — or "profiles" — for storing confidential contact and/or credit details on Beanstream’s server. Transactions can then be processed against these profiles without the need to recollect payment information from the customer. Also, you do not need to store payment information on the merchant’s system. Each profile can store multiple cards.

When you save a payment profile you will be given a customer code ID in return. This ID can be used for retrieving the profile information, updating it, and also for making payments.

Payment Profiles can be created with a plain credit card number, however we recommend that you first tokenize the card data in the client-side application and then use that token to create the profile.

Creating and modifying Secure Payment Profiles requires you use your Profiles API Key. If you get an authentication error you might be using your Payments API Key, so double check!
