
# Online
All payment requests are made from the merchant server. You can either call our RESTful Payment API directly, or via one of our API wrapping libraries (our SDKs).

Our RESTful APIs allow you to take payments, analyze payments, create payment profile to record customer details for future payments and create credit card tokens to reduce the scope of your PCI compliance. You can read the API Spec <a href="/payments_api_ref.html">here</a>.

We offer a range of SDKs that wrap our Payments, Profiles and Reporting APIs. In addition to the C#, Java, Python, PHP and Ruby SDKs listed in the right hand column of this page, we also offer SDKs written in Javascript (Node) and Go.

We also have a Hosted Payment Form solution configurable in the Back Office and there are a selection of 3rd-party shopping carts and plugins to speed up your intigration.

#### Get the SDK

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

| Language | Source                  | Additional Docs     | Packet Repository  |
| -------- | ----------------------- | ------------------- | ------------------ |
| NodeJS   | [Source][node-source]   |                     | [NPM][node-pm]     |
| PHP      | [Source][php-source]    | [Docs][php-docs]    | [Composer][php-pm] |
| Ruby     | [Source][ruby-source]   |                     | [Gem][ruby-pm]     |
| Python   | [Source][python-source] | [Docs][python-docs] | [PIP][python-pm]   |
| Java     | [Source][java-source]   | [Docs][python-docs] | [Maven][python-pm] |
| C#       | [Source][csharp-source] | [Docs][csharp-docs] | [Nuget][csharp-pm] |
| Go       | [Source][go-source]     |                     |                    |

[node-source]: https://github.com/Beanstream/beanstream-nodejs
[node-docs]: #
[php-source]: https://github.com/Beanstream/beanstream-php
[php-docs]: https://github.com/Beanstream/beanstream-php/wiki
[ruby-source]: https://github.com/Beanstream/beanstream-ruby
[ruby-docs]: #
[python-source]: https://github.com/Beanstream/beanstream-python
[python-docs]: https://github.com/Beanstream/beanstream-python/blob/master/README.markdown
[java-source]: https://github.com/Beanstream/beanstream-java
[java-docs]: https://github.com/Beanstream/beanstream-java/wiki
[csharp-source]: https://github.com/Beanstream/beanstream-dotnet
[csharp-docs]: https://github.com/Beanstream/beanstream-dotnet/wiki
[go-source]: https://github.com/Beanstream/beanstream-go
[go-docs]: #

[node-pm]: https://www.npmjs.com/package/beanstream-node
[php-pm]: https://packagist.org/packages/beanstream/beanstream
[ruby-pm]: https://rubygems.org/gems/beanstream/versions/1.0.0.rc1
[python-pm]: https://pypi.python.org/pypi/beanstream/1.0.1
[java-pm]: https://mvnrepository.com/artifact/com.beanstream.api
[csharp-pm]: https://www.nuget.org/packages/Beanstream/
[go-pm]: #
