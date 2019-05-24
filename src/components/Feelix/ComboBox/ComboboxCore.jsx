import { Field, HelpBlock } from '@myob/myob-widgets';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import ComboboxInput from './ComboboxInput';
import ComboboxMenu from './ComboboxMenu';
import styles from './Combobox.css';

const TAB_KEY = 'Tab';

class ComboboxCore extends React.Component {
  static propTypes = {
    id: PropTypes.string,
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
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    autoFocus: PropTypes.bool,
    preventTabbingOnSelect: PropTypes.bool,
  };

  static defaultProps = {
    id: null,
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
    onFocus: undefined,
    onBlur: undefined,
    autoFocus: false,
    preventTabbingOnSelect: false,
  };

  constructor(props) {
    super(props);
    const { filterOnType } = this.props;
    if (filterOnType) {
      this.state = { isTyping: false };
    }

    this.isMouseDown = false;
  }

  onMenuClick = () => {
    this.isMouseDown = false;
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

  onMenuMouseDown = () => {
    this.isMouseDown = true;
  }

  onMenuMouseLeave = () => {
    if (!this.isMouseDown) {
      return;
    }

    this.isMouseDown = false;
    this.blurComboBox();
  }

  onComboBoxInputBlur = () => {
    if (this.isMouseDown) {
      return;
    }

    this.blurComboBox();
  }

  blurComboBox = () => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const {
      items,
      filterOnType,
      errorMessage,
      disabled,
      children,
      id,
      itemToString,
      defaultSelectedItem,
      hintText,
      defaultIsOpen,
      name,
      selected,
      onFocus,
      autoFocus,
      preventTabbingOnSelect,
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
          getToggleButtonProps,
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
              if (preventTabbingOnSelect && highlightedIndex !== null) {
                event.preventDefault();
              }
            }
          };

          const comboClasses = classnames('combobox', styles.combobox, {
            'has-error': errorMessage,
          });

          // Input control is part of ComboBoxInput
          /* eslint-disable */
          return (
            <div
              role="presentation"
              className={comboClasses}
              onKeyDown={onKeyDown}
            >
              <ComboboxInput
                getInputProps={getInputProps}
                getButtonProps={getToggleButtonProps}
                inputRef={this.inputRef}
                disabled={disabled}
                id={id}
                hintText={hintText}
                name={name}
                onFocus={onFocus}
                onBlur={this.onComboBoxInputBlur}
                autoFocus={autoFocus}
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
                  onMouseDown={this.onMenuMouseDown}
                  onMouseLeave={this.onMenuMouseLeave}
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

const WrappedComboBox = ({
  label,
  id,
  hideLabel = true,
  labelAccessory,
  errorMessage,
  ...comboboxCoreProps,
}) => (
  <Field
    label={label}
    id={id}
    hideLabel={hideLabel}
    labelAccessory={labelAccessory}
    errorMessage={errorMessage}
    renderField={props => <ComboboxCore {...props} {...comboboxCoreProps} />}
  />
);

export default WrappedComboBox;
