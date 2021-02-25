import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBrowserAlert,
  getBusinessDetails,
  getBusinessRole,
  getGetTasksListFailure,
  getIsLoading,
  getIsMaximisedModule,
  getTasks,
  getUpdateTasksFailure,
} from '../rootSelectors';
import LoadingPageState from '../../components/LoadingPageState/LoadingPageState';
import style from './RootView.module.css';

const RootView = ({
  businessName,
  browserAlert,
  businessRole,
  children,
  drawer,
  isLoading,
  nav,
  serialNumber,
  tasks,
  onDismissBrowserAlert,
  updateTasksFailure,
  getTasksListFailure,
  isMaximisedModule,
}) => {
  if (isLoading) return <LoadingPageState />;
  if (isMaximisedModule) {
    return children;
  }

  const drawerTasks = {
    tasks: tasks.filter((t) => !t.location),
    updateTasksFailure,
    getTasksListFailure,
  };

  return (
    <div id="main" className={style.main}>
      {drawer.render(drawerTasks)}
      <div className={style.navAndRootView}>
        {nav.render(tasks, businessName, serialNumber, businessRole)}
        {browserAlert && (
          <div className={style.browserAlert}>
            <Alert type={browserAlert.type} onDismiss={onDismissBrowserAlert}>
              {browserAlert.message}
            </Alert>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  businessName: getBusinessDetails(state).organisationName,
  businessRole: getBusinessRole(state),
  isLoading: getIsLoading(state),
  serialNumber: getBusinessDetails(state).serialNumber,
  tasks: getTasks(state),
  browserAlert: getBrowserAlert(state),
  updateTasksFailure: getUpdateTasksFailure(state),
  getTasksListFailure: getGetTasksListFailure(state),
  isMaximisedModule: getIsMaximisedModule(state),
});

export default connect(mapStateToProps)(RootView);
