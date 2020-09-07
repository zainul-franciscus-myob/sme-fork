import { Provider } from 'react-redux';
import React from 'react';

import { getContactModalContext } from './contactComboboxSelectors';
import AlertType from '../../../common/types/AlertType';
import ContactComboboxView from './components/ContactComboboxView';
import ContactModalModule from '../contactModal/ContactModalModule';
import Store from '../../../store/Store';
import contactComboboxReducer from './contactComboboxReducer';
import createContactComboboxDispatcher from './createContactComboboxDispatcher';
import createContactComboboxIntegrator from './createContactComboboxIntegrator';

export default class ContactComboboxModule {
  constructor({ integration }) {
    this.onChange = () => {};
    this.onAlert = () => {};

    this.store = new Store(contactComboboxReducer);
    this.integrator = createContactComboboxIntegrator({
      store: this.store,
      integration,
    });
    this.dispatcher = createContactComboboxDispatcher({ store: this.store });

    this.contactModalModule = new ContactModalModule({ integration });
  }

  resetState = () => {
    this.contactModalModule.resetState();
    this.dispatcher.resetState();
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);

    this.loadContactComboboxOptions();

    const { contactId } = context;
    if (contactId) {
      this.loadContactComboboxOptionById({ id: contactId });
    }
  };

  loadContactComboboxOptions = () => {
    this.dispatcher.setContactComboboxOptionsLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setContactComboboxOptionsLoadingState(false);
      this.dispatcher.loadContactComboboxOptions(payload);
    };

    const onFailure = () => {
      this.dispatcher.setContactComboboxOptionsLoadingState(false);
    };

    this.integrator.loadContactComboboxOptions({ onSuccess, onFailure });
  };

  searchContactCombobox = ({ keywords, onSuccess: next, onFailure }) => {
    const onSuccess = ({ contactOptions }) => {
      next(contactOptions);
    };

    this.integrator.searchContactCombobox({ keywords, onSuccess, onFailure });
  };

  openContactModal = () => {
    const state = this.store.getState();
    const context = getContactModalContext(state);

    this.contactModalModule.run({
      context,
      onSaveSuccess: this.loadContactComboboxOptionAfterCreate,
      onLoadFailure: (message) => {
        this.onAlert({ type: AlertType.DANGER, message });
      },
    });
  };

  isContactModalOpened = () => {
    return this.contactModalModule.isOpened();
  };

  createContact = () => {
    this.contactModalModule.save();
  };

  loadContactComboboxOptionById = ({ id, onSuccess: next = () => {} }) => {
    this.dispatcher.setContactComboboxLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setContactComboboxLoadingState(false);
      this.dispatcher.loadContactComboboxOptionById(payload);

      next(payload);
    };

    const onFailure = () => {
      this.dispatcher.setContactComboboxLoadingState(false);
    };

    this.integrator.loadContactComboboxOptionById({ id, onSuccess, onFailure });
  };

  loadContactComboboxOptionAfterCreate = ({ id, message }) => {
    this.contactModalModule.resetState();
    this.onAlert({ type: AlertType.SUCCESS, message });

    const onSuccess = this.onChange;

    this.loadContactComboboxOptionById({ id, onSuccess });
  };

  render({
    hideAdd = false,
    onChange = () => {},
    onAlert = () => {},
    ...otherProps
  }) {
    this.onChange = onChange;
    this.onAlert = onAlert;

    const contactModal = this.contactModalModule.render();

    return (
      <Provider store={this.store}>
        <ContactComboboxView
          hideAdd={hideAdd}
          contactModal={contactModal}
          onLoadMore={this.loadContactComboboxOptions}
          onSearch={this.searchContactCombobox}
          onChange={onChange}
          onAddNew={this.openContactModal}
          {...otherProps}
        />
      </Provider>
    );
  }
}
