import {
  FieldSet,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCustomerId,
  getCustomers,
} from '../bankingRuleInvoiceSelectors';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
import RequiredTooltip from '../../../components/RequiredTooltip/RequiredTooltip';
import styles from './BankingRuleInvoiceView.module.css';

const handleComboboxChange = (key, handler) => (item) => {
  handler({
    key,
    value: item.value,
  });
};

const BankingRuleInvoiceTransactionSection = ({
  customerId,
  customers,
  onRuleConditionsChange,
}) => (
  <React.Fragment>
    <FieldSet
      className={`${styles.formSubGroup} ${styles.form}`}
      label="Suggest matches from this customer's unpaid invoices"
      renderField={() => (
        <CustomerCombobox
          items={customers}
          selectedId={customerId}
          label="Customer"
          labelAccessory={(<RequiredTooltip />)}
          hideLabel={false}
          onChange={handleComboboxChange('customerId', onRuleConditionsChange)}
        />
      )}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  customerId: getCustomerId(state),
  customers: getCustomers(state),
});

export default connect(mapStateToProps)(BankingRuleInvoiceTransactionSection);
