import {
  Button,
  Card,
  Icons,
  PageState,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './ErrorCard.module.css';
import unableToLoadImg from './unable-to-load.svg';

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
          <img
            className={styles.errorImage}
            src={unableToLoadImg}
            alt="something went wrong"
          />
        )}
      />
    </div>
  </Card>
);
