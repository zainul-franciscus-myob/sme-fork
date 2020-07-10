import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import ComboboxInput from './ComboboxInput';
import ComboboxMenu from './ComboboxMenu';

const TAB_KEY = 'Tab';
const ENTER_KEY = 'Enter';

class ComboboxBox extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    errorId: PropTypes.string,
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
    initialIsOpen: PropTypes.bool,
    hintText: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.shape({}),
    /**
     * If true this will disable the `key down` event when pressing the `enter`
     * key when the dropdown menu is open.
     */
    disableEventEnterKeyOnMenu: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    autoFocus: PropTypes.bool,
    onKeyDown: PropTypes.func,
    onInputChange: PropTypes.func,
    requiredId: PropTypes.string,
  };

  static defaultProps = {
    id: null,
    errorId: undefined,
    disabled: false,
    itemsFilter: undefined,
    filterOnType: false,
    itemToString: undefined,
    hintText: undefined,
    defaultSelectedItem: undefined,
    defaultIsOpen: false,
    initialIsOpen: false,
    onSelect: undefined,
    name: undefined,
    selected: undefined,
    disableEventEnterKeyOnMenu: false,
    onFocus: undefined,
    onBlur: undefined,
    autoFocus: false,
    onKeyDown: undefined,
    requiredId: undefined,
  };

  constructor(props) {
    super(props);
    if (this.props.filterOnType) {
      this.state = {
        isTyping: false,
        /**
         * [Phoenix] New state added for tracking input value, value will be updated on
         * - onSelect
         * - onChange
         * - onInputChange
         * - onInputBlur
         */
        inputValue: '',
      };
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

    if (stateAndHelpers.isOpen) {
      if (stateAndHelpers.highlightedIndex === null) {
        stateAndHelpers.setHighlightedIndex(0);
      }
    }
    if (
      this.props.filterOnType &&
      Object.prototype.hasOwnProperty.call(changes, 'inputValue') &&
      changes.type !== controlledPropUpdatedSelectedItem
    ) {
      this.setState({ isTyping: true });
    }
  };

  onChange = (selectedItem, stateAndHelpers) => {
    if (this.props.filterOnType) {
      this.setState({ isTyping: false });
    }
    if (this.props.onChange) {
      this.props.onChange(selectedItem, stateAndHelpers);
    }
    this.setState({ inputValue: '' });
  };

  onSelect = (selectedItem, stateAndHelpers) => {
    if (this.props.filterOnType) {
      this.setState({ isTyping: false });
    }
    if (this.props.onSelect) {
      this.props.onSelect(selectedItem, stateAndHelpers);
    }
    this.setState({ inputValue: '' });
  };

  filterItems = (items, inputValue) => {
    if (this.props.itemsFilter) {
      return this.props.itemsFilter(items, inputValue);
    }
    return items;
  };

  inputRef = (input) => {
    this.inputControl = input;
  };

  onInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
    this.props.onInputChange(e);
  };

  onInputBlur = () => {
    this.setState({ inputValue: '', isTyping: false });
    this.props.onBlur();
  };

  render() {
    const {
      items,
      filterOnType,
      disabled,
      children,
      id,
      errorId,
      defaultSelectedItem,
      hintText,
      defaultIsOpen,
      initialIsOpen,
      name,
      selected,
      onFocus,
      autoFocus,
      onKeyDown,
      disableEventEnterKeyOnMenu,
      requiredId,
    } = this.props;

    return (
      <Downshift
        onChange={this.onChange}
        onSelect={this.onSelect}
        onStateChange={this.onStateChange}
        itemToString={this.props.itemToString}
        initialSelectedItem={defaultSelectedItem}
        defaultIsOpen={defaultIsOpen}
        initialIsOpen={initialIsOpen}
        selectedItem={selected}
      >
        {({
          getInputProps,
          getToggleButtonProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          selectHighlightedItem,
        }) => {
          const onComboboxWrapperKeyDown = (event) => {
            if (event.key === TAB_KEY) {
              selectHighlightedItem();
            }
            // disableEventEnterKeyOnMenu: when a user presses ENTER
            // key when the menu is open, stop bubbling the event.
            if (
              disableEventEnterKeyOnMenu &&
              event.key === ENTER_KEY &&
              isOpen
            ) {
              selectHighlightedItem();
              event.stopPropagation();
            }

            if (onKeyDown) {
              onKeyDown(event);
            }
          };

          const comboClasses = classnames('combobox');

          // Input control is part of ComboBoxInput
          /* eslint-disable jsx-a11y/label-has-for */
          return (
            <div
              role="presentation"
              className={comboClasses}
              onKeyDown={onComboboxWrapperKeyDown}
            >
              <ComboboxInput
                getInputProps={getInputProps}
                getButtonProps={getToggleButtonProps}
                inputRef={this.inputRef}
                disabled={disabled}
                id={id}
                errorId={errorId}
                requiredId={requiredId}
                hintText={hintText}
                name={name}
                onFocus={onFocus}
                onBlur={this.onInputBlur}
                autoFocus={autoFocus}
                onInputChange={this.onInputChange}
                inputValue={this.state.inputValue}
                isTyping={this.state.isTyping}
              />
              {isOpen && (
                <ComboboxMenu
                  items={
                    filterOnType && !this.state.isTyping
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
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default ComboboxBox;
