import {
  DetailHeader,
  FieldGroup,
  Input,
  Spinner,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import { getHeaderOptions } from '../RecurringSpendMoneySelectors';
import AbnPopover from '../../../../components/autoFormatter/AbnInput/AbnPopover';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './RecurringSpendMoneyOptions.module.css';

const handleContactComboboxChange = (key, handler) => (item) => {
  handler({ key, item });
};

const RecurringSpendMoneyOptions = ({
  payFromAccountId,
  payToContactId,
  isReportable,
  description,
  isTaxInclusive,
  bankStatementText,
  payFromAccountOptions = [],
  abn,
  region,
  shouldShowReportable,
  isReportableDisabled,
  showBankStatementText,
  taxInclusiveLabel,
  taxExclusiveLabel,
  isAbnLoading,
  abnLink,
  editContactUrl,
  listeners: { onUpdateHeaderOptions, onUpdatePayToContact },
  renderContactCombobox,
  shouldShowAbn,
}) => {
  const abnSpinner = (
    <div className={styles.spinner}>
      <Spinner size="small" />
    </div>
  );
  const abnDetail = (
    <AbnPopover {...abn} abnLink={abnLink} editContactUrl={editContactUrl} />
  );
  const abnInfo = isAbnLoading ? abnSpinner : shouldShowAbn && abnDetail;
  const abnShown = shouldShowAbn ? '' : styles.maximiseContactCombobox;

  const primary = (
    <>
      <AccountCombobox
        label="Bank account"
        requiredLabel="This is required"
        hideLabel={false}
        items={payFromAccountOptions}
        selectedId={payFromAccountId}
        onChange={handleComboboxChange(
          'payFromAccountId',
          onUpdateHeaderOptions
        )}
        width="xl"
      />
      <div className={classnames(styles.contactComboBox, abnShown)}>
        {renderContactCombobox({
          selectedId: payToContactId,
          name: 'payToContacts',
          label: 'Contact (payee)',
          hideLabel: false,
          allowClear: true,
          onChange: handleContactComboboxChange(
            'payToContactId',
            onUpdatePayToContact
          ),
          width: 'xl',
        })}
        {abnInfo}
      </div>
      {shouldShowReportable && (
        <ReportableCheckbox
          label="Report to ATO via TPAR"
          region={region}
          name="isReportable"
          checked={isReportable}
          onChange={handleCheckboxChange(onUpdateHeaderOptions)}
          disabled={isReportableDisabled}
        />
      )}
      {showBankStatementText && (
        <Input
          name="bankStatementText"
          label="Bank statement text"
          value={bankStatementText}
          onChange={handleInputChange(onUpdateHeaderOptions)}
          requiredLabel="This is required"
          maxLength={18}
          width="xl"
        />
      )}
      <TextArea
        name="description"
        label="Description of transaction"
        rows={1}
        autoSize
        maxLength={255}
        resize="vertical"
        value={description}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        width="xl"
      />
    </>
  );

  const secondary = (
    <BooleanRadioButtonGroup
      name="isTaxInclusive"
      label="Amounts are"
      value={isTaxInclusive}
      trueLabel={taxInclusiveLabel}
      falseLabel={taxExclusiveLabel}
      handler={onUpdateHeaderOptions}
    />
  );

  return (
    <FieldGroup
      label="Create a transaction with this information"
      className={styles.options}
    >
      <DetailHeader
        primary={primary}
        secondary={secondary}
        className={styles.detail}
      />
    </FieldGroup>
  );
};

const mapStateToProps = (state) => getHeaderOptions(state);

export default connect(mapStateToProps)(RecurringSpendMoneyOptions);
