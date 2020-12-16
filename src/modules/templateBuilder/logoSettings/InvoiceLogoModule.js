import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { TEMPLATE_UPDATED } from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getImage,
  getImageKey,
  getRegion,
  getShouldLoadPayDirect,
  getTemplateId,
} from '../../template/templateSelectors';
import InvoiceLogoView from './InvoiceLogoView';
import ModalTypes from '../../template/ModalTypes';
import Store from '../../../store/Store';
import TemplateBuilderService from '../services/template';
import createTemplateDispatcher from '../../template/createTemplateDispatcher';
import createTemplateIntegrator from '../../template/createTemplateIntegrator';
import templateReducer from '../../template/templateReducer';

class InvoiceLogoModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    uploadedLogo,
    reviewInvoiceTemplateCompleted,
  }) {
    this.store = new Store(templateReducer);
    this.dispatcher = createTemplateDispatcher(this.store);
    this.integrator = createTemplateIntegrator(this.store, integration);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.uploadedLogoCallback = uploadedLogo;
    this.reviewInvoiceTemplate = reviewInvoiceTemplateCompleted;
    this.templateBuilderService = TemplateBuilderService(
      this.dispatcher,
      integration,
      this.store
    );
  }

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.store.dispatch({ intent: RESET_STATE });

  setInitialState = (context) => {
    this.store.dispatch({ intent: SET_INITIAL_STATE, context });
  };

  updateTemplateOption = ({ key, value }) => {
    this.dispatcher.updateTemplateOption({ key, value });
  };

  render = () =>
    this.setRootView(
      <Provider store={this.store}>
        <InvoiceLogoView
          onCloseModal={this.closeModal}
          onConfirmSave={this.handleModalSave}
          onConfirmUnsave={this.handleModalUnsave}
          onDismissAlert={this.dismissAlert}
          onFileRemoved={this.removeFile}
          onFileSelected={this.selectFile}
          onSave={this.saveTemplate}
          onUpdateTemplateOptions={this.updateTemplateOption}
        />
      </Provider>
    );

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.templateBuilderService.loadDefaultTemplate();

    const shouldLoadPayDirect = getShouldLoadPayDirect(this.store.getState());

    if (shouldLoadPayDirect) {
      this.loadPayDirect();
    }
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
    this.reviewInvoiceTemplate();
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

  closeModal = () => this.dispatcher.setModalType('');

  redirectToPath = (path) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}${path}`;
  };

  redirectToPaymentDetails = () => {
    this.redirectToPath('/salesSettings?selectedTab=payments');
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
        this.redirectToEmailSettings();
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

      this.uploadedLogoCallback();
      this.reviewInvoiceTemplate();
      this.redirectToPaymentDetails();
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
