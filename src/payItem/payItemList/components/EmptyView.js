import { PageState } from '@myob/myob-widgets';
import React from 'react';

const EmptyView = ({ payItem, additionalMessage }) => (
  <PageState
    title={`You have not created any ${payItem} yet.`}
    description={(
      <p>
        {`Your ${payItem} will show here once they are created.`}
        <br />
        {additionalMessage}
      </p>
    )}
  />
);

export default EmptyView;
