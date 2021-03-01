import { Table } from '@myob/myob-widgets';
import React from 'react';

import FormattedAmountInput from '../../../../../../components/autoFormatter/AmountInput/FormattedAmountInput';
import ReadOnlyRowItem from './ReadOnlyRowItem';
import styles from '../../AccountListTable.module.css';

const handleOnChange = (handler, index) => ({ target }) => {
  const { name, rawValue } = target;
  handler({ key: name, value: rawValue, index });
};

// The auto formatting only happens onBlur so we need to update
// the state after it has format it to store the value
const handleOnBlur = (handler, index, onBlur) => ({ target }) => {
  const { name, rawValue } = target;
  handler({ key: name, value: rawValue, index });
  onBlur();
};

const OpeningBalanceRowItem = ({
  config,
  isSystem,
  isHeader,
  openingBalance,
  index,
  onChange,
  onBlur,
}) => {
  if (isSystem || isHeader) {
    return (
      <ReadOnlyRowItem
        config={config}
        title={openingBalance}
        isSystem={isSystem}
        isHeader={isHeader}
        value={openingBalance}
      />
    );
  }

  return (
    <Table.RowItem
      className={styles.accountInputRowItem}
      columnName={config.columnName}
      {...config.styles}
    >
      <FormattedAmountInput
        textAlign="right"
        className={styles.textAlign}
        label=""
        hideLabel
        name={config.fieldName}
        value={openingBalance}
        onChange={handleOnChange(onChange, index)}
        onBlur={handleOnBlur(onChange, index, onBlur)}
        numeralDecimalScaleMax={2}
        numeralDecimalScaleMin={2}
        numeralIntegerScale={13}
      />
    </Table.RowItem>
  );
};

export default OpeningBalanceRowItem;
