import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFirstName, getLastName } from '../../ContactModalSelectors';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const IndividualName = ({ firstName, lastName, onChange }) => (
  <>
    <Input
      name="firstName"
      label="First name"
      value={firstName}
      onChange={handleInputChange(onChange)}
    />
    <Input
      name="lastName"
      label="Surname or family name"
      requiredLabel="This is required"
      value={lastName}
      onChange={handleInputChange(onChange)}
    />
  </>
);

const mapStateToProps = (state) => ({
  firstName: getFirstName(state),
  lastName: getLastName(state),
});

export default connect(mapStateToProps)(IndividualName);
