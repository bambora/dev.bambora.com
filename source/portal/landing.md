---
title: Landing Page
layout: tutorial

nav: site_howto_nav
name: /portal/landing
parent: /portal/content

search: false
---

<h1 class="js-toc-ignore">Landing Page Template</h1>

The landing page is the front of the dev portal. It has no navigation menu so it must be especially skilled at directing users to the products and information they need.

The landing page is NOT for matketing content. Ditch the fluff, get to the point.

# Template

The landing page is rendered with `/source/layouts/landing.erb`. If you would like to modify your landing page design, please create a new layout file and copy the content.

The landing page has no navigation header. If you want a page that looks similar to the landing page yet has a navigation menu, then use the `product.erb` template.

# Config

The landing page is made up of Cards. These cards are defined in the frontmatter config, between the 3 dashes, at the top of the markdown file.

# Content

The landing page...

# Example

[Example](/portal/test_landing_page.html)
