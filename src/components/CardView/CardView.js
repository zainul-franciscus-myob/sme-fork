import { Card, PageState, Spinner } from '@myob/myob-widgets';
import React from 'react';

const spinnerView = (
  <PageState title="Loading" image={<Spinner size="medium" />} />
);

const CardView = ({ isLoading, view, cardBodyClassname = '' }) => (
  <Card
    body={
      <Card.Body
        child={isLoading ? spinnerView : view}
        classes={[cardBodyClassname]}
      />
    }
  />
);

export default CardView;
