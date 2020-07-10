/* eslint-disable react/button-has-type */
import { Icons } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

class ComboboxInput extends React.Component {
  constructor(...args) {
    super(...args);
    this.inputRef = undefined;
    this.isInputFocused = false;
    this.isButtonFocused = false;
    this.isComboboxFocused = false;
  }

  setInputRef = (ref) => {
    const { inputRef } = this.props;
    if (inputRef) {
      inputRef(ref);
    }
    this.inputRef = ref;
  };

  onInputBlur = (e) => {
    this.isInputFocused = false;
    setTimeout(() => this.blurComboboxInput(e), 0);
  };

  onButtonBlur = (e) => {
    this.isButtonFocused = false;
    setTimeout(() => this.blurComboboxInput(e), 0);
  };

  onButtonClick = () => {
    this.focusInput();
  };

  focusInput = () => {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  blurComboboxInput = (e) => {
    if (this.isInputFocused || this.isButtonFocused) {
      return;
    }

    this.isComboboxFocused = false;

    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(e);
    }
  };

  onInputFocus = (e) => {
    this.focusComboboxInput(e);
    this.isInputFocused = true;
    this.isComboboxFocused = true;
  };

  onButtonFocus = (e) => {
    this.focusComboboxInput(e);
    this.isButtonFocused = true;
    this.isComboboxFocused = true;
  };

  focusComboboxInput = (e) => {
    if (this.isComboboxFocused) {
      return;
    }

    const { onFocus } = this.props;

    if (onFocus) {
      onFocus(e);
    }
  };

  render() {
    const {
      getInputProps,
      getButtonProps,
      id,
      disabled,
      hintText,
      name,
      autoFocus,
      errorId,
      requiredId,
      onInputChange,
      inputValue,
      isTyping,
    } = this.props;

    const { onChange, value, ...restInputProps } = getInputProps({
      id,
      className: 'form-control',
      disabled,
      ref: this.setInputRef,
      placeholder: hintText,
      name,
      onFocus: this.onInputFocus,
      onBlur: this.onInputBlur,
      autoFocus,
      'aria-describedby': classnames(errorId, requiredId),
      'data-input-type': 'combobox',
    });

    const wrappedOnChange = (e) => {
      onInputChange(e);
      onChange(e);
    };

    const inputProps = {
      ...restInputProps,
      onChange: wrappedOnChange,
      value: isTyping ? inputValue : value,
    };

    return (
      <div className="input-group">
        <input {...inputProps} />
        <div className="input-group-btn">
          {/* this needs to be an a tag in order to enable onBlur/onFocus functionality. Buttons
            supporting onFocus/onBlur is OS specific. */}
          <a
            {...getButtonProps({
              className: 'btn btn-default btn-xs dropdown-toggle clickable',
              tabIndex: '-1',
              disabled,
              onFocus: this.onButtonFocus,
              onBlur: this.onButtonBlur,
              onClick: this.onButtonClick,
            })}
          >
            <Icons.Caret />
          </a>
        </div>
      </div>
    );
  }
}

ComboboxInput.displayName = 'Combobox.Input';

ComboboxInput.defaultProps = {
  disabled: false,
  id: undefined,
  errorId: undefined,
  inputRef: undefined,
  hintText: undefined,
  name: undefined,
  onFocus: undefined,
  onBlur: undefined,
  onInputChange: undefined,
  autoFocus: false,
  requiredId: undefined,
};

ComboboxInput.propTypes = {
  getInputProps: PropTypes.func.isRequired,
  getButtonProps: PropTypes.func.isRequired,
  id: PropTypes.string,
  errorId: PropTypes.string,
  inputRef: PropTypes.func,
  disabled: PropTypes.bool,
  hintText: PropTypes.string,
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  /**
   * [Phoenix] Accept `onInputChange` from user and wrapped into Downshift injected `onChange`
   */
  onInputChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  requiredId: PropTypes.string,
  /**
   * [Phoenix] Accept `inputValue` from ComboboxBox
   * which takes priority over the Downshift injected `value`
   */
  inputValue: PropTypes.string,
};

export default ComboboxInput;
