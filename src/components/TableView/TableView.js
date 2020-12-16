import { PageState, Spinner, Table } from '@myob/myob-widgets';
import React from 'react';

const spinnerView = (
  <PageState title="Loading" image={<Spinner size="medium" />} />
);

const getDefaultEmptyView = (emptyMessage = 'No results found') => (
  <PageState title={emptyMessage} />
);

const TableView = ({
  isLoading,
  isEmpty,
  emptyMessage,
  emptyView,
  header,
  children,
  ...props
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
      {header}
      {view}
    </Table>
  );
};

export default TableView;
