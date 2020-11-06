## `split.io` Guidelines

---

### What is `split.io` used for?
In New Essentials we use `split.io` for two things. Feature previews and experiments.

Feature previews let us validate critical workflows from a UX and technological perspective with select businesses before it is accessed by a wider audience.

Experiments such as A/B testing allow us to get quick feedback on how we can improve and optimise our product.

---

### What are the guidelines?
* **Preview Duration:** A feature preview should be active for a maximum of 3 months.
* **Experiment Duration:** An experiment should be reviewed at least every two weeks and removed if it has reached statistical significance.
* **Cleaning up:** Cleaning up a Split must be part of launching a feature or concluding an experiment.
* **Frontend only:** Splits should only be included in the `sme-web` project.
* **Naming:** Splits must be prefixed with `essentials` and use `snake_case`(eg `essentials_feature_name`).
* **Tagging:** Splits must be tagged with an owner (eg `owner_team_name`) and with either `experiment` or `preview`. Tags must use `snake_case`.

---

### What is `split.io` **not** used for?
In New Essentials `split.io` is **not** used for hiding incomplete features. 

For hiding incomplete features we should prefer a dark-launching approach where the screens aren’t directly accessible. If feature toggling is required we should use the existing feature flagging system that is applied from source control.

---

### Why these guidelines?
MYOB has historically struggled with the exponential complexity that comes with unchecked usage of `split.io`. When there are hundreds of active flags that can be toggled at any time by multiple people, it becomes impossible understand or recreate the exact environment that an end-user is experiencing. This has ramifications for our ability to test features in the same environment as end-users and to identify and reproduce production incidents.

We aim to limit the complexity that arises from multiple combinations of runtime feature toggles. By limiting the duration of runtime toggles, and preferring feature flags that are applied from source control, we can retain our ability to test and recreate end-user environments as much as possible.

There have also been issues related to maintaining a server-side cache when implementing split-io in multi-instance services. As such we are implementing `split.io` only in the front-end project.