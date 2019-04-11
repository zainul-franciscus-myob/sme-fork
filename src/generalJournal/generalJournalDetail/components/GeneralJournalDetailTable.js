import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getIndexOfLastLine, getIsOutOfBalanced, getTableData, getTotals,
} from '../generalJournalDetailSelectors';
import GeneralJournalDetailRow from './GeneralJournalDetailRow';

class GeneralJournalDetailTable extends React.Component {
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
      <GeneralJournalDetailRow
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
      'Account', 'Debit ($)', 'Credit ($)', 'Line description', 'Tax code',
    ];

    const {
      tableData,
      amountTotals: {
        totalDebit,
        totalCredit,
        totalTax,
        totalOutOfBalance,
      },
      onRemoveRow,
      isOutOfBalance,
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
          <LineItemTable.Totals title="Total debit" amount={totalDebit} />
          <LineItemTable.Totals title="Total credit" amount={totalCredit} />
          <LineItemTable.Totals title="Tax" amount={totalTax} />
          <LineItemTable.Totals totalAmount type={isOutOfBalance && 'danger'} title="Out of balance" amount={totalOutOfBalance} />
        </LineItemTable.Total>
      </LineItemTable>
    );
  }
}

GeneralJournalDetailTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  indexOfLastLine: PropTypes.number.isRequired,
  isOutOfBalance: PropTypes.bool.isRequired,
  amountTotals: PropTypes.shape({
    totalDebit: PropTypes.string,
    totalCredit: PropTypes.string,
    totalTax: PropTypes.string,
    totalOutOfBalance: PropTypes.string,
  }).isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  amountTotals: getTotals(state),
  indexOfLastLine: getIndexOfLastLine(state),
  tableData: getTableData(state),
  isOutOfBalance: getIsOutOfBalanced(state),
});

export default connect(mapStateToProps)(GeneralJournalDetailTable);
