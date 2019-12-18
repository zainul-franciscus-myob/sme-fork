import { FieldGroup, Input, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getContactDetails } from '../businessDetailSelectors';
import styles from './ContactDetailsSection.module.css';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const ContactDetailsSection = ({
  phoneNumber, fax, email, address, onChange,
}) => (
  <FieldGroup label="Contact details">
    <TextArea
      className={styles.address}
      name="address"
      label="Address"
      autoSize
      resize="vertical"
      maxLength={255}
      value={address}
      onChange={onInputChange(onChange)}
    />
    <Input
      className={styles.email}
      name="email"
      label="Email"
      value={email}
      onChange={onInputChange(onChange)}
    />
    <Input
      className={styles.phone}
      name="phoneNumber"
      label="Phone"
      value={phoneNumber}
      onChange={onInputChange(onChange)}
    />
    <Input
      className={styles.fax}
      name="fax"
      label="Fax"
      value={fax}
      onChange={onInputChange(onChange)}
    />
  </FieldGroup>
);

const mapStateToProps = state => getContactDetails(state);

export default connect(mapStateToProps)(ContactDetailsSection);
