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

export const getPracticeListOrder = ({
  practiceListSortOrder,
  practiceListOrderBy,
}) => ({
  column: practiceListOrderBy,
  descending: practiceListSortOrder === 'desc',
});

export const getOrderBy = (state) => state.orderBy;

export const getPracticeListOrderBy = (state) => state.practiceListOrderBy;

export const getPracticeListSortOrder = (state) => state.practiceListSortOrder;

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

export const getPractices = (state) => state.practices;

export const getShouldShowPractices = (state) =>
  !state.loadPracticesError && state.practices && state.practices.length > 0;

export const getShouldShowPracticesError = (state) => state.loadPracticesError;

export const getMyDotMyobLink = createSelector(
  getBusinessId,
  getSerialNumber,
  (businessId, serialNumber) => {
    return `https://my.myob.com/pages/CloudServiceAdministrationRedirector.aspx?Action=ARLADMIN&serialnumber=${serialNumber}&CdfId=${businessId}`;
  }
);

export const getModal = (state) => state.modal;

export const getSelectedUserIndex = (state) => state.selectedUserIndex;

export const getSelectedPracticeId = (state) => state.selectedPracticeId;

export const getSelectedUser = createSelector(
  getEntries,
  getSelectedUserIndex,
  (users, userIndex) => {
    return users[userIndex] || {};
  }
);

export const getSelectedPractice = createSelector(
  getPractices,
  getSelectedPracticeId,
  (practices, practiceId) => {
    return practices.find((p) => p.practiceId === practiceId) || {};
  }
);

export const getRemoveAccessModalBody = createSelector(
  getSelectedUser,
  (user) => {
    if (user.myDotInvitationType === 'FileUser') {
      return "This will remove access to this business. This can't be undone or recovered later.";
    }
    return "This will remove access to all businesses associated with this serial number. This can't be undone, or recovered later.";
  }
);

export const getRemovePracticeAccessModalBody = createSelector(
  getSelectedPractice,
  (practice) => {
    const practiceName = practice.practiceName || '';
    return `${practiceName} will no longer be able to access your business.`;
  }
);

export const getRemoveAccessDetails = createSelector(
  getSelectedUser,
  (user) => {
    return user
      ? {
          userId: user.inviteeContactId,
          role: user.myDotInvitationType,
        }
      : {};
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

export const getIsSubmitting = (state) => state.isSubmitting;
export const getFilterOptions = (state) => state.filterOptions;
export const getShowStatusFilterOptions = (state) =>
  state.showStatusFilterOptions;
