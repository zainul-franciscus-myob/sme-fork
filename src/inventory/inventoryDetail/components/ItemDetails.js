import {
  Checkbox, CheckboxGroup, FieldGroup, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getItemDetails,
} from '../inventoryDetailSelectors';
import RequiredTooltip from '../../../components/RequiredTooltip/RequiredTooltip';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './InventoryDetailView.module.css';

const ItemDetails = ({
  name,
  description,
  useItemDescription,
  referenceId,
  isInactive,
  onItemDetailsChange,
}) => (
  <FieldGroup label="Item Details">
    <Input
      name="name"
      label="Name"
      labelAccessory={(<RequiredTooltip />)}
      value={name}
      maxLength={30}
      onChange={handleInputChange(onItemDetailsChange)}
    />
    <TextArea
      name="description"
      label="Description"
      resize="vertical"
      value={description}
      maxLength={255}
      onChange={handleInputChange(onItemDetailsChange)}
    />
    <CheckboxGroup
      hideLabel
      label="useItemDescription"
      renderCheckbox={props => (
        <Checkbox
          {...props}
          name="useItemDescription"
          label="Use item description on sales and purchases"
          checked={useItemDescription}
          onChange={handleCheckboxChange(onItemDetailsChange)}
        />
      )}
    />
    <Input
      className={styles.referenceId}
      name="referenceId"
      label="Item ID"
      labelAccessory={(<RequiredTooltip />)}
      value={referenceId}
      maxLength={30}
      onChange={handleInputChange(onItemDetailsChange)}
    />
    <CheckboxGroup
      label="isInactive"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="isInactive"
          label="Inactive item"
          checked={isInactive}
          onChange={handleCheckboxChange(onItemDetailsChange)}
        />
      )}
    />
  </FieldGroup>
);

const mapStateToProps = state => getItemDetails(state);

export default connect(mapStateToProps)(ItemDetails);
