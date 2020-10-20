import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Icons,
  Input,
  RadioButton,
  RadioButtonGroup,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactDetails,
  getIsLoadingAccount,
} from '../contactDetailSelectors';
import AbnSection from './AbnSection';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onRadioButtonChange = (name, handler) => ({ value }) => {
  handler({ key: name, value });
};

const onCheckboxChange = (handler) => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const ContactDetails = ({
  region,
  selectedContactType,
  designation,
  isCreating,
  isLoadingAccount,
  referenceId,
  isInactive,
  companyName,
  isCompany,
  firstName,
  isSupplier,
  lastName,
  contactTypes,
  accountOptions,
  isReportable,
  expenseAccountId,
  onContactDetailsChange,
  onAddAccount,
  onAbnBlur,
}) => (
  <FieldGroup label="Details">
    <RadioButtonGroup
      label="Contact type"
      requiredLabel="This is required"
      name="contactType"
      onChange={onRadioButtonChange(
        'selectedContactType',
        onContactDetailsChange
      )}
      renderRadios={({ id, value, ...props }) =>
        contactTypes.map((item) => (
          <RadioButton
            {...props}
            checked={item.value === selectedContactType}
            key={item.value}
            value={item.value}
            label={item.name}
          />
        ))
      }
      disabled={!isCreating}
    />
    <RadioButtonGroup
      label="Designation"
      name="designation"
      options={['Company', 'Individual']}
      onChange={onRadioButtonChange('designation', onContactDetailsChange)}
      value={designation}
    />
    {isCompany && (
      <Input
        name="companyName"
        label="Company name"
        requiredLabel="This is required"
        value={companyName}
        onChange={onInputChange(onContactDetailsChange)}
        width="lg"
      />
    )}
    {!isCompany && (
      <Input
        name="firstName"
        label="First name"
        value={firstName}
        onChange={onInputChange(onContactDetailsChange)}
        width="lg"
      />
    )}
    {!isCompany && (
      <Input
        name="lastName"
        label="Surname or family name"
        requiredLabel="This is required"
        value={lastName}
        onChange={onInputChange(onContactDetailsChange)}
        width="lg"
      />
    )}
    {isSupplier && (
      <ReportableCheckbox
        region={region}
        id="isReportable"
        name="isReportable"
        label="Report payments to ATO via TPAR"
        checked={isReportable}
        onChange={handleCheckboxChange(onContactDetailsChange)}
        labelAccessory={
          <Tooltip>
            These are payments made to reportable contractors. They will be
            reported to the ATO in TPAR reports.
          </Tooltip>
        }
      />
    )}
    <AbnSection
      onContactDetailsChange={onContactDetailsChange}
      onBlur={onAbnBlur}
    />
    {isSupplier && (
      <AccountCombobox
        disabled={isLoadingAccount}
        allowClear
        label="Expense account"
        labelAccessory={
          <Tooltip>
            The account selected will be used for all purchases including
            transactions created from the In tray
          </Tooltip>
        }
        onChange={handleComboboxChange(
          'expenseAccountId',
          onContactDetailsChange
        )}
        addNewAccount={() =>
          onAddAccount(
            handleComboboxChange('expenseAccountId', onContactDetailsChange)
          )
        }
        items={accountOptions}
        selectedId={expenseAccountId}
        width="lg"
      />
    )}
    <Input
      name="referenceId"
      label="Contact ID"
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          Enter a reference or account ID for this contact.
        </Tooltip>
      }
      value={referenceId}
      onChange={onInputChange(onContactDetailsChange)}
      width="sm"
    />
    <CheckboxGroup
      label="Inactive"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="isInactive"
          label="Inactive contact"
          checked={isInactive}
          onChange={onCheckboxChange(onContactDetailsChange)}
        />
      )}
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  ...getContactDetails(state),
  isLoadingAccount: getIsLoadingAccount(state),
});

export default connect(mapStateToProps)(ContactDetails);
