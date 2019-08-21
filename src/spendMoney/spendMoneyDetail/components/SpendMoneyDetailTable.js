import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getIndexOfLastLine, getTableData, getTotals,
} from '../spendMoneyDetailSelectors';
import SpendMoneyDetailRow from './SpendMoneyDetailRow';

class SpendMoneyDetailTable extends React.Component {
  onChange = (index, name, value) => {
    const { onUpdateRow } = this.props;
    onUpdateRow(index, name, value);
  }

  onAddRow = ({ id, ...partialLine }) => {
    const { onAddRow } = this.props;
    onAddRow(partialLine);
  }

  onRowInputBlur = index => () => {
    const { onRowInputBlur } = this.props;
    onRowInputBlur(index);
  }

  renderRow = (index, data, onChange, labels) => {
    const {
      indexOfLastLine,
    } = this.props;

    const isNewLineRow = indexOfLastLine < index;

    return (
      <SpendMoneyDetailRow
        index={index}
        key={index}
        labels={labels}
        onChange={onChange}
        isNewLineRow={isNewLineRow}
        onRowInputBlur={this.onRowInputBlur}
      />
    );
  };

  render() {
    const labels = [
      'Account', 'Amount ($)', 'Description', 'Tax code',
    ];

    const headerItems = labels.map(label => (
      <LineItemTable.HeaderItem columnName={label} requiredLabel={label !== 'Description' ? 'Required' : null}>
        {label}
      </LineItemTable.HeaderItem>
    ));

    const {
      tableData,
      amountTotals: {
        netAmount,
        totalTax,
        totalAmount,
      },
      onRemoveRow,
    } = this.props;

    const columnConfig = [
      {
        config: [
          {
            columnName: 'Account',
            styles: { width: '35.2rem', align: 'left' },
          },
          {
            columnName: 'Amount ($)',
            styles: { width: '12.5rem', align: 'right' },
          },
          {
            columnName: 'Tax code',
            styles: { width: '8rem', align: 'left' },
          },
        ],
      },
    ];

    return (
      <LineItemTable
        onAddRow={this.onAddRow}
        onRowChange={this.onChange}
        labels={labels}
        columnConfig={columnConfig}
        headerItems={headerItems}
        renderRow={this.renderRow}
        data={tableData}
        onRemoveRow={onRemoveRow}
      >
        <LineItemTable.Total>
          <LineItemTable.Totals title="Subtotal" amount={netAmount} />
          <LineItemTable.Totals title="Tax" amount={totalTax} />
          <LineItemTable.Totals totalAmount title="Total" amount={totalAmount} />
        </LineItemTable.Total>
      </LineItemTable>
    );
  }
}

SpendMoneyDetailTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
  amountTotals: getTotals(state),
  indexOfLastLine: getIndexOfLastLine(state),
  tableData: getTableData(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailTable);
