# Types of bugs

The web is the public interface of the application. It is important to realise that those raising the bug requests are not equipped with the tools to know the root cause. Owning the web project means being able to quickly find that root cause and help deliver feedback ASAP.

This doc helps tune your intuition on how to handle different types of bugs.

## Visual

Examples:

* Incorrect static text
* `x` is being cut off
* `x` is not responsive
* `x` is not aligned
* This link should be opened in a new tab 

These bugs fall into the domain of the web team and can be fixed in `sme-web` and `sme-web-bff`. 

### Feelix

Where we depend on Feelix, we need to balance whether this is something Feelix should support or something we should own. The more we override Feelix the greater our maintenance burden and reduced support.

Examples of overriding Feelix are:
* Targeting private `flx-` class names
* Breaking the component's `PropType` contact, using a `ReactNode` instead of the expected `string`
* Combining Feelix components in undocumented ways (using a `<Button />` for a `<Menu.Item />`)
* Rolling our own component

## 500 response

Examples:

* `x` failed to load
* Pressing `x` pops up an error alert

We can trace failures to their source as well as inspect the logs.

## Data and Workflow

Examples:

* `x` has been set as the default, but on page `y`, it is `z`
* Loading `x` incorrectly displays `y`
* Creating `x` should also create a `y`

These bugs could be failing at different stages of the stack as they span multiple endpoints.

The web team should capture the [Private API Gateway endpoints](https://contracts.svc.europa-preprod.jupiter.myobdev.com/) and payloads being hit. If we are sending and handling the the data correctly, we can pass that information to teams below the seam to debug further.
