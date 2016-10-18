Getting Started With Customizing The Developer Portal
------------------------------
Welcome to the bambora developer portal source site. Here you will find the source that builds up the portal as well as the documentation. We have also included instructions on how to build this site on your own and how to contribute changes.

## Submit A Documentation Change
If you want to make a change to the documentation on the developer portal, click on one of these following links to be taken to the markdown file that defines the page. Edit that file (in the browser if you wish) and submit a pull request. We will review it and if accepted, and automated build will deploy your change.

You can define and import sub-pages in the top-level topics. Just add the markdown file to the includes section at the top of the file:
```
includes:
  - web/checkout
  - web/hosted_fields
  - web/my_new_topic
```
You will need to prefix the actual file name with an underscore, but make sure to leave that out when adding it in the includes section.

*Note* that in preview mode in GitHub it will look a bit wonky with the code samples. That is because we render the markdown using a tool called Slate and it is not built into GitHub.

## Build The Site
If you want to build the site on your own machine to play around with the layout our CSS, follow the steps instructions here.

### Prerequisites

You're going to need:

 - **Linux , OS X, windows**.
 - **A computer and a willingness to do great things**
 - **Ruby, version 1.9.3 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

### Getting Set Up

 1. Clone this repository. You can optionally fork the repo too.
 3. `cd dev.bambora.com`
 4. Install all dependencies: `bundle install`
 5. Start the test server: `bundle exec middleman server`

Or use the included Dockerfile! (must install Docker first)

```shell
docker build -t devbamboracom .
docker run -d -p 4567:4567 devbamboracom
```

If you want to build the static site files only then run:
```shell
bundle exec rake static
```

If you want to run the site in a standalone simple web server run:
```shell
bundle exec rake run
```

You can now see the docs at <http://localhost:4567>. Whoa! That was fast!

*Note: if you're using the Docker setup on Windows or OSX, the docs will be
available at the output of `docker-machine ip <machine-name>` (port: 4567) instead of `localhost:4567`.*

### Editing The Site
This site is built using two tools: [Slate](https://github.com/tripit/slate) and [Swagger UI](https://github.com/jensoleg/swagger-ui). Slate is the main framework that has all the text descriptions and code samples. Swagger displays the API spec in a readable and interactable way. We are using a custom fork of Swagger UI.

With the dev portal is all set up your machine, you'll probably want to learn more about Slate. The first place is to learn about [editing Slate markdown](https://github.com/tripit/slate/wiki/Markdown-Syntax).

The content is laid out like so:
**Markdown files** located in _/source_ and in _/includes_ hold the content of the site. These are what are edited to change the documentation.
**/layout/layout.erb** defines the layout of the site; it is the template.
**/api** contains the swagger UI code. In _/api/index.html_ we define where the swagger definition file lives that we will use. The swagger file in this /api directory is not necessarily used as the base definition for this site.


### Publishing

To submit a documentation change back to this site just send a pull request with the markdown files that you modified. We will review them and accept them if there are no changes needed, and an automated build will run and deploy the site within a few minutes.
