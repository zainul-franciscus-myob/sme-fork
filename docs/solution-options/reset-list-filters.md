### SOLUTION OPTIONS Reset List Filters
-----

**Requirements:**
A) Filter Reset link added to Contacts List 
* reset to default filters
* reset doesn't reset sorting

 B) Find out
  * the implementation cost of Filter Reset by List
  * the cost to implement for all lists
  * additional risks/considerations (if any)


-----

**Implementation option**

Reset filterOptions in state and re-use current Apply Filters implementation

* enabled 'onReset' prop on FilterBar 
* added a reducer that sets filterOptions to defaultFilterOptions
* then, called the handler that `onApply` uses which makes a bff call with the current filter options

Considerations
* Took around 2 complete hrs to make this change
* Seems like a pretty easy change that will also be applicable to screens that save user filter settings
