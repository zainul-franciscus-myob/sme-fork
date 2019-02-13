import {
  Checkbox, Input, InputLabel, RadioButton, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getBusinessDetails } from '../contactDetailSelectors';
import styles from './BusinessDetails.css';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onRadioButtonChange = onInputChange;

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
  <div>
    <h2>Business details</h2>
    <div className="form-group">
      <InputLabel label="Contact type" id="contactType" />
      <div className={styles.radioGroup}>
        <div>
          <RadioButton
            name="selectedContactType"
            label="Customer"
            value="Customer"
            checked={selectedContactType === 'Customer'}
            disabled={!isCreating}
            onChange={onRadioButtonChange(onBusinessDetailsChange)}
          />
        </div>
        <div>
          <RadioButton
            name="selectedContactType"
            label="Supplier"
            value="Supplier"
            checked={selectedContactType === 'Supplier'}
            disabled={!isCreating}
            onChange={onRadioButtonChange(onBusinessDetailsChange)}
          />
        </div>
        <div>
          <RadioButton
            name="selectedContactType"
            label="Other"
            value="Other"
            checked={selectedContactType === 'Other'}
            disabled={!isCreating}
            onChange={onRadioButtonChange(onBusinessDetailsChange)}
          />
        </div>
      </div>
    </div>

    <div className="form-group">
      <InputLabel label="Designation" id="designation" />
      <div className={styles.radioGroup}>
        <div>
          <RadioButton
            name="designation"
            label="Company"
            value="Company"
            checked={designation === 'Company'}
            onChange={onRadioButtonChange(onBusinessDetailsChange)}
          />
        </div>
        <div>
          <RadioButton
            name="designation"
            label="Individual"
            value="Individual"
            checked={designation === 'Individual'}
            onChange={onRadioButtonChange(onBusinessDetailsChange)}
          />
        </div>
      </div>
    </div>

    <Input
      name="referenceId"
      label="reference"
      placeholder="Enter reference"
      value={referenceId}
      onChange={onInputChange(onBusinessDetailsChange)}
    />
    <div className="form-group">
      <InputLabel label="Mark this contact as " id="isInactive" />
      <Tooltip className={styles.tooltip}>
        Inactive contacts will no longer be displayed in your contacts list
      </Tooltip>
      <div className={styles.checkbox}>
        <Checkbox
          name="isInactive"
          label="Inactive"
          checked={isInactive}
          onChange={onCheckboxChange(onBusinessDetailsChange)}
        />
      </div>
    </div>
  </div>
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
