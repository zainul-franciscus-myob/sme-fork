import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIndexOfLastLine, getTableData, getTaxCodeLabel, getTaxLabel, getTotals,
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
    const {
      tableData,
      amountTotals: {
        netAmount,
        totalTax,
        totalAmount,
      },
      onRemoveRow,
      taxLabel,
      taxCodeLabel,
    } = this.props;

    const columns = [
      {
        label: 'Account',
        requiredLabel: 'Required',
        styles: { width: '35.2rem', align: 'left' },
      },
      {
        label: 'Amount ($)',
        requiredLabel: 'Required',
        styles: { width: '12.5rem', align: 'right' },
      },
      {
        label: 'Description',
        styles: {},
      },
      {
        label: taxCodeLabel,
        requiredLabel: 'Required',
        styles: { width: '8.4rem', align: 'left' },
      },
    ];

    const labels = columns.map(({ label }) => label);

    const headerItems = columns.map(({ label, requiredLabel }) => (
      <LineItemTable.HeaderItem
        key={label}
        columnName={label}
        requiredLabel={requiredLabel}
      >
        {label}
      </LineItemTable.HeaderItem>
    ));

    const columnConfig = [
      {
        config: columns.map(({ label, styles }) => ({
          styles,
          columnName: label,
        })),
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
          <LineItemTable.Totals title={taxLabel} amount={totalTax} />
          <LineItemTable.Totals totalAmount title="Total" amount={totalAmount} />
        </LineItemTable.Total>
      </LineItemTable>
    );
  }
}

const mapStateToProps = state => ({
  amountTotals: getTotals(state),
  indexOfLastLine: getIndexOfLastLine(state),
  tableData: getTableData(state),
  taxLabel: getTaxLabel(state),
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailTable);
