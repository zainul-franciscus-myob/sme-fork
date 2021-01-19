import { Checkbox } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getShowPaidBills } from '../SupplierPaymentDetailSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './SupplierPaymentDetailTableOptions.module.css';

const SupplierPaymentDetailTableOptions = ({
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

const mapStateToProps = (state) => ({
  showPaidBills: getShowPaidBills(state),
});

export default connect(mapStateToProps)(SupplierPaymentDetailTableOptions);
