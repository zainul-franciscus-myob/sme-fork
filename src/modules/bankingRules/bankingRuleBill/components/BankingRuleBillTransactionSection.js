import {
  FieldSet,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getSupplierId,
  getSuppliers,
} from '../bankingRuleBillSelectors';
import SupplierCombobox from '../../../../components/combobox/SupplierCombobox';
import styles from './BankingRuleBillView.module.css';

const handleComboboxChange = (key, handler) => (item) => {
  handler({
    key,
    value: item.id,
  });
};

const BankingRuleBillTransactionSection = ({
  supplierId,
  suppliers,
  onRuleConditionsChange,
}) => (
  <React.Fragment>
    <FieldSet
      className={`${styles.formSubGroup} ${styles.form}`}
      label="Suggest matches from this suppliers's unpaid bills"
      renderField={() => (
        <SupplierCombobox
          items={suppliers}
          selectedId={supplierId}
          label="Supplier"
          requiredLabel="This is required"
          hideLabel={false}
          onChange={handleComboboxChange('supplierId', onRuleConditionsChange)}
        />
      )}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  supplierId: getSupplierId(state),
  suppliers: getSuppliers(state),
});

export default connect(mapStateToProps)(BankingRuleBillTransactionSection);
