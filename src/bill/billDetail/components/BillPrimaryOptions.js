import { ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getIsReportable,
  getIsSupplierDisabled,
  getRegion,
  getSupplierAddress,
  getSupplierId,
  getSupplierOptions,
} from '../selectors/billSelectors';
import { getPrefillStatus } from '../selectors/BillInTrayDocumentSelectors';
import ReportableCheckbox from '../../../components/ReportableCheckbox/ReportableCheckbox';
import SupplierCombobox from '../../../components/combobox/SupplierCombobox';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import styles from './BillPrimaryOptions.module.css';

const BillPrimaryOptions = ({
  supplierOptions,
  supplierId,
  supplierAddress,
  isReportable,
  region,
  isSupplierDisabled,
  prefillStatus,
  onUpdateBillOption,
  onAddSupplierButtonClick,
}) => (
  <React.Fragment>
    <div className={
      classnames(styles.formControlWrapper, { [styles.prefilled]: prefillStatus.supplierId })}
    >
      <SupplierCombobox
        items={supplierOptions}
        selectedId={supplierId}
        onChange={handleComboboxChange('supplierId', onUpdateBillOption)}
        label="Supplier"
        name="supplierId"
        requiredLabel="This is required"
        hideLabel={false}
        disabled={isSupplierDisabled}
        addNewItem={{
          label: 'Create supplier',
          onAddNew: onAddSupplierButtonClick,
        }}
      />
    </div>
    {supplierAddress && <ReadOnly label="Billing address" className={styles.address}>{supplierAddress}</ReadOnly>}
    <ReportableCheckbox
      label="Report to ATO via TPAR"
      checked={isReportable}
      region={region}
      name="isReportable"
      onChange={handleCheckboxChange(onUpdateBillOption)}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  supplierOptions: getSupplierOptions(state),
  supplierId: getSupplierId(state),
  supplierAddress: getSupplierAddress(state),
  isReportable: getIsReportable(state),
  region: getRegion(state),
  isSupplierDisabled: getIsSupplierDisabled(state),
  prefillStatus: getPrefillStatus(state),
});

export default connect(mapStateToProps)(BillPrimaryOptions);
