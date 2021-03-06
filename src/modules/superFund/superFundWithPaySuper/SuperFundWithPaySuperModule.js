import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_SUPER_FUND,
  DELETE_SUPER_FUND,
  LOAD_ABN_DETAIL,
  OPEN_MODAL,
  SELECT_APRA_FUND,
  SET_ABN_LOADING_STATE,
  SET_ABN_STATUS,
  SET_ACCESS_TOKEN,
  SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
  SHOW_CONTACT_DETAILS,
  UPDATE_SELF_MANAGED_FUND_ABN,
  UPDATE_SUPER_FUND,
  UPDATE_SUPER_FUND_DETAIL,
} from '../SuperFundIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_SUPER_FUND,
  SUCCESSFULLY_SAVED_SUPER_FUND,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getFundType,
  getIsCreating,
  getIsPageEdited,
  getIsSuperFundEditable,
  getRegion,
  getSaveSuperFundPayload,
  getSuperFundId,
  getSuperProductAbn,
} from './SuperFundWithPaySuperSelectors';
import Store from '../../../store/Store';
import StsLoginModule from '../../stsLogin/StsLoginModule';
import SuperFundWithPaySuperView from './components/SuperFundWithPaySuperView';
import keyMap from '../../../hotKeys/keyMap';
import modalTypes from '../modalTypes';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import superFundWithPaySuperReducer from './superFundWithPaySuperReducer';

export default class SuperFundWithPaySuperModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(superFundWithPaySuperReducer);
    this.stsLoginModal = new StsLoginModule({
      integration,
      onLoggedIn: this.onLoggedIn,
      onCancel: this.closeModal,
    });
  }

  displayAlert = (errorMessage) =>
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });

  dismissAlert = () =>
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });

  setSubmittingState = (isSubmitting) =>
    this.store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });

  showContactDetails = () =>
    this.store.dispatch({
      intent: SHOW_CONTACT_DETAILS,
    });

  updateSuperFundDetail = ({ key, value }) =>
    this.store.dispatch({
      intent: UPDATE_SUPER_FUND_DETAIL,
      key,
      value,
    });

  selectSuperFund = (superProduct) =>
    this.store.dispatch({
      intent: SELECT_APRA_FUND,
      superProduct,
    });

  updateSelfManagedFundAbn = ({ value }) =>
    this.store.dispatch({
      intent: UPDATE_SELF_MANAGED_FUND_ABN,
      value,
    });

  lookUpAbn = () => {
    const state = this.store.getState();
    if (state.isAbnDirty) {
      this.loadAbnDetail();
    }
  };

  setAbnLoadingState = (isAbnLoading) =>
    this.store.dispatch({
      intent: SET_ABN_LOADING_STATE,
      isAbnLoading,
    });

  loadAbnDetail = () => {
    this.setAbnLoadingState(true);
    const intent = LOAD_ABN_DETAIL;
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      abn: getSuperProductAbn(state),
    };

    const onSuccess = ({ entityName }) => {
      this.setAbnLoadingState(false);
      this.store.dispatch({
        intent,
        name: entityName,
      });
    };

    const onFailure = ({ message }) => {
      this.setAbnLoadingState(false);
      this.displayAlert(message);
      this.store.dispatch({
        intent: SET_ABN_STATUS,
        isAbnDirty: false,
      });
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  onLoggedIn = (accessToken) => {
    this.store.dispatch({
      intent: SET_ACCESS_TOKEN,
      accessToken,
    });

    this.saveSuperFund();
  };

  validateAcessTokenAndSave = () => {
    const state = this.store.getState();
    if (getFundType(state) === 'SelfManagedSuperFund') {
      this.stsLoginModal.run({ businessId: state.businessId });
    } else {
      this.saveSuperFund();
    }
  };

  saveSuperFund = () => {
    const state = this.store.getState();

    this.setSubmittingState(true);
    const intent = getIsCreating(state) ? CREATE_SUPER_FUND : UPDATE_SUPER_FUND;

    const onSuccess = (response) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SUPER_FUND,
        content: response.message,
      });
      this.redirectToSuperFundList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams: {
        businessId: getBusinessId(state),
        superFundId: getSuperFundId(state),
      },
      content: getSaveSuperFundPayload(state),
      onSuccess,
      onFailure,
    });
  };

  deleteSuperFund = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const state = this.store.getState();

    const intent = DELETE_SUPER_FUND;

    const onSuccess = (response) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_SUPER_FUND,
        content: response.message,
      });
      this.redirectToSuperFundList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams: {
        businessId: getBusinessId(state),
        superFundId: getSuperFundId(state),
      },
      onSuccess,
      onFailure,
    });
  };

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent: OPEN_MODAL,
        modalType: modalTypes.cancel,
      });
    } else {
      this.redirectToSuperFundList();
    }
  };

  openDeleteModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: modalTypes.delete,
    });
  };

  closeModal = () => {
    const intent = CLOSE_MODAL;
    this.store.dispatch({ intent });
  };

  redirectToSuperFundList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/payrollSettings?tab=superFundList`;
  };

  render = () => {
    const stsLoginModal = this.stsLoginModal.getView();
    const superFundWithPaySuperView = (
      <SuperFundWithPaySuperView
        listeners={{
          onShowContactDetails: this.showContactDetails,
          onUpdateSuperFundDetail: this.updateSuperFundDetail,
          onAbnLookUp: this.lookUpAbn,
          onSelectSuperFund: this.selectSuperFund,
          onUpdateSelfManagedFundAbn: this.updateSelfManagedFundAbn,
          onCancelButtonClick: this.openCancelModal,
          onDeleteButtonClick: this.openDeleteModal,
          onSaveButtonClick: this.validateAcessTokenAndSave,
          onModalClose: this.closeModal,
          onCancelModalConfirm: this.redirectToSuperFundList,
          onDeleteModalConfirm: this.deleteSuperFund,
          onDismissAlert: this.dismissAlert,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {stsLoginModal}
        {superFundWithPaySuperView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setInitialState = (context, payload) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
      ...payload,
    });
  };

  handlers = {
    SAVE_ACTION: this.saveSuperFund,
  };

  bindHotKeys = () => {
    const userCanSave = getIsSuperFundEditable(this.store.getState());
    if (userCanSave) {
      setupHotKeys(keyMap, this.handlers);
    }
  };

  run({ context, payload }) {
    this.setInitialState(context, payload);

    this.bindHotKeys();

    this.render();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
