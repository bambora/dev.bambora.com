# Get Payment

Once you have created a payment Authorization you can then get that payment to see its details. You can also run a `GET` after a payment has been captured.

**[Click](https://github.com/bambora/dev.bambora.com/blob/master/source/includes/api/_get_payment.md) to edit this section.**

## Request


```shell

```


## Response

If receive an HTTP status code of 200 (OK) you will also find the payment object, in JSON format, in the response body. Any errors or problems will represent themselves as a non-200 status code. Along with the [standard error codes](./api.html#errors), these are the specific responses for `GET /{payment}/` that you may encounter:

Response Code | Meaning
---------- | -------
200 | OK -- You will also receive a json payment object
404 | Payment not found
