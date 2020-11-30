# Root Module

Root module is introduced to handle cross cutting concerns

## Responsibilities

- Storing cross cutting data includes `tasks`, `setting`, `businessDetails`, `currentUser`, `subscription`
- Expose cross cutting functionality to be injected into feature modules, i.e. `subscribeOrUpgrade`, `setRootView/render`
- Route change awareness, trigger handlers when
  - User on business list page
  - User switch business
  - User switch route under the same business

## Usage

Please use root module for the purpose listed in the above section, if you do need to add new cross cutting responsibility to root module, please bring it up in SWAG meeting

## Potential Improvements

Introduce observer pattern for route change handlers, instead of making root module holding the reference of modules/services that need to perform an action on route change, we could make root module expose handler to allow dependent module/services to subscribe to particular topics like `SWITCH_BUSINESS`, `SWITCH_ROUTE`, etc. 
