---
title: Create Page
layout: tutorial

navigation: 
  header: portal.self_doc_header
  footer: portal.self_doc_footer 
  toc: portal.content_toc
  header_active: Documentation

summary: > 
  Describes how to create a new page in the dev portal.

includes_root: portal
---

# Create a New Page


The first step to creating a new page is to select location where the file will live. In the project folder you will see a sub-folder called `/source`. In that folder will be your region's folder. That is where you will place your file.

Create a new file, in that region folder, with the `.md` file extension. This stands for "Markdown". Markdown is a simple format for writing content that avoids having to use HTML. The [Basics](/portal/basics/) page describes what the format looks like.

## Configure the Page

The top of each file has some configuration called **front matter**. This is YAML code contained within three dashes:

```yaml
---
title: Example
layout: tutorial

nav: site_howto_nav
name: /region/content_structure
parent: /region/content

includes_root: region
includes:
- subpage1
- subpage2

---
```

Let's go over what each of those parameters means.

- `title`
 - This is the title of the page that will appear in the web tab.
- `layout`
 - This is the layout template file to use. They are described in deltail below.
- `nav`
 - Defines what nav menu data to use. This will control the header, footer, and Table of Contents (ToC). The nav files are data files located in `/data`. More info on configuring nav files can be found in [Navigation](/portal/navigation/).
- `name`
 - The file name of this file. This is used to identify where in the ToC it should expand and show the local content.
- `parent`
 - The name of the parent file as defined in the nav data file. The ToC will expand the parent to show where this file is.
- `includes_root`
 - Where to look for the includes data. Usually under your region's folder.
- `includes` *(optional)*
 - The list of files to include in this page. They are appended, in order, to the bottom of the current markdown.

**Each parameter is required unless otherwise specified.**


## Landing Page Layout

The landing page is the very front of the developer portal for a specific region. It uses the **landing** layout template: `layout: landing`.

This page is the root page on the navigation menu that you define as the first item in the `toc:` variable in your `nav.yaml` file:

```yaml
toc:
- file: '/region/index'
  title: 'Landing Page'
- file: '/region/something'
  title: 'Next Topic'
  ...
```

The landing page contains several 'cards' that hold all of the content of the page. Generally this page is very minimal and should be used to direct the users to the information they are looking for. 

A landing page contains no markdown and very minimal text.

All of the content of the page is defined in the **frontmatter** (the code at the top of the markdown file located between 3 dashes).

 
## Product Page Layout

The product page is similar to the landing page. In fact it uses an almost identical layout template. The difference here is that the Portal's Table of Contents navigation menu is now present. It uses the **product** layout template: `layout: product`.

The product page should provide links to tutorials specific to that product as well as a link to the product spec. Here are some example of content for the product page:

- Quick Start *(tutorial)*
- Product Spec *(spec)*
- How to use in Wordpress *(tutorial)*
- One more popular tutorial *(tutorial)*

Keep the product page simple. Similar to the landing page it should be the gateway to help guide the user to the information they want for a particular product.

A product page contains no markdown and very minimal text.

All of the content of the page is defined in the **frontmatter** (the code at the top of the markdown file located between 3 dashes).

Try to include one or more screenshots for the product, if it is a visual product.


## Tutorial Layout

Tutorials are the meat of the dev portal. They are context-specific and compliment Spec pages.

Tutorials are often sequential with a defined goal. They use the **tutorial** layout template: `layout: tutorial`.

## Spec Layout

Specs (specifications) are incredibly details pages that server as the *source of truth* for a product or API. Tutorials should refer to these pages as much as possible so content doesn't have to be changed in many places around the site.
