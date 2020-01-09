import React from 'react';

import NoResultPageState from '../../../../../components/NoResultPageState/NoResultPageState';

const ReportsEmpty = () => (
  <NoResultPageState
    title="Nothing to see here!"
    description="Expecting to see reports? Reports can take a few minutes to show up here."
  />
);

export default ReportsEmpty;
