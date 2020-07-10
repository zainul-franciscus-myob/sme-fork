import { Checkbox, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCustomerStatements } from '../selectors/customerStatementListSelectors';

const CustomerStatementListTableBody = ({
  tableConfig,
  customerStatements,
  onSelectCustomerStatement,
}) => {
  const tableBody = (
    <Table.Body>
      {customerStatements.map((customerStatement, index) => (
        <Table.Row
          key={customerStatement.id}
          isSelected={customerStatement.isSelected}
          isActive={customerStatement.isSelected}
        >
          <Table.RowItem {...tableConfig.checkbox}>
            <Checkbox
              name="isSelected"
              label="selectCustomer"
              hideLabel
              onChange={() => onSelectCustomerStatement(index)}
              checked={customerStatement.isSelected}
            />
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.name.columnName}
            {...tableConfig.name.styles}
          >
            <a
              href={customerStatement.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {customerStatement.name}
            </a>
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.contactPerson.columnName}
            {...tableConfig.contactPerson.styles}
          >
            {customerStatement.contactPerson}
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.phoneNumber.columnName}
            {...tableConfig.phoneNumber.styles}
          >
            {customerStatement.phoneNumber}
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.email.columnName}
            {...tableConfig.email.styles}
          >
            {customerStatement.email}
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.balance.columnName}
            {...tableConfig.balance.styles}
          >
            {customerStatement.balance}
          </Table.RowItem>
        </Table.Row>
      ))}
    </Table.Body>
  );

  return tableBody;
};

const mapStateToProps = (state) => ({
  customerStatements: getCustomerStatements(state),
});

export default connect(mapStateToProps)(CustomerStatementListTableBody);
