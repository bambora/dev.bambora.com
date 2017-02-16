---
title: Partner Quickstart
layout: tutorial

summary: >
    This will guide you through quickly hitting one of our Onboarding API endpoints.

navigation:
  header: na.tocs.na_nav_header
  footer: na.tocs.na_nav_footer
  toc: na.tocs.partner_quickstart
  header_active: Guides
---

# Calling the Onboarding APIs

This will guide you through quickly hitting one of our Onboarding API endpoints.

This API requires an authentication passcode form a partner account that you requested in the Setup stage of this Quickstart Guide.

The Onboarding API endpoints are divided by account type, or 'flow'. This guide will focus on 'psp-cad'.


## 1. Create a partial application
```
curl https://uat-onboarding-api.beanstream.com/v1/workflows/psp-cad/applications  \
  -H "Authorization: Passcode your_onboarding_passcode"  \
  -H "Content-Type: application/json" \
  -d '{
  "pricing_id":"ABC123",
  "applicant":{
    "first_name":"John",
    "last_name":"Doe",
    "phone_number":"222-222-2222",
    "date_of_birth":"2013-03-25T22:04:10.04399Z",
    "email":"buser2@beanstream.com"
  }
}'
```

You will receive a response with a HTTP status 201 Created. The response body will have an ID, a state and an array of pending fields. The state of an application will remain 'in_progress' until all required fields have been submitted.

## 2. Retrieve the partial application

```
curl https://uat-onboarding-api.beanstream.com/v1/workflows/psp-cad/applications/{applicationId}
```

Using the ID returned from your first request you can now request the submitted application.

## 3. Next steps
You can read more about Onboarding in the [Onboarding Guide](/docs/guides/onboarding) and the [Onboarding API Spec](/docs/references/partner_api/spec/).
