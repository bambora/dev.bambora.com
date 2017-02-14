
All payment requests are made via server-side requests. You can either call our RESTful Payment API directly, or via one of our API wrapping libraries (our SDKs).

Our RESTful APIs allow you to take payments, analyze payments, create payment profile to record customer details for future payments and create credit card tokens to reduce the scope of your PCI compliance. You can read the API Spec [here](../../merchant_api).

## Include the Server SDK

```javascript
// Step 1) Install module with NPM
npm install beanstream-node

// Step 2) Import module into your project
var beanstream = require('beanstream-node')('merchantId', 'Payments API key', 'Profiles API key', 'Reporting API key');
```

```php

// Composer
// 1. Edit composer.json
{
    "require": {
        "beanstream/beanstream": "dev-master"
    }
}
// 2. Install the SDK
composer install

// 3. Require in your php file
require 'vendor/autoload.php';
```

```ruby
gem install beanstream --pre
```

```python
// Pip
pip install beanstream
```

```java
// Maven
<repositories>
<repository>
<id>snapshots-repo</id>
<url>https://oss.sonatype.org/content/repositories/snapshots</url>
<releases><enabled>false</enabled></releases>
<snapshots><enabled>true</enabled></snapshots>
</repository>
</repositories>

<dependencies>
<dependency>
<groupId>com.beanstream.api</groupId>
<artifactId>beanstream</artifactId>
<version>1.0.0-SNAPSHOT</version>
</dependency>
</dependencies>

//Gradle
repositories {
    maven { url "https://oss.sonatype.org/content/repositories/snapshots" }
}
dependencies {
    compile("com.beanstream.api:beanstream:1.0.0-SNAPSHOT") {changing=true}
}
```

```csharp
//Nuget
Id: Beanstream

PM> Install-Package Beanstream
```

```go
// Go Get
import beanstream "github.com/Beanstream/beanstream-go"
```

Select the programming language of your project from the tabs at the top of the right-hand column.
