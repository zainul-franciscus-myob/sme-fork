import { Aside, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActive, getIsLoading } from '../ActivitiesSelectors';
import Onboarding from './Onboarding';
import PageView from '../../../components/PageView/PageView';
import Welcome from './Welcome';
import asideHeaderStyles from '../../AsideHeader.module.css';
import emptyStateImage from './assets/icon-activities-empty-state.svg';

// TODO: This will get cleaned up when we have AppState removing 'done' tasks
const isWelcomeComplete = welcomeActivity => !welcomeActivity
|| (welcomeActivity.tasks && welcomeActivity.tasks.length <= welcomeActivity.data.closed.length);

const ActivitiesView = ({
  closeTasks,
  closeView,
  isActive,
  loadingState,
  onboardingActivities,
  welcomeActivity,
}) => {
  if (!isActive) return null;
  const hasActivities = onboardingActivities && onboardingActivities.length > 0;

  const activitiesView = () => (
    <div>
      {!isWelcomeComplete(welcomeActivity)
        && <Welcome activity={welcomeActivity} closeTasks={closeTasks} />}
      <Onboarding activities={onboardingActivities} closeTasks={closeTasks} />
    </div>
  );

  const emptyStateView = () => (
    <PageState
      description="Check back here later for new tasks and notifications"
      image={<img src={emptyStateImage} alt="no activities" style={{ width: '10rem' }} />}
      title="Nice work, you're all caught up!"
    />
  );

  const view = hasActivities ? activitiesView() : emptyStateView();

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

export default connect(mapStateToProps)(ActivitiesView);
