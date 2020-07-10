import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCustomerOptions,
  getIsCreating,
  getJobDetails,
} from '../jobDetailSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const handleCustomerComboboxChange = (key, handler) => (item) => {
  // Have to use custom handler because of mis-match between property names
  // in common handler, and property name expected by Customer Combobox.
  handler({ key, value: item.id });
};

const JobDetails = (props) => {
  const {
    onJobDetailsChange,
    onAddCustomerButtonClick,
    customerOptions,
    job,
  } = props;

  const {
    number,
    name,
    isInactive,
    customerId,
    isCustomerDisabled,
    description,
  } = job;

  return (
    <FieldGroup label="Job details">
      <Input
        name="number"
        label="Job number"
        requiredLabel="This is required"
        autoSize
        maxLength={15}
        resize="vertical"
        value={number}
        onChange={handleInputChange(onJobDetailsChange)}
        width="lg"
      />

      <Input
        name="name"
        label="Job name"
        autoSize
        maxLength={30}
        resize="vertical"
        value={name}
        onChange={handleInputChange(onJobDetailsChange)}
        width="lg"
      />

      <CustomerCombobox
        label="Linked customer"
        selectedId={customerId}
        items={customerOptions}
        onChange={handleCustomerComboboxChange(
          'customerId',
          onJobDetailsChange
        )}
        addNewItem={{
          label: 'Create customer',
          onAddNew: onAddCustomerButtonClick,
        }}
        disabled={isCustomerDisabled}
        width="lg"
        allowClear
      />

      <CheckboxGroup
        label="Inactive"
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            name="isInactive"
            label="Inactive job"
            checked={isInactive}
            onChange={handleCheckboxChange(onJobDetailsChange)}
          />
        )}
      />

      <TextArea
        name="description"
        label="Description"
        autoSize
        rows={3}
        resize="vertical"
        maxLength={255}
        value={description}
        onChange={handleInputChange(onJobDetailsChange)}
        width="lg"
      />
    </FieldGroup>
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  job: getJobDetails(state),
  customerOptions: getCustomerOptions(state),
});

export default connect(mapStateToProps)(JobDetails);
