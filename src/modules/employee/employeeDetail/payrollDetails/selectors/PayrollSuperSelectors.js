import { createSelector } from 'reselect/lib/index';

export const getSelectedSuperFundId = state => (
  state.payrollDetails.superannuationDetails.selectedSuperFundId
);

export const getEmployeeMembershipNumber = state => (
  state.payrollDetails.superannuationDetails.employeeMembershipNumber
);

export const getAllocatedPayItems = state => (
  state.payrollDetails.superannuationDetails.allocatedPayItems
);

export const getSuperFundOptions = state => state.superFundOptions;

export const getSuperPayItemOptions = state => state.superPayItemOptions;

export const getFilteredSuperPayItemOptions = createSelector(
  getSuperPayItemOptions,
  getAllocatedPayItems,
  (payItemOptions, allocatedPayItems) => payItemOptions.filter((payItemOption) => {
    const listedItems = allocatedPayItems.find(
      allocatedPayItem => allocatedPayItem.id === payItemOption.id,
    );
    return !listedItems;
  }),
);

export const getCreateSuperChoiceFormLink = () => 'https://www.ato.gov.au/assets/0/104/2244/2335/35c234b5-6918-4dd0-a3db-95edfd76adc0.pdf';

export const getShowAddSuperPayItemButton = state => (
  state.payrollDetails.superannuationDetails.showAddSuperPayItemButton
);
