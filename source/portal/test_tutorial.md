---
title: Tutorial
layout: tutorial

nav: test_tutorial_nav
name: /portal/test_tutorial
parent: /portal/test_tutorial

search: false
---

# Test Tutorial

## Tutorial Sub Heading

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis tenetur 
inventore asperiores similique quo. Excepturi animi consectetur saepe nam exercitationem beatae! Sunt omnis itaque, doloremque officia dolorum, tenetur reprehenderit ipsam!

Suscipit obcaecati sequi maxime ut iste recusandae sint unde ratione! Dignissimos, 
atque repudiandae! Aliquid, dignissimos assumenda molestiae ipsa dolore doloremque nobis laborum quae dolores necessitatibus eius maxime earum nostrum. Quia?

In dolorum ad odit nesciunt suscipit vitae est dolor doloribus tenetur minima temporibus hic, similique labore commodi. Explicabo, ad excepturi, debitis omnis cumque iusto odio nemo illo quibusdam blanditiis, id!

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

## Tabbed code test 

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos deleniti odit veniam totam maxime, neque soluta distinctio dolore quia quae sed ullam facilis autem, qui quasi, unde aut. Aperiam, esse?

```python
  print "hello world"
```

```ruby 
 puts "Hello, world"
```

```shell
 #!/bin/sh
 echo hello, world
```

```java
 public class Hello {
  	public static void main(String []args) {
 		System.out.println("Hello World");
  	}
 }
 ```