import { Icons } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

class ComboboxInput extends React.Component {
  constructor(...args) {
    super(...args);
    this.inputRef = React.createRef();
    this.isInputFocused = false;
    this.isButtonFocused = false;
  }

  getInputRef = (inputElement) => {
    const { inputRef } = this.props;
    inputRef(inputElement);

    this.inputRef.current = inputElement;
  }

  onInputBlur = () => {
    this.isInputFocused = false;
    setTimeout(this.blurInputGroup, 0);
  }

  onButtonBlur = () => {
    this.isButtonFocused = false;
    setTimeout(this.blurInputGroup, 0);
  }

  onButtonClick = () => {
    this.focusInput();
  }

  focusInput = () => {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  blurInputGroup = () => {
    if (this.isInputFocused || this.isButtonFocused) {
      return;
    }

    const { onBlur } = this.props;

    if (onBlur) {
      onBlur();
    }
  }

  onInputFocus = () => {
    this.isInputFocused = true;
  }

  onButtonFocus = () => {
    this.isButtonFocused = true;
  }

  render() {
    const {
      getInputProps,
      getButtonProps,
      id,
      disabled,
      hintText,
      name,
      autoFocus,
    } = this.props;

    return (
      <div className="input-group">
        <input
          {...getInputProps({
            id,
            className: 'form-control',
            disabled,
            ref: this.getInputRef,
            placeholder: hintText,
            name,
            onFocus: this.onInputFocus,
            onBlur: this.onInputBlur,
            autoFocus,
          })}
        />
        <div className="input-group-btn">
          {/* eslint-disable */}
          <a
            {...getButtonProps({
              className: 'btn btn-default btn-xs dropdown-toggle clickable',
              tabIndex: '-1',
              disabled,
              onFocus: this.onButtonFocus,
              onBlur: this.onButtonBlur,
              onClick: this.onButtonClick,
              onMouseDown: this.onButtonMouseDown,
              onMouseLeave: this.onButtonMouseLeave,
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
  inputRef: undefined,
  hintText: undefined,
  name: undefined,
  onFocus: undefined,
  onBlur: undefined,
};

ComboboxInput.propTypes = {
  getInputProps: PropTypes.func.isRequired,
  getButtonProps: PropTypes.func.isRequired,
  id: PropTypes.string,
  inputRef: PropTypes.func,
  disabled: PropTypes.bool,
  hintText: PropTypes.string,
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default ComboboxInput;
