---
title: Product Page
layout: tutorial

nav: site_howto_nav
name: /portal/product
parent: /portal/content

search: false
---

<h1 class="js-toc-ignore">Product Pages</h1>

A Product Page is a mix between documentation and flash. It should look nice yet provide a clear avanue to the important documentation. Use the cards in the layout to direct users to the most important information.

There should always be a Quickstart card.

# Template

The product page is rendered with `/source/layouts/product.erb`. If you would like to modify the product page design, please create a new layout file and copy the content.

Unlike the Landing Page, the Product Page has a left-hand navigation menu.

# Config

The Product Page is made up of Cards. These cards are defined in the frontmatter config, between the 3 dashes, at the top of the markdown file.

## Parameters

Parameter | Description | Example
----------|-------------|--------
`nav` | What nav menu to use, located in /data.| *nav.yaml*
`name` | File name and path used for the nav menu. | */apac/ihpp*
`parent` | Parent entry in the nav menu. | */apac/payments*


# Content

Content from the markdown file will be rendered on the Product Page. Try to limit how much content is displayed.

# Example

[Example](/portal/test_product_page.html)
