import {
  Button,
  Card,
  Icons,
  PageState,
} from '@myob/myob-widgets';
import React from 'react';

import Icon from '../../components/Icon/Icon';
import styles from './ErrorCard.module.css';

export default ({ onTry }) => (
  <Card>
    <div className={styles.hasError}>
      <PageState
        title="We are unable to load your content at this time"
        actions={[
          <Button type="link" icon={<Icons.Refresh />} onClick={onTry}>
            Try again
          </Button>,
        ]}
        image={(
          <Icon.Error className={styles.errorImage} />
        )}
      />
    </div>
  </Card>
);
