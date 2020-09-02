# Banking Hotkeys - Solution Options

We've identified 2 categories of hotkeys:
  - One that is triggered in an input/textarea
  - One that is triggered on the page (without focus)
  
<br/>

## **Using the existing `hotkeys-js` library**

---

### Option 1: Focus management (`#2118-banking-focus`)

```
<Component onFocus={trackUserMovement}> />
```

This would involve using the existing `hotkeys-js` library as well as tracking the user focus 
across the banking page.

**PROS:**
- Centralises hotkey actions in the modules (i.e. whether a hotkey is triggered and the subsequent action is contained within a module function)
- Handles all hotkey variations e.g. `option a` in the combobox, and `option a` on the page

**CONS:**
- Effort in reproducing across all modules, as it requires components to be passed an `onFocus` handler from the module, a corresponding dispatcher/reducer function, and selectors for determining if the user is in focus.
- Will have to refactor the existing focus management system so that we can track the user across multiple components
- Leaks the `event` from the browser into the module (unable to constrain the usage of `event.preventDefault` in the `Hotkeys` component, as the module decides on whether the hotkey is actioned in the correct location)
- Melds the responsibility of hotkeys into our focus management system, making it difficult to separate the two concerns
- Have to define a global `hotkeys.filter` (limitation of the library)

**Risks:**
- Reliant upon Feelix to passdown `onFocus` to the correct inner components

<br/>

---

### Option 2: Event bubbling (`#2118-banking-hotkeys-component`)

This would involve using the existing `hotkeys-js` library as well creating a `<HotkeyWrapper>` component
that would capture browser events as they're being bubbled up and adding detailed information.

**PROS:**
- Handles all hotkey variations e.g. `option a` in the combobox, and `option a` on the page
- Easier to understand where a hotkey can be triggered
- Centralises the hotkey actions in the module
- Minimal effort in reproducing on other modules

**CONS:**
- Have to define a global `hotkeys.filter` (limitation of the library)


**Risks:**
- Potential performance impacts as we attach/detail `onKeyDown` event listeners for many components
- Reliant upon the propagation of events

<br/>

---

### Option 3: Extending `onChange` functionality

This would involve using the existing `hotkeys-js` library as well as integrating with the onChange functionality exposed by the `Combobox` and `Calculator` components.

**PROS:**
- Able to handle character hotkeys (eg. `+` or `/`) more gracefully

**CONS:**
- Spreads the responsibility/functionality of hotkeys
- Doesn't handle hotkeys such as `option a` for us in input boxes
- Have to define a global `hotkeys.filter` (limitation of the library)

**Risks:**
- Will need to update the `Calculator` so that it exposes invalid values which may affect other screens

<br/>

---

## **Individual Hotkey Components**

### Option 4: Hotkey Component

This solution would involve wrapping a component that would capture the events bubbled from the internal component. For example: 

```
<Hotkeys>
  <AccountCombobox />
</Hotkeys>
```

**PROS:**  
- Handles character hotkeys (e.g. `+` or `/`) gracefully as the component only captures events from that element
- Hotkey concept is centralised into a component

**CONS:**
- Doesn't follow existing hotkey patterns
- Would have to attach/detach event listeners for many components which can lead to a performance impact
- Spreads the responsibility of hotkeys into separate components (`GlobalHotkey` vs `Hotkey`)

**Risks:**
- Potential for hotkey overlap or collision (if the components were nested)

This solution isn't viable with the `hotkeys-js` library due to it's internal implementation. Therefore we'd have to either handroll our own solution or leverage a different solution. I've looked into the following library: https://github.com/greena13/react-hotkeys and the way in which they handle global hotkeys is by having a `GlobalHotkey` component, which needs to wrap your application.

<br/>

---

## **Conclusion**

We have selected *Option 2: Event Bubbling* as a technical solution for hotkeys in Banking. The reasons are as following:
 - Minimal effort in reproducing across all modules
 - Centralises the subsequent actions of the hotkeys in the module
 - Contains the hotkey concerns into components which allows it to be easily disposable