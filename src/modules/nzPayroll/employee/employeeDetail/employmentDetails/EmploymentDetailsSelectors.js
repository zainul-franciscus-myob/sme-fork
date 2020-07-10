import { createSelector } from 'reselect';
import { differenceInYears } from 'date-fns';

const getEmploymentDetails = (state) =>
  state.payrollDetails?.employmentDetails || {};

export const getDateOfBirth = createSelector(
  getEmploymentDetails,
  ({ dateOfBirth }) => dateOfBirth
);
export const getCalculatedAge = createSelector(
  getDateOfBirth,
  (dateOfBirth) => {
    const age = differenceInYears(Date.now(), new Date(dateOfBirth));
    return String(age >= 0 ? age : '-');
  }
);

export const getGender = createSelector(
  getEmploymentDetails,
  ({ gender }) => gender
);

export const getStartDate = createSelector(
  getEmploymentDetails,
  ({ startDate }) => startDate
);
export const getTerminationDate = createSelector(
  getEmploymentDetails,
  ({ terminationDate }) => terminationDate
);
export const getEmploymentStatus = createSelector(
  getEmploymentDetails,
  ({ employmentStatus }) => employmentStatus
);

export const getGenderOptions = (state) => state.genderOptions;
