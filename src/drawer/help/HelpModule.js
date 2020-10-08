import { Provider } from 'react-redux';
import React from 'react';

import {
  getIsActive,
  getIsHelpContentLoaded,
  getIsOpen,
  getSearchLink,
  getSearchValue,
  isUserHelpSettingsLoaded,
  shouldLoadHelpContent,
} from './HelpSelectors';
import HelpView from './components/HelpView';
import Store from '../../store/Store';
import createHelpDispatcher from './createHelpDispatcher';
import createHelpIntegrator from './createHelpIntegrator';
import helpReducer from './helpReducer';

export default class HelpModule {
  constructor({ integration, closeDrawer }) {
    this.integration = integration;
    this.store = new Store(helpReducer);
    this.closeDrawer = closeDrawer;
    this.dispatcher = createHelpDispatcher(this.store);
    this.integrator = createHelpIntegrator(this.store, this.integration);
  }

  getView = () => {
    const {
      store,
      closeDrawer,
      dispatcher: { updateSearchValue },
      openSearchPage,
    } = this;

    return (
      <Provider store={store}>
        <HelpView
          closeHelp={closeDrawer}
          onSearchChange={updateSearchValue}
          onSearchClick={openSearchPage}
        />
      </Provider>
    );
  };

  setActive = (isActive, isOpen) => {
    this.dispatcher.setActiveState(!!isActive);
    this.dispatcher.setOpenState(!!isOpen);
    if (isActive && isOpen) {
      this.loadHelpContent();
    }
  };

  openSearchPage = () => {
    const state = this.store.getState();
    if (getSearchValue(state)) {
      const url = getSearchLink(state);
      window.open(url, '_blank');
    }
  };

  loadHelpUserSettings = (onLoadSettingsSuccess) => {
    const onSuccess = (helpUserSettings) => {
      this.dispatcher.loadHelpUserSettings(helpUserSettings);
      onLoadSettingsSuccess();
    };

    const onFailure = () => {
      this.dispatcher.loadHelpContentFailure();
    };

    this.integrator.loadHelpUserSettings({
      onSuccess,
      onFailure,
    });
  };

  loadHelpContent = () => {
    const state = this.store.getState();

    if (!shouldLoadHelpContent(state)) return;

    this.dispatcher.setLoadingState(true);

    if (!isUserHelpSettingsLoaded(state)) {
      this.loadHelpUserSettings(() => this.getHelpContent());
      return;
    }

    if (getIsHelpContentLoaded(state)) {
      this.dispatcher.setLoadingState(false);
      return;
    }

    this.getHelpContent();
  };

  getHelpContent = () => {
    const onSuccess = (helpContent) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadHelpContent(helpContent);
    };
    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadHelpContentFailure();
    };

    this.integrator.loadHelpContent({
      onSuccess,
      onFailure,
    });

    // Need to reset customHelpPageRoute so that defaultHelpPageRoute is used
    // when not triggering Help manually (example: through keyboard shortcuts)
    this.setCustomHelpPageRoute('');
  };

  setCustomHelpPageRoute = (helpPageRoute) => {
    this.dispatcher.setCustomHelpPageRoute(helpPageRoute);
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    const state = this.store.getState();
    const isActive = getIsActive(state);
    const isOpen = getIsOpen(state);
    if (isActive && isOpen) {
      this.loadHelpContent();
    }
  };
}
