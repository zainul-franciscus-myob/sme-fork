import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableData, getTotals } from '../ServiceQuoteSelectors';
import ServiceQuoteTableRow from './ServiceQuoteTableRow';

const labels = ['Description', 'Allocate to', 'Tax type', 'Amount'];

const renderRow = index => (
  <ServiceQuoteTableRow index={index} key={index} />
);

const ServiceQuoteTable = ({
  tableData,
  totals,
}) => {
  const {
    subTotal,
    totalTax,
    totalAmount,
  } = totals;

  return (
    <LineItemTable
      labels={labels}
      renderRow={renderRow}
      data={tableData}
      onAddRow={() => console.log('onAddRow')}
      onRowChange={() => console.log('onRowChange')}
      onRemoveRow={() => console.log('onRemoveRow')}
    >
      <LineItemTable.Total>
        <LineItemTable.Totals title="Subtotal" amount={subTotal} />
        <LineItemTable.Totals title="Tax" amount={totalTax} />
        <LineItemTable.Totals totalAmount title="Total" amount={totalAmount} />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

ServiceQuoteTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  totals: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(ServiceQuoteTable);
