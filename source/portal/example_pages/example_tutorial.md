---
title: Test Tutorial
layout: tutorial

summary: A test tutorial with dummy content added. 

nav: example_nav
in_page_toc: true
---

# Test Tutorial

## Tutorial Sub Heading

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis tenetur 
inventore asperiores similique quo. Excepturi animi consectetur saepe nam exercitationem beatae! Sunt omnis itaque, doloremque officia dolorum, tenetur reprehenderit ipsam!

Suscipit obcaecati sequi maxime ut iste recusandae sint unde ratione! Dignissimos, 
atque repudiandae! Aliquid, dignissimos assumenda molestiae ipsa dolore doloremque nobis laborum quae dolores necessitatibus eius maxime earum nostrum. Quia?

In dolorum ad odit nesciunt suscipit vitae est dolor doloribus tenetur minima temporibus hic, similique labore commodi. Explicabo, ad excepturi, debitis omnis cumque iusto odio nemo illo quibusdam blanditiis, id!

| header 1 | header 2 | header 3 | header 4 | header 5 |
| -------- | -------- |----------|----------|----------|
| cell 1   | cell 2   | cell 3   | cell 4   | cell 5  | 
| cell 3   | cell 4   | cell 6   | cell 7   | cell 8   |

## Second Level Heading

### Sub sub sub heading 

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident nobis autem illum 
magnam sapiente, eaque beatae ipsum, dolorum veritatis temporibus, maxime reiciendis 
sed! Eaque culpa dolores, sapiente eum nisi amet.

Molestias dolore labore, esse odit quis quisquam, voluptas exercitationem! Nisi numquam et natus doloribus quas rem minima quos dolorem tenetur esse eaque nostrum, harum, ipsa pariatur quidem, inventore modi quae.

```ruby
<% if current_page.data.nav %>
  <% nav = data["#{current_page.data.nav}"].toc %>
<% else %>
  <% nav = data.nav.toc %>
<% end %>
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati totam accusamus 
eos inventore possimus! Veritatis quos ex distinctio ab ducimus, ad exercitationem, 
fuga similique ut, fugiat optio impedit, ipsum. Possimus.

### A second sub sub sub heading

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, nam reiciendis 
non assumenda, officia veritatis deleniti delectus id atque tempore, aliquid recusandae 
et consequuntur. Maiores doloribus consectetur sit laudantium obcaecati.

```javascript
tocbot.init({
    // Where to render the table of contents.
    tocSelector: '.js-toc',
    // Where to grab the headings to build the table of contents.
    contentSelector: '.js-toc-content',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h1, h2, h3, h4, h5',
    // How many heading levels should not be collpased.
    // For example, number 6 will show everything since
    // there are only 6 heading levels and number 0 will collpase them all.
    // The sections that are hidden will open
    // and close as you scroll to headings within them.

    collapseDepth: 1,
    // Main class to add to links.
    //linkClass: '',

    // Extra classes to add to links.
    //extraLinkClasses: '',

    // Class to add to active links,
    // the link corresponding to the top most heading on the page.
    //activeLinkClass: '',

    // Main class to add to lists.
    //listClass: 'nav-vertical',

    // Extra classes to add to lists.
    //extraListClasses: '',

    // Class to add to list items.
    //listItemClass: '',
});
```

## Another subheading 

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim illum ipsam aut 
laboriosam ad placeat voluptas molestias iste quidem mollitia cum nostrum quas ea, 
assumenda ipsum inventore officiis quasi animi.

Eius, corporis dolorum ad atque dolorem assumenda similique nihil nesciunt aut! 
Dolores mollitia culpa neque provident inventore ut distinctio in, error iure illo, 
vel, autem perspiciatis aperiam. Voluptates, quia velit!

Fugit reiciendis molestias illum dolorum cumque minima quibusdam consequatur 
delectus eveniet, adipisci iure tempore impedit sunt nulla! Porro perspiciatis 
quisquam eos nihil enim, veritatis explicabo unde quibusdam, quaerat, rerum vitae.

Voluptas eos, veniam omnis, ad eius repellat voluptates atque repellendus sapiente
id sed! Adipisci a sunt ex perferendis optio aspernatur ullam fugiat voluptate officia, tenetur! Vitae eum odit consequatur dolorem? 

## Code Block

A long code block: 

```css
/* side nav/toc */ 
.nav-left {
  position: absolute; 
  overflow-y: auto;
  max-width: 240px;
  max-height: calc(100% - 66px - 66px);
}

.nav-left-fixed {
  position: fixed;
  top: 66px;
}

.nav-left > ul > li {
  min-height: 26px; 
  padding-bottom: 14px;
}

.nav-left li {
  list-style: none;
}

.nav-left li a {
  position: relative;
  color: rgba(90, 90, 90, 1);
  display: block;
  font-size: 16px;
  text-decoration: none;
  border: 0;
  border-left: 2px solid transparent;
  font-weight: 400;
  cursor: pointer;
  padding: 16px;
  padding-top: 0;
  padding-bottom: 0;
  transition: all 100ms ease-out;
}

.nav-left li.active {
  border-left: 2px solid rgba(120, 71, 181, 1);
}

.nav-left .nav-top-heading {
  color: rgba(90, 90, 90, 1);
}

.nav-left .active .nav-top-heading {
  color: rgba(120, 71, 181, 1); 
}

.nav-left a.nav-top-heading:hover {
  color: rgba(120, 71, 181, 1); 
}
  
.nav-left .nav-subs {
  position: relative;
}

.nav-left ul.nav-subs {
  padding-left: 16px;
} 

.nav-left .nav-subs > li { 
  list-style: none;
  padding-left: 0;
  margin: 0;
  min-height: 26px; 
}

.nav-left .nav-subs > li > a {
  font-size: 16px;
  position: relative;
  padding-top: 0;
  padding-bottom: 0;
  color: rgba(90, 90, 90, 1);
}

.nav-left .nav-subs li > a:hover {
color: rgba(120, 71, 181, 1); 
}

.js-toc .toc-list {
  margin: 0;
  padding-left: 10px;
}

.js-toc a.toc-link {
  color: currentColor;
  height: 100%;
}

.js-toc .toc-link.node-name--H2 {
  font-size: 12px;
  min-height: 12px;
}

.js-toc .toc-link.node-name--H3 {
  font-size: 12px;
  color: rgba(120, 120, 120, 1);
}

.js-toc .toc-link.node-name--H4 {
  font-size: 12px;
  color: rgba(90, 90, 90, 1);
}

.js-toc .is-collapsible {
  max-height: 1000px;
  overflow: hidden;
  transition: all 300ms ease-in-out;
}

.js-toc .is-collapsed {
  max-height: 0;
}

.js-toc .is-position-fixed {
  position: fixed !important;
  top: 0;
}

.js-toc .is-active-link {
  font-size: 15px;
  font-weight: 600;
}

/* Nav collapse on mobile screens */

#nav-link {
  position: fixed;
  top: 80px;
  left: 15px;
  display: none;  
  path {
    fill: $primary;
  }
}

#nav-close {
  display:none; 
}

@media (max-width : 992px) {
  .nav-left {
    transition: left 0.5s;
    left: -200px;
    background-color: $lightest;
    z-index: 100;
    height: 100%;
    top: 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.04);
    position: fixed;

    ul {
      margin-top: 50px;
      padding-left: 15px;
      padding-right: 15px;
    }

    &.show {
      left: 0;
    }
  }

  #nav-link {
    display: block;
  }

  #nav-close {
    display: block;
    position: absolute;
    right: 15px;
    top: 15px;
    path {
      fill: $primary; 
    }
  }
}
```