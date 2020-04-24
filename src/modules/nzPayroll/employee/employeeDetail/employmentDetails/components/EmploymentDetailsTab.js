import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

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
}) => (
  <FormHorizontal layout="primary">
    <PersonalEmploymentFieldGroup
      dateOfBirth={dateOfBirth}
      gender={gender}
      calculatedAge={calculatedAge}
      genderOptions={genderOptions}
    />
    <EmploymentFieldGroup
      startDate={startDate}
      terminationDate={terminationDate}
      employmentStatus={employmentStatus}
    />
  </FormHorizontal>
);

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
