---
title: Merchant API Overview
layout: tutorial

navigation:
  header: na.tocs.na_nav_header
  footer: na.tocs.na_nav_footer
  toc: false
  header_active: References

search: false

summary: >
    This will guide you through quickly setting up the portal on your machine, editing some docs, and deploying the change.
---

# Partner API

The Onboarding API allows you to build your own custom UI through which a sub-merchants sign up for a Beanstream account or to reuse the information already collected to create a lightweight integration.

You can submit either completed or partially completed applications. This means you can allow your sub-merchant to submit their application in stages or to submit supporting documentation at a later date.

The API allows the partner to specify which services the new merchant account should be provisioned with. The API supports the onboarding of merchants for card payments in Canada and the US, as well as funds transfer services in Europe, the UK and North America.

## v2016-08-18

* [Onboarding API Spec](../v2016-08-18)
* [Terms API Spec](../tac_v2016-08-18)

### Change logs - 28 Nov 2016
#### GW-USA

* New Gateway USA spec added

### Change logs - 16 Nov 2016
#### PSP-USD

* Extensive changes to spec. See API spec for full details.

#### GW-CDN

* New Gateway Canadian spec added

### Change logs - 10 Sep 2016
#### Common changes for all workflows

* Agreement.personal_guarantee_accepted is **new** and is optional
 Although optional the personal guarantee must be accepted where entity_type is "sole_proprietor"  
  or "partnership"
* Remove restriction on country fields so that full ISO 3166 list of country codes can be accepted
* Address.region and Address.postal_code are now optional
* pending_issues.message is new and contains a human readable message about the error
* Error responses has renamed field error.name
* Error responses has renamed field error.reason
* Error.message is new and contains a human readable message about the error

#### PSP CAD

* PspCadOwner all fields are now optional. Although optional PspCadOwner fields must be supplied where PspCadBusiness.entity_type is "non_profit" or "corporation"
* PspCadBusiness.has_exising_account is removed
* PspCadOwners.percentage is removed
* PspCadBusiness.currency is removed

#### EFT CAD

* EftCadDirector all fields are now optional
* Although optional EftCadDirector fields must be supplied where EftCadBusiness.entity_type is "non_profit" or "corporation" or "publically_traded"
* EftCadDirector.start_date is removed
* EftCadDirector.percentage is removed
* EftApplicant.email is now required
* EftCadApplicant.date_of_birth is **new** and required
* EftCadBusiness.services_description is **new** and required

## v2016-06-11

* [Onboarding API Spec](../v2016-06-11)

### Change logs - 11 Jun 2016    
#### Common changes for all workflows

* **API version is now required in the header attributes X-API-Version: 2016-06-11**
* Additional Properties is now set to False. This means that no extra/undefined properties will be allowed to be passed in that are not already in the swagger specification.
* API Global Address changes
 * Allow sign up for payments in a country where the head office address is not domiciled in the same location
 * Users of the onboarding API can submit addresses from countries outside of the currently defined regions.
 * Update the API to allow for a more generic and universal address object.
* New universal address object
  * The list of Countries for each flow is now more extensive for each of the flow a large list of countries is available.
  * Postal Code is no longer a required field.
  * Region is now being collected in all flows, it was an enum in previous specific flows for provinces and is now a string maxlength 64
  * Global Address Fields would replace all existing address fields as follows: Address line 1, Address line 2, Region (includes: state/province/municipality/region), City, Postal Code (includes ZipCode), Country.
* PSP US Flow: Social Security Number is now required.

## v2016-06-10
Deprecated. Spec no longer available.

### Change logs - 16 Nov2016

* API Version 2016-06-10 removed.

### Change logs - 10 Sep 2016

* API Version 2016-06-10 Deprecated and will be removed in the next release.

### Change logs - 10 Jun 2016

* First release of the api specification.
