import { BaseTemplate, Card, PageHead } from '@myob/myob-widgets';
import React from 'react';

import PageView from '../PageView/PageView';
import style from './LearnComponent.module.css';

const LearnComponent = ({
  title, description, media,
}) => {
  const view = (
    <BaseTemplate>
      <PageHead title={title} />
      <Card>
        <div className={style.row}>
          <div className={style.column}>
            {description}
          </div>
          {media && (
            <div className={style.column}>
              {media}
            </div>
          )}
        </div>
      </Card>
    </BaseTemplate>
  );
  return <PageView view={view} />;
};

export default LearnComponent;
