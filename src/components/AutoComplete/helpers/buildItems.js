const buildSearchItemList = (prevSelectedItem, searchResultList) => {
  const filteredSearchResultList = searchResultList.filter(
    (item) => item.id !== prevSelectedItem.id
  );
  return [...filteredSearchResultList, prevSelectedItem];
};

const buildItemsWithInactiveSelectedItem = ({ selectedId, items }) => {
  if (selectedId) {
    const isInactiveSelectedItem = (itemOption) =>
      itemOption.isInactive && itemOption.id === selectedId;
    return items.filter(
      (option) => isInactiveSelectedItem(option) || !option.isInactive
    );
  }

  return items.filter((option) => !option.isInactive);
};

export const buildItems = ({
  selectedId,
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

  const itemsWithInactiveSelectedItem = buildItemsWithInactiveSelectedItem({
    selectedId,
    items,
  });

  return shouldShowLoadMoreButton
    ? [...itemsWithInactiveSelectedItem, loadMoreButtonItem]
    : itemsWithInactiveSelectedItem;
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
