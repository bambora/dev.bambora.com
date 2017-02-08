---
title: Dev Portal
layout: tutorial

navigation:
  nav_folder: portal
  header_highlight: Quickstart 
  nav_file: site_howto_nav 
  toc_file: self_doc_toc

summary: > 
  This page will show you how to set up the Dev Portal on your machine.
---

<img src="/images/svg/zebraffe-dev.svg" alt="bambora-logo" style="width:100%" >

# Welcome

Welcome to the developer portal setup and configuration guide. Use this space to learn how to modify the existing dev portals or create a new one.

This page will show you how to set up the Dev Portal on your machine.

## 1. Git Clone

The dev portal is stored on GitHub. You can grab a copy by installing Git on your machine and cloning the repo:

```shell
> git clone https://github.com/bambora/dev.bambora.com.git
```

## 2. Install Ruby

The portal uses a Ruby tool called Middleman. To build it you will need ruby installed.

It is best to use Ruby version **2.3**.

## 3. Branch Project

You will want to branch the project so your changes can be easily reviewed and merged into the Master branch.

It is very easy to branch using Git:

```shell
> git branch my_branch
> git checkout my_branch
```

## 4. Build Project

1. From the command line in the project directory run:
  - `bundle install`
2. Now build the project:
  - `bundle exec middleman build`
3. Run middleman:
  - `bundle exec middleman server`

**Note:** If you are using Mac and making a lot of changes, Middleman has a race condition bug that can cause it to lock up. To avoid this, run middleman with the following command: `EXECJS_RUNTIME=Node bundle exec middleman server`

## 5. View Site

Check out the site at [http://localhost:4567/](http://localhost:4567/).

### Deploy

To learn how to deploy the site, head on over to the [Deploy](/portal/deploy.html) tutorial.