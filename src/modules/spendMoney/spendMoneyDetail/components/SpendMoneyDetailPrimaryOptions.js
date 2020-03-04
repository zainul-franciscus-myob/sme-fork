import {
  TextArea, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions, getHeaderOptions, getIsSupplierBlocking, getPrefillStatus,
} from '../spendMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import styles from './SpendMoneyDetailPrimaryOptions.module.css';

const SpendMoneyDetailPrimaryOptions = ({
  isSupplierBlocking,
  headerOptions: {
    isReportable,
    description,
    payToContacts,
    payFromAccounts,
    selectedPayToContactId,
    selectedPayFromAccountId,
    isReportableDisabled,
    shouldShowReportable,
    shouldShowAccountCode,
    region,
    expenseAccountId,
  },
  accountOptions,
  onUpdateHeaderOptions,
  prefillStatus,
}) => {
  const handleInputChange = (e) => {
    const { value, name } = e.target;

    onUpdateHeaderOptions({ key: name, value });
  };

  const handleCheckboxChange = (e) => {
    const { checked, name } = e.target;

    onUpdateHeaderOptions({ key: name, value: checked });
  };

  const handleComboBoxChange = key => (item) => {
    onUpdateHeaderOptions({ key, value: item.id });
  };

  return (
    <React.Fragment>
      <AccountCombobox
        label="Bank account"
        requiredLabel="This is required"
        hideLabel={false}
        items={payFromAccounts}
        selectedId={selectedPayFromAccountId}
        onChange={handleComboBoxChange('selectedPayFromAccountId')}
      />
      <div
        className={classnames(
          styles.contactComboBox,
          { [styles.prefilled]: prefillStatus.selectedPayToContactId },
        )}
      >
        <ContactCombobox
          items={payToContacts}
          selectedId={selectedPayToContactId}
          onChange={handleComboBoxChange('selectedPayToContactId')}
          label="Contact (payee)"
          name="Pay To Contacts"
          hideLabel={false}
          disabled={isSupplierBlocking}
        />
      </div>
      {shouldShowReportable && (
        <ReportableCheckbox
          label="Report to ATO via TPAR"
          region={region}
          name="isReportable"
          checked={isReportable}
          onChange={handleCheckboxChange}
          disabled={isReportableDisabled}
        />
      )}
      {shouldShowAccountCode && (
        <AccountCombobox
          allowClearSelection
          items={accountOptions}
          selectedId={expenseAccountId}
          onChange={handleComboBoxChange('expenseAccountId')}
          label="Account code"
          labelAccessory={(
            <Tooltip>
              The account code will be assigned to all lines on the transaction.
            </Tooltip>
          )}
          name="expenseAccountId"
          hideLabel={false}
          disabled={isSupplierBlocking}
        />
      )}
      <div className={classnames({ [styles.prefilled]: prefillStatus.description })}>
        <TextArea
          name="description"
          label="Description of transaction"
          rows={1}
          autoSize
          maxLength={255}
          resize="vertical"
          value={description}
          onChange={handleInputChange}
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isSupplierBlocking: getIsSupplierBlocking(state),
  headerOptions: getHeaderOptions(state),
  accountOptions: getAccountOptions(state),
  prefillStatus: getPrefillStatus(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailPrimaryOptions);
