import { Table } from '@myob/myob-widgets';
import React from 'react';

import ReadOnlyRowItem from './ReadOnlyRowItem';
import TaxCodeCombobox from '../../../../../../components/combobox/TaxCodeCombobox';
import styles from '../../AccountListTable.module.css';

const handleComboChange = (handler, index, key) => (taxCode) => {
  handler({ index, key, value: taxCode.id });
};

const TaxCodeRowItem = ({
  config,
  isSystem,
  isHeader,
  taxCodeList,
  taxCode,
  selectedTaxCodeId,
  index,
  onChange,
}) => {
  if (isHeader) {
    return (
      <ReadOnlyRowItem
        config={config}
        value={taxCode}
        title={taxCode}
        isSystem={isSystem}
        isHeader={isHeader}
      />
    );
  }

  const metaData = [
    { columnName: 'displayName', columnWidth: '5rem', showData: true },
    { columnName: 'description', columnWidth: '20rem' },
    { columnName: 'displayRate', columnWidth: '5rem' },
  ];

  return (
    <Table.RowItem
      className={styles.taxCodeRowItem}
      columnName={config.columnName}
      {...config.styles}
    >
      <TaxCodeCombobox
        name={config.fieldName}
        label=""
        metaData={metaData}
        items={taxCodeList}
        selectedId={`${selectedTaxCodeId}`}
        onChange={handleComboChange(onChange, index, config.fieldName)}
        width="xs"
      />
    </Table.RowItem>
  );
};

export default TaxCodeRowItem;
