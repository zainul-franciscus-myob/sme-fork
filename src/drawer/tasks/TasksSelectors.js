import { createSelector } from 'reselect';

export const getBusinessId = (state) => state.businessId;
export const getIsActive = (state) => state.isActive;
export const getIsLoading = (state) => state.isLoading;
export const getRegion = (state) => state.region;
export const getWelcomeVideoId = createSelector(getRegion, (region) =>
  region === 'nz' ? '17i4r8ci29' : 'nu4tdi39qw'
);
export const getIsReportingModalOpen = (state) => state.reportingModal.isOpen;
