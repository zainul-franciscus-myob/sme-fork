import { Button } from '@myob/myob-widgets';
import React from 'react';

import styles from './HelpLeanEngage.module.css';

const openLeanEngageSurvey = () => {
  window.leanengage('triggerSurvey', 'in-product-help-csat');
};

const HelpLeanEngage = () => (
  <div className={styles.helpLeanEngage}>
    <h4>Was this helpful?</h4>
    <Button type="secondary" onClick={openLeanEngageSurvey}>Let us know</Button>
  </div>
);

export default HelpLeanEngage;
