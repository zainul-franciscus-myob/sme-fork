import { Button, Field, Icons } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import ComboboxCore from './ComboboxCore';

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
    itemsFilter={allItems => allItems}
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
                })}
                key={index}
              >
                {// Metadata should be constant so it is fine to use index as key
                /* eslint-disable react/no-array-index-key */
                metaData.map((meta, idx) => (
                  <td
                    key={idx}
                    className={`combobox-menu__cell--align-${meta.align
                      || 'left'}`}
                  >
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

Combobox.propTypes = {
  ...propsFromField,
  /**
   * The objects of data to display in the dropdown menu. Can be an object with any keys.
   */
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  /**
   * Allow user to provide customised render function for dropdown menu table cell.
   */
  renderItem: PropTypes.func,
  /**
   * This defines which attributes are displayed as columns in the dropdown and which attribute
   * value will be displayed in the input box upon selection (showData).
   *
   * There can be multiple attributes/columns with showData set. The display value will include the
   * concatenated value of each attribute/column with showData set. The order is determined by
   * metaData array.
   */
  metaData: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * This defines which key you want to configure
       */
      columnName: PropTypes.string,
      /**
       * This defines the width of the data cell in the menu
       */
      columnWidth: PropTypes.string,
      /**
       * This defines when an object is selected what attributes are shown in the input box.
       */
      showData: PropTypes.bool,
      /**
       * This defines the alignment of a column in the menu.
       */
      align: PropTypes.oneOf(['left', 'right']),
    }),
  ).isRequired,
  /**
   * Message displayed inside dropdown menu when no matches are found for value in the input box.
   */
  noMatchFoundMessage: PropTypes.string,
  /**
   * Callback trigger when the selected item is changed. Will receive selected item as first
   * parameter
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback trigger when any item is selected (regardless of prior selected item). Will receive
   * selected item as first parameter
   */
  onSelect: PropTypes.func,
  /**
   * onAddNew key contains function callback that will be triggered when the Add New Item option is
   * selected (callback will receive the current value of input box as a parameter). label key
   * contains the name of the new entry eg: 'Add new Account'
   */
  addNewItem: PropTypes.shape({
    onAddNew: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }),
  /**
   * The input box and caret button will be disabled when disabled is turned on
   */
  disabled: PropTypes.bool,
  /**
   * The default item that is initially selected and displayed in the input box.
   */
  defaultItem: PropTypes.shape({}),
  /**
   * Hint text to display inside input box when no value has been entered
   */
  hintText: PropTypes.string,
  /**
   * The bold style on selected item will be disabled in the combobox menu
   */
  disableHighlight: PropTypes.bool,
  /**
   * Name to attach to the input.
   */
  name: PropTypes.string,
  /**
   * Sets the selected item displayed in the input box and can be set after the initial render.
   */
  selected: PropTypes.shape({}),
  /**
   * If true will focus the component on mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Callback fired on focus of the combobox, Calls with a `Sythetic Event`
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired on blur of the combobox, Calls with a `Synthetic Event`
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired on keydown of the combobox, calls with `Synthetic Event`
   */
  onKeyDown: PropTypes.func,
  /**
   * [Phoenix] New callback added for auto complete to detect user input
   */
  onInputChange: PropTypes.func,
};

export default Combobox;
