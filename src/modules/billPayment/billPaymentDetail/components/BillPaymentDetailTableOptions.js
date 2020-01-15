import { Checkbox } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBillPaymentTableOptions } from '../BillPaymentDetailSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './BillPaymentDetailTableOptions.module.css';

const BillPaymentDetailTableOptions = ({
  showPaidBills,
  shouldDisableFields,
  onUpdateHeaderOption,
}) => (
  <div className={styles.container}>
    <Checkbox
      disabled={shouldDisableFields}
      name="showPaidBills"
      label="Show closed bills"
      checked={showPaidBills}
      onChange={handleCheckboxChange(onUpdateHeaderOption)}
    />
  </div>
);

const mapStateToProps = state => getBillPaymentTableOptions(state);

export default connect(mapStateToProps)(BillPaymentDetailTableOptions);
