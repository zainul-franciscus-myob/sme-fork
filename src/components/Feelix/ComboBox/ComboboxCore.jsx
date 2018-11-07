import { HelpBlock } from '@myob/myob-widgets';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import ComboboxInput from './ComboboxInput';
import ComboboxMenu from './ComboboxMenu';

const TAB_KEY = 'Tab';

class ComboboxCore extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    hideLabel: PropTypes.bool,
    errorMessage: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    itemToString: PropTypes.func,
    itemsFilter: PropTypes.func,
    filterOnType: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    children: PropTypes.func.isRequired,
    defaultSelectedItem: PropTypes.shape({}),
    defaultIsOpen: PropTypes.bool,
    hintText: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.shape({}),
  };

  static defaultProps = {
    id: null,
    hideLabel: false,
    disabled: false,
    errorMessage: '',
    itemsFilter: undefined,
    filterOnType: false,
    itemToString: undefined,
    hintText: undefined,
    defaultSelectedItem: undefined,
    defaultIsOpen: false,
    onSelect: undefined,
    name: undefined,
    selected: undefined,
  };

  constructor(props) {
    super(props);
    const { filterOnType } = this.props;
    if (filterOnType) {
      this.state = { isTyping: false };
    }
  }

  onMenuClick = () => {
    if (this.inputControl) {
      this.inputControl.focus();
    }
  };

  onStateChange = (changes, stateAndHelpers) => {
    const {
      stateChangeTypes: { controlledPropUpdatedSelectedItem },
    } = Downshift;
    const { filterOnType } = this.props;

    if (changes.isOpen) {
      if (stateAndHelpers.highlightedIndex === null) {
        stateAndHelpers.setHighlightedIndex(0);
      }
    }
    if (
      filterOnType
      && Object.prototype.hasOwnProperty.call(changes, 'inputValue')
      && changes.type !== controlledPropUpdatedSelectedItem
    ) {
      this.setState({ isTyping: true });
    }
  };

  onChange = (selectedItem, stateAndHelpers) => {
    const { filterOnType, onChange } = this.props;
    if (filterOnType) {
      this.setState({ isTyping: false });
    }
    if (onChange) {
      onChange(selectedItem, stateAndHelpers);
    }
  };

  onSelect = (selectedItem, stateAndHelpers) => {
    const { filterOnType, onSelect } = this.props;
    if (filterOnType) {
      this.setState({ isTyping: false });
    }
    if (onSelect) {
      onSelect(selectedItem, stateAndHelpers);
    }
  };

  filterItems = (items, inputValue) => {
    const { itemsFilter } = this.props;
    if (itemsFilter) {
      return itemsFilter(items, inputValue);
    }
    return items;
  };

  inputRef = (input) => {
    this.inputControl = input;
  };

  render() {
    const {
      items,
      filterOnType,
      errorMessage,
      label,
      hideLabel,
      disabled,
      children,
      id,
      itemToString,
      defaultSelectedItem,
      hintText,
      defaultIsOpen,
      name,
      selected,
    } = this.props;

    const { isTyping } = this.state;

    return (
      <Downshift
        onChange={this.onChange}
        onSelect={this.onSelect}
        onStateChange={this.onStateChange}
        itemToString={itemToString}
        defaultSelectedItem={defaultSelectedItem}
        defaultIsOpen={defaultIsOpen}
        selectedItem={selected}
      >
        {({
          getInputProps,
          getButtonProps,
          getLabelProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          selectHighlightedItem,
        }) => {
          const onKeyDown = (event) => {
            if (event.key === TAB_KEY) {
              selectHighlightedItem();
            }
          };

          const comboClasses = classnames('form-group', 'combobox', {
            'has-error': errorMessage,
          });

          const labelProps = {
            ...getLabelProps({
              htmlFor: id,
              className: classnames({ 'sr-only': hideLabel }),
            }),
          };

          // Input control is part of ComboBoxInput
          /* eslint-disable */
          return (
            <div
              role="presentation"
              className={comboClasses}
              onKeyDown={onKeyDown}
            >
              <label
                {...labelProps}
              >
                {label}
              </label>
              <ComboboxInput
                getInputProps={getInputProps}
                getButtonProps={getButtonProps}
                inputRef={this.inputRef}
                disabled={disabled}
                id={id}
                hintText={hintText}
                name={name}
              />
              {isOpen && (
                <ComboboxMenu
                  items={
                    filterOnType && !isTyping
                      ? items
                      : this.filterItems(items, inputValue)
                  }
                  getItemProps={getItemProps}
                  selectedItem={selectedItem}
                  highlightedIndex={highlightedIndex}
                  onClick={this.onMenuClick}
                  inputValue={inputValue}
                >
                  {children}
                </ComboboxMenu>
              )}
              {!!errorMessage && (
                <HelpBlock
                  id={`${getLabelProps().htmlFor}_error`}
                  message={errorMessage}
                />
              )}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default ComboboxCore;
