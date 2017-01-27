---
title: Quickstart
layout: tutorial

nav: site_howto_nav
name: /portal/quickstart
parent: /portal/quickstart

search: false

summary: > 
    This will guide you through quickly setting up the portal on your machine, editing some docs, and deploying the change.

---

# Quickstart

This will guide you through quickly setting up the portal on your machine, editing some docs, and deploying the change.

To get going, you will need to install Ruby v2.3 and [Bundler](http://bundler.io/).

First up is to get the site and set it up:


```shell
> git clone https://github.com/bambora/dev.bambora.com.git

> cd dev.bambora.com

> git branch my_branch

> git checkout my_branch

> bundle install

> bundle exec middleman build

> bundle exec middleman server
```

View the site at [http://localhost:4567/](http://localhost:4567/).

Next you want to edit some files. Change a markdown file in /source.

Refresh browser to see change.

Head back to the command line and exit middleman with cmd+C.

Now let's publish the changes:

```shell
> git add -u

> git commit -m "my first edit"

> git push -u origin my_branch
```

Head to [GitHub](https://github.com/bambora/dev.bambora.com) and the repository for your dev portal. On the Code tab, select the **Branch** button drop down and choose your branch you just pushed.

Now, to the right of that button click on the **New pull request** button.

Add a comment and click the Green **Create Pull Request** button at the bottom.

A site admin will review the change and accept it, automatically deploying the site.

That's it!

For more options on setting up the site and running middleman visit [Setup](/portal/index.html).