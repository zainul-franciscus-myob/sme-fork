import PropTypes from 'prop-types';
import React from 'react';

const ComboboxMenu = ({
  items,
  selectedItem,
  highlightedIndex,
  getItemProps,
  children,
  onClick,
  inputValue,
  onMouseDown,
  onMouseLeave,
}) => (
  <div
    className="combobox-menu"
    role="presentation"
    onClick={onClick}
    onMouseDown={onMouseDown}
    onMouseLeave={onMouseLeave}
  >
    {children({
      items,
      getItemProps,
      selectedItem,
      highlightedIndex,
      inputValue,
    })}
  </div>
);

ComboboxMenu.displayName = 'Combobox.Menu';

ComboboxMenu.defaultProps = {
  onClick: undefined,
  selectedItem: undefined,
  highlightedIndex: undefined,
  inputValue: undefined,
  onMouseDown: undefined,
  onMouseLeave: undefined,
};

ComboboxMenu.propTypes = {
  children: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  getItemProps: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({}),
  highlightedIndex: PropTypes.number,
  onClick: PropTypes.func,
  inputValue: PropTypes.string,
  onMouseDown: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default ComboboxMenu;
