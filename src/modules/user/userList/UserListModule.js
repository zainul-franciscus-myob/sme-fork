import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_USER,
  SUCCESSFULLY_SAVED_USER,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getEntries,
  getFlipSortOrder,
  getMyDotMyobLink,
  getOrderBy,
  getPracticeListOrderBy,
  getPracticeListSortOrder,
  getPractices,
  getRegion,
} from './userListSelectors';
import { trackUserEvent } from '../../../telemetry';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import Store from '../../../store/Store';
import UserListView from './components/UserListView';
import createUserListDispatcher from './createUserListDispatcher';
import createUserListIntegrator from './createUserListIntegrator';
import debounce from '../../../common/debounce/debounce';
import userListReducer from './userListReducer';

const messageTypes = [SUCCESSFULLY_DELETED_USER, SUCCESSFULLY_SAVED_USER];

export default class UserListModule {
  constructor({ integration, setRootView, popMessages, featureToggles }) {
    this.integration = integration;
    this.store = new Store(userListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.shouldDisplayRemovePracticeAccessButton =
      featureToggles?.isRemovePracticeAccessEnabled;
    this.dispatcher = createUserListDispatcher(this.store);
    this.integrator = createUserListIntegrator(this.store, integration);
  }

  loadUserList = () => {
    const onSuccess = (data) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.loadUserList(data);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
      this.dispatcher.setTableLoadingState(false);
    };

    this.integrator.loadUserList({ onSuccess, onFailure });
  };

  onMyMyobClick = () => {
    const state = this.store.getState();
    const myDotMyobLink = getMyDotMyobLink(state);
    window.open(myDotMyobLink, '_blank', 'noopener noreferrer');
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'clicked_mydotlink',
        page: 'user/userList',
      },
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: 'success', message });
    }
  };

  redirectToCreateUser = (isAdvisor) => () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    const destination = isAdvisor ? 'new-advisor' : 'new';
    window.location.href = `/#/${region}/${businessId}/user/${destination}`;
  };

  sortUserList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder =
      orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    const entries = getEntries(state);

    this.dispatcher.sortUserList(entries, newSortOrder, orderBy);
  };

  sortPracticeList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder =
      orderBy === getPracticeListOrderBy(state)
        ? getFlipSortOrder({ sortOrder: getPracticeListSortOrder(state) })
        : 'asc';
    const practices = getPractices(state);

    this.dispatcher.sortPracticeList(practices, newSortOrder, orderBy);
  };

  resendInvitation = (userIndex) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.setSubmittingState(false);
      this.loadUserList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.resendInvitation({ onSuccess, onFailure, userIndex });
  };

  cancelInvitation = (userIndex) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.setSubmittingState(false);
      this.loadUserList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.cancelInvitation({ onSuccess, onFailure, userIndex });
  };

  openRemoveAccessModal = (userIndex) => {
    this.dispatcher.openModal({ type: ModalType.REMOVE_ACCESS });
    this.dispatcher.setSelectedUserIndex(userIndex);
  };

  openRemovePracticeAccessModal = (practiceId) => {
    this.dispatcher.openModal({ type: ModalType.REMOVE_PRACTICE_ACCESS });
    this.dispatcher.setSelectedPracticeId(practiceId);
  };

  removeAccess = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.setSubmittingState(false);
      this.loadUserList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.removeAccess({ onSuccess, onFailure });
  };

  removePracticeAccess = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.setSubmittingState(false);
      this.loadUserList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.removePracticeAccess({ onSuccess, onFailure });
  };

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.setFilterOptions({ key, value });
    this.dispatcher.setTableLoadingState(true);

    if (key === 'keywords') {
      debounce(this.loadUserList());
    } else {
      this.loadUserList();
    }
  };

  setShowStatusFilterOptions = (value) => {
    this.dispatcher.setShowStatusFilterOptions(value);
  };

  render = () => {
    const userListView = (
      <UserListView
        onCreateUser={this.redirectToCreateUser}
        onDismissAlert={this.dispatcher.dismissAlert}
        onSort={this.sortUserList}
        onSortPracticeList={this.sortPracticeList}
        onMyMyobClick={this.onMyMyobClick}
        onResendInvitation={this.resendInvitation}
        onCancelInvitation={this.cancelInvitation}
        onRemoveAccessClick={this.openRemoveAccessModal}
        onRemovePracticeAccessClick={this.openRemovePracticeAccessModal}
        onCloseModal={this.dispatcher.closeModal}
        onRemoveAccessModal={this.removeAccess}
        onRemovePracticeAccessModal={this.removePracticeAccess}
        onUpdateFilterOptions={this.updateFilterOptions}
        setShowStatusFilterOptions={this.setShowStatusFilterOptions}
        shouldDisplayRemovePracticeAccessButton={
          this.shouldDisplayRemovePracticeAccessButton
        }
      />
    );

    const wrappedView = <Provider store={this.store}>{userListView}</Provider>;
    this.setRootView(wrappedView);
  };

  resetState = () => this.dispatcher.resetState();

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadUserList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
