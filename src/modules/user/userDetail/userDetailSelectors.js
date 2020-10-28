import { createSelector } from 'reselect';

import {
  LOAD_NEW_ADVISOR_DETAIL,
  LOAD_NEW_USER_DETAIL,
  LOAD_USER_DETAIL,
} from '../UserIntents';
import ModalType from '../ModalType';
import RoleTypes from '../../../common/types/RoleTypes';

const NEW_USER_PATH_COMPONENT = 'new';
const NEW_ADVISOR_PATH_COMPONENT = 'new-advisor';

export const getModal = (state) => state.modal;
export const isPageEdited = (state) => state.isPageEdited;
export const getBusinessId = (state) => state.businessId;
export const getSerialNumber = (state) => state.serialNumber;
export const getRegion = (state) => state.region;
export const getUser = (state) => state.user;
export const getUserId = (state) => state.userId;
export const getIsAdvisor = (state) => state.user.isAdvisor;
export const getIsInactive = (state) => state.user.isInactive;
export const getLoadingState = (state) => state.loadingState;
export const getIsCurrentUserOnlineAdmin = (state) =>
  state.isCurrentUserOnlineAdmin;

export const getIsCreating = (state) =>
  [NEW_USER_PATH_COMPONENT, NEW_ADVISOR_PATH_COMPONENT].includes(
    getUserId(state)
  );

export const getLoadUserIntent = (state) =>
  ({
    [NEW_USER_PATH_COMPONENT]: LOAD_NEW_USER_DETAIL,
    [NEW_ADVISOR_PATH_COMPONENT]: LOAD_NEW_ADVISOR_DETAIL,
  }[getUserId(state)] || LOAD_USER_DETAIL);

export const getTitle = createSelector(
  getIsCreating,
  getIsAdvisor,
  getUser,
  (isCreating, isAdvisor, user) => {
    if (isCreating) {
      return `Create ${isAdvisor ? 'advisor' : 'user'}`;
    }

    return user.userName;
  }
);

export const getSubtitle = createSelector(
  getIsCreating,
  getIsAdvisor,
  (isCreating, isAdvisor) => (!isCreating && isAdvisor ? 'Advisor' : '')
);
export const getStatusTag = (state) => (getIsInactive(state) ? 'Inactive' : '');

export const getUserForCreate = (state) => {
  const { roles, ...userWithoutRoles } = state.user;
  return {
    ...userWithoutRoles,
    roleIds: state.user.roles
      .filter((role) => role.selected)
      .map((role) => Number(role.id)),
  };
};

export const getUserForUpdate = (state) => {
  const { roles, userName, ...strippedUser } = state.user;
  return {
    ...strippedUser,
    roleIds: state.user.roles
      .filter((role) => role.selected)
      .map((role) => Number(role.id)),
  };
};

export const getUserDetails = createSelector(
  getUser,
  getIsCreating,
  getIsCurrentUserOnlineAdmin,
  (user, isCreating, isCurrentUserOnlineAdmin) => {
    /* TODO: currently New Essentials does not support
    TimeBilling and InventoryManagement roles so they are filtered out of the list https://dev-arl.visualstudio.com/ARL%20Protected%20API/_boards/board/t/Phoenix/Stories/?workitem=5132 */
    const rolesCurrentlySupported = user.roles.filter(
      (role) =>
        role.type !== 'TimeBilling' && role.type !== 'InventoryManagement'
    );

    const isAdminRowSelected = user.roles.some(
      ({ type, selected }) => selected && type === RoleTypes.ADMINISTRATOR
    );

    return {
      ...user,
      roles: rolesCurrentlySupported,
      isCreating,
      isCurrentUserOnlineAdmin,
      showReadOnly: !isAdminRowSelected,
    };
  }
);

export const getAlertMessage = (state) => state.alertMessage;
export const getIsActionsDisabled = (state) => state.isSubmitting;

export const getRedirectUrl = createSelector(
  getBusinessId,
  getRegion,
  getModal,
  (businessId, region, modal) =>
    modal && modal.url ? modal.url : `/#/${region}/${businessId}/user`
);

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalType.NONE };

  return modal.type;
};

export const getMyDotMyobLink = createSelector(
  getBusinessId,
  getSerialNumber,
  (businessId, serialNumber) => {
    return `https://my.myob.com/pages/CloudServiceAdministrationRedirector.aspx?Action=ARLADMIN&serialnumber=${serialNumber}&CdfId=${businessId}`;
  }
);
