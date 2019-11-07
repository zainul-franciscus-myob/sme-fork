import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNzTaxDetails } from '../businessDetailSelectors';
import styles from './BusinessDetailsSection.module.css';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const NzTaxDetails = ({ irdNumber, nzbn, onChange }) => (
  <React.Fragment>
    <Input
      className={styles.input}
      name="irdNumber"
      label="IRD Number/GST Number"
      value={irdNumber}
      requiredLabel="required"
      onChange={onInputChange(onChange)}
    />
    <Input
      className={styles.input}
      name="nzbn"
      label="NZ Business Number (NZBN)"
      maxLength={19}
      value={nzbn}
      onChange={onInputChange(onChange)}
    />
  </React.Fragment>
);

const mapStateToProps = state => getNzTaxDetails(state);

export default connect(mapStateToProps)(NzTaxDetails);
