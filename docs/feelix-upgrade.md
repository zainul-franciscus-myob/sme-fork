### TAGGING AT RISK FEELIX CHANGES

Use the `@Feelix` comment above any code that is at risk to breaking after a Feelix upgrade.

Examples of things that are at risk are:

* Hooking into Feelix's CSS classes and modifying them (e.g. using the `:global` CSS module syntax)
* Building components using Feelix classes for styling (e.g. `src/components/Button/LinkButton.js`)

### FEELIX UPGRADE PROCESS

1. **Bump Feelix version to the new version in `package.json`**
  - Update `@myob/myob-styles` and `@myob/myob-widgets` to be of the desired version.
  - Run `yarn install` to update `yarn.lock`

2. **If the Feelix upgrade includes harvested components from our codebase:**

  - Change our code to use new Feelix components
    * Change imports to use the new Feelix components
    * Remove our components that have been replaced by the new Feelix components from the source code
    * Remove related dependecies from `package.json`. These includes dependencies that have been documented as being used as part of our customised components that are now being replaced by the new Feelix components. These dependencies are listed under `"//FeelixDependencies"` in the `package.json`. Specifically:
      - Remove the list of dependencies under `"//FeelixDependencies"` in the `package.json` which documented as being used for the components being removed.
      - Remove those dependencies from the `"dependencies"` object in the `package.json`
      - Run `yarn install` again to update `yarn.lock`

  - Manually test that these new imports to use the new Feelix components behave
      the same as before the import change.
    * If any bug is found, feed this back to Particle

3. **Do a project-wide search for `@FEELIX` and manually inspect these instances for unintended behavior

3. **Do a project-wide search for `:global` and manually inspect these instances for unintended behavior

4. **Once the branch is merged into master:**
  - The QA team tests basic behavioural workflows on all the screens to ensure there has been no breaking change as a result of the Feelix upgrade. They will raise bug cards as needed, and we will feed these issues back to Particle.

### ACTIONS AS A RESULT OF CHANGE

1. **Visual change:**
  * We don't do anything
  * [OPTIONAL] We can use the `hackday-screen-diff` tool to detect the screens that have visually changed but we **won't action** on these changes. However, we can let the QA team know of these screens so they can pay more attention to them when doing the behavioural tests.

2. **Behavioural change:**
  * The QA Team will do the testing of basic behavioural workflow to see if there's been any behavioural breakage as a result of the upgrade, and raise bug cards as necessary.
  * We can help with feeding back the Feelix bugs to Particle

3. **If the release includes a component that has been harvested from our code base:**
  * We update our code to use the new Feelix component
  * We can test the behaviour of this new component on the screens that use it manually to see if it behaves the same, and feed any issues or bugs back to Particle
