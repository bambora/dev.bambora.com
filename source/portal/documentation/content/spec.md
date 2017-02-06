---
title: Spec Page 
layout: tutorial

navigation: 
  nav_file: site_howto_nav 
  this_page: /portal/documentation/content/spec/
  toc_file: content_toc
  header_highlight: Documentation

summary: > 
    An overview of the Spec Page template. 
---

# Spec Pages

A Spec Page is a detailed page that serves as the source of truth for a product or API. Tutorials should refer to these pages as much as possible so content doesn't have to be changed in many places around the site. 

## Template 

The Spec Page is rendered with `/sources/layouts/spec.erb`. If you would like to modify the Spec Page design, please create a new layout file and copy the content. 

## Config 

 The product page is configured by editing the frontmatter at the top of the markdown file, between the 3 dashes. The frontmatter uses the [YAML](https://en.wikipedia.org/wiki/YAML) format. The Product Page has the following parameters to set.

### Parameters

In addition to the [parameters that apply to all pages](), the Spec Page has the following parameters that can be set.
 
Required | Parameter | Description | Example 
---------|-----------|-------------|--------
no | `includes` | A list of partials to be included on the page. | *- test/_test-include* |
no | `language_tabs` | A list of code languages to display examples in. | *- ruby* |

#### includes 

Any markdown files specified in the `includes` list will be appended to the bottom of the content in the main file. 

#### language_tabs 

Any code samples on the page in a language that is specified in the `language_tabs` list will only be displayed when that tab is selected at the top of the code samples section. This way documentation can be written for multiple languages, and the user can select which to view. 

### Frontmatter Example 

Here's an example frontmatter for a Spec Page: 

```YAML
---
title: Test Spec Page
layout: spec

summary: An example Spec Page implementation.

nav: test_tutorial_nav
name: /portal/test_spec_page
parent: /portal/test_spec_page

includes:
  - test/_test-include

language_tabs: 
  - ruby 
  - python
---
```

## Content 

Content for the page can be specified both in the main markdown file and and files in the includes list, which will be appended in the order they appear. 

Blocks of code will be rendered on the right hand side of the page, and text on the left. If any language tabs are specified, the code for those languages will only appear when the corresponding tab is selected. 

## Examples 

[Here's](/portal/example_pages/example_spec_page/) an example of a Spec Page. 