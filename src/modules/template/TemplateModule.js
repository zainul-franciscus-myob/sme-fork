import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { TEMPLATE_UPDATED } from './MessageTypes';
import {
  getBusinessId, getHasChange, getRegion, getTemplateId,
} from './templateSelectors';
import ModalTypes from './ModalTypes';
import Store from '../../store/Store';
import TemplateView from './components/TemplateView';
import createTemplateDispatcher from './createTemplateDispatcher';
import createTemplateIntegrator from './createTemplateIntegrator';
import templateReducer from './templateReducer';

class TemplateModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.store = new Store(templateReducer);
    this.dispatcher = createTemplateDispatcher(this.store);
    this.integrator = createTemplateIntegrator(this.store, integration);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.store.dispatch({ intent: RESET_STATE });

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  updateTemplateOption = ({ key, value }) => {
    this.dispatcher.updateTemplateOption({ key, value });
  }

  render = () => this.setRootView(
    <Provider store={this.store}>
      <TemplateView
        onUpdateTemplateOptions={this.updateTemplateOption}
        onFileSelected={this.selectFile}
        onFileRemoved={this.removeFile}
        onSave={this.saveTemplate}
        onDismissAlert={this.dismissAlert}
        onCancel={this.onCancel}
        onCloseModal={this.closeModal}
        onConfirmSave={this.saveTemplate}
        onConfirmUnsave={this.redirectToSalesSettings}
        onEditBusinessDetails={this.redirectToBusinessDetails}
      />
    </Provider>,
  );

  run = (context) => {
    this.setInitialState(context);

    if (context.templateName) {
      this.loadTemplate(context.templateName);
    }

    this.render();
  }

  loadTemplate = (templateName) => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (template) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadTemplate(template);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.loadTemplate({
      templateName,
      onSuccess,
      onFailure,
    });
  }

  selectFile = (file) => {
    this.dispatcher.selectFile(file);
  }

  removeFile = () => {
    this.dispatcher.removeFile();
  }

  onCancel = () => {
    const hasChange = getHasChange(this.store.getState());
    if (hasChange) {
      this.dispatcher.setModalType(ModalTypes.unsaved);
    } else {
      this.redirectToSalesSettings();
    }
  }

  closeModal = () => this.dispatcher.setModalType('');

  redirectToPath = (path) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}${path}`;
  };

  redirectToSalesSettings = () => {
    this.redirectToPath('/salesSettings');
  };

  redirectToBusinessDetails = () => {
    this.redirectToPath('');
  };

  saveTemplate = () => {
    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: TEMPLATE_UPDATED,
        content: message,
      });
      this.redirectToSalesSettings();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setLoadingState(true);
    const templateId = getTemplateId(this.store.getState());
    if (templateId) {
      this.integrator.updateTemplate({
        onSuccess,
        onFailure,
        templateId,
      });
    } else {
      this.integrator.createTemplate({
        onSuccess,
        onFailure,
      });
    }
  }

  dismissAlert = () => this.dispatcher.setAlert({});
}

export default TemplateModule;