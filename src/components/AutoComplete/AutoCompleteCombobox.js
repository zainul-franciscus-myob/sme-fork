import { Combobox } from '@myob/myob-widgets';
import React, { useEffect, useRef, useState } from 'react';

import { buildItems, buildSelectedItem } from './helpers/buildItems';
import LoadMoreButton from './LoadMoreButton';
import LoadMoreButtonStatus from './LoadMoreButtonStatus';
import debounce from '../../common/debounce/debounce';
import getShouldShowLoadMoreButton from './helpers/getShouldShowLoadMoreButton';

const LOAD_MORE_BUTTON_ID = Symbol('Load More button item id');
const IS_LOAD_MORE_BUTTON = Symbol(
  'Property to determine if this is a Load more button item'
);
const loadMoreButtonItem = {
  id: LOAD_MORE_BUTTON_ID,
  [IS_LOAD_MORE_BUTTON]: true,
};

const AutoCompleteCombobox = ({
  metaData,
  selectedId = '',
  items = [],
  addNewItem,
  loadMoreButtonStatus,
  onLoadMoreItems,
  isSearchLoading,
  searchDelay = 500,
  onSearch,
  onChange,
  ...otherProps
}) => {
  const [currInput, setCurrInput] = useState('');
  const hasUserSelectedRef = useRef(false);
  const hasDownshiftSelectedRef = useRef(false);

  const isSearchingRef = useRef(false);
  const [searchItems, setSearchItems] = useState([]);

  const paginationDisplayColumn = metaData.find(
    (column) => column.showPagination
  ).columnName;
  const shouldShowLoadMoreButton = getShouldShowLoadMoreButton(
    loadMoreButtonStatus
  );

  const selectedItem = buildSelectedItem({
    selectedId,
    items,
  });

  const comboboxItems = buildItems({
    items,
    searchItems,
    isSearching: isSearchingRef.current,
    isSearchLoading,
    shouldShowLoadMoreButton,
    loadMoreButtonItem,
  });

  useEffect(() => {
    if (hasUserSelectedRef.current) {
      hasUserSelectedRef.current = false;
      return;
    }

    if (hasDownshiftSelectedRef.current) {
      return;
    }

    if (currInput !== '') {
      debounce(
        onSearch,
        searchDelay
      )({
        keyword: currInput,
        onSuccess: (data) => {
          if (isSearchingRef.current) {
            setSearchItems(data);
          }
        },
      });
      isSearchingRef.current = true;
    } else {
      isSearchingRef.current = false;
    }
  }, [currInput, onSearch, searchDelay, setSearchItems]);

  const onInputValueChange = (value) => {
    if (currInput !== value) {
      setCurrInput(value);

      if (value === '') {
        setSearchItems([]);
        isSearchingRef.current = false;
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
        onChange(selectedItem);
        hasDownshiftSelectedRef.current = true;
      }

      // Keep Combobox menu open & set highlight on the Load more button
      // or the first newly loaded item
      downShiftHandlers.openMenu();
      downShiftHandlers.setHighlightedIndex(items.length);

      if (loadMoreButtonStatus === LoadMoreButtonStatus.SHOWN) {
        onLoadMoreItems();
      }
    } else {
      const newItem = item || {};
      const { id = '' } = newItem;
      if (selectedId !== id) {
        onChange(newItem);
        hasUserSelectedRef.current = true;
        hasDownshiftSelectedRef.current = false;
      }
    }
  };

  const renderItem = (columnName, item) => {
    return shouldShowLoadMoreButton &&
      columnName === paginationDisplayColumn &&
      item[IS_LOAD_MORE_BUTTON] ? (
      <LoadMoreButton loadMoreButtonStatus={loadMoreButtonStatus} />
    ) : (
      item[columnName]
    );
  };

  const onAddNewItem = () => {
    if (addNewItem) {
      addNewItem.onAddNew({
        onSuccess: () => {
          isSearchingRef.current = false;
        },
      });
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
          ? { label: addNewItem.label, onAddNew: onAddNewItem }
          : undefined
      }
      onInputValueChange={onInputValueChange}
      onChange={onComboboxChange}
      {...otherProps}
    />
  );
};

export default AutoCompleteCombobox;
