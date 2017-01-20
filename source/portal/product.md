---
title: Product Page
layout: tutorial

nav: site_howto_nav
name: /portal/product
parent: /portal/content

search: false
---

<h1 class="js-toc-ignore">Product Pages</h1>

A Product Page is a mix between documentation and flash. It should look nice yet provide a clear avenue to the important documentation. Use the cards in the layout to direct users to the most important information.

There should always be a Quickstart card.

# Template

The product page is rendered with `/source/layouts/product.erb`. If you would like to modify the product page design, please create a new layout file and copy the content.

Unlike the Landing Page, the Product Page has a left-hand navigation menu.

# Config

 The product page is configured by editing the frontmatter at the top of the markdown file, between the 3 dashes. The frontmatter uses the [YAML](https://en.wikipedia.org/wiki/YAML) format. The Product Page has the following parameters to set. 

## Parameters

Parameter | Description | Example
----------|-------------|--------
`title` | The page title. | *Android* 
`layout` | The page layout. Must be 'product'. | *product* 
`nav` | What nav menu to use, located in /data.| *nav.yaml*
`name` | File name and path used for the nav menu. | */apac/ihpp*
`parent` | Parent entry in the nav menu. | */apac/payments*
`search` | ... | ...
`cards` | A list of Cards to be displayed. | See below

## Cards 

`cards` contains a list of Cards to be displayed on the Product Page. A Card is a descriptive link to another page in the portal. A Card has three required parameters and one optional one. All the Cards for a product page are put into a list in `cards`.

### Card parameters

Parameter | Description | Example Value
----------|-------------|--------
`link` | The destination link of the card. | */portal/quickstart.html*
`title` | The heading of the card. | *Try our API*
`description` | The body of the card. | *Get up and running in minutes...*
`icon` | The name of a [Bambora UI]() icon. | *checkmark*  
`tag` | A tag for the card (optional). | *New* 

### Example Card

<div class="row">
<div class="col-md-6">
<div class="flex-row row">
<div class="col-md-6 col-sm-6">
    <a href="#">
        <div class="card">
            <div class="icon-bg bg-raspberry">
                <svg width="19" height="14" viewBox="0 0 19 14" xmlns="http://www.w3.org/2000/svg"><title>checkmark</title><path d="M16.619 0L5.47 10.936 1.593 7.132 0 8.762l4.674 4.585a1.135 1.135 0 0 0 1.593 0L18.213 1.63 16.619 0z" fill="#74797B" fill-rule="evenodd"/></svg>
            </div>
            <span>NEW</span>
            <h3>Try our API</h3>
            <p>Get up and running in minutes. Use the Bambora API to make payments and much more.</p>
        </div>
    </a>
</div>
</div>
</div>
</div>

## Frontmatter Example

Here's an example frontmatter for a product page: 

```
---
title: Example Product Page
layout: product

nav: site_howto_nav
name: /portal/test_product_page
parent: /portal/test_product_page

search: true

cards:
    -                
        title: Android test card
        description: > 
            Use the Bambora native payments SDK to accept payments in 
            iOS and android apps.
        icon: notification-active
        tag: tag
    -
        title: Accept payments online  
        description: > 
            Use Bambora checkout, or one of our Shopping Cart plugins, 
            to accept payments on your website or online store.
        icon: checkmark
    -
        title: Try our API 
        description: >
            Get up and running in minutes. Use the Bambora API to make 
            payments and much more.
        icon: list
    -
        title: Use a test card 
        description: >
            You can use these test cards for testing card registration and 
            purchasing (no real money is charged when these cards are used).
        icon: creditcard-outline
---
```

# Content

Content from the markdown file will be rendered on the Product Page, above the cards. Try to limit how much content is displayed.

# Example

[Here's](/portal/test_product_page.html) an example of a product page.
