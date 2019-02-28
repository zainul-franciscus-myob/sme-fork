import { Input, TextArea } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getContactDetails } from '../businessDetailSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const ContactDetailsSection = ({
  phoneNumber, fax, email, address, onChange,
}) => (
  <div>
    <h2>Contact details</h2>
    <Input
      name="phoneNumber"
      label="Phone Number"
      value={phoneNumber}
      onChange={onInputChange(onChange)}
    />
    <Input
      name="fax"
      label="Fax"
      value={fax}
      onChange={onInputChange(onChange)}
    />
    <Input
      name="email"
      label="Email"
      value={email}
      onChange={onInputChange(onChange)}
    />
    <TextArea
      name="address"
      label="Address"
      autoSize
      maxLength={255}
      value={address}
      onChange={onInputChange(onChange)}
    />
  </div>
);

ContactDetailsSection.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  fax: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => getContactDetails(state);

export default connect(mapStateToProps)(ContactDetailsSection);
