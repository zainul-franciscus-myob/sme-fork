## Problem Statement: 

Currently, BFF loads all lists (contacts, accounts, inventory, tax codes and etc.) required by a screen and return them to
frontend when a user create new record or open existing one. This mechanism is very convenient for frontend to 
map record id to display name/id on screen, however, it also slow down the page loading especially when the lists
are huge. To improve the performance, we are considering replace combo box component with `Typeahead` component 
which only pull down matched entries when user type keywords in input.

--- 

## Main Challenges

We need a way to map record id to display name on screen when user open an existing record. This is because contract uses 
record id to represent associated item but we want to display meaningful text on screen. 

## Solutions  
  
### Without cache

#### Solution 1: Load selected record details parallelly at frontend after page loaded

##### Pros:

  - Easy for implementation

##### Cons:

  - The performance can be improved only if the screen has a few lists. For the screen with the line item table it even worse than
  current implementation.

#### Solution 2: Load list and map id to item at BFF   

##### Pros:

- This solution does not require changes in upstream service
- Transform data for displaying is responsibility of BFF

##### Cons:

- Limited improvements in performance, this solution can only reduce the payload size from BFF to browser but
  BFF still need to call PAPI to get the whole list so id can be mapped
- We are going to paginate lists in PAPI which may have limitation on page size   

#### Solution 3: Let PAPI returns associated entity details instead of just returning id (Confirmed with PACMAN, it is achievable)

  ##### Pros:

  - No need to introduce complex cache logic
  - No need to pass down the entire list from PAPI to BFF
  - No need to worry about the pagination limitation
  ##### Cons:

  - Require contract changes
  - Increase PAPI details endpoints payload size which only for displaying purpose (A call from a peer service may only care about id).

#### Solution 4: Add ids to query parameter to support retrieving partial list according to id list (Confirmed with PACMAN, it is achievable)

  ##### Pros:

  - Less change in BFF and sme-web and not break current frontend pattern

  ##### Cons:

  - Require contract changes
  - It is not a common pattern to add a `ids` query parameter for all list endpoints
  - Technically, web server has limitation on the length of url, the `ids` could cause 400 error if it's too long. 

### With cache

#### Solution 1: Cache list and map id at BFF

##### Pros:

- This solution does not require changes in upstream service
- Get better performance than solution 2 as there is no need to load entire list when initialize a page.
- Transform data for displaying is responsibility of BFF

##### Cons:

- Need additional logic to refresh cache and even need to have some cache storage to avoid sync cache among 
  different BFF nodes
- The changes may not sync to cache immediately
- We are going to paginate lists in PAPI which may have limitation on page size  

  
#### Solution 2: Cache list in browser(store, local storage)

##### Pros:

- Changes only be required in frontend
- If we introduce cache in browser, we don't even need to introduce `TypeAhead` component, 
  we can keep combo boxes in our screen.

##### Cons:

- Need additional logic to refresh cache
- The changes may not sync to cache immediately    
- We are going to paginate lists in PAPI which may have limitation on page size 

## Result
Confirmed with PACMAN team the option 3 and option 4 are achievable and acceptable in PAPI. And phoenix team had
a vote and decide to use the option 3 (Let PAPI returns associated entity details instead of just returning id) if
we are going to apply typeahead pattern in our project.
