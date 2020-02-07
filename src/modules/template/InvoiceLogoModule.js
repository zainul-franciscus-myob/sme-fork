import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { TEMPLATE_UPDATED } from './MessageTypes';
import {
  getBusinessId,
  getHasChange,
  getImage,
  getImageKey,
  getRegion,
  getShouldLoadPayDirect,
  getTemplateId,
} from './templateSelectors';
import InvoiceLogoView from './components/InvoiceLogoView';
import ModalTypes from './ModalTypes';
import Store from '../../store/Store';
import createTemplateDispatcher from './createTemplateDispatcher';
import createTemplateIntegrator from './createTemplateIntegrator';
import templateReducer from './templateReducer';

class InvoiceLogoModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.store = new Store(templateReducer);
    this.dispatcher = createTemplateDispatcher(this.store);
    this.integrator = createTemplateIntegrator(this.store, integration);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.store.dispatch({ intent: RESET_STATE });

  setInitialState = (context) => {
    this.store.dispatch({ intent: SET_INITIAL_STATE, context });
  };

  updateTemplateOption = ({ key, value }) => {
    this.dispatcher.updateTemplateOption({ key, value });
  };

  render = () => this.setRootView(
    <Provider store={this.store}>
      <InvoiceLogoView
        onCancel={this.onCancel}
        onCloseModal={this.closeModal}
        onConfirmSave={this.handleModalSave}
        onConfirmUnsave={this.handleModalUnsave}
        onDismissAlert={this.dismissAlert}
        onFileRemoved={this.removeFile}
        onFileSelected={this.selectFile}
        onSave={this.saveTemplate}
        onUpdateTemplateOptions={this.updateTemplateOption}
      />
    </Provider>,
  );

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.loadTemplate(context.templateName);

    const shouldLoadPayDirect = getShouldLoadPayDirect(this.store.getState());

    if (shouldLoadPayDirect) { this.loadPayDirect(); }
  };

  loadTemplate = (templateName) => {
    if (!templateName) {
      this.loadNewTemplate();
      return;
    }

    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadTemplate(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
    };

    this.integrator.loadTemplate({ templateName, onSuccess, onFailure });
  };

  loadNewTemplate = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadNewTemplate(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
    };

    this.integrator.loadNewTemplate({ onSuccess, onFailure });
  };

  loadPayDirect = () => {
    this.dispatcher.setPayDirectLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setPayDirectLoadingState(false);
      this.dispatcher.loadPayDirect(payload);
    };

    const onFailure = () => {
      this.dispatcher.setPayDirectLoadingState(false);
    };

    this.integrator.loadPayDirect({ onSuccess, onFailure });
  };

  selectFile = (file) => {
    const state = this.store.getState();

    if (getImage(state)) {
      const imageTypeToModalType = {
        headerImage: ModalTypes.changeImage,
        logoImage: ModalTypes.changeLogo,
      };

      this.dispatcher.setModalType(imageTypeToModalType[getImageKey(state)]);
      this.dispatcher.setTempFile(file);
    } else {
      this.dispatcher.selectFile(file);
    }
  };

  removeFile = () => {
    const state = this.store.getState();
    const imageTypeToModalType = {
      headerImage: ModalTypes.deleteImage,
      logoImage: ModalTypes.deleteLogo,
    };

    this.dispatcher.setModalType(imageTypeToModalType[getImageKey(state)]);
  };

  onCancel = () => {
    const hasChange = getHasChange(this.store.getState());

    if (hasChange) {
      this.dispatcher.setModalType(ModalTypes.unsaved);
    } else {
      this.redirectToTemplates();
    }
  };

  closeModal = () => this.dispatcher.setModalType('');

  redirectToPath = (path) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}${path}`;
  };

  redirectToTemplates = () => {
    this.redirectToPath('/salesSettings?selectedTab=templates');
  };

  handleModalSave = (type) => {
    switch (type) {
      case ModalTypes.unsaved:
        this.saveTemplate();
        break;
      case ModalTypes.changeLogo:
      case ModalTypes.changeImage:
        this.dispatcher.selectFileFromStore();
        this.closeModal();
        break;
      default:
        break;
    }
  };

  handleModalUnsave = (type) => {
    switch (type) {
      case ModalTypes.unsaved:
        this.redirectToTemplates();
        break;
      case ModalTypes.deleteLogo:
      case ModalTypes.deleteImage:
        this.dispatcher.removeFile();
        this.closeModal();
        break;
      default:
        break;
    }
  };

  saveTemplate = () => {
    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: TEMPLATE_UPDATED,
        content: message,
      });

      this.redirectToTemplates();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setLoadingState(true);

    const templateId = getTemplateId(this.store.getState());

    if (templateId) {
      this.integrator.updateTemplate({ onSuccess, onFailure, templateId });
    } else {
      this.integrator.createTemplate({ onSuccess, onFailure });
    }
  };

  dismissAlert = () => this.dispatcher.setAlert({});
}

export default InvoiceLogoModule;
