import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_SUPER_FUND,
  DELETE_SUPER_FUND,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
  SHOW_CONTACT_DETAILS,
  UPDATE_SUPER_FUND,
  UPDATE_SUPER_FUND_DETAIL,
  UPDATE_SUPER_PRODUCT,
} from '../SuperFundIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_SUPER_FUND, SUCCESSFULLY_SAVED_SUPER_FUND } from '../../payrollSettings/PayrollSettingsMessageTypes';
import {
  getBusinessId, getIsCreating, getIsPageEdited, getRegion, getSaveSuperFundPayload, getSuperFundId,
} from './SuperFundNoPaySuperSelectors';
import Store from '../../store/Store';
import SuperFundNoPaySuperView from './components/SuperFundNoPaySuperView';
import modalTypes from '../modalTypes';
import superFundNoPaySuperReducer from './superFundNoPaySuperReducer';

export default class SuperFundNoPaySuperModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(superFundNoPaySuperReducer);
  }

  displayErrorAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  });

  dismissErrorAlert = () => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  });

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  });

  showContactDetails = () => this.store.dispatch({
    intent: SHOW_CONTACT_DETAILS,
  })

  updateSuperFundDetail = ({ key, value }) => this.store.dispatch({
    intent: UPDATE_SUPER_FUND_DETAIL,
    key,
    value,
  })

  updateSuperProduct = superProduct => this.store.dispatch({
    intent: UPDATE_SUPER_PRODUCT,
    superProduct,
  })

  redirectToPayrollSettings = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/payrollSettings?tab=superFundList`;
  }

  openCancelModal = () => (getIsPageEdited(this.store.getState())
    ? this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: modalTypes.cancel,
    })
    : this.redirectToPayrollSettings()
  );

  openDeleteModal = () => this.store.dispatch({
    intent: OPEN_MODAL,
    modalType: modalTypes.delete,
  });

  closeModal = () => this.store.dispatch({ intent: CLOSE_MODAL });

  deleteSuperFund = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_SUPER_FUND,
        content: message,
      });
      this.redirectToPayrollSettings();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayErrorAlert(error.message);
    };

    const state = this.store.getState();

    this.integration.write({
      intent: DELETE_SUPER_FUND,
      urlParams: {
        businessId: getBusinessId(state),
        superFundId: getSuperFundId(state),
      },
      onSuccess,
      onFailure,
    });
  }

  saveSuperFund = () => {
    const state = this.store.getState();
    const intent = getIsCreating(state) ? CREATE_SUPER_FUND : UPDATE_SUPER_FUND;

    const urlParams = {
      businessId: getBusinessId(state),
      superFundId: getSuperFundId(state),
    };

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SUPER_FUND,
        content: message,
      });
      this.setSubmittingState(false);
      this.redirectToPayrollSettings();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayErrorAlert(error.message);
    };

    const content = getSaveSuperFundPayload(state);

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });

    this.setSubmittingState(true);
  }

  render = () => {
    const superFundNoPaySuperView = (
      <SuperFundNoPaySuperView
        listeners={{
          onShowContactDetails: this.showContactDetails,
          onUpdateSuperFundDetail: this.updateSuperFundDetail,
          onUpdateSuperProduct: this.updateSuperProduct,
          onDismissAlert: this.dismissErrorAlert,
          onModalClose: this.closeModal,
          onDeleteButtonClick: this.openDeleteModal,
          onCancelButtonClick: this.openCancelModal,
          onCancelModalConfirm: this.redirectToPayrollSettings,
          onDeleteModalConfirm: this.deleteSuperFund,
          onSaveButtonClick: this.saveSuperFund,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {superFundNoPaySuperView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

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

  run({ context, payload }) {
    this.setInitialState(context, payload);
    this.render();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
