import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_CONTACT,
  DELETE_CONTACT,
  LOAD_CONTACT_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BILLING_ADDRESS,
  UPDATE_BUSINESS_DETAILS,
  UPDATE_CONTACT,
  UPDATE_CONTACT_DETAILS,
  UPDATE_SHIPPING_ADDRESS,
} from '../ContactIntents';
import {
  RESET_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_CONTACT, SUCCESSFULLY_SAVED_CONTACT } from '../ContactMessageTypes';
import { getContact, isPageEdited } from './contactDetailSelectors';
import ContactDetailView from './components/ContactDetailView';
import Store from '../../store/Store';
import contactDetailReducer from './contactDetailReducer';

export default class ContactDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.store = new Store(contactDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  render = () => {
    const onSaveButtonClick = this.isCreating
      ? this.createContact : this.updateContact;

    const contactDetailView = (
      <ContactDetailView
        isCreating={this.isCreating}
        onBusinessDetailsChange={this.updateBusinessDetails}
        onContactDetailsChange={this.updateContactDetails}
        onBillingAddressChange={this.updateBillingAddress}
        onShippingAddressChange={this.updateShippingAddress}
        onDismissAlert={this.dismissAlert}
        onDeleteButtonClick={this.openDeleteModal}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.closeModal}
        onSaveButtonClick={onSaveButtonClick}
        onDeleteModal={this.deleteContact}
        onCancelModal={this.redirectToContactList}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {contactDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  loadContactDetail = () => {
    if (this.isCreating) {
      return;
    }

    this.setLoadingState(true);

    const intent = LOAD_CONTACT_DETAIL;
    const urlParams = {
      businessId: this.businessId,
      contactId: this.contactId,
    };

    const onSuccess = ({ contact }) => {
      this.setLoadingState(false);

      this.store.dispatch({
        intent,
        contact,
      });
    };

    const onFailure = () => {
      console.log('Failed to load contact');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  updateBusinessDetails = ({ key, value }) => {
    const intent = UPDATE_BUSINESS_DETAILS;

    this.store.dispatch({
      intent,
      key,
      value,
    });
  }

  updateContactDetails = ({ key, value }) => {
    const intent = UPDATE_CONTACT_DETAILS;

    this.store.dispatch({
      intent,
      key,
      value,
    });
  }

  updateShippingAddress = ({ key, value }) => {
    const intent = UPDATE_SHIPPING_ADDRESS;

    this.store.dispatch({
      intent,
      key,
      value,
    });
  }

  updateBillingAddress = ({ key, value }) => {
    const intent = UPDATE_BILLING_ADDRESS;

    this.store.dispatch({
      intent,
      key,
      value,
    });
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;

    this.store.dispatch({
      intent,
      isLoading,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  openCancelModal = () => {
    const intent = OPEN_MODAL;

    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.store.dispatch({
        intent,
        modalType: 'cancel',
      });
    } else {
      this.redirectToContactList();
    }
  };

  openDeleteModal = () => {
    const intent = OPEN_MODAL;

    this.store.dispatch({
      intent,
      modalType: 'delete',
    });
  };

  closeModal = () => {
    const intent = CLOSE_MODAL;

    this.store.dispatch({ intent });
  };


  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  redirectToContactList = () => {
    window.location.href = `/#/${this.businessId}/contact`;
  }

  createContact = () => {
    const intent = CREATE_CONTACT;
    const content = getContact(this.store.getState());
    const urlParams = {
      businessId: this.businessId,
    };
    this.saveContact(intent, content, urlParams);
  };

  updateContact = () => {
    const intent = UPDATE_CONTACT;
    const content = getContact(this.store.getState());
    const urlParams = {
      businessId: this.businessId,
      contactId: this.contactId,
    };
    this.saveContact(intent, content, urlParams);
  }

  saveContact(intent, content, urlParams) {
    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_CONTACT,
        content: message,
      });
      this.setSubmittingState(false);
      this.redirectToContactList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });

    this.setSubmittingState(true);
  }

  deleteContact = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_CONTACT,
        content: message,
      });
      this.redirectToContactList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent: DELETE_CONTACT,
      urlParams: {
        businessId: this.businessId,
        contactId: this.contactId,
      },
      onSuccess,
      onFailure,
    });
  }

  displayAlert = (errorMessage) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }


  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };


  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  }

  run(context) {
    this.businessId = context.businessId;
    this.contactId = context.contactId;
    this.isCreating = context.contactId === 'new';
    this.render();
    this.loadContactDetail();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
