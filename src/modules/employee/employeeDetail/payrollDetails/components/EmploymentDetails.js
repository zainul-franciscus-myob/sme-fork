import {
  DatePicker, FormTemplate, Input, ReadOnly, Select,
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

const handleSelectChange = handler => (e) => {
  const { name, value } = e.target;

  handler({ key: name, value });
};

const handleInputChange = handler => (e) => {
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
    <FormTemplate pageHead="">
      <DatePicker
        label="Date of birth"
        name="dateOfBirth"
        value={dateOfBirth}
        onSelect={onDateChange('dateOfBirth', onEmploymentDetailsChange)}
        requiredLabel="Date of birth is required"
      />
      <ReadOnly label="Calculated age" name="calculatedAge">{calculatedAge}</ReadOnly>
      <Select name="gender" label="Gender" onChange={handleSelectChange(onEmploymentDetailsChange)} value={gender}>
        {genderOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <DatePicker
        label="Start date"
        name="startDate"
        value={startDate}
        onSelect={onDateChange('startDate', onEmploymentDetailsChange)}
      />
      <DatePicker
        label="Termination date"
        name="terminationDate"
        testid="terminationDate"
        value={terminationDate}
        onSelect={onDateChange('terminationDate', onEmploymentDetailsChange)}
      />
      <Select
        name="employmentBasis"
        label="Employment basis"
        onChange={handleSelectChange(onEmploymentDetailsChange)}
        value={employmentBasis}
      >
        {employmentBasisOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <Select
        name="employmentCategory"
        label="Employment category"
        onChange={handleSelectChange(onEmploymentDetailsChange)}
        value={employmentCategory}
      >
        {employmentCategoryOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <Select
        name="employmentStatus"
        label="Employment status"
        onChange={handleSelectChange(onEmploymentDetailsChange)}
        value={employmentStatus}
      >
        {employmentStatusOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <Select
        name="paySlipDelivery"
        label="Payslip Delivery"
        onChange={handleSelectChange(onEmploymentPaySlipDeliveryChange)}
        value={paySlipDelivery}
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
        requiredLabel={isPaySlipEmailRequired ? 'Pay slip email is required' : null}
      />
    </FormTemplate>
  );
};

const mapStateToProps = state => ({
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
