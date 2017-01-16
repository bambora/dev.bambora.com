---
title: Dev Portal
layout: tutorial

nav: site_howto_nav
name: /portal/index
parent: /portal/index

search: false
---

<img src='/images/logo.jpg' />

# Overview

Welcome to the developer portal setup and configuration guide. Use this space to learn how to modify the existing dev portals or create a new one.

# Clone Repository

The first step is to clone the repository so you can test your changes locally.

`git clone https://github.com/bambora/dev.bambora.com.git`

# Edit Content

Next lets edit some of the portal content, save our changes, and see the content live in the site.

## Edit Markdown

Locate the /source/portal/index.md file and open it in your favorite text editor. Make a simple text change under the first heading, denoted with a Hash (`#`) symbol. Make sure the edit it done below the "Frontmatter" data that is located between the two sets of 3 dashes: `---`.

Save the file.

## Run Middleman

Now that you have made a change lets fire up the server to see the content rendered.

At the command line run `bundle exec middleman server`. There are other ways to run the site that we will get into later.

## Check it out

View the site at http://localhost:4567/portal/

# Commit the Change

If you want to commit the change, you will want to first branch your code using Git. Then push the branch to the origin repository on GitHub. There you can send a pull request to have your change integrated into the Master branch of code that will get deployed to the production server automatically.
