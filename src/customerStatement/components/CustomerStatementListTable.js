import { Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../selectors/customerStatementListSelectors';
import CustomerStatementListTableActions from './CustomerStatementListTableActions';
import CustomerStatementListTableBody from './CustomerStatementListTableBody';
import CustomerStatementListTableHeader from './CustomerStatementListTableHeader';
import NoResultPageState from '../../components/NoResultPageState/NoResultPageState';
import TableView from '../../components/TableView/TableView';

const name = 'Customer name';
const contactPerson = 'Contact person';
const phoneNumber = 'Phone number';
const email = 'Email';
const balance = 'Balance due ($)';

const responsiveWidths = [
  {
    'min-width': '768px',
    config: [
      { columnName: name, styles: { width: 'flex-1' } },
      { columnName: contactPerson, styles: { width: 'flex-1' } },
      { columnName: phoneNumber, styles: { width: '16.8rem' } },
      { columnName: email, styles: { width: 'flex-1' } },
      { columnName: balance, styles: { width: '16.8rem' } },
    ],
  },
  {
    'min-width': '1100px',
    config: [
      { columnName: name, styles: { width: 'flex-1' } },
      { columnName: contactPerson, styles: { width: '22.9rem' } },
      { columnName: phoneNumber, styles: { width: '16.8rem' } },
      { columnName: email, styles: { width: '22.9rem' } },
      { columnName: balance, styles: { width: '16.8rem' } },
    ],
  },
];

const tableConfig = {
  checkbox: { width: 'auto', cellRole: 'checkbox', valign: 'middle' },
  name: { columnName: name, styles: { align: 'left' } },
  contactPerson: { columnName: contactPerson, styles: { align: 'left' } },
  phoneNumber: { columnName: phoneNumber, styles: { align: 'left' } },
  email: { columnName: email, styles: { align: 'left' } },
  balance: { columnName: balance, styles: { align: 'right' } },
};

const CustomerStatementListTable = ({
  isTableLoading,
  isTableEmpty,
  onToggleAllCustomerStatements,
  onSelectCustomerStatement,
  onSelectPdfDropdown,
  onClickEmailButton,
  onSort,
}) => {
  const emptyView = (
    <NoResultPageState
      title="You have no statements"
      description="Statements will display once invoices are created"
    />
  );

  const header = (
    <CustomerStatementListTableHeader
      tableConfig={tableConfig}
      onToggleAllCustomerStatements={onToggleAllCustomerStatements}
      onSort={onSort}
    />);

  const tableBody = (
    <CustomerStatementListTableBody
      tableConfig={tableConfig}
      onSelectCustomerStatement={onSelectCustomerStatement}
    />
  );

  return (
    <Card>
      <CustomerStatementListTableActions
        onClickEmailButton={onClickEmailButton}
        onSelectPdfDropdown={onSelectPdfDropdown}
      />
      <TableView
        isLoading={isTableLoading}
        isEmpty={isTableEmpty}
        emptyView={emptyView}
        header={header}
        responsiveWidths={responsiveWidths}
        hasActions
        // This prop is necessary to enable certain styling for the Table component in mobile view
        // for when the table has a checkbox/radio button, or any actionable item for each row.
        onRowSelect={() => {}}
      >
        {tableBody}
      </TableView>
    </Card>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(CustomerStatementListTable);
