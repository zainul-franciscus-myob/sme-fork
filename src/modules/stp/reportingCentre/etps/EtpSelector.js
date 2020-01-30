import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getLoadingState = state => state.loadingState;
export const getAlert = state => state.alert;
export const getEmployeeName = state => state.name;
export const getPays = state => state.pays;

export const getAllSelectedStatus = createSelector(
  state => state.pays.filter(entry => entry.isSelected).length,
  state => state.pays.length,
  (selectedCount, entryCount) => {
    if (entryCount > 0 && selectedCount === entryCount) {
      return 'checked';
    }
    if (selectedCount > 0) {
      return 'indeterminate';
    }
    return '';
  },
);

export const getLoadEmployeeEtpsUrlParams = state => ({
  businessId: getBusinessId(state),
  employeeId: state.employeeId,
});

export const getLoadEmployeeEtpsParams = state => ({
  year: state.year,
});

export const getStpTerminationsLink = (state) => {
  const region = getRegion(state);
  const businessId = getBusinessId(state);
  return `/#/${region}/${businessId}/stp/reportingCentre?tab=terminations`;
};

export const getStpDeclarationContext = state => ({
  businessId: getBusinessId(state),
  eventId: state.eventId,
});

export const getDeleteEtpsContent = state => ({
  eventId: state.eventId,
  pays: state.pays.filter(p => p.isSelected).map(p => p.id),
});
