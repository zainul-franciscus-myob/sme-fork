import { Aside, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsLoading, getOnboardingActivities, getWelcomeActivity } from '../ActivitiesSelectors';
import Onboarding from './Onboarding/Onboarding';
import PageView from '../../../components/PageView/PageView';
import Welcome from './Welcome/Welcome';
import asideHeaderStyles from '../../AsideHeader.module.css';
import emptyStateImage from './assets/icon-activities-empty-state.svg';

const ActivitiesView = ({
  onboardingActivities,
  closeView,
  isLoading,
  isActive,
  closeTask,
  closeActivity,
  welcomeActivity,
}) => {
  if (!isActive) return null;
  const hasActivities = onboardingActivities && onboardingActivities.length > 0;

  const activitiesView = () => (
    <div>
      <Welcome activity={welcomeActivity} closeActivity={closeActivity} />
      <Onboarding activities={onboardingActivities} closeTask={closeTask} />
    </div>
  );

  const emptyStateView = () => (
    <PageState
      title="Nice work, you're all caught up!"
      description="Check back here later for new tasks and notifications"
      image={<img src={emptyStateImage} alt="no activities" style={{ width: '10rem' }} />}
    />
  );

  const view = hasActivities ? activitiesView() : emptyStateView();

  return (
    <Aside header={<Aside.Header title="Feed" onClose={closeView} className={asideHeaderStyles.asideHeader} />}>
      <PageView isLoading={isLoading} view={view} />
    </Aside>
  );
};

const mapStateToProps = state => ({
  onboardingActivities: getOnboardingActivities(state),
  welcomeActivity: getWelcomeActivity(state),
  isLoading: getIsLoading(state),
  isActive: state.isActive,
});

export default connect(mapStateToProps)(ActivitiesView);
