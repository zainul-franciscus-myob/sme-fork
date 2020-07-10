import React, { useRef, useState } from 'react';

import { buildItems, buildSelectedItem } from './buildAutoCompleteItems';
import Combobox from '../Feelix/Combobox/Combobox';
import debounce from '../../common/debounce/debounce';

const AutoComplete = ({
  metaData,
  delay,
  identifier,
  allowClearSelection,
  clearSelectionText,
  selectedItem,
  onLoad,
  onChange,
  ...otherProps
}) => {
  const [items, setItems] = useState([]);
  const [isEditing, _setIsEditing] = useState(false);
  const isEditingRef = useRef(isEditing);

  const setIsEditing = (status) => {
    isEditingRef.current = status;
    _setIsEditing(status);
  };

  const displayColumns = metaData.filter((column) => column.showData);
  const comboboxItems = buildItems({
    items,
    selectedItem,
    isEditing,
    displayColumns,
    allowClearSelection,
    clearSelectionText,
  });
  const selected = buildSelectedItem({
    items: comboboxItems,
    selectedItem,
    identifier,
  });

  const onInputChange = (e) => {
    setIsEditing(true);
    debounce(
      onLoad,
      delay
    )({
      keywords: e.target.value,
      onSuccess: (data) => {
        if (isEditingRef.current) {
          setItems(data);
        }
      },
    });
  };

  const clearState = () => {
    setIsEditing(false);
    setItems([]);
  };

  const wrappedOnChange = (item) => {
    clearState();
    if (
      allowClearSelection &&
      item[displayColumns[0].columnName] === clearSelectionText
    ) {
      onChange({ [identifier]: '' });
    } else {
      onChange(item);
    }
  };

  return (
    <Combobox
      metaData={metaData}
      items={comboboxItems}
      selected={selected}
      onInputChange={onInputChange}
      onChange={wrappedOnChange}
      onBlur={clearState}
      {...otherProps}
    />
  );
};

AutoComplete.defaultProps = {
  delay: 500,
  identifier: 'id',
  allowClearSelection: false,
  clearSelectionText: 'None',
};

export default AutoComplete;
