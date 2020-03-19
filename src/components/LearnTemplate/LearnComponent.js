import {
  BaseTemplate, Card, Columns, PageHead,
} from '@myob/myob-widgets';
import React from 'react';

import PageView from '../PageView/PageView';
import styles from './LearnComponent.module.css';

const LearnComponent = ({ title, children, media }) => {
  const view = (
    <BaseTemplate>
      <PageHead title={title} />

      <Card>
        {media
          ? (
            <Columns>
              <div className={styles.textContainer}>
                {children}
              </div>

              {media}
            </Columns>
          )
          : children
        }
      </Card>
    </BaseTemplate>
  );

  return <PageView view={view} />;
};

export default LearnComponent;
