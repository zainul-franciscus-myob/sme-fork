import { Button, Icons } from '@myob/myob-widgets';
import React from 'react';

import styles from './index.module.css';

const Welcome = ({ task, closeTasks }) => {
  const onCloseWelcomeTask = (e) => {
    e.preventDefault();
    closeTasks({ closeEvent: 'welcomeViewed' });
  };

  const onboardingTour = () => {
    window.location.href = task.action;
  };

  return (
    <div className={styles.spotlight}>
      <button type="button" className={styles.close} onClick={onCloseWelcomeTask}>
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
