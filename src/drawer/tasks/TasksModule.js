import { Provider } from 'react-redux';
import React from 'react';

import Store from '../../store/Store';
import TasksView from './components/TasksView';
import createTasksDispatcher from './createTasksDispatcher';
import tasksReducer from './tasksReducer';

export default class TasksModule {
  constructor({
    integration, closeDrawer, tasksService,
  }) {
    this.integration = integration;
    this.store = new Store(tasksReducer);
    this.closeDrawer = closeDrawer;
    this.dispatcher = createTasksDispatcher(this.store);
    this.tasksService = tasksService;
  }

  getView = (tasks) => {
    const { tasksService, closeView, store } = this;
    const { closeTasks, dismissTask } = tasksService;
    const onboardingTasks = tasks && tasks.filter(task => task.template !== 'welcome');
    const welcomeTask = tasks && tasks.find(task => task.template === 'welcome');
    const { dispatcher } = this;

    return (
      <Provider store={store}>
        <TasksView
          openIntroModal={dispatcher.openIntroModal}
          closeIntroModal={dispatcher.closeIntroModal}
          closeTasks={closeTasks}
          closeView={closeView}
          onboardingTasks={onboardingTasks}
          welcomeTask={welcomeTask}
          dismissTask={dismissTask}
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
