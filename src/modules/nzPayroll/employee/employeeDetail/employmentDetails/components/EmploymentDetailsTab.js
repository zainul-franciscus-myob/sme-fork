import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { useCallback } from 'react';

import {
  getCalculatedAge,
  getDateOfBirth,
  getEmploymentStatus,
  getGender,
  getGenderOptions,
  getStartDate,
  getTerminationDate,
} from '../EmploymentDetailsSelectors';
import EmploymentFieldGroup from './EmploymentFieldGroup';
import PersonalEmploymentFieldGroup from './PersonalEmploymentFieldGroup';


const EmploymentDetailsNzTab = ({
  dateOfBirth,
  gender,
  calculatedAge,
  genderOptions,
  startDate,
  terminationDate,
  employmentStatus,
  onEmploymentDetailsChange,
}) => {
  const onInputChange = useCallback(
    target => onEmploymentDetailsChange({
      key: target.name,
      value: target.value,
    }),
    [onEmploymentDetailsChange],
  );

  const onDateChange = (fieldName) => ({ value }) => onInputChange({ name: fieldName, value });

  const onSelectChange = ({ target }) => onInputChange(target);

  return (<FormHorizontal layout="primary">
    <PersonalEmploymentFieldGroup
      dateOfBirth={dateOfBirth}
      gender={gender}
      calculatedAge={calculatedAge}
      genderOptions={genderOptions}
      onDateChange={onDateChange}
      onSelectChange={onSelectChange}
    />
    <EmploymentFieldGroup
      startDate={startDate}
      terminationDate={terminationDate}
      employmentStatus={employmentStatus}
      onDateChange={onDateChange}
    />
  </FormHorizontal>);
};

const mapStateToProps = (state) => ({
  dateOfBirth: getDateOfBirth(state),
  gender: getGender(state),
  calculatedAge: getCalculatedAge(state),
  genderOptions: getGenderOptions(state),

  startDate: getStartDate(state),
  terminationDate: getTerminationDate(state),
  employmentStatus: getEmploymentStatus(state),
});

export default connect(mapStateToProps)(EmploymentDetailsNzTab);
