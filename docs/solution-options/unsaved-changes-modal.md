# Problem Statement 1: 
*How do we know when a user changes page?*

### The different actions in which a user can change the page
1. Change the URL address bar directly *
2. Click on a link/button on the page
3. Click on one of the navigation options in the nav bar
4. Click forwards/backwards in the browser *

(* = still within the domain on the application)

--- 

## Solution 1: Lean into Router5 API
This solution entails taking advantage of API within Router5, namely **canActivate**. It is a middleware function in Router5 that is triggered whenever the URL is changed. It can be used to determine whether a user can transition to another page or not. 

### Pros:
- Addresses all the different actions in which a user can change the page in an application
- Simple to implement
- Doesn't require changes to existing href links

### Cons: 
- Lean further into Router5 tooling
- Pollutes browser history stack (read below for detailed explanation)  
  

<br/>**Detailed Explanation:**    
>Whenever a user changes the URL (from actions 1 - 3), an object representing the current page is pushed into a stack in the browser, that is used to represent the history of that tab.   
<br/>This means that if a user were to click on a link within our application, and then decided to stay on the current page, the browsers history stack would still be given an object representing the current page. This is a cause for concern as it can pollute the browsers history stack and can lead to unexpected situations if a user were to click forwards/backwards in the browser. 

Example:
1. User navigates to page "x" 
2. User attempts to navigate away to page "y"
3. Modal prompt appears, and user decides to stay on page "x"
4. User presses back on the browser, they still end up on page "x"


--- 

## Solution 2: Intercepting link clicks
This solution entails adding functionality within our modules to intercept the users action when they click on a reference link either in the nav bar or within the current page. 

> **Example Implementation:**
```
// SomeModule.js
export default class SomeModule {
  render = () => { ... }
  run = () => { ... }
  
  interceptTransition = (event, urlPathToTransitionTo) => {
    // stop the users action of transitioning to another page
    event.stopPropagation();
    event.preventDefault();

    this.store.dispatch({
      intent: USER_TRANSITIONING,
      path: urlPathToTransitionTo,
    })
  }
} 

// Navbar
const linkToPage = <a href="/#/some-link" onClick={(event) => interceptTransition("/#/some-link")}>
```

### Pros:
- Doesn't rely upon external tooling
- Won't pollute the browser history stack

### Cons: 
- Cannot handle actions 1 & 4
- Requires changes to all existing href links and future href links
- Have to handle scenario where a link is opened in a new tab
- Greater complexity in implementing 
  
---

## Solution 3: Change links to buttons
This solution entails replacing our usage of hrefs with buttons. This would involve embedding within the buttons, functionality that would determine whether the user can transition or not, and redirecting them to the correct page. 

### Pros:
- Doesn't rely upon external tooling
- Won't pollute the browser history stack

### Cons: 
- Cannot handle actions 1 & 4
- Requires changing all existing href links into buttons
- Have to handle scenario where a user wishes to open a link into a new tab
- Lose all benefits of using hrefs
- Greater complexity in implementing

---

## Initial Team Decision: 

After an initial discussion with the team, the consensus was to futher investigate **Solution 1: Lean into Router5 API** and to identify if there was a way to not pollute the browser history. 

### Discovery: 

After an investigation, we identified a solution that did not pollute the browser history. This involved leaning further into Router5 and using their ```router.navigate``` functionality which would be embedded into the ```onClick``` of our href links. In addition we would have to intercept the action of the href with ```event.preventDefault()```. 

### Result:

We decided that the above solution was very similar to **Solution 2: Intercepting link clicks**, but instead introduced the router as a middleman.   

***As a result we've decided to implement Solution 2.***
> PR showing the implementation of the pattern for solution 2: https://github.com/MYOB-Technology/sme-web/pull/1100
