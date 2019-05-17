import {
  DatePicker, FormTemplate, Input, ReadOnly, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getCalculatedAge,
  getEmployeeBasisOptions,
  getEmployeeCategoryOptions,
  getEmployeePayslipDeliveryOptions,
  getEmployeeStatusOptions,
  getEmploymentDetails,
  getGenderOptions,
} from '../EmployeeDetailSelectors';

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
  employeeBasisOptions,
  employeeCategoryOptions,
  employeeStatusOptions,
  payslipDeliveryOptions,
  calculatedAge,
  onEmploymentDetailsChange,
  onEmploymentPaySlipDeliveryChange,
}) => {
  const {
    dateOfBirth,
    startDate,
    terminationDate,
    paySlipEmail,
    gender,
  } = employmentDetails;

  return (
    <FormTemplate pageHead="">
      <DatePicker
        label="Date of birth"
        name="dateOfBirth"
        value={dateOfBirth}
        onSelect={onDateChange('dateOfBirth', onEmploymentDetailsChange)}
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
        value={terminationDate}
        onSelect={onDateChange('terminationDate', onEmploymentDetailsChange)}
      />
      <Select
        name="employeeBasis"
        label="Employment basis"
        onChange={handleSelectChange(onEmploymentDetailsChange)}
      >
        {employeeBasisOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <Select
        name="employeeCategory"
        label="Employment category"
        onChange={handleSelectChange(onEmploymentDetailsChange)}
      >
        {employeeCategoryOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <Select
        name="employeeStatus"
        label="Employment status"
        onChange={handleSelectChange(onEmploymentDetailsChange)}
      >
        {employeeStatusOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <Select
        name="payslipDelivery"
        label="Payslip Delivery"
        onChange={handleSelectChange(onEmploymentPaySlipDeliveryChange)}
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
      />
    </FormTemplate>
  );
};

const employmentDetailsShape = {
  dateOfBirth: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  terminationDate: PropTypes.string.isRequired,
  paySlipEmail: PropTypes.string.isRequired,
};

const optionShape = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

EmploymentDetails.propTypes = {
  employmentDetails: PropTypes.shape(employmentDetailsShape).isRequired,
  genderOptions: PropTypes.arrayOf(PropTypes.shape(optionShape).isRequired).isRequired,
  employeeBasisOptions: PropTypes.arrayOf(PropTypes.shape(optionShape).isRequired).isRequired,
  employeeCategoryOptions: PropTypes.arrayOf(PropTypes.shape(optionShape).isRequired).isRequired,
  employeeStatusOptions: PropTypes.arrayOf(PropTypes.shape(optionShape).isRequired).isRequired,
  payslipDeliveryOptions: PropTypes.arrayOf(PropTypes.shape(optionShape).isRequired).isRequired,
  calculatedAge: PropTypes.string.isRequired,
  onEmploymentDetailsChange: PropTypes.func.isRequired,
  onEmploymentPaySlipDeliveryChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  employmentDetails: getEmploymentDetails(state),
  genderOptions: getGenderOptions(state),
  employeeBasisOptions: getEmployeeBasisOptions(state),
  employeeCategoryOptions: getEmployeeCategoryOptions(state),
  employeeStatusOptions: getEmployeeStatusOptions(state),
  payslipDeliveryOptions: getEmployeePayslipDeliveryOptions(state),
  calculatedAge: getCalculatedAge(state),
});

export default connect(mapStateToProps)(EmploymentDetails);
