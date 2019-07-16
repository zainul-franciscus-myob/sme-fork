import { Button, Field, Icons } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import matchSorter from 'match-sorter';

import ComboboxCore from './ComboboxCore';

const Combobox = ({
  id,
  items,
  renderItem,
  metaData,
  disabled,
  onChange,
  onSelect,
  defaultItem,
  hintText,
  noMatchFoundMessage,
  errorMessage,
  addNewItem,
  disableHighlight,
  name,
  selected,
  label,
  hideLabel,
  autoFocus,
  onFocus,
  onBlur,
  preventTabbingOnSelect,
  ...otherProps
}) => (
  <ComboboxCore
    id={id}
    onFocus={onFocus}
    onBlur={onBlur}
    autoFocus={autoFocus}
    items={items}
    preventTabbingOnSelect={preventTabbingOnSelect}
    itemToString={item => metaData.reduce(
      (result, meta) => result
          + (item
          && meta.showData
          && Object.prototype.hasOwnProperty.call(item, meta.columnName)
            ? item[meta.columnName]
            : ''),
      '',
    )
    }
    itemsFilter={(allItems, inputValue) => matchSorter(allItems, inputValue, {
      keys: metaData.map(meta => meta.columnName),
    })
    }
    onChange={(selectedItem, stateAndHelpers) => {
      // Want to use underscores here to ensure that our new item attributes don't clash with
      // real item attributes
      /* eslint-disable no-underscore-dangle */
      if (!selectedItem || selectedItem._addNewItem) {
        return;
      }
      onChange(selectedItem, stateAndHelpers);
    }}
    onSelect={(selectedItem, stateAndHelpers) => {
      // Want to use underscores here to ensure that our new item attributes don't clash with
      // real item attributes
      if (!selectedItem) {
        return;
      }
      if (addNewItem && selectedItem._addNewItem) {
        addNewItem.onAddNew(selectedItem._inputValue);
      } else if (onSelect) {
        onSelect(selectedItem, stateAndHelpers);
      }
    }}
    /* eslint-enable no-underscore-dangle */
    label={label}
    hideLabel={hideLabel}
    defaultSelectedItem={defaultItem}
    selected={selected}
    disabled={disabled}
    hintText={hintText}
    filterOnType
    errorMessage={errorMessage}
    name={name}
    {...otherProps}
  >
    {({
      items: menuItems,
      selectedItem,
      highlightedIndex,
      getItemProps,
      inputValue,
    }) => (
      <table className="table-bordered">
        <colgroup>
          {// Metadata should be constant so it is fine to use index as key
          /* eslint-disable react/no-array-index-key */
          metaData.map((meta, idx) => (
            <col style={{ width: meta.columnWidth }} key={idx} />
          ))}
        </colgroup>
        <tbody>
          {addNewItem && (
            <tr
              {...getItemProps({
                item: { _inputValue: inputValue, _addNewItem: true },
                index: menuItems.length,
                className: classnames({
                  active: menuItems.length === highlightedIndex,
                }),
              })}
              key={menuItems.length}
            >
              <td colSpan={metaData.length}>
                <Button type="link" icon={<Icons.Add />}>
                  {addNewItem.label}
                </Button>
              </td>
            </tr>
          )}
          {menuItems.length === 0 ? (
            <tr key={-1}>
              <td colSpan={metaData.length}>{noMatchFoundMessage}</td>
            </tr>
          ) : (
            menuItems.map((item, index) => (
              <tr
                {...getItemProps({
                  item,
                  index,
                  className: classnames({
                    active: index === highlightedIndex,
                    totalLine: !disableHighlight && item === selectedItem,
                  }),
                  key: index,
                })}
              >
                {// Metadata should be constant so it is fine to use index as key
                /* eslint-disable react/no-array-index-key */
                metaData.map((meta, idx) => (
                  <td key={idx}>
                    {renderItem
                      ? renderItem(meta.columnName, item, menuItems)
                      : item[meta.columnName]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    )}
  </ComboboxCore>
);

// eslint-disable-next-line
const { renderField, ...propsFromField } = Field.propTypes;

Combobox.defaultProps = {
  errorMessage: undefined,
  noMatchFoundMessage: undefined,
  disabled: false,
  defaultItem: undefined,
  hintText: undefined,
  addNewItem: undefined,
  renderItem: undefined,
  disableHighlight: false,
  onSelect: undefined,
  name: undefined,
  selected: undefined,
  label: '',
  hideLabel: true,
  autoFocus: false,
  preventTabbingOnSelect: false,
};

Combobox.propTypes = {
  ...propsFromField,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renderItem: PropTypes.func,
  errorMessage: PropTypes.string,
  metaData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  noMatchFoundMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  addNewItem: PropTypes.shape({
    onAddNew: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }),
  disabled: PropTypes.bool,
  defaultItem: PropTypes.shape({}),
  hintText: PropTypes.string,
  disableHighlight: PropTypes.bool,
  name: PropTypes.string,
  selected: PropTypes.shape({}),
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
  preventTabbingOnSelect: PropTypes.bool,
};

export default Combobox;
