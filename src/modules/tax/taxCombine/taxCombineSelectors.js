import { createSelector } from 'reselect';

import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

const getRegion = (state) => state.region;
export const getBusinessId = (state) => state.businessId;

export const getTaxCodeIdToDelete = (state) => state.taxCodeIdToDelete;
export const getTaxCodeIdToPersist = (state) => state.taxCodeIdToPersist;
export const getTaxCodeOptions = (state) => state.taxCodeOptions;
export const getLoadingState = (state) => state.loadingState;
export const getIsActionsDisabled = (state) => state.isSubmitting;
export const getAlert = (state) => state.alert;
export const getIsModalOpen = (state) => state.modalOpen;

export const getCombineTaxCodesContent = createSelector(
  getTaxCodeIdToDelete,
  getTaxCodeIdToPersist,
  (idToDelete, idToPersist) => ({
    codeIdToBeMerged: idToDelete,
    codeIdToBeMergedInto: idToPersist,
  })
);

export const getPageTitle = createSelector(
  getRegion,
  (region) => `Combine ${getRegionToDialectText(region)('tax codes')}`
);
export const getModalTitle = createSelector(
  getRegion,
  (region) => `Combine ${getRegionToDialectText(region)('tax codes')}?`
);
export const getTaxCodeToDeleteLabel = createSelector(
  getRegion,
  (region) => `Delete this ${getRegionToDialectText(region)('tax code')}`
);

export const getTaxCodeListUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/tax`
);
