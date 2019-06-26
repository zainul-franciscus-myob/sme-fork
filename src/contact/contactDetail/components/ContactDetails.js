import {
  Button,
  Checkbox,
  CheckboxGroup, Field,
  FieldGroup, Icons,
  Input,
  RadioButton,
  RadioButtonGroup, Tooltip,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getContactDetails } from '../contactDetailSelectors';
import ABNInput from '../../../components/autoFormatter/ABNInput/ABNInput';

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

const onAbnInputChange = handler => (e) => {
  const { name, rawValue } = e.target;
  handler({ key: name, value: rawValue });
};

const openNewTab = url => () => window.open(url);

const ContactDetails = ({
  selectedContactType,
  designation,
  isCreating,
  referenceId,
  isInactive,
  companyName,
  abn,
  abnLink,
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
          value={companyName}
          onChange={onInputChange(onContactDetailsChange)}
        />
      )
    }
    {
      !isCreating && isSupplier && (
      <CheckboxGroup
        label="Reportable"
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            id="isReportable"
            name="isReportable"
            label="Reportable contractor"
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
    {
      !isCompany && (
        <Input
          name="firstName"
          label="First name"
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
          value={lastName}
          onChange={onInputChange(onContactDetailsChange)}
        />
      )
    }
    <ABNInput name="abn" label="ABN" value={abn} onChange={onAbnInputChange(onContactDetailsChange)} />
    <Field
      label="ABN lookup"
      hideLabel
      renderField={
        () => (
          <Button type="link" icon={<Icons.OpenExternalLink />} iconRight onClick={openNewTab(abnLink)}>
            Open ABN lookup website
          </Button>
        )
      }
    />
    <Input
      name="referenceId"
      label="Contact ID"
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

ContactDetails.propTypes = {
  selectedContactType: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  isCreating: PropTypes.bool.isRequired,
  referenceId: PropTypes.string.isRequired,
  isInactive: PropTypes.bool.isRequired,
  companyName: PropTypes.string.isRequired,
  abn: PropTypes.string.isRequired,
  abnLink: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  isCompany: PropTypes.bool.isRequired,
  isSupplier: PropTypes.bool.isRequired,
  isReportable: PropTypes.bool.isRequired,
  contactTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onContactDetailsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => getContactDetails(state);

export default connect(mapStateToProps)(ContactDetails);
