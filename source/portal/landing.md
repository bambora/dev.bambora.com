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

The landing page is NOT for marketing content. Ditch the fluff, get to the point.

## Template

The landing page is rendered with `/source/layouts/landing.erb`. If you would like to modify your landing page design, please create a new layout file and copy the content.

The landing page has no navigation header. If you want a page that looks similar to the landing page yet has a navigation menu, then use the `product.erb` template.

## Config

The landing page is configured by editing the frontmatter at the top of the markdown file, between the three dashes. The frontmatter uses the [YAML](https://en.wikipedia.org/wiki/YAML) format. The Landing Page has the following parameters to set: 

### Parameters 

Parameter | Description | Example 
----------|-------------|--------
`title` | The page title. | *Bambora Developer Portal* 
`layout` | The page layout. Must be 'landing'. | *landing* 
`hero_unit` | Defines the contents of the hero unit at the top of the page | See below 
`card_sets` | A **list** of Card Sets to be displayed. | See below

### The Hero Unit

The `hero_unit` makes up the large block of content at the top of the landing page. It has a page heading, a tagline, and, optionally, a link and/or a background image. 

#### Hero Unit Parameters

Parameter | Description | Example Value 
----------|-------------|--------------
`big_heading` | The large page header. | *Build it with Bambora.* |
`tag_line` | Smaller text below the `big_heading`. | *Start acecepting payments today...* 
`hero_image` | A background image for the Hero Unit (optional). | *shoal-1.png* 
`button` | A button object below the `tag_line` (optional). | See below

##### Button Parameters

Parameter | Description | Example Value 
----------|-------------|--------------
`text` | The text value  of the button | *Get Started*
`link` | The link destination of the button | */portal/quickstart.html* 

The style of the landing page will change depending on if a `hero_image:` has been specified. The image should be located in the `/source/images/` folder and large enough to work as a background image on all screen sizes. The image should be dark enough that white text will be visible on top of it. 

### The Card Sets list

The `card_sets` list makes up the second part of the landing page. Each Card Set in the list has a title, description, and list of cards associated with that set. 

#### Card Set Parameters 

Parameter | Description | Example Value 
----------|-------------|--------------
`title` | Heading for the Card Set | *Upcoming Events.*
`description` | Description below the `title`. | *Comming soon at Bambora...* 
`cards` | A **list** of cards in the Card Set | See Below

#### Cards

`cards` contains a list of Cards to be displayed in the card set. A Card is a descriptive link to another page in the portal. A Card has three required parameters and one optional one. 

##### Card parameters

Parameter | Description | Example Value
----------|-------------|--------
`link` | The destination link of the card. | */portal/quickstart.html*
`title` | The heading of the card. | *Try our API* 
`description` | The body of the card. | *Get up and running in minutes...*
`icon` | The name of a [Bambora UI](https://bambora.github.io/ui.bambora.com/#icons) icon. | *checkmark*  
`tag` | A tag for the card (optional). | *New* 

##### Example Card

<div class="row">
<div class="col-md-6">
<div class="flex-row row">
<div class="col-md-12">
    <a href="/portal/quickstart.html">
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

### Frontmatter Example 

Here's a full example frontmatter for a Landing Page:

```
---
title: Landing Page
layout: landing

hero_unit:
    hero_image: shoal-1.png
    big_heading: Build it with Bambora.
    tag_line:  > 
        Start accepting payments today with code made by developers world wide.
        Handy guides and libraries at reach.
    button: 
        text: Get Started
        link: /portal/quickstart.html

card_sets:
    -  
        title: Get Started.
        description: >
            Bambora makes it easy to accept payments in your app or website.
            Get integrated quickly using our guides and selecting from our 
            range of SDKS.
        cards:
            -           
                link: '/portal/quickstart.html'     
                title: Accept payments in-app
                description: > 
                    Use the Bambora native payments SDK to accept payments in 
                    iOS and android apps.
                icon: notification-active
                tag: new
            -
                link: '/portal/quickstart.html'
                title: Accept payments online  
                description: > 
                    Use Bambora checkout, or one of our Shopping Cart plugins, 
                    to accept payments on your website or online store.
                icon: checkmark
            -
                link: '/portal/quickstart.html'
                title: Try our API 
                description: >
                    Get up and running in minutes. Use the Bambora API to make 
                    payments and much more.
                icon: list
            -
                link: '/portal/quickstart.html'
                title: Use a test card 
                description: >
                    You can use these test cards for testing card registration and 
                    purchasing (no real money is charged when these cards are used).
                icon: creditcard-outline
    -
        title: Upcoming Events.
        description: >
            The titles and descriptions of these card sets are set in the 
            yaml file and then rendered in the template.
        cards:
            - 
                link: '/portal/quickstart.html'
                title: A test card
                description: > 
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores officia incidunt sapiente molestiae totam quisquam.
                icon: flag
            -
                link: '/portal/quickstart.html'
                title: Another test card
                description: > 
                    Tempore corrupti, obcaecati voluptate nulla, repellat labore 
                    culpa, accusamus doloremque laudantium similique id molestiae.
                icon: more
---
```

## Content

Any markdown that exists outside of the frontmatter will not be displayed on a Landing Page. 

## Examples

[Here's](/portal/test_landing_page.html) and example of a landing page without a Hero Unit background image, and [here's](/portal/test_landing_page_hero.html) an example of one with a background image.  
