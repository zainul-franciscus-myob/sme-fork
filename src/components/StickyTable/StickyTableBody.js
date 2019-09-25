import {
  PageState,
  Spinner,
  Table,
} from '@myob/myob-widgets';
import React from 'react';

const spinnerView = (
  <PageState
    title={<Spinner size="medium" />}
    description="Loading"
  />
);

const getDefaultEmptyView = (emptyMessage = 'No results found') => (
  <PageState
    title={emptyMessage}
  />
);

const StickyTableBody = ({
  isLoading, isEmpty, emptyMessage, emptyView, children, ...props
}) => {
  let view;
  if (isLoading) {
    view = spinnerView;
  } else if (isEmpty) {
    if (emptyView) {
      view = emptyView;
    } else {
      view = getDefaultEmptyView(emptyMessage);
    }
  } else {
    view = children;
  }

  return (
    <Table {...props}>
      <Table.Body>
        {view}
      </Table.Body>
    </Table>
  );
};

export default StickyTableBody;
