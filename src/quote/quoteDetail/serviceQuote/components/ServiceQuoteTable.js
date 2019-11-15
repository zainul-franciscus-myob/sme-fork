import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableData, getTotals } from '../ServiceQuoteSelectors';
import ServiceQuoteTableRow from './ServiceQuoteTableRow';

const labels = ['Line description', 'Allocate to', 'Amount ($)', 'Tax code'];

const renderRow = (onRowInputBlurHandler, onAddAccount) => (index, data, onChange) => (
  <ServiceQuoteTableRow
    index={index}
    key={index}
    onChange={onChange}
    onAddAccount={onAddAccount}
    onRowInputBlur={onRowInputBlurHandler}
  />
);

const onRowChange = handler => (index, key, value) => handler({ index, key, value });

const onTableAddRow = handler => ({ id, ...partialLine }) => handler(partialLine);

const onTableRemoveRow = handler => index => handler(index);

const ServiceQuoteTable = ({
  onAddAccount,
  tableData,
  totals,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
}) => {
  const {
    subTotal,
    totalTax,
    totalAmount,
  } = totals;

  return (
    <LineItemTable
      labels={labels}
      renderRow={renderRow(onRowInputBlur, onAddAccount)}
      data={tableData}
      onAddRow={onTableAddRow(onAddRow)}
      onRowChange={onRowChange(onUpdateRow)}
      onRemoveRow={onTableRemoveRow(onRemoveRow)}
    >
      <LineItemTable.Total>
        <LineItemTable.Totals title="Net amount" amount={subTotal} />
        <LineItemTable.Totals title="Tax" amount={totalTax} />
        <LineItemTable.Totals totalAmount title="Total amount" amount={totalAmount} />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

ServiceQuoteTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  totals: PropTypes.shape().isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(ServiceQuoteTable);
