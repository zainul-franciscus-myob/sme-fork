import { createSelector, createStructuredSelector } from 'reselect/lib/index';

import { getPayHistoryDetailsPayload } from './payrollDetails/selectors/PayrollPayHistorySelectors';
import { getStandardPayDetailsPayload } from './payrollDetails/selectors/PayrollStandardPaySelectors';
import { mainTabIds, payrollDetailsSubTabIds } from './tabItems';
import ModalTypes from './ModalTypes';

export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getIsPayrollSetup = state => state.isPayrollSetup;
export const getModal = state => state.modal;
export const getModalUrl = state => ((state.modal || {}).url);

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

export const getEmployeeListUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/employee`;
};

export const getEmployeeDetailUrl = (state, employeeId) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/employee/${employeeId}`;
};

export const getEmployeePayload = (state) => {
  const { contactDetail, payrollDetails, paymentDetails } = state;
  const standardPayDetails = getStandardPayDetailsPayload(state);
  const payHistoryDetails = getPayHistoryDetailsPayload(state);

  return ({
    contactDetail,
    payrollDetails: {
      ...payrollDetails,
      standardPayDetails,
      payHistoryDetails,
    },
    paymentDetails,
  });
};

export const getPayrollSettingsLink = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/payrollSettings?tab=general`;
};

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalTypes.NONE };

  return modal.type;
};
