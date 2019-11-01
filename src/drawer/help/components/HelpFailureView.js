import {
  PageState,
} from '@myob/myob-widgets';
import React from 'react';

import Icon from '../../../components/Icon/Icon';
import styles from './HelpFailureView.module.css';

const HelpFailureView = () => (
  <PageState
    title="Sorry, something went wrong on our end"
    description={<p>Please try again by refreshing this page</p>}
    image={(
      <Icon.Error className={styles.errorIcon} />
    )}
  />
);

export default HelpFailureView;
