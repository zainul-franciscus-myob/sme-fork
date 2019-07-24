import { PageState, Spinner } from '@myob/myob-widgets';
import React from 'react';

const LoadingPageState = ({
  size = 'large',
}) => (
  <PageState
    title="Loading"
    image={<Spinner size={size} />}
  />
);

export default LoadingPageState;
