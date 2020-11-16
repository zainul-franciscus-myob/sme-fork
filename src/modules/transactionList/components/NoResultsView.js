import { PageState } from '@myob/myob-widgets';
import React from 'react';

import Icon from '../../../components/Icon/Icon';
import styles from './NoResultsView.module.css';

const NoResultsView = () => (
  <PageState
    title="No transactions found"
    description="Perhaps check the dates or remove the filters and try again."
    image={
      <Icon.NoResultState
        className={styles.icon}
        alt="No transactions found."
      />
    }
  />
);

export default NoResultsView;
