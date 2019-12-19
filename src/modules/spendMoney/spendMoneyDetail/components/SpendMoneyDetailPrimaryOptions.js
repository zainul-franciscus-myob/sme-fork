import {
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import { getHeaderOptions, getPrefillStatus } from '../spendMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import styles from './SpendMoneyDetailPrimaryOptions.module.css';

const SpendMoneyDetailPrimaryOptions = ({
  headerOptions: {
    isReportable,
    description,
    payToContacts,
    payFromAccounts,
    selectedPayToContactId,
    selectedPayFromAccountId,
    isReportableDisabled,
    shouldShowReportable,
    region,
  },
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
  headerOptions: getHeaderOptions(state),
  prefillStatus: getPrefillStatus(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailPrimaryOptions);
