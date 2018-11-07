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
}) => (
  <div className="combobox-menu" role="presentation" onClick={onClick}>
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
};

ComboboxMenu.propTypes = {
  children: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  getItemProps: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({}),
  highlightedIndex: PropTypes.number,
  onClick: PropTypes.func,
  inputValue: PropTypes.string,
};

export default ComboboxMenu;
