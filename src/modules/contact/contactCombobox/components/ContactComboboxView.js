import { connect } from 'react-redux';
import React from 'react';

import {
  getAddNewItemLabel,
  getContactOptions,
  getDisplayMode,
  getIsContactLoading,
  getLoadContactOptionsStatus,
} from '../contactComboboxSelectors';
import AutoCompleteCombobox from '../../../../components/AutoComplete/AutoCompleteCombobox';
import DisplayMode from '../types/DisplayMode';

const getMetaData = (displayMode) => {
  switch (displayMode) {
    case DisplayMode.NAME_ONLY:
      return [
        { columnName: 'displayName', showData: true, showPagination: true },
      ];
    case DisplayMode.NAME_AND_TYPE:
    default:
      return [
        {
          columnName: 'displayName',
          columnWidth: '22.9rem',
          showData: true,
          showPagination: true,
        },
        { columnName: 'displayId', columnWidth: '15rem' },
        { columnName: 'displayContactType', columnWidth: '10rem' },
      ];
  }
};

const ContactComboboxView = ({
  displayMode,
  contactOptions,
  isLoading,
  disabled,
  contactModal,
  loadContactOptionsStatus,
  addNewItemLabel,
  onLoadMore,
  onSearch,
  onAddNew,
  ...otherProps
}) => {
  const metaData = getMetaData(displayMode);
  const addNewItem = onAddNew
    ? { label: addNewItemLabel, onAddNew }
    : undefined;

  return (
    <>
      {contactModal}
      <AutoCompleteCombobox
        metaData={metaData}
        items={contactOptions}
        disabled={disabled || isLoading}
        loadMoreButtonStatus={loadContactOptionsStatus}
        onLoadMoreItems={onLoadMore}
        addNewItem={addNewItem}
        onSearch={onSearch}
        {...otherProps}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  displayMode: getDisplayMode(state),
  contactOptions: getContactOptions(state),
  isLoading: getIsContactLoading(state),
  loadContactOptionsStatus: getLoadContactOptionsStatus(state),
  addNewItemLabel: getAddNewItemLabel(state),
});

export default connect(mapStateToProps)(ContactComboboxView);
