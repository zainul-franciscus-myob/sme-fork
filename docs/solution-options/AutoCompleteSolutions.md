Spike: AutoComplete Component

### COMPONENT GOALS

1. User roughly knows what they want:
  * User types in some characters in text box
  * A list of suggested options shows in the dropdown

2. User has no idea what the thing they're looking for is called:
  * They scroll to find the item
  * This list can be quite long (and may not be fully loaded on first load)

### SOLUTION OPTIONS

**Goal 1**
  
- Fire off backend request to search with keyword entered (like in the Filter Bar Search)
- Add debounce

**Goal 2**

1. Add pagination (Load more button to the end of dropdown list in combobox) 
  - Needs to use Downshift function to keep menu open & set highlighted index

2. Polling list in background in Module -> Fake infinite scrolling
  - Illusion of infinite scrolling
  - Needs to use Downshift function to keep menu open
  - Backend gets too much workload? X

3. Infinite scrolling -> not achievable with Feelix Combobox

4. Build our own AutoComplete component with infinite scrolling
  - Lots of effort and time
  - But will be nice
  - Potentially buggy if not done right 

5. For a normal search, we show a text box and it becomes like the Filter Bar Search
   If the user doesn't know what to type in, we can add a link next to the text box to allow them to open a modal to scroll through the list (with pagination)
   - This would work for the Customer Section
   - Where would we put the link for the line options (e.g. Item, Account, Job). Also having to open a modal while entering data in a line in a table may not be the best user experience

### DECISION: 

* Goal 1 - as is
* Goal 2 - Implement pagination within Feelix Combobox