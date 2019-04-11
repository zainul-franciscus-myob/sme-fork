import {
  Checkbox, CheckboxGroup, FieldGroup, Input, RadioButtonGroup, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getBusinessDetails } from '../contactDetailSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onRadioButtonChange = (name, handler) => ({ value }) => {
  handler({ key: name, value });
};

const onCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const BusinessDetails = ({
  selectedContactType,
  designation,
  isCreating,
  referenceId,
  isInactive,
  onBusinessDetailsChange,
}) => (
  <FieldGroup label="Business details">
    <RadioButtonGroup
      label="Contact Type"
      name="contactType"
      options={['Customer', 'Supplier', 'Other']}
      onChange={onRadioButtonChange('selectedContactType', onBusinessDetailsChange)}
      value={selectedContactType}
      disabled={!isCreating}
    />
    <RadioButtonGroup
      label="Designation"
      name="designation"
      options={['Company', 'Individual']}
      onChange={onRadioButtonChange('designation', onBusinessDetailsChange)}
      value={designation}
    />
    <Input
      name="referenceId"
      label="Reference"
      placeholder="Enter reference"
      value={referenceId}
      onChange={onInputChange(onBusinessDetailsChange)}
    />
    <CheckboxGroup
      label="Mark this contact as "
      labelAccessory={(
        <Tooltip>
          Inactive contacts will no longer be displayed in your contacts list
        </Tooltip>
      )}
      renderCheckbox={() => (
        <Checkbox
          name="isInactive"
          label="Inactive"
          checked={isInactive}
          onChange={onCheckboxChange(onBusinessDetailsChange)}
        />
      )}
    />
  </FieldGroup>
);

BusinessDetails.propTypes = {
  selectedContactType: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  isCreating: PropTypes.bool.isRequired,
  referenceId: PropTypes.string.isRequired,
  isInactive: PropTypes.bool.isRequired,
  onBusinessDetailsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => getBusinessDetails(state);

export default connect(mapStateToProps)(BusinessDetails);
