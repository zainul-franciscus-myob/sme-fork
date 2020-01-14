import { Label } from '@myob/myob-widgets';
import React from 'react';

import imageAccounts from './assets/accounts.svg';
import imageBankFeeds from './assets/bankFeeds.svg';
import imageBusinessDetails from './assets/businessDetails.svg';
import imageInviteUsers from './assets/inviteUsers.svg';
import styles from './index.module.css';

const isCompleted = (activity, item) => (activity.data.closed || []).includes(item.key);

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

const Onboarding = ({ activities, closeTask }) => (
  <ul className={styles.activities}>
    {activities.map(activity => (
      activity.tasks.map(item => (
        <li key={item.title}>
          <a href={`${item.action}`} onClick={(e) => { e.preventDefault(); closeTask({ activityId: activity.id, activityKey: item.key }); }}>
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
);

export default Onboarding;
