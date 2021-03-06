import { Provider } from 'react-redux';
import React from 'react';

import { getIsOpen, getIsSubmitting } from './ContactModalSelectors';
import ContactModalView from './components/ContactModalView';
import Store from '../../../store/Store';
import contactModalReducer from './contactModalReducer';
import createContactModalDispatcher from './createContactModalDispatcher';
import createContactModalIntegrator from './createContactModalIntegrator';

export default class ContactModalModule {
  constructor({ integration }) {
    this.integration = integration;
    this.onSaveSuccess = () => {};
    this.onLoadFailure = () => {};

    this.store = new Store(contactModalReducer);
    this.integrator = createContactModalIntegrator(
      this.store,
      this.integration
    );
    this.dispatcher = createContactModalDispatcher(this.store);
  }

  isOpened = () => getIsOpen(this.store.getState());

  isSubmitting = () => getIsSubmitting(this.store.getState());

  loadContactModal = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadContactModal(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.resetState();
      this.onLoadFailure(message);
    };

    this.integrator.loadContactModal({ onSuccess, onFailure });
  };

  save = () => {
    if (this.isSubmitting()) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.onSaveSuccess(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.createContactModal({ onSuccess, onFailure });
  };

  resetState = () => this.dispatcher.resetState();

  run = ({ context, onLoadFailure = () => {}, onSaveSuccess = () => {} }) => {
    this.dispatcher.setInitialState(context);
    this.onLoadFailure = onLoadFailure;
    this.onSaveSuccess = onSaveSuccess;
    this.loadContactModal();
  };

  toggleShippingAddress = ({ value }) => {
    if (value) {
      this.dispatcher.copyAddress();
    }
    this.dispatcher.toggleShippingAddressEditing(value);
  };

  render() {
    return (
      <Provider store={this.store}>
        <ContactModalView
          onClose={this.resetState}
          onDismissAlert={this.dispatcher.dismissAlert}
          onDetailChange={this.dispatcher.setContactModalDetails}
          onBillingAddressButtonClick={
            this.dispatcher.setShowContactModalBillingAddress
          }
          onBillingAddressChange={this.dispatcher.setContactModalBillingAddress}
          onShippingAddressButtonClick={
            this.dispatcher.setShowContactModalShippingAddress
          }
          onShippingAddressChange={
            this.dispatcher.setContactModalShippingAddress
          }
          onPaymentDetailsButtonClick={
            this.dispatcher.setShowContactModalPaymentDetails
          }
          onPaymentDetailsChange={this.dispatcher.setContactModalPaymentDetails}
          onSaveButtonClick={this.save}
          onCancelButtonClick={this.dispatcher.resetState}
          onCopyToggle={this.toggleShippingAddress}
        />
      </Provider>
    );
  }
}
