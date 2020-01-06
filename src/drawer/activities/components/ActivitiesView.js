import {
  Aside, Icons, Label, PageState,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActivities, getIsLoading } from '../ActivitiesSelectors';
import PageView from '../../../components/PageView/PageView';
import asideHeaderStyles from '../../AsideHeader.module.css';
import emptyStateImage from './assets/icon-activities-empty-state.svg';
import iconPlay from './assets/icon-play.svg';
import imageAccounts from './assets/accounts.svg';
import imageBankFeeds from './assets/bankFeeds.svg';
import imageBusinessDetails from './assets/businessDetails.svg';
import imageInviteUsers from './assets/inviteUsers.svg';
import styles from './ActivitiesView.module.css';

const imageForTask = (key) => {
  switch (key) {
    case 'businessDetails':
      return imageBusinessDetails;
    case 'accounts':
      return imageAccounts;
    case 'bankFeeds':
      return imageBankFeeds;
    case 'inviteUsers':
      return imageInviteUsers;
    default:
      return imageBusinessDetails;
  }
};

const ActivitiesView = ({
  activities,
  closeActivities,
  isLoading,
  isActive,
  closeTask,
}) => {
  if (!isActive) return null;
  const hasActivities = activities && activities.length > 0;

  const isCompleted = (activity, item) => (activity.data.closed || []).includes(item.key);

  const activitiesView = () => (
    <div>
      <div className={styles.spotlight}>
        <h2>Getting started</h2>
        <p>
          We&apos;ve picked a few tasks to get your business up and running.
          Make sure to check back here later for more setup tasks.
        </p>

        <a href="https://www.google.com/">
          <Icons.Hints size="16px" />
          Take a short tour
        </a>

        <a href="https://www.google.com/">
          <img src={iconPlay} width="16" height="16px" alt="play" />
          Watch an intro video
        </a>
      </div>

      <ul className={styles.activities}>
        {activities.map(activity => (
          activity.tasks.map(item => (
            <li key={item.title}>
              <a href={`${item.action}`} onClick={() => closeTask(activity.id, item.key)}>
                <img src={imageForTask(item.key)} alt="business details" width="36" />
                <div>
                  {isCompleted(activity, item) && <Label type="boxed" color="green" size="small">Done</Label>}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </a>
            </li>
          ))
        ))}
      </ul>
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
    <Aside header={<Aside.Header title="Feed" onClose={closeActivities} className={asideHeaderStyles.asideHeader} />}>
      <PageView isLoading={isLoading} view={view} />
    </Aside>
  );
};

const mapStateToProps = state => ({
  activities: getActivities(state),
  isLoading: getIsLoading(state),
  isActive: state.isActive,
});

export default connect(mapStateToProps)(ActivitiesView);
