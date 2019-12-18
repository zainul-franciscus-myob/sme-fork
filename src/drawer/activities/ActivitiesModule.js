import { Provider } from 'react-redux';
import React from 'react';

import { GET_ACTIVITIES_LIST } from './ActivitiesIntents';
import { getBusinessId, getRegion } from './ActivitiesSelectors';
import ActivitiesView from './components/ActivitiesView';
import Store from '../../store/Store';
import activitiesReducer from './activitiesReducer';
import createActivitiesDispatcher from './createActivitiesDispatcher';

export default class ActivitiesModule {
  constructor({ integration, closeDrawer }) {
    this.integration = integration;
    this.store = new Store(activitiesReducer);
    this.closeDrawer = closeDrawer;
    this.dispatcher = createActivitiesDispatcher(this.store);
  }

  getView = () => {
    const { closeActivities, store } = this;

    return (
      <Provider store={store}>
        <ActivitiesView closeActivities={closeActivities} />
      </Provider>
    );
  };

  setActive = (isActive) => {
    this.dispatcher.setActiveState(!!isActive);
  }

  closeActivities = () => this.closeDrawer();

  loadActivities = ({ businessId, region }) => {
    this.dispatcher.setLoadingState(true);

    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
      region: getRegion(this.store.getState()),
    };
    const params = { businessId, region };
    const onSuccess = (content) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadActivities(content);
    };
    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadActivitiesFailure();
    };

    this.integration.read({
      intent: GET_ACTIVITIES_LIST,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.loadActivities(context);
  }
}
