import { AddIcon, Button, Field, Input, RemoveIcon } from '@myob/myob-widgets';
import React from 'react';

import ItemList from './ItemList';
import styles from './EmailItemListHorizontal.module.css';

const RemoveEmailButton = ({ onClick }) => (
  <Button type="secondary" size="xs" onClick={onClick}>
    <RemoveIcon />
  </Button>
);

const AddEmailButton = ({ onClick }) => (
  <Field
    key="addButton"
    label="Add button"
    hideLabel
    className={styles.addEmailButton}
    renderField={() => (
      <Button type="link" icon={<AddIcon />} onClick={onClick}>
        Add email
      </Button>
    )}
  />
);

const renderItems = (
  label,
  items,
  requiredLabel,
  errorMessage,
  onKeyDown,
  accessory
) => ({ onAddItem, onRemoveItem, onItemValueChange }) => (
  <Field
    label={label}
    requiredLabel={requiredLabel}
    errorMessage={errorMessage}
    renderField={() => (
      <>
        {items.map((item, i) => (
          <div className={styles.item}>
            <Input
              containerClassName={styles.emailInput}
              hideLabel
              name="emailItem"
              value={item}
              onChange={onItemValueChange(i)}
              onKeyDown={onKeyDown}
              maxLength={255}
            />
            {i !== 0 && <RemoveEmailButton onClick={onRemoveItem(i)} />}
            {i === 0 && <AddEmailButton onClick={onAddItem} />}
            {i === 0 && accessory}
          </div>
        ))}
      </>
    )}
  />
);

const EmailItemListHorizontal = ({
  label,
  items,
  requiredLabel,
  errorMessage,
  onItemChange,
  onKeyDown = () => {},
  accessory,
}) => (
  <ItemList
    items={items}
    onItemChange={onItemChange}
    renderItems={renderItems(
      label,
      items,
      requiredLabel,
      errorMessage,
      onKeyDown,
      accessory
    )}
  />
);

export default EmailItemListHorizontal;
