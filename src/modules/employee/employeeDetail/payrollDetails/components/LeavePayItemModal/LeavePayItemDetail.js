import { FieldGroup, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getName } from '../../selectors/LeavePayItemModalSelectors';

const handleInputChange = (handler) => (e) => {
  const { value } = e.target;
  handler({ value });
};

const LeavePayItemDetail = ({ name, onNameChange }) => (
  <FieldGroup label="Details">
    <Input
      name="name"
      label="Name"
      value={name}
      onChange={handleInputChange(onNameChange)}
      maxLength={31}
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  name: getName(state),
});

export default connect(mapStateToProps)(LeavePayItemDetail);
