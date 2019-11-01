### SOLUTION OPTIONS for RENDERING Aside 
-----

**Requirements:**
* There will be a Help (`?`) menu item on the Nav bar
* When Help is clicked, it will show a drawer (aside) that will push the main page (including Nav bar) to the right side of the screen.
* This drawer will also be used by other teams (e.g. onboarding)

-----

**Implementation options**

The following are common to both options:
* Have a separate DOM node called `aside` to render the Aside/Drawer content to
* `index.css` needs to be modified to cater for the relative styling amongst `root`, `nav` and `aside` DOM nodes.

1. Have a separate Module for rendering to `aside`

* Implement a separate Module (like NavModule) to handle the rendering and keeping state of aside content.
* Passing in Aside handlers to the NavModule to communicate between them
* PROS:
  * Feature modules don't need to worry about Aside (rendering, fetching content) - Help and Feature work can be worked on independently
* CONS:
  * If `Aside` needs to communicate with `feature` -> might need to pass more hanlders around, which can get noisy 

2. Passdown a handler `setAsideView` (like `setRootView`)

* Feature module will handle the rendering and data fetching for the Help content for that feature.
* PROS:
  * Allows for communication between Aside and Feature
  * All content for a feature (help & main page) are in the same area (folder)
* CONS:
  * Need to pass down handler to all feature modules
  * Module needs to handle extra logic beside feature work (fetching contentful data)
