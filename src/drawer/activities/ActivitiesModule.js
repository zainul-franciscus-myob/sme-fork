import { Provider } from 'react-redux';
import React from 'react';

import ActivitiesView from './components/ActivitiesView';
import Store from '../../store/Store';
import activitiesReducer from './activitiesReducer';
import createActivitiesDispatcher from './createActivitiesDispatcher';

export default class ActivitiesModule {
  constructor({
    integration, closeDrawer, activitiesService,
  }) {
    this.integration = integration;
    this.store = new Store(activitiesReducer);
    this.closeDrawer = closeDrawer;
    this.dispatcher = createActivitiesDispatcher(this.store);
    this.activitiesService = activitiesService;
  }

  getView = (activities) => {
    const { activitiesService, closeView, store } = this;
    const { closeTasks, closeActivity } = activitiesService;
    const onboardingActivities = activities && activities.filter(activity => activity.template === 'drawer');
    const welcomeActivity = activities && activities.find(activity => activity.template === 'welcome');

    return (
      <Provider store={store}>
        <ActivitiesView
          closeActivity={closeActivity}
          closeTasks={closeTasks}
          closeView={closeView}
          onboardingActivities={onboardingActivities}
          welcomeActivity={welcomeActivity}
        />
      </Provider>
    );
  };

  setActive = (isActive) => {
    this.dispatcher.setActiveState(!!isActive);
  };

  closeView = () => this.closeDrawer();

  run = (context) => {
    const { routeParams } = context;
    this.dispatcher.setInitialState(routeParams);
  }
}
