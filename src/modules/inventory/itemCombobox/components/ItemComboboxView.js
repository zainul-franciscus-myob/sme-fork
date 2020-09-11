import { connect } from 'react-redux';
import React from 'react';

import {
  getIsItemLoading,
  getItemOptions,
  getLoadItemOptionsStatus,
} from '../ItemComboboxSelectors';
import AutoCompleteCombobox from '../../../../components/AutoComplete/AutoCompleteCombobox';
import AutoCompleteComboboxTypes from '../../../../components/AutoComplete/AutoCompleteComboboxTypes';

const metaData = [
  {
    columnName: 'itemId',
    columnWidth: '15rem',
    showData: true,
    showPagination: true,
  },
  { columnName: 'description', columnWidth: '20rem' },
];

const ItemComboboxView = ({
  itemModal,
  itemOptions,
  isLoading,
  loadItemOptionsStatus,
  addNewItemLabel,
  onLoadMore,
  onSearch,
  onAddNew,
  ...otherProps
}) => {
  const addNewItem = onAddNew ? { label: 'Create item', onAddNew } : undefined;

  return (
    <>
      {itemModal}
      <AutoCompleteCombobox
        type={AutoCompleteComboboxTypes.ITEM_LINE}
        metaData={metaData}
        items={itemOptions}
        disabled={isLoading}
        allowClear
        loadMoreButtonStatus={loadItemOptionsStatus}
        onLoadMoreItems={onLoadMore}
        addNewItem={addNewItem}
        onSearch={onSearch}
        {...otherProps}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  itemOptions: getItemOptions(state),
  isLoading: getIsItemLoading(state),
  loadItemOptionsStatus: getLoadItemOptionsStatus(state),
});

export default connect(mapStateToProps)(ItemComboboxView);
