import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_CONTACT,
  DELETE_CONTACT,
  LOAD_CONTACT_DETAIL,
  LOAD_NEW_CONTACT,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BILLING_ADDRESS,
  UPDATE_CONTACT,
  UPDATE_CONTACT_DETAILS,
  UPDATE_SHIPPING_ADDRESS,
} from '../ContactIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_CONTACT, SUCCESSFULLY_SAVED_CONTACT } from '../ContactMessageTypes';
import {
  getBusinessId, getContact, getContactId, getIsCreating, getRegion, isPageEdited,
} from './contactDetailSelectors';
import ContactDetailView from './components/ContactDetailView';
import Store from '../../store/Store';
import contactDetailReducer from './contactDetailReducer';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

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
    const contactDetailView = (
      <ContactDetailView
        onContactDetailsChange={this.updateContactDetails}
        onBillingAddressChange={this.updateBillingAddress}
        onShippingAddressChange={this.updateShippingAddress}
        onDismissAlert={this.dismissAlert}
        onDeleteButtonClick={this.openDeleteModal}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.closeModal}
        onSaveButtonClick={this.updateOrCreateContact}
        onDeleteModal={this.deleteContact}
        onCancelModal={this.redirectToContactList}
        onRemindersButtonClick={this.redirectToRemindersSettings}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {contactDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  updateOrCreateContact = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    if (isCreating) {
      this.createContact();
    } else {
      this.updateContact();
    }
  }

  loadContactDetail = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    if (isCreating) {
      this.loadNewContact();
      return;
    }

    this.setLoadingState(true);
    const intent = LOAD_CONTACT_DETAIL;
    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
      contactId: getContactId(state),
    };

    const onSuccess = (payload) => {
      this.setLoadingState(false);

      this.store.dispatch({
        intent,
        ...payload,
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
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/contact`;
  };

  redirectToRemindersSettings = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/salesSettings?selectedTab=reminders`;
  }

  loadNewContact = () => {
    const intent = LOAD_NEW_CONTACT;
    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
    };
    const params = {
      region: getRegion(this.store.getState()),
    };

    const onSuccess = (payload) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...payload,
      });
    };

    const onFailure = () => {
      console.log('Failed to load new contact');
    };

    this.setLoadingState(true);
    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  createContact = () => {
    const intent = CREATE_CONTACT;
    const state = this.store.getState();
    const content = getContact(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    this.saveContact(intent, content, urlParams);
  };

  updateContact = () => {
    const intent = UPDATE_CONTACT;
    const state = this.store.getState();
    const content = getContact(state);
    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getContactId(state),
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

    const state = this.store.getState();
    this.integration.write({
      intent: DELETE_CONTACT,
      urlParams: {
        businessId: getBusinessId(state),
        contactId: getContactId(state),
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

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  handlers = {
    SAVE_ACTION: this.updateOrCreateContact,
  };

  run(context) {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
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
