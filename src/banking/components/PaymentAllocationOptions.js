import { Checkbox } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOptions } from '../bankingSelectors/paymentAllocationSelectors';
import SupplierCombobox from '../../components/combobox/SupplierCombobox';
import styles from './BankingView.module.css';

const handleComboBoxChange = (key, handler) => (item) => {
  handler({ key, value: item.id });
};

const handleCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const PaymentAllocationOptions = (props) => {
  const {
    contactId,
    contacts,
    contactLabel,
    showPaid,
    showPaidLabel,
    onUpdatePaymentAllocationOptions,
  } = props;

  return (
    <div className={styles.paymentAllocationFilterOptions}>
      <SupplierCombobox
        label={contactLabel}
        name="contact"
        hideLabel={false}
        items={contacts}
        selectedId={contactId}
        onChange={handleComboBoxChange('contactId', onUpdatePaymentAllocationOptions)}
      />
      <div className="form-group">
        <div className={styles.checkbox}>
          <Checkbox
            name="showPaid"
            label={showPaidLabel}
            checked={showPaid}
            onChange={handleCheckboxChange(onUpdatePaymentAllocationOptions)}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => getOptions(state);

export default connect(mapStateToProps)(PaymentAllocationOptions);
