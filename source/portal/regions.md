---
title: Regions
layout: tutorial

nav: site_howto_nav
name: /portal/regions
parent: /portal/customize

summary: >
        Different regions in bambora might have their own developer portals. 
        To handle this the portal is designed to hold the region-specific 
        data outside of the core data and site configuration.

---

# Regional Dev Portals

Different regions in bambora might have their own developer portals. To handle this the portal is designed to hold the region-specific data outside of the core data and site configuration.

These steps will describe how to create your own regional dev portal.

# Design Guide

<div class="message">
    <img src="/images/svg/zebraffe-dark.svg" style="height: 60px; float:left; margin: 0 30px;"/>
    
    <strong>Portal Design Guide</strong>
    
    <p>Regional dev portals <strong>must</strong> adhere to the <a href="./guidelines.html">Portal Design Guide</a>!</p>
</div>


# Create Portal

This will walk you through creating your own developer portal.

## Fork Repo

First up is to fork the repository in GitHub

## Automatic Deploys

The dev portal is built using Jenkins and is deployed to AWS. This is done automatically whenever a commit to master is performed. To set up a Jenkins build you must contact the DevOps team.

## Sub-Domain

Let the DevOps team know, in Slack, that you would like a new sub-domain to host your portal.

## Regional Content

Regional content must live in a region-named folder within the `/source` folder. For instance the North American portal is located in `/source/north-am/`, and the help content for this site is located under `/source/portal`.

You do not need to merge this folder from your fork back to the upstream origin. However you will want to fetch upstream changes to stay up to date with the latest styles and bug fixes.

# Example Portal

For an example regional portal take a look at the content under `/source/portal`. That is the content for this tutorial version of the site. Essentially it can be treated as a region on its own and copied to give you a head start on your site.

