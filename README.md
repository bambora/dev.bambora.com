Getting Started With Customizing The Developer Portal
------------------------------
Welcome to the bambora developer portal source site. Here you will find the source that builds up the portal as well as the documentation. We have also included instructions on how to build this site on your own and how to contribute changes.

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

## Editing The Site
This site is built using two tools: [Slate](https://github.com/tripit/slate) and [Swagger UI](https://github.com/jensoleg/swagger-ui). Slate is the main framework that has all the text descriptions and code samples. Swagger displays the API spec in a readable and interactable way. We are using a custom fork of Swagger UI.

With the dev portal is all set up your machine, you'll probably want to learn more about Slate. The first place is to learn about [editing Slate markdown](https://github.com/tripit/slate/wiki/Markdown-Syntax).

The content is laid out like so:
**Markdown files** located in _/source_ and in _/includes_ hold the content of the site. These are what are edited to change the documentation.
**/layout/layout.erb** defines the layout of the site; it is the template.
**/api** contains the swagger UI code. In _/api/index.html_ we define where the swagger definition file lives that we will use. The swagger file in this /api directory is not necessarily used as the base definition for this site.

## Adding New Documentation
Documentation is stored in markdown files located in the `/source` folder. These are the root "main" pages. Each root page can import zero or more sub pages, this is done in the metadata section at the top of the page by populating the "**includes:**"" variable. All includes must be stored in the `/includes` folder and need to have their filename prefixed with an underscore, like so: `/includes/_myfile.md` and then referenced *without* the underscore when you import it.

Imported files will be appended to the main file and the Table of Contents will update automatically.

If you want to add a new root ToC menu item then you will need to manually do this by editing the metadata list on each of the root markdown files. It is a little cumbersome,  V2 of the dev portal will make this a lot easier. 

## Adding a new API Spec
The dev portal currently uses Swagger UI to render the API spec. You just need to provide a swagger.json and link it into the site following these steps:

1. Create a new folder with the name of your API. For example `payment_depot`
2. Copy over an index.html file from one of the other API folders, for instance from `native_payments`
3. Edit this new `index.html` file and change the line `url = "/backoffice-reports/swagger.json";` (around line 47) to point to your new folder.
4. Open up `/Rakefile` and in the *:copy_swagger* task add a shell command to copy your new folder to the **/build** folder, like so: `sh "cp -r payment-depot build/"`
5. At the command prompt run `rake run` to build and then run the site.
6. You can acccess the API page at **http://localhost:4567/payment-depot** (or the folder that you specified)
7. Make sure to add links to it from the other pages.


## Publishing

To submit a documentation change back to this site just send a pull request with the markdown files that you modified. We will review them and accept them if there are no changes needed, and an automated build will run and deploy the site within a few minutes.

The general steps to do this are:

1. Create a branch
2. Make your changes
3. Push your new branch to Origin
4. Head to GitHub and select your branch, then click on the Pull Request button.
5. If you are in charge of your dev portal then you can review your changes and accept the PR. If you are not in charge of the portal you are making changes to the the person in charge will need to accept the PR.
6. Jenkins will detect the change to Master and deploy the site automatically.
