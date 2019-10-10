import {
  Card,
  PageState,
  Spinner,
} from '@myob/myob-widgets';
import React from 'react';

const spinnerView = (
  <PageState
    title={<Spinner size="medium" />}
    description="Loading"
  />
);

const CardView = ({
  isLoading, view,
}) => (
  <Card>
    {isLoading ? spinnerView : view}
  </Card>
);

export default CardView;
