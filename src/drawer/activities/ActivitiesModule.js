import { Provider } from 'react-redux';
import React from 'react';

import { getBusinessId } from './ActivitiesSelectors';
import ActivitiesView from './components/ActivitiesView';
import Store from '../../store/Store';
import activitiesReducer from './activitiesReducer';
import closeTask from './services/closeTask';
import createActivitiesDispatcher from './createActivitiesDispatcher';
import loadActivities from './services/load';

export default class ActivitiesModule {
  constructor({ integration, closeDrawer }) {
    this.integration = integration;
    this.store = new Store(activitiesReducer);
    this.closeDrawer = closeDrawer;
    this.dispatcher = createActivitiesDispatcher(this.store);
  }

  getView = () => {
    const { closeActivities, store, closeActivityTask } = this;

    return (
      <Provider store={store}>
        <ActivitiesView closeActivities={closeActivities} closeTask={closeActivityTask} />
      </Provider>
    );
  };

  setActive = (isActive) => {
    this.dispatcher.setActiveState(!!isActive);
  }

  closeActivityTask = async (activityId, activityKey) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);

    const activity = await closeTask({
      integration: this.integration,
      businessId,
      activityId,
      activityKey,
    });

    this.dispatcher.updateActivity(activity);
  }

  closeActivities = () => this.closeDrawer();

  loadActivities = async (businessId, region) => {
    this.dispatcher.setLoadingState(true);

    const content = await loadActivities(this.integration, businessId, region);
    this.dispatcher.loadActivities(content);

    this.dispatcher.setLoadingState(false);
  }

  run = (context) => {
    const { routeParams } = context;
    this.dispatcher.setInitialState(routeParams);
    this.loadActivities(routeParams.businessId, routeParams.region);
  }
}
