import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_CONTACT,
  SUCCESSFULLY_SAVED_CONTACT,
} from '../../../common/types/MessageTypes';
import {
  getAbn,
  getAccountModalContext,
  getBusinessId,
  getIsCreating,
  getModalType,
  getRegion,
  isPageEdited,
} from './contactDetailSelectors';
import { getIsSubmitting } from '../contactModal/ContactModalSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactDetailView from './components/ContactDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import contactDetailReducer from './contactDetailReducer';
import createContactDetailDispatcher from './createContactDetailDispatcher';
import createContactDetailIntegrator from './createContactDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class ContactDetailModule {
  constructor({ integration, setRootView, pushMessage, featureToggles }) {
    this.integration = integration;
    this.store = new Store(contactDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.dispatcher = createContactDetailDispatcher(this.store);
    this.integrator = createContactDetailIntegrator(this.store, integration);
    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.isElectronicPaymentEnabled =
      featureToggles?.isElectronicPaymentEnabled;
    this.isPayBillRemittanceAdviceEnabled =
      featureToggles?.isPayBillRemittanceAdviceEnabled;
  }

  openAccountModal = () => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: ({ id }) => this.loadAccountAfterCreate(id),
      onLoadFailure: (message) => this.dispatcher.displayAlert(message),
    });
  };

  loadAccountAfterCreate = (id) => {
    this.accountModalModule.close();
    this.dispatcher.setLoadingSingleAccountState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingSingleAccountState(false);
      this.dispatcher.loadAccountAfterCreate(payload);
      this.dispatcher.updateContactDetails({
        key: 'expenseAccountId',
        value: id,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.displayAlert(message);
    };
    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
  };

  render = () => {
    const accountModal = this.accountModalModule.render();

    const contactDetailView = (
      <ContactDetailView
        onContactDetailsChange={this.dispatcher.updateContactDetails}
        onBillingAddressChange={this.dispatcher.updateBillingAddress}
        onShippingAddressChange={this.dispatcher.updateShippingAddress}
        onPaymentDetailsChange={this.dispatcher.updatePaymentDetails}
        onDismissAlert={this.dispatcher.dismissAlert}
        onDeleteButtonClick={this.openDeleteModal}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.dispatcher.closeModal}
        onSaveButtonClick={this.updateOrCreateContact}
        onDeleteModal={this.deleteContact}
        onCancelModal={this.redirectToContactList}
        accountModal={accountModal}
        onAddAccount={this.openAccountModal}
        onAbnBlur={this.validateAbn}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{contactDetailView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  validateAbn = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setAbnValidateState(false);
      this.dispatcher.loadAbnValidationResult(payload);
    };

    const onFailure = (error) => {
      this.dispatcher.setAbnValidateState(false);
      this.dispatcher.clearAbnValidationResult();
      this.dispatcher.displayAlert(error.message);
    };

    const abn = getAbn(this.store.getState());
    if (!abn) {
      this.dispatcher.clearAbnValidationResult();
    } else {
      this.dispatcher.setAbnValidateState(true);
      this.integrator.validateAbn({
        abn,
        onSuccess,
        onFailure,
      });
    }
  };

  updateOrCreateContact = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    if (getIsSubmitting(state)) return;

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_CONTACT,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirectToContactList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(error.message);
    };

    this.dispatcher.setSubmittingState(true);

    if (isCreating) {
      this.integrator.createContact({
        onSuccess,
        onFailure,
      });
    } else {
      this.integrator.updateContact({
        onSuccess,
        onFailure,
      });
    }
  };

  loadContactDetail = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    if (isCreating) {
      this.loadNewContact();
      return;
    }

    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadContactDetail(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadContactDetail({
      onSuccess,
      onFailure,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  openCancelModal = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.dispatcher.openModal('cancel');
    } else {
      this.redirectToContactList();
    }
  };

  openDeleteModal = () => {
    this.dispatcher.openModal('delete');
  };

  redirectToContactList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/contact`;
  };

  loadNewContact = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadNewContact(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.loadNewContact({
      onSuccess,
      onFailure,
    });
  };

  deleteContact = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_CONTACT,
        content: message,
      });
      this.redirectToContactList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(error.message);
    };

    this.integrator.deleteContact({
      onSuccess,
      onFailure,
    });
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);
    if (modalType) return;

    this.updateOrCreateContact();
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState({
      ...context,
      isElectronicPaymentEnabled: this.isElectronicPaymentEnabled,
      isPayBillRemittanceAdviceEnabled: this.isPayBillRemittanceAdviceEnabled,
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadContactDetail();
  }

  resetState() {
    this.dispatcher.resetState();
    this.accountModalModule.resetState();
  }
}
