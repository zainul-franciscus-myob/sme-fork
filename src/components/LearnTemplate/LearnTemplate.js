import { BaseTemplate, Card, PageHead } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import PageView from '../PageView/PageView';
import WistiaVideoPlayer from '../WistiaVideoPlayer/WistiaVideoPlayer';
import styles from './LearnTemplate.module.css';

export const Row = ({ children, className }) => (
  <div className={classNames(styles.row, className)}>
    { children }
  </div>
);

export const Column = ({ children, className }) => (
  <div className={classNames(styles.column, className)}>
    { children }
  </div>
);

export const LearnCallToAction = ({ children, className }) => (
  <div className={classNames(styles['mt-xx-large'], styles['mt-sm-medium'], className)}>
    { children }
  </div>
);

export const LearnVideo = ({ hashedId }) => (
  <WistiaVideoPlayer hashedId={hashedId} className={styles['mt-sm-x-large']} />
);

export const LearnTemplate = ({ title, children }) => {
  const view = (
    <BaseTemplate baseTemplateClassName={styles.learnTemplate}>
      <PageHead title={title} />

      <Card>
        { children }
      </Card>
    </BaseTemplate>
  );

  return <PageView view={view} />;
};
