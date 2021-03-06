import { Provider } from 'react-redux';
import React from 'react';

import Store from '../../store/Store';
import TasksView from './components/TasksView';
import createTasksDispatcher from './createTasksDispatcher';
import tasksReducer from './tasksReducer';

export default class TasksModule {
  constructor({
    integration,
    closeDrawer,
    tasksService,
    constructPath,
    isActiveRoute,
  }) {
    this.integration = integration;
    this.store = new Store(tasksReducer);
    this.closeDrawer = closeDrawer;
    this.dispatcher = createTasksDispatcher(this.store);
    this.tasksService = tasksService;
    this.isActiveRoute = isActiveRoute;
    this.constructPath = constructPath;
  }

  getView = (drawerTasks) => {
    const {
      tasksService,
      closeView,
      store,
      isActiveRoute,
      constructPath,
    } = this;
    const { tasks } = drawerTasks;
    const { closeTasks, dismissTask } = tasksService;
    const welcomeTask =
      tasks && tasks.find((task) => task.template === 'welcome');
    const systemUpgradedMessageTask =
      tasks && tasks.find((task) => task.template === 'systemUpgradedMessage');
    const upgradeReportingTask =
      tasks && tasks.find((task) => task.template === 'reportingVideo');
    const onboardingTasks =
      tasks &&
      tasks.filter(
        (task) =>
          task !== welcomeTask &&
          task !== systemUpgradedMessageTask &&
          task !== upgradeReportingTask
      );
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
          systemUpgradedMessageTask={systemUpgradedMessageTask}
          dismissTask={dismissTask}
          isActiveRoute={isActiveRoute}
          constructPath={constructPath}
          updateTasksFailure={drawerTasks.updateTasksFailure}
          getTasksListFailure={drawerTasks.getTasksListFailure}
          upgradeReportingTask={upgradeReportingTask}
          openReportingModal={dispatcher.openReportingModal}
          closeReportingModal={dispatcher.closeReportingModal}
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
  };
}
