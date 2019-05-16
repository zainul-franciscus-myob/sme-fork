import { createSelector, createStructuredSelector } from 'reselect';
import { differenceInYears } from 'date-fns';

import { mainTabIds, payrollDetailsSubTabIds } from './tabItems';
import countryList from '../../sharedData/countryList';

export const getBusinessId = state => state.businessId;
export const getIsLoading = state => state.isLoading;
export const getGenderOptions = state => state.genderOptions;
export const getEmployeeBasisOptions = state => state.employeeBasisOptions;
export const getEmployeeCategoryOptions = state => state.employeeCategoryOptions;
export const getEmployeeStatusOptions = state => state.employeeStatusOptions;
export const getEmployeePayslipDeliveryOptions = state => state.payslipDeliveryOptions;

const getStateMainTab = state => state.mainTab;
export const getMainTab = createSelector(
  getStateMainTab,
  (stateMainTab) => {
    const mainTabIdKeys = Object.keys(mainTabIds);
    const mainTabIdValues = Object.values(mainTabIds);
    const isValidMainTab = mainTabIdKeys.includes(stateMainTab);

    return isValidMainTab ? stateMainTab : mainTabIdValues[0];
  },
);

export const getStateSubTab = state => state.subTab;
export const getSubTab = createSelector(
  getMainTab,
  getStateSubTab,
  (mainTab, stateSubTab) => {
    const subTabIds = {
      payrollDetails: payrollDetailsSubTabIds,
    }[mainTab] || {};
    const subTabIdKeys = Object.keys(subTabIds);
    const subTabIdValues = Object.values(subTabIds);
    const isValidSubTab = subTabIdKeys.includes(stateSubTab);

    return isValidSubTab ? stateSubTab : subTabIdValues[0];
  },
);

export const getURLParams = createStructuredSelector({
  mainTab: getMainTab,
  subTab: getSubTab,
});

export const getEmployeeId = state => state.employeeId;

const getContactDetailPhoneNumbers = state => state.contactDetail.phoneNumbers;

const MAX_PHONE_NUMBERS = 3;
const hasAddPhoneButton = state => getContactDetailPhoneNumbers(state).length < MAX_PHONE_NUMBERS;

const getPhoneNumbers = (state) => {
  const phoneNumbers = getContactDetailPhoneNumbers(state);
  return phoneNumbers.length === 0 ? [''] : phoneNumbers;
};

export const getContactDetail = state => ({
  ...state.contactDetail,
  phoneNumbers: getPhoneNumbers(state),
  hasAddPhoneButton: hasAddPhoneButton(state),
});

const getSelectedCountry = state => state.contactDetail.country;

export const getStateOptions = createSelector(
  getSelectedCountry,
  selectedcountry => (countryList
    .find(country => country.value === selectedcountry) || {}).states,
);

export const getEmployeePayload = ({ contactDetail }) => ({
  contactDetail,
});

export const getIsActionsDisabled = state => state.isSubmitting;

export const getAlert = state => state.alert;

export const getIsCreating = state => state.employeeId === 'new';

export const getModalType = state => state.modalType;

export const getRegion = state => state.region;

export const isPageEdited = state => state.isPageEdited;

const getFirstName = state => state.contactDetail.firstName;
const getLastName = state => state.contactDetail.lastName;

export const getPageHeadTitle = (state) => {
  const employeeFullName = `${getFirstName(state)} ${getLastName(state)}`;

  return getIsCreating(state)
    ? 'Create employee'
    : employeeFullName;
};

export const getEmploymentDetails = state => state.payrollDetails.employmentDetails;

export const shouldDefaultPayslipEmail = state => state.payrollDetails.employmentDetails.paySlipEmail === ''
  && state.contactDetail.email !== '';

export const getIsStateDropdown = createSelector(
  getStateOptions,
  states => states !== undefined,
);

export const getCalculatedAge = (state) => {
  const age = differenceInYears(new Date(),
    new Date(state.payrollDetails.employmentDetails.dateOfBirth));
  return String(age || '0');
};
