export const LOAD_MORE_BUTTON_ID = Symbol('Load More button item id');
export const IS_LOAD_MORE_BUTTON = Symbol(
  'Property to determine if this is a Load more button item'
);

const buildLoadMoreItem = ({ metaData = [], items = [], selectedId }) => {
  // Return load more item with selected item display data:
  // Due to AutoComplete is building on top of Feelix Combobox,
  // Load more item is considered just another item inside a
  // selectable items inside the component.
  // This causes the Combobox to update the combobox input with
  // Load more display data which is an empty string. To make sure
  // that the combobox input does not clear out when user click
  // Load more, the workaround is to set the Load more item
  // with the selected item data to create an illusion to the
  // user that it hasn't been changed.
  const loadMoreItem = { id: LOAD_MORE_BUTTON_ID, [IS_LOAD_MORE_BUTTON]: true };
  const selectedItem = items.find(({ id }) => id === selectedId);

  return selectedItem
    ? metaData.reduce(
        (acc, curr) =>
          curr.showData
            ? { ...acc, [curr.columnName]: selectedItem[curr.columnName] }
            : acc,
        loadMoreItem
      )
    : loadMoreItem;
};

export default buildLoadMoreItem;
