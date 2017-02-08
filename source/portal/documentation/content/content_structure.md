---
title: Structure
layout: tutorial

navigation: 
  nav_file: portal.site_howto_nav 
  toc_file: portal.content_toc 
  header_highlight: Documentation

includes_root: portal
---

# Content Structure

The dev portal is broken down into 4 different types of pages:

1. Landing page
2. Product Page
3. Tutorial
4. Spec

Each of these page types is rendered differently and has slightly different configuration called **front matter**. For more detail on configuring what type of page you will render check out the [Crete New Page](/portal/create_new_page/) section.


The structure of the portal is largely defined in the Table of Contents left navigation area. Top-level items are either Products or a specific category group.

Here is an overview of the Page Hierarchy:

- Product Page
 - Tutorials
 - Specs

These top-level pages should use the **Product Page** layout template.

The purpose of those pages is to direct the user to the information they interested in. Actual content should be in the sub-pages. For instance, if we take Checkout as an example top-level menu category then the structure might look like this:

```
Checkout (product page)
  Getting Started (tutorial)
  Configuration (spec)
  Adding Checkout to Wordpress (tutorial)
  Processing the Payment (tutorial)
```

The 'Checkout' item would be the product page. It can contain screenshots as well as **cards** that send the user to one of the sub-sections.

The first sub-section, 'Getting Started', will use the Tutorial layout. 'Configuration' will use the Spec layout. And the following topics will use the Tutorial layout.

The individual markdown files do not need to be structured in the source directory the same way they are in the ToC. For information on configuring the Table of Contents, head to the [ToC](/portal/toc/) doc.
