# Problem Statement: 

User want to remember settings on the sme web page e.g. sorting order, which is not stored anywhere as of now.

Notes:

- The persistent storage mentioned in the following options are not necessarily just relational database, it would be sql, nosql or file storage
- The estimated effort is just a rough comparison between options

--- 

## Solution 1: Local Storage  

### Pros:

- Settings are persisted across multiple sessions
- No extra api calls

### Cons:

- User settings only exists on specific browser 
- User will lose the settings when browser data is cleared

### Effort:

Only need to implement in sme-web, easy to save and load to redux store 

- Web: __1 week__ for the first page, __2 days__ for later ones

---

## Solution 2: Persistent Stored in BFF

### Pros:

- Changes reside in frontend
- Settings are associated to user account, regardless of browsers/sessions
- Settings can be backup and restored

### Cons:

- Settings can not be shared across different terminals i.e. web, mobile
- New data source for BFF
- New responsibility in BFF

### Effort:

New database setup in BFF, no changes needed for under the seam

- Web: __3 weeks__ for the first page, __3 days__ for later ones

---

## Solution 3: Settings/Preference Service under the Seam

### Pros:

- Settings are associated to user account, regardless of devices/browsers/sessions
- Settings can be backup and restored
- Separate service with clear responsibility, no impact on PAPI or Huxley Core

### Cons:

- New service to setup and maintain

### Effort:

New service to setup, need to consider all the infrastructure, security, monitoring aspects

- New Service: __3~4 weeks__ to setup new service with data store
- Gateway: __1 days__ to expose setting endpoint
- Web: __3 days__ for each page

---

## Solution 4: Persistent Stored in PAPI

### Pros:

- Settings are associated to user account, regardless of devices/browsers/sessions
- Settings can be backup and restored

### Cons:

- New data source for PAPI
- New responsibility in PAPI, which makes the API more complex

### Effort:

New database setup in PAPI, need to make changes across frontend, gateway and PAPI

- PAPI: __2 weeks__ to setup database and setting API
- Gateway: __1 days__ to expose setting endpoint
- Web: __3 days__ for each page

---

## Solution 5: Huxley Core

### Pros:

- Settings are associated to user account, regardless of devices/browsers/sessions
- Settings can be backup and restored
- No additional database setup

### Cons:

- Making change in Huxley Core is much more complex and out of our control
- Constraint by AccountRight release plan

### Effort:

New table in Huxley database, and new service in Huxley Core. Need to make changes across all layers

- Huxley: __3 weeks__ to create setting table and API
- PAPI: __2 days__ to create the API
- Gateway: __1 days__ to expose setting endpoint
- Web: __3 days__ for each page

---

## Result

As the requirement for now is just remember the search/filter criteria for different tabs under the same browser,
we will go with `Solution 1: Local Storage`
