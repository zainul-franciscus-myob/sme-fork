import { Aside, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import React from 'react';

import { getActivities, getIsLoading } from '../ActivitiesSelectors';
import PageView from '../../../components/PageView/PageView';
import asideHeaderStyles from '../../AsideHeader.module.css';
import checked from './assets/icon-circle-tick-golf.svg';
import emptyStateImage from './assets/icon-activities-empty-state.svg';
import styles from './ActivitiesView.module.css';
import unchecked from './assets/icon-circle.svg';

const ActivitiesView = ({
  activities,
  closeActivities,
  isLoading,
  isActive,
}) => {
  if (!isActive) return <></>;

  const hasActivities = false;

  const activitiesView = () => (
    <div>
      <p>{activities.description}</p>

      <ol className={styles.activities}>
        {activities.activities.map(item => (
          <li key={item.title}>
            <Collapsible
              trigger={(
                <div>
                  <span>{item.title}</span>
                </div>
                )}
              transitionTime={200}
              header=""
            >
              <ul>
                {item.activities.map(subActivity => (
                  <li key={subActivity.title}>
                    <img src={subActivity.completed ? checked : unchecked} alt="status icon" width="32" height="32" />
                    <a href={`${subActivity.action}`}>{subActivity.title}</a>
                  </li>
                ))}
              </ul>
            </Collapsible>
          </li>
        ))}
      </ol>
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
