import { Combobox } from '@myob/myob-widgets';
import React, { useEffect, useRef, useState } from 'react';

import { buildItems, buildSelectedItem } from './helpers/buildItems';
import AutoCompleteComboboxTypes from './AutoCompleteComboboxTypes';
import LoadMoreButton from './LoadMoreButton';
import LoadMoreButtonStatus from './LoadMoreButtonStatus';
import buildLoadMoreItem, {
  IS_LOAD_MORE_BUTTON,
} from './helpers/buildLoadMoreItem';
import debounce from '../../common/debounce/debounce';
import getShouldShowLoadMoreButton from './helpers/getShouldShowLoadMoreButton';

const AutoCompleteCombobox = ({
  type = AutoCompleteComboboxTypes.STAND_ALONE,
  metaData = [],
  selectedId = '',
  items = [],
  addNewItem,
  loadMoreButtonStatus,
  onLoadMoreItems,
  searchDelay = 500,
  onSearch,
  onChange,
  noMatchFoundMessage = 'No item found',
  ...otherProps
}) => {
  // All the Refs in this component are purely to keep state, where a change in the Ref value
  // will not cause a re-render
  //
  // Some of these states are stored in downshift but they are not exposed by Feelix hence
  // we have to keep track of our own state this way

  // The prevSelectedItem Ref is to work around the issue where when the user types, if the
  // Combobox can't find the matching item in the list, it will update the selectedItem to be null,
  // causing the input field to be emptied.
  // To overcome this issue for Search, we always include the previously selected item (if exist)
  // in the dropdown list, so that input field is not updated to be empty and will still show the
  // typed value
  const prevSelectedItem = useRef(null);
  const [currInput, setCurrInput] = useState('');

  const hasUserSelectedRef = useRef(false);
  const hasDownshiftSelectedRef = useRef(false);

  const isSearchingRef = useRef(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  const hasBlurredRef = useRef(false);

  const paginationDisplayColumn = metaData.length ? metaData[0].columnName : '';
  const shouldShowLoadMoreButton = getShouldShowLoadMoreButton(
    loadMoreButtonStatus
  );

  const loadMoreButtonItem = buildLoadMoreItem({ metaData, items, selectedId });
  const comboboxItems = buildItems({
    selectedId,
    items,
    searchItems,
    isSearching: isSearchingRef.current,
    isSearchLoading,
    prevSelectedItem: prevSelectedItem.current,
    shouldShowLoadMoreButton,
    loadMoreButtonItem,
  });

  const selectedItem = buildSelectedItem({
    isSearching: isSearchingRef.current,
    prevSelectedItem: prevSelectedItem.current,
    selectedId,
    items: comboboxItems,
  });

  // Determine if a search request should be made after re-render has happened
  useEffect(() => {
    if (hasUserSelectedRef.current || hasDownshiftSelectedRef.current) {
      return;
    }

    if (currInput !== '') {
      // If the user has blurred out, do not proceed with search
      if (hasBlurredRef.current) {
        hasBlurredRef.current = false;
        return;
      }

      // Start searching
      setIsSearchLoading(true);
      isSearchingRef.current = true;
      if (selectedItem) {
        prevSelectedItem.current = selectedItem;
      }

      debounce(
        onSearch,
        searchDelay
      )({
        keywords: currInput,
        onSuccess: (data) => {
          if (isSearchingRef.current) {
            setIsSearchLoading(false);
            setSearchItems(data);
          }
        },
        onFailure: () => {
          if (isSearchingRef.current) {
            setIsSearchLoading(false);
            setSearchItems([]);
          }
        },
      });
    }
    // Input field is empty
    else {
      isSearchingRef.current = false;
      setIsSearchLoading(false);
    }
  }, [currInput, onSearch, searchDelay, selectedItem, setIsSearchLoading]);

  const onInputValueChange = (value) => {
    if (currInput !== value) {
      hasUserSelectedRef.current = false;
      setCurrInput(value);

      // User has cleared input box
      if (value === '') {
        prevSelectedItem.current = null;
        isSearchingRef.current = false;
        setIsSearchLoading(false);
        setSearchItems([]);
      }
      // On Read
      else if (
        selectedItem &&
        value === selectedItem[paginationDisplayColumn]
      ) {
        prevSelectedItem.current = null;
        hasUserSelectedRef.current = true;
      }
    } else {
      hasUserSelectedRef.current = true;
    }
  };

  const resetState = () => {
    isSearchingRef.current = false;
    setIsSearchLoading(false);
    prevSelectedItem.current = null;
  };

  const updateStateOnSelectedItemChange = ({ item, onSelectedItemChange }) => {
    const newItem = item || {};
    const { id = '' } = newItem;

    if (selectedId !== id) {
      onSelectedItemChange(item);
      hasUserSelectedRef.current = true;
      hasDownshiftSelectedRef.current = false;

      // When rendered inside the LineItemTable, each autocomplete component is rendered
      // to a specific row. When a row is "deleted", it's not unmounted from the DOM tree,
      // but its value is updated from the Page Module store, and so we need to manually
      // update its internal state which is not controlled by props
      if (item && type === AutoCompleteComboboxTypes.ITEM_LINE) {
        resetState();
      } else {
        prevSelectedItem.current = item;
      }
    }
  };

  const onComboboxChange = (item, downShiftHandlers) => {
    if (item && item[IS_LOAD_MORE_BUTTON]) {
      // If the user has selected an item, and then select/click on the
      // Load More button or the Spinner, it should not clear out their
      // previously selected item
      if (selectedItem) {
        downShiftHandlers.selectItem(selectedItem);
        hasDownshiftSelectedRef.current = true;
      }

      // Keep Combobox menu open & set highlight on the Load more button
      // or the first newly loaded item
      downShiftHandlers.openMenu();
      downShiftHandlers.setHighlightedIndex(items.length);

      if (loadMoreButtonStatus === LoadMoreButtonStatus.SHOWN) {
        onLoadMoreItems();
      }
      // eslint-disable-next-line no-underscore-dangle
    } else if (item && item._addNewItem) {
      // DO NOTHING.
      // onChange should not be triggered on add new item click.
      // Assume this is Feelix bug?
    } else {
      updateStateOnSelectedItemChange({
        item,
        onSelectedItemChange: onChange,
      });
    }
  };

  const resetSearchStateOnBlur = () => {
    if (
      isSearchingRef.current &&
      isSearchLoading &&
      searchItems.length === 0 &&
      prevSelectedItem.current
    ) {
      isSearchingRef.current = false;
    }

    setIsSearchLoading(false);
  };

  const onBlur = () => {
    if (type === AutoCompleteComboboxTypes.ITEM_LINE) {
      resetState();
    } else {
      resetSearchStateOnBlur();
    }

    hasBlurredRef.current = true;
  };

  const renderItem = (columnName, item) => {
    if (shouldShowLoadMoreButton && item[IS_LOAD_MORE_BUTTON]) {
      return !metaData.length ||
        columnName !== paginationDisplayColumn ? null : (
        <LoadMoreButton loadMoreButtonStatus={loadMoreButtonStatus} />
      );
    }

    return item[columnName];
  };

  const onAddNewItem = () => {
    if (addNewItem) {
      isSearchingRef.current = false;
      addNewItem.onAddNew();
    }
  };

  return (
    <Combobox
      metaData={metaData}
      selected={selectedItem}
      items={comboboxItems}
      renderItem={renderItem}
      addNewItem={
        addNewItem
          ? {
              label: addNewItem.label,
              onAddNew: onAddNewItem,
            }
          : undefined
      }
      onInputValueChange={onInputValueChange}
      onChange={onComboboxChange}
      onSearch={onSearch}
      onBlur={onBlur}
      noMatchFoundMessage={
        isSearchLoading ? 'Searching...' : noMatchFoundMessage
      }
      {...otherProps}
      allowClear
    />
  );
};

export default AutoCompleteCombobox;
