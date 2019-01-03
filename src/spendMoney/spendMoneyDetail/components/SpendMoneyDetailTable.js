import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getFormattedTotals, getIndexOfLastLine, getTableData,
} from '../spendMoneyDetailSelectors';
import SpendMoneyDetailRow from './SpendMoneyDetailRow';

class SpendMoneyDetailTable extends React.Component {
  onChange = (index, name, value) => {
    const { onUpdateRow } = this.props;
    onUpdateRow(index, name, value);
  }

  onMoveRow = () => {}

  onAddRow = ({ id, ...partialLine }) => {
    const { onAddRow } = this.props;
    onAddRow(partialLine);
  }

  onRowInputBlur = index => () => {
    const { onRowInputBlur } = this.props;
    onRowInputBlur(index);
  }

  renderRow = (index, data, onChange) => {
    const {
      indexOfLastLine,
    } = this.props;

    const isNewLineRow = indexOfLastLine < index;

    return (
      <SpendMoneyDetailRow
        index={index}
        key={index}
        onMoveRow={this.onMoveRow}
        onChange={onChange}
        isNewLineRow={isNewLineRow}
        onRowInputBlur={this.onRowInputBlur}
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

SpendMoneyDetailTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  newLineData: PropTypes.shape({}).isRequired,
  indexOfLastLine: PropTypes.number.isRequired,
  amountTotals: PropTypes.shape({
    totalDebit: PropTypes.string,
    totalCredit: PropTypes.string,
    totalTax: PropTypes.string,
    totalOutOfBalance: PropTypes.string,
  }).isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  amountTotals: getFormattedTotals(state),
  indexOfLastLine: getIndexOfLastLine(state),
  tableData: getTableData(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailTable);
