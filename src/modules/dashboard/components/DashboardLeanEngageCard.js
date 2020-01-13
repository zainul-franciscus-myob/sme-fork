import {
  Button,
  Card,
} from '@myob/myob-widgets';
import React from 'react';

import dogImg from './dog-image.svg';
import styles from './DashboardLeanEngageCard.module.css';

const onClick = () => {
  window.leanengage('triggerSurvey', 'dashboard-csat');
};

const DashboardLeanEngageCard = () => (
  <Card>
    <div className={styles.dogImage}>
      <img
        src={dogImg}
        alt=""
      />
    </div>
    <div className={styles.content}>
      <h3>Got feedback about the new dashboard experience?</h3>
      <Button type="link" onClick={onClick}>
        Tell us what you think
      </Button>
    </div>
  </Card>
);

export default DashboardLeanEngageCard;
