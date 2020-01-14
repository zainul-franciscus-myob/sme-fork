export const buildItems = ({
  items, selectedItem, isEditing, displayColumns, allowClearSelection, clearSelectionText,
}) => {
  const selectedMenuItems = selectedItem ? [selectedItem] : [];
  const candidateItems = isEditing ? items : selectedMenuItems;

  const formattedItems = candidateItems && candidateItems.map(item => ({
    ...item,
    ...displayColumns
      .slice(1)
      .reduce((formattedProps, { columnName }) => ({ ...formattedProps, [columnName]: ` ${item[columnName]}` }), {}),
  }));

  const completeItems = allowClearSelection
    ? [{ [displayColumns[0].columnName]: clearSelectionText }, ...formattedItems]
    : formattedItems;

  return completeItems;
};

export const buildSelectedItem = ({
  items, selectedItem, identifier,
}) => (
  selectedItem ? items.find(item => item[identifier] === selectedItem[identifier]) : {}
);
