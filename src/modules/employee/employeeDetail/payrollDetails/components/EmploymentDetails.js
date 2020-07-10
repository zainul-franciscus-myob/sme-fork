import {
  DatePicker,
  FieldGroup,
  FormHorizontal,
  Input,
  RadioButton,
  RadioButtonGroup,
  ReadOnly,
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCalculatedAge,
  getEmployeePayslipDeliveryOptions,
  getEmploymentBasisOptions,
  getEmploymentCategoryOptions,
  getEmploymentDetails,
  getEmploymentStatusOptions,
  getGenderOptions,
  getIsPaySlipEmailRequired,
} from '../selectors/EmploymentDetailsSelectors';
import handleRadioButtonChange from '../../../../../components/handlers/handleRadioButtonChange';

const handleSelectChange = (handler) => (e) => {
  const { name, value } = e.target;

  handler({ key: name, value });
};

const handleInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onDateChange = (fieldName, handler) => ({ value }) => {
  handler({ key: fieldName, value });
};

const EmploymentDetails = ({
  employmentDetails,
  genderOptions,
  employmentBasisOptions,
  employmentCategoryOptions,
  employmentStatusOptions,
  payslipDeliveryOptions,
  calculatedAge,
  onEmploymentDetailsChange,
  onEmploymentPaySlipDeliveryChange,
  isPaySlipEmailRequired,
}) => {
  const {
    dateOfBirth,
    startDate,
    terminationDate,
    paySlipEmail,
    gender,
    employmentBasis,
    employmentCategory,
    employmentStatus,
    paySlipDelivery,
  } = employmentDetails;

  return (
    <FormHorizontal layout="primary">
      <FieldGroup label="Personal">
        <DatePicker
          label="Date of birth"
          name="dateOfBirth"
          value={dateOfBirth}
          onSelect={onDateChange('dateOfBirth', onEmploymentDetailsChange)}
          width="sm"
        />
        <ReadOnly label="Calculated age" name="calculatedAge">
          {calculatedAge}
        </ReadOnly>
        <Select
          name="gender"
          label="Gender"
          onChange={handleSelectChange(onEmploymentDetailsChange)}
          value={gender}
          width="lg"
        >
          {genderOptions.map(({ name, value }) => (
            <Select.Option key={value} value={value} label={name} />
          ))}
        </Select>
      </FieldGroup>
      <FieldGroup label="Employment">
        <DatePicker
          label="Start date"
          name="startDate"
          value={startDate}
          onSelect={onDateChange('startDate', onEmploymentDetailsChange)}
          width="sm"
        />
        <DatePicker
          label="Termination date"
          name="terminationDate"
          testid="terminationDate"
          value={terminationDate}
          onSelect={onDateChange('terminationDate', onEmploymentDetailsChange)}
          width="sm"
        />
        <RadioButtonGroup
          name="employmentBasis"
          label="Employment basis"
          value={employmentBasis}
          renderRadios={({ id, value, ...props }) =>
            employmentBasisOptions.map((item) => (
              <RadioButton
                {...props}
                checked={item.value === employmentBasis}
                key={item.value}
                value={item.value}
                label={item.name}
              />
            ))
          }
          onChange={handleRadioButtonChange(
            'employmentBasis',
            onEmploymentDetailsChange
          )}
        />
        <RadioButtonGroup
          name="employmentCategory"
          label="Employment category"
          value={employmentCategory}
          options={employmentCategoryOptions.map((option) => option.value)}
          onChange={handleRadioButtonChange(
            'employmentCategory',
            onEmploymentDetailsChange
          )}
        />
        <Select
          name="employmentStatus"
          label="Employment status"
          onChange={handleSelectChange(onEmploymentDetailsChange)}
          value={employmentStatus}
          width="lg"
        >
          {employmentStatusOptions.map(({ name, value }) => (
            <Select.Option key={value} value={value} label={name} />
          ))}
        </Select>
      </FieldGroup>
      <FieldGroup label="Pay slips">
        <Select
          name="paySlipDelivery"
          label="Default pay slip delivery"
          onChange={handleSelectChange(onEmploymentPaySlipDeliveryChange)}
          value={paySlipDelivery}
          width="lg"
        >
          {payslipDeliveryOptions.map(({ name, value }) => (
            <Select.Option key={value} value={value} label={name} />
          ))}
        </Select>
        <Input
          label="Pay slip email"
          name="paySlipEmail"
          value={paySlipEmail}
          onChange={handleInputChange(onEmploymentDetailsChange)}
          requiredLabel={
            isPaySlipEmailRequired ? 'Pay slip email is required' : null
          }
          width="lg"
        />
      </FieldGroup>
    </FormHorizontal>
  );
};

const mapStateToProps = (state) => ({
  employmentDetails: getEmploymentDetails(state),
  genderOptions: getGenderOptions(state),
  employmentBasisOptions: getEmploymentBasisOptions(state),
  employmentCategoryOptions: getEmploymentCategoryOptions(state),
  employmentStatusOptions: getEmploymentStatusOptions(state),
  payslipDeliveryOptions: getEmployeePayslipDeliveryOptions(state),
  calculatedAge: getCalculatedAge(state),
  isPaySlipEmailRequired: getIsPaySlipEmailRequired(state),
});

export default connect(mapStateToProps)(EmploymentDetails);
