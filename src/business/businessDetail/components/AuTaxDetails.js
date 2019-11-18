import { Icons, Input, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAuTaxDetails } from '../businessDetailSelectors';
import AbnInput from '../../../components/autoFormatter/AbnInput/AbnInput';
import AcnInput from '../../../components/autoFormatter/AcnInput/AcnInput';
import styles from './BusinessDetailsSection.module.css';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const AuTaxDetails = ({
  abn, gstBranchNumber, acn, onChange,
}) => (
  <React.Fragment>
    <AbnInput
      className={styles.input}
      name="abn"
      label={
        <Tooltip triggerContent="ABN">required</Tooltip>
      }
      requiredLabel="required"
      value={abn}
      maxLength={14}
      onChange={onInputChange(onChange)}
    />
    <Input
      className={styles.input}
      name="gstBranchNumber"
      label="GST branch number"
      labelAccessory={(
        <Tooltip triggerContent={<Icons.Info />}>
          {`If you've registered each branch of your business separately for GST,
          enter the number given by the ATO for this branch`}
        </Tooltip>
      )}
      value={gstBranchNumber}
      onChange={onInputChange(onChange)}
    />
    <AcnInput
      className={styles.input}
      name="acn"
      label="ACN"
      maxLength={11}
      value={acn}
      onChange={onInputChange(onChange)}
    />
  </React.Fragment>
);

const mapStateToProps = state => getAuTaxDetails(state);

export default connect(mapStateToProps)(AuTaxDetails);
