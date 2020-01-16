import { Checkbox } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getShowPaidBills } from '../BillPaymentDetailSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './BillPaymentDetailTableOptions.module.css';

const BillPaymentDetailTableOptions = ({
  showPaidBills,
  onUpdateHeaderOption,
}) => (
  <div className={styles.container}>
    <Checkbox
      name="showPaidBills"
      label="Show closed bills"
      checked={showPaidBills}
      onChange={handleCheckboxChange(onUpdateHeaderOption)}
    />
  </div>
);

const mapStateToProps = state => ({
  showPaidBills: getShowPaidBills(state),
});

export default connect(mapStateToProps)(BillPaymentDetailTableOptions);
