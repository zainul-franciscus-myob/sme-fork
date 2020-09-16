import { ReadOnly, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions,
  getExpenseAccountId,
  getIsBlocking,
  getIsPreConversion,
  getIsReadOnly,
  getIsReportable,
  getIsSupplierDisabled,
  getRegion,
  getShouldShowAbn,
  getShouldShowAccountCode,
  getSupplierAddress,
  getSupplierId,
} from '../selectors/billSelectors';
import { getPrefillStatus } from '../selectors/BillInTrayDocumentSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import BillAbnPopover from './BillAbnPopover';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './BillPrimaryOptions.module.css';

const BillPrimaryOptions = ({
  supplierId,
  supplierAddress,
  isReportable,
  shouldShowAccountCode,
  expenseAccountId,
  accountOptions,
  region,
  isSupplierDisabled,
  isBlocking,
  isReadOnly,
  prefillStatus,
  isPreConversion,
  shouldShowAbn,
  renderContactCombobox,
  onUpdateBillOption,
  onInputAlert,
}) => (
  <React.Fragment>
    <div
      className={classnames(styles.formControlWrapper, styles.contactComboBox, {
        [styles.prefilled]: prefillStatus.supplierId,
        [styles.maximiseContactCombobox]: !shouldShowAbn,
      })}
    >
      {renderContactCombobox({
        selectedId: supplierId,
        name: 'supplierId',
        label: 'Supplier',
        hideLabel: false,
        requiredLabel: 'This is required',
        allowClear: true,
        disabled: isSupplierDisabled || isBlocking || isReadOnly,
        onChange: handleAutoCompleteChange('supplierId', onUpdateBillOption),
        onAlert: onInputAlert,
        width: 'xl',
      })}
      {shouldShowAbn && <BillAbnPopover />}
    </div>
    {supplierAddress && (
      <ReadOnly label="Billing address" className={styles.address}>
        {supplierAddress}
      </ReadOnly>
    )}
    {!isPreConversion && (
      <ReportableCheckbox
        label="Report to ATO via TPAR"
        checked={isReportable}
        region={region}
        name="isReportable"
        onChange={handleCheckboxChange(onUpdateBillOption)}
        disabled={isSupplierDisabled || isBlocking || isReadOnly}
        width="xl"
      />
    )}
    {shouldShowAccountCode && (
      <AccountCombobox
        allowClear
        items={accountOptions}
        selectedId={expenseAccountId}
        onChange={handleComboboxChange('expenseAccountId', onUpdateBillOption)}
        label="Account code"
        labelAccessory={
          <Tooltip>
            The account code will be assigned to all lines on the bill.
          </Tooltip>
        }
        name="expenseAccountId"
        hideLabel={false}
        disabled={isSupplierDisabled || isBlocking || isReadOnly}
        width="xl"
      />
    )}
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  supplierId: getSupplierId(state),
  supplierAddress: getSupplierAddress(state),
  isReportable: getIsReportable(state),
  shouldShowAccountCode: getShouldShowAccountCode(state),
  expenseAccountId: getExpenseAccountId(state),
  accountOptions: getAccountOptions(state),
  region: getRegion(state),
  isSupplierDisabled: getIsSupplierDisabled(state),
  isBlocking: getIsBlocking(state),
  prefillStatus: getPrefillStatus(state),
  isReadOnly: getIsReadOnly(state),
  shouldShowAbn: getShouldShowAbn(state),
  isPreConversion: getIsPreConversion(state),
});

export default connect(mapStateToProps)(BillPrimaryOptions);
