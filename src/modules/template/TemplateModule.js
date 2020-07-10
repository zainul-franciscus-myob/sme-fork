import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { TEMPLATE_UPDATED } from '../../common/types/MessageTypes';
import {
  getBusinessId,
  getHasChange,
  getImage,
  getImageKey,
  getRegion,
  getShouldLoadPayDirect,
  getTemplateId,
} from './templateSelectors';
import ModalTypes from './ModalTypes';
import Store from '../../store/Store';
import TemplateView from './components/TemplateView';
import createTemplateDispatcher from './createTemplateDispatcher';
import createTemplateIntegrator from './createTemplateIntegrator';
import templateReducer from './templateReducer';

class TemplateModule {
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
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  };

  updateTemplateOption = ({ key, value }) => {
    this.dispatcher.updateTemplateOption({ key, value });
  };

  render = () =>
    this.setRootView(
      <Provider store={this.store}>
        <TemplateView
          onUpdateTemplateOptions={this.updateTemplateOption}
          onPreviewTypeChange={this.onPreviewTypeChange}
          onFileSelected={this.selectFile}
          onFileRemoved={this.removeFile}
          onSave={this.saveTemplate}
          onDismissAlert={this.dismissAlert}
          onCancel={this.onCancel}
          onCloseModal={this.closeModal}
          onConfirmSave={this.handleModalSave}
          onConfirmUnsave={this.handleModalUnsave}
          onEditBusinessDetails={this.redirectToBusinessDetails}
        />
      </Provider>
    );

  onPreviewTypeChange = ({ key, value }) => {
    this.dispatcher.updatePreviewOption({ key, value });
  };

  run = (context) => {
    this.setInitialState(context);

    this.render();

    this.loadTemplate(context.templateName);

    const shouldLoadPayDirect = getShouldLoadPayDirect(this.store.getState());
    if (shouldLoadPayDirect) {
      this.loadPayDirect();
    }
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

    this.integrator.loadTemplate({
      templateName,
      onSuccess,
      onFailure,
    });
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

    this.integrator.loadNewTemplate({
      onSuccess,
      onFailure,
    });
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

    this.integrator.loadPayDirect({
      onSuccess,
      onFailure,
    });
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
      this.redirectToSalesSettings();
    }
  };

  closeModal = () => this.dispatcher.setModalType('');

  redirectToPath = (path) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}${path}`;
  };

  redirectToSalesSettings = () => {
    this.redirectToPath('/salesSettings?selectedTab=templates');
  };

  redirectToBusinessDetails = () => {
    this.redirectToPath('');
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
        this.redirectToSalesSettings();
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
  };

  dismissAlert = () => this.dispatcher.setAlert({});
}

export default TemplateModule;
