import { Aside, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActive, getIsLoading } from '../TasksSelectors';
import Onboarding from './Onboarding';
import PageView from '../../../components/PageView/PageView';
import Welcome from './Welcome';
import asideHeaderStyles from '../../AsideHeader.module.css';
import emptyStateImage from './assets/icon-tasks-empty-state.svg';


const TasksView = ({
  closeTasks,
  closeView,
  isActive,
  loadingState,
  onboardingTasks,
  welcomeTask,
}) => {
  if (!isActive) return null;
  const hasTasks = onboardingTasks && onboardingTasks.length > 0;

  const tasksView = () => (
    <div>
      <Welcome task={welcomeTask} closeTasks={closeTasks} />
      <Onboarding tasks={onboardingTasks} closeTasks={closeTasks} />
    </div>
  );

  const emptyStateView = () => (
    <PageState
      description="Check back here later for new tasks and notifications"
      image={<img src={emptyStateImage} alt="no tasks" style={{ width: '10rem' }} />}
      title="Nice work, you're all caught up!"
    />
  );

  const view = hasTasks ? tasksView() : emptyStateView();

  return (
    <Aside header={<Aside.Header title="Feed" onClose={closeView} className={asideHeaderStyles.asideHeader} />}>
      <PageView loadingState={loadingState} view={view} />
    </Aside>
  );
};

const mapStateToProps = state => ({
  isActive: getIsActive(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(TasksView);
