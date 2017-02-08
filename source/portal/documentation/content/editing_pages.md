---
title: Editing
layout: tutorial

navigation:
    header: portal.self_doc_header 
    footer: portal.self_doc_footer 
    toc: portal.content_toc
    header_active: Documentation

summary:  >
    There are two main ways you can contribute to the dev portal. Edit
    via Github or edit the source directly on your machine. 

---

#Dev Portal Editing

There are two main ways you can contribute to the dev portal:

 - Editing via GitHub
 - Edit the source directly on your machine


## Via GitHub

Each page has an edit icon on it that links to its markdown file on GitHub. There you can click on the Pencil icon to edit the file. Once you are done editing, scroll to the bottom of the page and locate the Commit Changes button. 

This will create a pull request that will be reviewed by one of the portal maintainers. If all is good they will merge your pull request and the change will be automatically deployed.

## Locally Via Source

If you are making a lot of change or just want to be able to see how your changes will look before deploying them, then you will want to check out the source code of the Portal and build it on your machine.

### Setup Site

If you haven't yet, you will need to [Set Up](/portal/setup.html) the dev portal on your machine.

### Branch Code

Before you start editing the site, it is a good idea to create a branch:

```git branch my_branch_name```

### Edit Files

Once you have set up the site you will want to launch Middleman using the `bundle exec middleman server` command. Middleman will automatically detect any changes you make. This makes editing very easy as you just have to refresh the web page in the browser to see your changes.

All of the documentation content is located in the `/source` folder. There are several sub-folders in there, one per region. Your content will live in your region's folder. This sample site is located in `/source/portal`.

Simply open up one of the markdown files in a text editor, make some changes, save the file, and refresh your browser to see the changes.

### Commit Changes

When you are ready with your changes just commit them using Git.

``` git commit -m "Some changes I made"```

### Request Commit Access

To push your changes to the repository and have the site automatically deployed, you will need to get Commit access from one of the Dev Portal administrators. Look for them in the slack channel `#dev-portal`.

### Push Branch to Repository

```git push -u origin my_branch_name```

### Create a PR

The last step is to create a Pull Request (PR) so one of the site administrators can review your changes and accept them into the Master branch.

You can create a PR directly from GitHub. To do this head to the repository, select your branch, and click the  *Create pull request* button. Here is a [tutorial](https://help.github.com/articles/creating-a-pull-request/) that walks you through those steps.

### Deploy

When your PR is accepted and merged onto the Master branch then Jenkins will be triggered and automatically build and deploy the portal. If something goes wrong you might not see your changes. You can ask the dev-portal slack channel for some insight into what happened. Builds can take several minutes or even an hour if there is a large backlog of builds, so be patient.


