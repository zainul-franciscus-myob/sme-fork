import { BaseTemplate, Card } from '@myob/myob-widgets';
import React from 'react';

import styles from './RecurringTemplate.module.css';

const RecurringTemplate = ({
  alerts,
  modals,
  schedule,
  transaction,
  actions,
  pageHead,
}) => {
  return (
    <BaseTemplate>
      {alerts}
      {pageHead}
      {modals}
      <Card classes={styles.card} body={<Card.Body child={schedule} />} />
      <Card
        classes={[styles.card, styles.container]}
        body={<Card.Body child={transaction} />}
      />
      {actions}
    </BaseTemplate>
  );
};

export default RecurringTemplate;
