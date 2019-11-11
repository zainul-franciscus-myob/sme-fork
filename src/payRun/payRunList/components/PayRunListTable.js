import {
  Button,
  Dropdown,
  HeaderSort,
  Icons,
  PageState,
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFiltersTouched,
  getIsTableLoading,
  getOrder,
  getTableEntries,
} from '../payRunListSelectors';
import NoPayRunsPageStateImage from './images/no-pay-runs-page-state-image.svg';
import NoSTPPageStateImage from './images/no-stp-page-state-image.svg';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  date: { width: '22rem', valign: 'top', columnName: 'Date' },
  payPeriod: { width: 'flex-1', valign: 'top', columnName: 'Pay period' },
  employees: {
    width: 'flex-1',
    valign: 'top',
    align: 'right',
    columnName: 'Employees',
  },
  actions: {
    width: '22rem',
    align: 'right',
    cellRole: 'actions',
    valign: 'middle',
  },
};

const PayRunListTable = ({
  isTableLoading,
  onSort,
  sortOrder,
  entries,
  filtersTouched,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort title={tableConfig.date.columnName} sortName="date" activeSort={sortOrder} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.payPeriod}>
        {tableConfig.payPeriod.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employees}>
        {tableConfig.employees.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.actions}></Table.HeaderItem>
    </Table.Header>
  );

  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.date}>
        <a href={entry.link}>{entry.paymentDate}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.payPeriod}>{entry.payPeriod}</Table.RowItem>
      <Table.RowItem {...tableConfig.employees}>{entry.employeeCount}</Table.RowItem>
      <Table.RowItem {...tableConfig.actions}>
        <Dropdown
          right
          items={[
            <Dropdown.Item
              key="summary-report"
              label="Download summary report"
              value="summary-report"
            />,
            <Dropdown.Item
              key="pay-via-bank-file"
              label="Pay via bank file"
              value="pay-via-bank-file"
            />,
          ]}
          onSelect={() => {}}
          toggle={(
            <Dropdown.Toggle type="clear" aria-label="more options" size="xs">
              <Icons.More size="16px" />
            </Dropdown.Toggle>
          )}
        />
      </Table.RowItem>
    </Table.Row>
  ));

  const filterEmptyView = (
    <PageState
      title="There are no pay runs for the selected filter options."
    />
  );

  // This will be used until endpoints required to determine
  // whether the business has STP enabled are ready for integration.
  // eslint-disable-next-line no-unused-vars
  const noSTPEmptyView = (
    <PageState
      title="Sign up to Single Touch Payroll to see your past pay runs"
      actions={[<Button key={1} type="link" icon={<Icons.Add />}>Sign up for Single Touch Payroll</Button>]}
      description="You can still view and edit past runs from your list of
        transactions. You can view pay slips from the pay advice report."
      image={<img src={NoSTPPageStateImage} style={{ width: '60%' }} alt="no invoice" />}
    />
  );

  const noPayRunsEmptyView = (
    <PageState
      title="You have not recorded any pay runs yet"
      description="Your pay runs will show here once they are recorded."
      image={<img src={NoPayRunsPageStateImage} style={{ width: '60%' }} alt="no invoice" />}
    />
  );

  const isTableEmpty = entries.length === 0;
  const emptyView = filtersTouched ? filterEmptyView : noPayRunsEmptyView;

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      emptyMessage="Empty table"
    >
      <Table.Body>
        {rows}
      </Table.Body>
    </TableView>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
  sortOrder: getOrder(state),
  filtersTouched: getFiltersTouched(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(PayRunListTable);
