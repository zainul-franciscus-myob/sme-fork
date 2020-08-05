export const buildItems = ({
  items,
  searchItems,
  isSearching,
  isSearchLoading,
  shouldShowLoadMoreButton,
  loadMoreButtonItem,
}) => {
  if (isSearching) {
    if (isSearchLoading) {
      return [loadMoreButtonItem];
    }
    return searchItems;
  }

  return shouldShowLoadMoreButton ? [...items, loadMoreButtonItem] : items;
};

export const buildSelectedItem = ({ selectedId, items }) =>
  items.find((item) => item.id === selectedId) || null;
