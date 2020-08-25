const buildSearchItemList = (prevSelectedItem, searchResultList) => {
  const filteredSearchResultList = searchResultList.filter(
    (item) => item.id !== prevSelectedItem.id
  );
  return [...filteredSearchResultList, prevSelectedItem];
};

export const buildItems = ({
  items,
  searchItems,
  isSearching,
  isSearchLoading,
  prevSelectedItem,
  shouldShowLoadMoreButton,
  loadMoreButtonItem,
}) => {
  if (isSearching) {
    if (isSearchLoading) {
      return [];
    }
    return prevSelectedItem
      ? buildSearchItemList(prevSelectedItem, searchItems)
      : searchItems;
  }

  return shouldShowLoadMoreButton ? [...items, loadMoreButtonItem] : items;
};

export const buildSelectedItem = ({
  isSearching,
  prevSelectedItem,
  selectedId,
  items,
}) => {
  if (isSearching && prevSelectedItem) {
    return prevSelectedItem;
  }

  return items.find((item) => item.id === selectedId) || null;
};
