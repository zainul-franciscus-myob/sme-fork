import {
  getBusinessId,
  getDuplicateGeneralJournalIdQueryParam,
  getGeneralJournalId,
  getIsCreating,
  getRegion,
} from '../generalJournalDetailSelectors';

export const getDuplicateGeneralJournalUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const id = getGeneralJournalId(state);

  return `/#/${region}/${businessId}/generalJournal/new?duplicateGeneralJournalId=${id}`;
};

export const getCreateGeneralJournalUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/generalJournal/new`;
};

export const getShouldReload = (state) => {
  const isCreating = getIsCreating(state);
  const duplicateJournalId = getDuplicateGeneralJournalIdQueryParam(state);

  return isCreating && !duplicateJournalId;
};
