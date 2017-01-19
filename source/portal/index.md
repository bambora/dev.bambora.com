---
title: Dev Portal
layout: tutorial

nav: site_howto_nav
name: /portal/index
parent: /portal/index

search: false
---

<img src='/images/logo.jpg' />

<h1 class="js-toc-ignore">Welcome</h1>

Welcome to the developer portal setup and configuration guide. Use this space to learn how to modify the existing dev portals or create a new one.

This page will show you how to set up the Dev Portal on your machine.

# 1. Git Clone

The dev portal is stored on GitHub. You can grab a copy by installing Git on your machine and cloning the repo:
``` git clone https://github.com/bambora/dev-na.bambora.com.git
```

# 2. Install Ruby

The portal uses a Ruby tool called Middleman. To build it you will need ruby installed.

It is best to use Ruby version **2.3**.

# 3. Build Project

1. From the command line in the prject directory run:
  - `bundle install`
2. Now build the project:
  - `bundle exec middleman build`
3. Run middleman:
  - `bundle exec middleman server`


**Note:** If you are using Mac and making a lot of changes, Middleman has a race condition bug that can cause it to lock up. To avoid this, run middleman with the following command: `EXECJS_RUNTIME=Node bundle exec middleman server`

# 4. View Site

Check out the site at [http://localhost:4567/](http://localhost:4567/).