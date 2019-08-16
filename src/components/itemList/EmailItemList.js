import {
  Button, Field, Icons, Input,
} from '@myob/myob-widgets';
import React, { Fragment } from 'react';

import ItemList from './ItemList';
import styles from './EmailItemList.module.css';

const RemoveEmailButton = ({ onClick }) => (
  <Button type="secondary" size="xs" onClick={onClick}>
    <Icons.Remove />
  </Button>
);

const renderItems = (label, items) => ({
  onAddItem,
  onRemoveItem,
  onItemValueChange,
}) => (
  <Fragment>
    {items.map(
      (item, i) => (
        <Field
          label={label}
          hideLabel={i !== 0}
          renderField={() => (
            <div className={styles.item}>
              <Input
                label=""
                name="emailItem"
                value={item}
                onChange={onItemValueChange(i)}
              />
              {
            i !== 0
            && (<RemoveEmailButton onClick={onRemoveItem(i)} />)
          }
            </div>
          )}
        />
      ),
    )}
    <Field
      key="addButton"
      label="Add button"
      hideLabel
      renderField={
        () => (
          <Button type="link" icon={<Icons.Add />} onClick={onAddItem}>
            Add another email
          </Button>
        )
      }
    />
  </Fragment>
);

const EmailItemList = ({
  label,
  items,
  onItemChange,
}) => (
  <ItemList
    items={items}
    onItemChange={onItemChange}
    renderItems={renderItems(label, items)}
  />
);

export default EmailItemList;
