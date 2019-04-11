import {
  Checkbox, CheckboxGroup, Field, FieldGroup, Input, TextArea,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getItemDetails,
} from '../inventoryDetailSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const ItemDetails = ({
  referenceId,
  name,
  description,
  useItemDescription,
  onItemDetailsChange,
  isInactive,
}) => (
  <FieldGroup label="Item Details">
    <Input
      name="referenceId"
      label="Reference"
      value={referenceId}
      maxLength={30}
      onChange={onInputChange(onItemDetailsChange)}
    />
    <CheckboxGroup
      label="isInactive"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="isInactive"
          label="Inactive item"
          checked={isInactive}
          onChange={onCheckboxChange(onItemDetailsChange)}
        />
      )}
    />
    <Input
      name="name"
      label="Name"
      value={name}
      maxLength={30}
      onChange={onInputChange(onItemDetailsChange)}
    />
    <TextArea
      name="description"
      label="Description"
      resize="vertical"
      value={description}
      maxLength={255}
      onChange={onInputChange(onItemDetailsChange)}
    />
    <Field
      label="Use item description on sales and purchases"
      hideLabel
      renderField={props => (
        <Checkbox
          {...props}
          name="useItemDescription"
          label="Use item description on sales and purchases"
          checked={useItemDescription}
          onChange={onCheckboxChange(onItemDetailsChange)}
        />
      )}
    />
  </FieldGroup>
);

ItemDetails.propTypes = {
  referenceId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  useItemDescription: PropTypes.bool.isRequired,
  onItemDetailsChange: PropTypes.func.isRequired,
  isInactive: PropTypes.bool.isRequired,
};

const mapStateToProps = state => getItemDetails(state);

export default connect(mapStateToProps)(ItemDetails);
