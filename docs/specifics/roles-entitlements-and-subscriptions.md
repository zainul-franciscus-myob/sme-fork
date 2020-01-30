### Roles - entitlements - subscriptions

#### Glossary
  User: An authenticated user login session. Can have many roles.
  Role: A group of entitlements.
  Entitlement: Access to a feature. Given by business administrator.
  Subscription: A payment tier that gives access to feature sets.

#### Implementation pattern - Visual - Navigation
   When loading the list of navigation options to display:

   - Get the current User.
   - Get the list of all Roles for the buissines. 
   - Get the subscriptions features for the business.

   1. Given the list of roles a user has and the roles(containing entitlments) for the bussiness, find all the entitlements the user has access to.
   2. Given the subscription features further filter the list with features they actually have paid for.
   3. Return the list of features to the web interface. which will display content based on the features.
```js
[listOfAllFeatures]=>filter(userHasAccess)=>filter(userHasPaidFor)=>filter(n)=[smallerListOfFeatures]
```

  Look here: [sme-web-bff/src/modules/navigation/transformers/buildNavigationConfigResponse.js](https://github.com/MYOB-Technology/sme-web-bff/tree/master/src/modules/navigation/transformers/buildNavigationConfigResponse.js) for example code
  
#### Implementation pattern - Functional
  Web and Bff do not authenticate and rely on unauthroized requests being caught below the gateway, triggering 403s which are all handled with a permission denied image and redirect. 
   
  See here: [sme-web/src/integration/httpHandlers/handleForbiddenResponse.js](https://github.com/MYOB-Technology/sme-web/tree/master/src/integration/httpHandlers/handleResponse.js#L18) for example code

#### Relevant endpoints
  - Get current user: `${baseUrl}/businesses/${businessId}/current-user`
  - Get business roles: `${baseUrl}/businesses/${businessId}/roles`
  - Subscription information: `${baseUrl(businessId)}/subscription` 
    - Though subscription details are stored on every request in the response as `response.locals.subscription` via a middleware. See: [sme-web-bff/src/modules/subscription/createLoadSubscriptionMiddleware.js](https://github.com/MYOB-Technology/sme-web-bff/tree/master/src/modules/subscription/createLoadSubscriptionMiddleware.js) and usage: [sme-web-bff/tree/master/src/modules/navigation/createNavigationService.js#L34](https://github.com/MYOB-Technology/sme-web-bff/tree/master/src/modules/navigation/createNavigationService.js#L34)
