import {
  BaseTemplate, Card, Columns, PageHead,
} from '@myob/myob-widgets';
import React from 'react';

import PageView from '../PageView/PageView';

const LearnComponent = ({ title, children, media }) => {
  const view = (
    <BaseTemplate>
      <PageHead title={title} />

      <Card>
        {media
          ? (
            <Columns>
              <div>
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
