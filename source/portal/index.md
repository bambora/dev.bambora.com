---
title: Demo Developer Portal
layout: landing

navigation:
    header: portal.self_doc_header 
    footer: portal.self_doc_footer
    toc: portal.self_doc_toc

hero_unit:
    hero_image: shoal-1.png
    big_heading: Demo Developer Portal.
    tag_line:  > 
        This site is both an example Developer Portal using the new portal 
        project, as well as documentation for how to use and extend the portal. 
    button:
        text: Get Started
        link: /portal/documentation/setup/

card_sets:
    -
        title: Portal Documentation.
        description: >
            In addition to the example pages, this portal also contains documentation 
            for using and extended the templates, navigation, and more. 
        cards:
            - 
                title: Quickstart
                description: > 
                    The fastest way to get up and running with the portal. 
                icon: flag
                link: /portal/documentation/quickstart/
            -
                title: Style guide 
                description: > 
                    Tempore corrupti, obcaecati voluptate nulla, repellat labore 
                    culpa, accusamus doloremque laudantium similique id molestiae.
                icon: more
                link: /portal/documentation/guidelines/
            -
                title: Editing the docs in browser
                description: >
                    Easily make pull-requests to any page (or partial) in the 
                    documentation from the browser.
                icon: comment
                link: /portal/
            -
                title: Customization
                description: >
                    Extend the portal to add more templates, new styling, new 
                    navigation, and more. 
                icon: comment
                link: /portal/documentation/customize/
    -  
        title: Example Templates.
        description: >
            The portal has various templates that can be used for different 
            types of documentation. Check out some examples on the right.
        cards:
            -                
                title: Landing Page with hero image
                description: >
                    An eye catching landing page with an optional hero image 
                    and a number of cards to display more detailed information
                    and links. 
                icon: list
                tag: new
                link: /portal/example_pages/example_landing_page_hero/
            -
                title: Landing Page
                description: > 
                    A landing page without a hero image. The content is moved 
                    further up the page. 
                icon: list
                link: /portal/example_pages/example_landing_page/
            -
                title: Product Page
                description: > 
                    A page for displaying information about a product that has a 
                    table of contents style navigation and a number cards. 
                icon: list
                link: /portal/example_pages/example_product_page/
            -
                title: Tutorial Page
                description: >
                    A simple page for displaying markdown-formatted text. Equally suited 
                    to prose or code.
                icon: list
                link: /portal/example_pages/example_tutorial/
            -
                title: Spec Page 
                description: >
                    A page for code heavy content that splits the screen in two. 
                    Code for multiple languages can be displayed and selected between. 
                icon: list
                link: /portal/example_pages/example_spec_page/
            - 
                title: Swagger Page
                description: >
                    A page for rendering Swagger files. 
                icon: list 
                link: /portal/example_pages/example_swagger_page/ 
---
