import { Provider } from 'react-redux';
import React from 'react';

import { getBusinessId } from './ActivitiesSelectors';
import ActivitiesView from './components/ActivitiesView';
import Store from '../../store/Store';
import activitiesReducer from './activitiesReducer';
import closeActivityFn from './services/closeActivity';
import closeTaskFn from './services/closeTask';
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
    const {
      closeView, store, closeActivityTask, closeActivity,
    } = this;

    return (
      <Provider store={store}>
        <ActivitiesView
          closeView={closeView}
          closeTask={closeActivityTask}
          closeActivity={closeActivity}
        />
      </Provider>
    );
  };

  setActive = (isActive) => {
    this.dispatcher.setActiveState(!!isActive);
  }

  closeActivityTask = async (activityId, activityKey) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);

    const activity = await closeTaskFn({
      integration: this.integration,
      businessId,
      activityId,
      activityKey,
    });

    this.dispatcher.updateActivity(activity);
  }

  closeActivity = async (activityId) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);

    const activity = await closeActivityFn({
      integration: this.integration,
      businessId,
      activityId,
    });

    this.dispatcher.updateActivity(activity);
  }

  closeView = () => this.closeDrawer();

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
