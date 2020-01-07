import {
  Icons,
} from '@myob/myob-widgets';
import React from 'react';

import crossPurple from './assets/cross-purple.svg';
import iconPlay from './assets/icon-play.svg';
import styles from './Welcome.module.css';

const Welcome = ({ activity, closeActivity }) => {
  const { id, data: { isComplete } } = activity;
  if (isComplete === true) return null;

  const onCloseWelcomeActivity = () => closeActivity(id);

  return (
    <div className={styles.spotlight}>
      <button type="button" className={styles.close} onClick={onCloseWelcomeActivity}>
        <img src={crossPurple} width="12px" height="12px" alt="play" />
      </button>
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
  );
};

export default Welcome;
