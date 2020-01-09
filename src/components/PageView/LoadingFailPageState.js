import { PageState, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import Icon from '../Icon/Icon';
import styles from '../../modules/dashboard/components/ErrorCard.module.css';

const LoadingFailPageState = () => (
  <StandardTemplate>
    <PageState
      title="Something went wrong"
      description={(
        <div>
          Try refreshing your browser
          <br />
          If the issue persists, contact MYOB support
        </div>
      )}
      image={(
        <Icon.Error className={styles.errorImage} />
      )}
    />
  </StandardTemplate>
);

export default LoadingFailPageState;
