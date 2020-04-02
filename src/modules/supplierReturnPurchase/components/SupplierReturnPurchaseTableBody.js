import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating, getPurchases, getTotalAmountApplied } from '../SupplierReturnPurchaseSelector';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import styles from './SupplierReturnPurchaseTable.module.css';

const onAmountChange = (handler, index) => ({ target }) => {
  const { name, rawValue } = target;
  handler({ key: name, value: rawValue, index });
};

const SupplierReturnPurchaseTableBody = ({
  tableConfig,
  purchases,
  totalAmountApplied,
  isCreating,
  onUpdateTableAmountFields,
}) => (
  <>
    <Table.Body>
      {
        purchases.map((row, index) => (
          <Table.Row key={row.id}>
            <Table.RowItem {...tableConfig.date}>{row.date}</Table.RowItem>
            <Table.RowItem {...tableConfig.purchaseNumber}>
              <a href={row.link} target="_blank" rel="noopener noreferrer">{row.purchaseNumber}</a>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.status}>
              <Label type="boxed" color={row.statusLabelColour}>{row.status}</Label>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.amount}>{row.amount}</Table.RowItem>
            <Table.RowItem {...tableConfig.discount}>
              <AmountInput
                textAlign="right"
                name="discount"
                value={row.discount}
                onChange={onAmountChange(onUpdateTableAmountFields, index)}
                onBlur={onAmountChange(onUpdateTableAmountFields, index)}
                numeralDecimalScaleMin={2}
                numeralDecimalScaleMax={2}
                label="discount"
                disabled={!isCreating}
                hideLabel
              />
            </Table.RowItem>
            <Table.RowItem {...tableConfig.owed}>{row.owed}</Table.RowItem>
            <Table.RowItem {...tableConfig.amountApplied}>
              <AmountInput
                textAlign="right"
                name="amountApplied"
                value={row.amountApplied}
                onChange={onAmountChange(onUpdateTableAmountFields, index)}
                onBlur={onAmountChange(onUpdateTableAmountFields, index)}
                numeralDecimalScaleMin={2}
                numeralDecimalScaleMax={2}
                label="amountApplied"
                disabled={!isCreating}
                hideLabel
              />
            </Table.RowItem>
          </Table.Row>
        ))
      }
    </Table.Body>
    <div className={styles.totalPaid}>
      {`Total amount applied: ${totalAmountApplied}`}
    </div>
  </>
);

const mapStateToProps = state => ({
  purchases: getPurchases(state),
  totalAmountApplied: getTotalAmountApplied(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseTableBody);
