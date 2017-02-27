# Authentication

```python
from oauthlib.oauth2 import BackendApplicationClient
from requests_oauthlib import OAuth2Session

CLIENT_ID = '<CLIENT_ID>'
CLIENT_SECRET = '<CLIENT_SECRET'

SCOPES = [
    'auth_token_payment',
    'cancel_payment',
    'capture_payment',
    'read_payment',
    'refund_payment'
]

TOKEN_URL = 'https://auth.bambora.com/connect/token'

# Create a client object
client = BackendApplicationClient(client_id=CLIENT_ID)

# Create and configure a OAuth2 session
oauth_session = OAuth2Session(client=client)
oauth_session.refreshing = False

# Fetch a JSON Web Token using the Oauth2 session
oauth_session.fetch_token(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    scope=SCOPES,
    timeout=2,
    token_url=TOKEN_URL
)

# Done! The oauth_session object now contains a JSON Web Token and can
# be used for making requests to the Payments API.
```

```shell
CLIENT_ID="<CLIENT_ID>"
CLIENT_SECRET="<CLIENT_SECRET>"
AUTHORIZATION="Authorization: Basic "$(echo -n ${CLIENT_ID}:${CLIENT_SECRET} | base64)

SCOPES=("auth_token_payment"
        "cancel_payment"
        "capture_payment"
        "read_payment"
        "refund_payment"
)

TOKEN_URL="https://auth.bambora.com/connect/token"

TOKEN=$(
    curl \
        --request POST \
        --header "${AUTHORIZATION}" \
        --data "grant_type=client_credentials" \
        --data "scope=${SCOPES[*]}" \
        "${TOKEN_URL}" \
        --silent
)
```

You need to authenticate yourself in order to use our Payments API.

* When signing up with Bambora, we will provice you with credentials in the form of a client id and a client secret.

* Using your credentials, you can request a JSON Web Token (JWT). The code examples show how to request a JWT.

* After receiving a JWT from us, you can use it for making requests through our Payments API.

Test credentials will be provided when signing up. Production credentials requires signing an agreement with Bambora. Please send an email to [sales.ecom@bambora.com](mailto:sales.ecom@bambora.com) if you want to sign up.

> The Python code example requires the packages [OAuthLib](https://pypi.python.org/pypi/oauthlib) and [Requests-OAuthlib](https://pypi.python.org/pypi/requests-oauthlib).
