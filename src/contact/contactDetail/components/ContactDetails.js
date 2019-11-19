import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
  RadioButton,
  RadioButtonGroup, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getContactDetails } from '../contactDetailSelectors';
import AbnSection from './AbnSection';
import style from './ContactDetails.module.css';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onRadioButtonChange = (name, handler) => ({ value }) => {
  handler({ key: name, value });
};

const onCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const ContactDetails = ({
  selectedContactType,
  designation,
  isCreating,
  referenceId,
  isInactive,
  companyName,
  isCompany,
  isSupplier,
  firstName,
  lastName,
  isReportable,
  contactTypes,
  onContactDetailsChange,
}) => (
  <FieldGroup label="Details">
    <RadioButtonGroup
      label="Contact type"
      requiredLabel="This is required"
      name="contactType"
      onChange={onRadioButtonChange('selectedContactType', onContactDetailsChange)}
      renderRadios={({ id, value, ...props }) => contactTypes.map(item => (
        <RadioButton
          {...props}
          checked={item.value === selectedContactType}
          key={item.value}
          value={item.value}
          label={item.name}
        />))}
      disabled={!isCreating}
    />
    <RadioButtonGroup
      label="Designation"
      name="designation"
      options={['Company', 'Individual']}
      onChange={onRadioButtonChange('designation', onContactDetailsChange)}
      value={designation}
    />
    {
      isCompany && (
        <Input
          name="companyName"
          label="Company name"
          requiredLabel="This is required"
          className={style.companyName}
          value={companyName}
          onChange={onInputChange(onContactDetailsChange)}
        />
      )
    }
    {
      !isCompany && (
        <Input
          name="firstName"
          label="First name"
          className={style.firstName}
          value={firstName}
          onChange={onInputChange(onContactDetailsChange)}
        />
      )
    }
    {
      !isCompany && (
        <Input
          name="lastName"
          label="Surname or family name"
          requiredLabel="This is required"
          className={style.lastName}
          value={lastName}
          onChange={onInputChange(onContactDetailsChange)}
        />
      )
    }
    {
      isSupplier && (
      <CheckboxGroup
        label="Reportable"
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            id="isReportable"
            name="isReportable"
            label="Report payments to ATO via TPAR"
            labelAccessory={(
              <Tooltip>
                These are payments made to reportable contractors.
                They will be reported to the ATO in TPAR reports.
              </Tooltip>
            )}
            checked={isReportable}
            onChange={onCheckboxChange(onContactDetailsChange)}
          />
        )}
      />
      )
    }
    <AbnSection onContactDetailsChange={onContactDetailsChange} />
    <Input
      name="referenceId"
      label="Contact ID"
      requiredLabel="This is required"
      className={style.contactId}
      value={referenceId}
      onChange={onInputChange(onContactDetailsChange)}
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

const mapStateToProps = state => getContactDetails(state);

export default connect(mapStateToProps)(ContactDetails);
