import { Checkbox, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getRemittanceAdvices } from '../selectors/remittanceAdviceListSelectors';

const RemittanceAdviceListTableBody = ({
  tableConfig,
  remittanceAdvices,
  onSelectRemittanceAdvice,
}) => {
  return (
    <Table.Body>
      {remittanceAdvices.map((remittanceAdvice) => (
        <Table.Row
          key={remittanceAdvice.id}
          isSelected={remittanceAdvice.isSelected}
          isActive={remittanceAdvice.isSelected}
        >
          <Table.RowItem {...tableConfig.checkbox}>
            <Checkbox
              name="isSelected"
              label="selectSupplier"
              hideLabel
              onChange={() => onSelectRemittanceAdvice(remittanceAdvice.id)}
              checked={remittanceAdvice.isSelected}
            />
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.paymentDate.columnName}
            {...tableConfig.paymentDate.styles}
          >
            {remittanceAdvice.paymentDate}
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.referenceNumber.columnName}
            {...tableConfig.referenceNumber.styles}
          >
            <a
              href={remittanceAdvice.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {remittanceAdvice.referenceNumber}
            </a>
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.supplier.columnName}
            {...tableConfig.supplier.styles}
          >
            {remittanceAdvice.supplier}
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.emailAddress.columnName}
            {...tableConfig.emailAddress.styles}
          >
            {remittanceAdvice.emailAddress}
          </Table.RowItem>
          <Table.RowItem
            columnName={tableConfig.amountPaid.columnName}
            {...tableConfig.amountPaid.styles}
          >
            {remittanceAdvice.amountPaid}
          </Table.RowItem>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

const mapStateToProps = (state) => ({
  remittanceAdvices: getRemittanceAdvices(state),
});

export default connect(mapStateToProps)(RemittanceAdviceListTableBody);
