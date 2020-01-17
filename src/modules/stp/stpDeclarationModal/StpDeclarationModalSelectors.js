import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;
export const getEventId = state => state.eventId;
export const getIsOpen = state => state.isOpen;
export const getIsLoading = state => state.isLoading;
export const getAlertMessage = state => state.alertMessage;
export const getStpDeclarationName = state => state.name;

export const getStpDeclarationUrlParams = createSelector(
  getBusinessId,
  getEventId,
  (businessId, eventId) => ({
    businessId,
    eventId,
  }),
);

export const getStpDeclarationContents = createSelector(
  getStpDeclarationName,
  name => ({
    name,
  }),
);
