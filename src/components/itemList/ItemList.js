import React, { Fragment } from 'react';

class ItemList extends React.Component {
  onAddItem = () => {
    const { items, onItemChange } = this.props;

    onItemChange([...items, '']);
  };

  onRemoveItem = (i) => () => {
    const { items, onItemChange } = this.props;

    const updatedItemList = items.filter((item, index) => index !== i);
    onItemChange(updatedItemList);
  };

  onItemValueChange = (i) => (e) => {
    const { items, onItemChange } = this.props;

    const { value } = e.target;

    const updatedItemList = items.map((item, index) =>
      index === i ? value : item
    );

    onItemChange(updatedItemList);
  };

  render = () => {
    const { renderItems } = this.props;
    return (
      <Fragment>
        {renderItems({
          onAddItem: this.onAddItem,
          onRemoveItem: this.onRemoveItem,
          onItemValueChange: this.onItemValueChange,
        })}
      </Fragment>
    );
  };
}

export default ItemList;
