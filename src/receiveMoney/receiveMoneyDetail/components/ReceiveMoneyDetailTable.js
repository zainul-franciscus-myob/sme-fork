import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getFormattedTotals, getIndexOfLastLine, getTableData,
} from '../receiveMoneyDetailSelectors';
import ReceiveMoneyDetailRow from './ReceiveMoneyDetailRow';

class ReceiveMoneyDetailTable extends React.Component {
  onChange = (index, name, value) => {
    const { onUpdateRow } = this.props;
    onUpdateRow(index, name, value);
  }

  onMoveRow = () => {}

  onAddRow = () => {}

  renderRow = (index, data, onChange) => {
    const {
      indexOfLastLine,
    } = this.props;

    const isNewLineRow = indexOfLastLine < index;

    return (
      <ReceiveMoneyDetailRow
        index={index}
        key={index}
        onMoveRow={this.onMoveRow}
        onChange={onChange}
        isNewLineRow={isNewLineRow}
      />
    );
  };

  render() {
    const labels = [
      'Account', 'Amount ($)', 'Line description', 'Tax code',
    ];

    const {
      tableData,
      amountTotals: {
        netAmount,
        totalTax,
        totalAmount,
      },
      onRemoveRow,
    } = this.props;

    return (
      <LineItemTable
        onAddRow={this.onAddRow}
        onRowChange={this.onChange}
        labels={labels}
        renderRow={this.renderRow}
        data={tableData}
        onRemoveRow={onRemoveRow}
      >
        <LineItemTable.Total>
          <LineItemTable.Totals title="Net amount" amount={netAmount} />
          <LineItemTable.Totals title="Tax" amount={totalTax} />
          <LineItemTable.Totals totalAmount title="Total amount" amount={totalAmount} />
        </LineItemTable.Total>
      </LineItemTable>
    );
  }
}

ReceiveMoneyDetailTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  indexOfLastLine: PropTypes.number.isRequired,
  amountTotals: PropTypes.shape({
    totalDebit: PropTypes.string,
    totalCredit: PropTypes.string,
    totalTax: PropTypes.string,
    totalOutOfBalance: PropTypes.string,
  }).isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  amountTotals: getFormattedTotals(state),
  indexOfLastLine: getIndexOfLastLine(state),
  tableData: getTableData(state),
});

export default connect(mapStateToProps)(ReceiveMoneyDetailTable);
