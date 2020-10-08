# [RESOLVED] Access to help through keyboard shortcuts - Solution Options

Aim: The main requirement here is we want to make the shortcut information available for users using a shortcut key.

Decision: Team has decided to go with Option 1 because
- It leverages the current setup for Help, Drawer, and Contentful
- Does not leak Contentful and Help knowledge outside the HelpModule
- Allows modules to toggle Help on demand

## Option 1: Passing callback into module

Pass a drawer/help callback, E.g `toggleHelpBasedOnRouteName(routeName)`, to each module within the `rootModule` 
or `index.js` that will:
1. Toggles Help
2. Opens Help to the specified routeName

**PROS**
- allows all modules to control help
- keeps all `contentful` and Help knowledge in one place

**CONS**
- coupling between Drawer/Help and modules, which has so far been kept separate

<br/>

### A: Passing through getRoutes
Pass callback to a module through constructor

**PROS**
- Each module can have access to the callback only when they need it

**CONS**
- Same as in main option

<br/>

### B: Passing through module.run
Pass callback to a module through module.run() with context

**PROS**
- ...

**CONS**
- Each module will have access to the callback even though they do not need it
- Same as in main option
<br/>

---

## Option 2: Modal pop-up

**PROS**
- KeyboardShortcutsModal can be a common component that can be used on other modules as well

<br/>

### A: Modal pop-up with contentful response
Pop-up modal that makes an integration call to contentful and uses `RichText` component to parse `contentful` data

**PROS**
- Follows current architectural pattern
- Leverages Contentful content that can be updated by UX

**CONS**
- Spreads contenful knowledge (RichText, etc.) outside the Help submodule
- Layout concerns (maybe?)

<br/>

### B: Modal pop-up with hard-coded shortcuts

**PROS**
- Easy to update Help when shortcuts change
- Does not leak `contenful` knowledge outside of the Help submodule

 **CONS**

**RISKS**
- Development work will be required to make changes to two places (modal and contentful) if shortcuts are changed/added

<br/>

---

### Other options considered, but deemed not suitable

- #### Create drawer within module and make the required call to integration
- #### Create a new screen for a new route
- #### Appcues

<br/>
---


--- 
---

# [RESOLVED] Banking Hotkeys Implementation - Solution Options
The solution options below have been resolved to using OPTION 5 because
- It still meets customer requirements
- Can be implemented in current implementation

<br/>

---

We've identified 2 requirements:
  - Requirement 1: Letting "?" show in input boxes
  - Requirement 2: Help page should not be triggered on input boxes
  
<br/>

---

## **Requirement 1: Letting "?" show in input boxes**

### Option 1: do not preventDefault() in Hotkeys.js using a boolean
Hotkeys.js
```
    if (!hotkeyHandler.allowDefault) {
      event.preventDefault();
    }
    hotkeyHandler.action(event.hotkeyDetails);
```

BankingModule.js
```
    key: [SHIFT, FORWARD_SLASH],
    action: () => console.log('shift + ?'),
    allowDefault: true,
```

**PROS:**
- Adds more control to all shortcuts
- Does not affect existing hotkeys or components

**CONS:**
- Hotkeys.js becomes more complicated, another branching logic


<br/>

---
## **Requirement 2: Help page not triggered on input boxes**

### Option 2: pass HTML element types that should be excluded
Alternatively, there is no point in passing a list of exclusion locations, because all locations that are wrapped with HotkeyWrapper are already excluded 

Hotkeys.js
```
  if (
    hotkeyHandlers[triggeredLocation] &&
    hotkeyHandler &&
    hotkeyHandler.excludeElements &&
    !hotkeyHandler.excludeLocations.includes(event.target.tagName)
  ) 
```

**PROS**
- Allows more flexibility for other hotkeys to exclude triggering on certain HTML elements

**CONS**
- Cannot group by location, have to group by element type


**RISK**
- These locations are not set by us, they are very low level. Possibility of missing elements on the screen


<br/>

---
## Both requirements

### Option 3: Wrap each input in HotkeyWrapper, but w/o any hotkeys in module
This overrides all GLOBAL hotkeys for this component

```
[HotkeyLocations.BANK_ACCOUNT_COMBOBOX]: [],
```
**PROS**
- Hotkeys.js is not changed


**CONS**
- All these empty array entries in hotkeys for locations that don't have any shortcut
- Redundant code everywhere - feels like a hack

<br/>

---

### Option 4: Remove requirement so "?" cannot be typed in any input box

**PROS:**
- Help would always be triggered
- No changes needed to Hotkeys

**CONS:**
- Takes control away from user - cannot add a "?"


<br/>

---

### Option 5: Change hotkey to "command + ?"
 
 **Pros**
 - Works very well with current setup


<br/>
---
