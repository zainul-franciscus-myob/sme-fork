import { Button, Icons } from '@myob/myob-widgets';
import React from 'react';
import classnames from 'classnames';

import ComboboxCore from './ComboboxCore';
import styles from './Combobox.module.css';

/**
 * Combobox
 *
 * @visibleName
 *
 * @propDocs {path:"./ComboboxBox", ignore: ["itemToString", "defaultSelectedItem", "children",
 * "filterOnType", "itemsFilter"]}
 * @propDocs {path:"../Field/Field", ignore:["renderField"]}
 */
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
  errorMessageInline,
  addNewItem,
  disableHighlight,
  name,
  selected,
  autoFocus,
  onFocus,
  onBlur,
  onKeyDown,
  width,
  ...otherProps
}) => (
  <ComboboxCore
    id={id}
    items={items}
    autoFocus={autoFocus}
    onFocus={onFocus}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    itemToString={(item) =>
      metaData.reduce(
        (result, meta) =>
          result +
          (item &&
          meta.showData &&
          Object.prototype.hasOwnProperty.call(item, meta.columnName)
            ? item[meta.columnName]
            : ''),
        ''
      )
    }
    itemsFilter={(allItems) => allItems}
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
    defaultSelectedItem={defaultItem}
    selected={selected}
    disabled={disabled}
    hintText={hintText}
    filterOnType
    errorMessage={errorMessage}
    errorMessageInline={errorMessageInline}
    name={name}
    width={width}
    {...otherProps}
  >
    {({
      items: menuItems,
      selectedItem,
      highlightedIndex,
      getItemProps,
      inputValue,
    }) => (
      <table className={styles.comboboxTable}>
        <colgroup>
          {
            // Metadata should be constant so it is fine to use index as key
            /* eslint-disable react/no-array-index-key */
            metaData.map((meta, idx) => (
              <col style={{ width: meta.columnWidth }} key={idx} />
            ))
          }
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
                })}
                key={index}
              >
                {
                  // Metadata should be constant so it is fine to use index as key
                  /* eslint-disable react/no-array-index-key */
                  metaData.map((meta, idx) => (
                    <td
                      key={idx}
                      className={`combobox-menu__cell--align-${
                        meta.align || 'left'
                      }`}
                    >
                      {renderItem
                        ? renderItem(meta.columnName, item, menuItems)
                        : item[meta.columnName]}
                    </td>
                  ))
                }
              </tr>
            ))
          )}
        </tbody>
      </table>
    )}
  </ComboboxCore>
);

Combobox.defaultProps = {
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
  autoFocus: false,
  onFocus: undefined,
  onBlur: undefined,
  onKeyDown: undefined,
};

export default Combobox;
