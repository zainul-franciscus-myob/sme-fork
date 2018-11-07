import PropTypes from 'prop-types';
import React from 'react';

const ComboboxInput = ({
  getInputProps,
  getButtonProps,
  id,
  inputRef,
  disabled,
  hintText,
  name,
}) => (
  <div className="input-group">
    <input
      {...getInputProps({
        id,
        className: 'form-control',
        disabled,
        ref: inputRef,
        placeholder: hintText,
        name,
      })}
    />
    <div className="input-group-btn">
      {/* eslint-disable */}
      <button
        {...getButtonProps({
          type: 'button',
          className: 'btn btn-default clickable',
          tabIndex: '-1',
          disabled,
        })}
      >
        <span className="caret" />
      </button>
    </div>
  </div>
);

ComboboxInput.displayName = 'Combobox.Input';

ComboboxInput.defaultProps = {
  disabled: false,
  id: undefined,
  inputRef: undefined,
  hintText: undefined,
  name: undefined,
};

ComboboxInput.propTypes = {
  getInputProps: PropTypes.func.isRequired,
  getButtonProps: PropTypes.func.isRequired,
  id: PropTypes.string,
  inputRef: PropTypes.func,
  disabled: PropTypes.bool,
  hintText: PropTypes.string,
  name: PropTypes.string,
};

export default ComboboxInput;
