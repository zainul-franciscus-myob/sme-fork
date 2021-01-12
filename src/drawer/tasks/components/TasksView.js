import { Aside, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActive, getIsLoading } from '../TasksSelectors';
import Onboarding from './Onboarding';
import PageView from '../../../components/PageView/PageView';
import Reporting from './Reporting';
import SystemUpgradedMessage from './SystemUpgradedMessage';
import TasksIcon from '../../../navigation/components/images/TasksIcon.svg';
import Welcome from './Welcome';
import asideHeaderStyles from '../../AsideHeader.module.css';
import emptyStateImage from './assets/icon-tasks-empty-state.svg';

const TasksView = ({
  closeTasks,
  dismissTask,
  closeView,
  closeIntroModal,
  openIntroModal,
  isActive,
  loadingState,
  onboardingTasks,
  welcomeTask,
  systemUpgradedMessageTask,
  isActiveRoute,
  constructPath,
  upgradeReportingTask,
  openReportingModal,
  closeReportingModal,
}) => {
  if (!isActive) return null;
  const hasTasks =
    welcomeTask ||
    systemUpgradedMessageTask ||
    (onboardingTasks && onboardingTasks.length > 0);

  const tasksView = () => (
    <div>
      <Welcome
        task={welcomeTask}
        closeTasks={closeTasks}
        closeIntroModal={closeIntroModal}
        openIntroModal={openIntroModal}
      />
      {systemUpgradedMessageTask && (
        <SystemUpgradedMessage
          task={systemUpgradedMessageTask}
          dismissTask={dismissTask}
        />
      )}
      <Onboarding
        tasks={onboardingTasks}
        closeTasks={closeTasks}
        dismissTask={dismissTask}
        isActiveRoute={isActiveRoute}
        constructPath={constructPath}
      />
      <Reporting
        tasks={upgradeReportingTask}
        closeTasks={closeTasks}
        dismissTask={dismissTask}
        constructPath={constructPath}
        openReportingModal={openReportingModal}
        closeReportingModal={closeReportingModal}
      />
    </div>
  );

  const emptyStateView = () => (
    <PageState
      description="Check back here later for new tasks and notifications"
      image={
        <img src={emptyStateImage} alt="no tasks" style={{ width: '10rem' }} />
      }
      title="Nice work, you're all caught up!"
    />
  );

  const view = hasTasks ? tasksView() : emptyStateView();

  const header = (
    <Aside.Header
      icon={<img src={TasksIcon} alt="Feed" />}
      title="Feed"
      onClose={closeView}
      className={asideHeaderStyles.asideHeader}
    />
  );

  return (
    <Aside header={header}>
      <PageView loadingState={loadingState} view={view} />
    </Aside>
  );
};

const mapStateToProps = (state) => ({
  isActive: getIsActive(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(TasksView);
