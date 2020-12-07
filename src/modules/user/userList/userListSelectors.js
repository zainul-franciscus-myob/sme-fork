import { createSelector } from 'reselect';

export const getAlert = ({ alert }) => alert;

export const getBusinessId = ({ businessId }) => businessId;

export const getSerialNumber = ({ serialNumber }) => serialNumber;

export const getEntries = (state) => state.entries;

export const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getLoadingState = (state) => state.loadingState;

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getIsCurrentUserOnlineAdmin = (state) =>
  state.isCurrentUserOnlineAdmin;

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getOrderBy = (state) => state.orderBy;

export const getRegion = (state) => state.region;

export const getSortOrder = (state) => state.sortOrder;

export const getTableEntries = createSelector(
  getRegion,
  getBusinessId,
  getEntries,
  (region, businessId, entries) =>
    entries.map((entry) => ({
      ...entry,
      link: `/#/${region}/${businessId}/user/${entry.id}`,
    }))
);

export const getMyDotMyobLink = createSelector(
  getBusinessId,
  getSerialNumber,
  (businessId, serialNumber) => {
    return `https://my.myob.com/pages/CloudServiceAdministrationRedirector.aspx?Action=ARLADMIN&serialnumber=${serialNumber}&CdfId=${businessId}`;
  }
);

export const getResendInvitationDetails = (state, index) => {
  const users = getEntries(state);
  const selectedUser = users[index];

  return selectedUser
    ? {
        cdfGuid: getBusinessId(state),
        invitationType: selectedUser.myDotInvitationType,
        invitationEmail: selectedUser.email,
        userName: selectedUser.name,
        userId: selectedUser.id,
        type: selectedUser.type,
      }
    : {};
};

export const getCancelInvitationDetails = (state, index) => {
  const users = getEntries(state);
  const selectedUser = users[index];

  return selectedUser ? { id: selectedUser.invitationId } : {};
};
