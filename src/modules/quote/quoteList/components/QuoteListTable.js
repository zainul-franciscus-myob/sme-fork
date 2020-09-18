import { Button, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsDefaultFilter,
  getIsTableEmpty,
  getIsTableLoading,
} from '../quoteListSelectors';
import Icon from '../../../../components/Icon/Icon';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import QuoteListTableBody from './QuoteListTableBody';
import TableView from '../../../../components/TableView/TableView';

const QuoteListTable = ({
  isTableEmpty,
  isTableLoading,
  isDefaultFilter,
  tableConfig,
  onAddQuote,
}) => {
  const emptyTableView = isDefaultFilter ? (
    <NoResultPageState
      title="Provide your customers with a quote"
      description="If they accept, you can turn this quote into an invoice in one click."
      actions={[
        <Button key={1} onClick={onAddQuote} type="link" icon={<Icons.Add />}>
          Create quote
        </Button>,
      ]}
    />
  ) : (
    <PageState
      title="No quotes found"
      description="Perhaps check the dates or remove the filters and try again."
      image={<Icon.NoResultState alt="No quotes found" />}
    />
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyTableView}
    >
      <QuoteListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
  isDefaultFilter: getIsDefaultFilter(state),
});

export default connect(mapStateToProps)(QuoteListTable);
