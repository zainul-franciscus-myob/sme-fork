## `split.io` Guidelines

---

### What is `split.io` used for?
In New Essentials we use `split.io` for previewing features with select businesses. This allows us to validate critical workflows from a UX and technological perspective before it is accessed by a wider audience.

---

### What are the guidelines?
* A team can only have two features preview flags in place at a time. 
* A feature should only be in preview for a maximum of three months.
* When we start a feature preview we must create a cleanup task to remove the flag once the preview is finished.
`split.io` is only used in the sme-web project.

---

### What is `split.io` not used for?
In New Essentials `split.io` is not used for hiding incomplete features. 
For hiding incomplete features we should prefer a dark-launching approach where the screens aren’t directly accessible. If feature toggling is required we should use the existing feature flagging system that is applied from source control.
It is also currently not used for A/B testing or other types of experiments. However this is open to discussion. When this happens we will need to update these guidelines to limit the associated increases in complexity.

---

### Why these guidelines?
MYOB has historically struggled with the exponential complexity that comes with unchecked usage of `split.io`. When there are hundreds of active flags that can be toggled at any time by multiple people, it becomes impossible understand or recreate the exact environment that an end-user is experiencing. This has ramifications for our ability to test features in the same environment as end-users and to identify and reproduce production incidents.
We aim to limit the complexity that arises from multiple combinations of runtime feature toggles. By reducing the number and duration of runtime toggles, and preferring feature flags that are applied from source control, we can retain our ability to test and recreate end-user environments as much as possible.
There have also been issues related to maintaining a server-side cache when implementing split-io in multi-instance services. As such we are implementing `split.io` only in the front-end project.