import { Button, Icons } from '@myob/myob-widgets';
import React from 'react';

import styles from './index.module.css';

const Welcome = ({ activity, closeActivity }) => {
  const { id, data: { isComplete } } = activity;
  if (isComplete === true) return null;

  const onCloseWelcomeActivity = (e) => {
    e.preventDefault();
    closeActivity({ activityId: id });
  };

  const onboardingTour = () => {
    window.location.href = `/#/${activity.region}/${activity.cdfguid}/dashboard?appcue=-LwVnYlAyZs8fgnratzU`;
  };

  return (
    <div className={styles.spotlight}>
      <button type="button" className={styles.close} onClick={onCloseWelcomeActivity}>
        <Icons.Close />
      </button>
      <h2>Getting started</h2>

      <p>
        We&apos;ve picked a few tasks to get your business up and running.
        Make sure to check back here later for more setup tasks.
      </p>

      <Button type="link" icon={<Icons.Hints />} onClick={onboardingTour}>Take a short tour</Button>
    </div>
  );
};

export default Welcome;
