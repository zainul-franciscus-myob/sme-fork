import { RadioButton, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../transferMoneySelectors';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const TransferMoneyTableBody = ({ tableConfig, entries, onSelect }) => {
  const rows = entries.map(
    (
      {
        displayDate,
        accountId,
        accountDisplayName,
        amount,
        description,
        selected,
      },
      index
    ) => (
      // eslint-disable-next-line react/no-array-index-key
      <Table.Row key={index}>
        <Table.RowItem {...tableConfig.select}>
          <RadioButton
            name="selected"
            checked={selected}
            key={accountId}
            value={index.toString()}
            label="Select"
            hideLabel
            onChange={handleInputChange(onSelect)}
          />
        </Table.RowItem>
        <Table.RowItem {...tableConfig.date}>{displayDate}</Table.RowItem>
        <Table.RowItem {...tableConfig.account}>
          {accountDisplayName}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.description}>
          {description}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>{amount}</Table.RowItem>
      </Table.Row>
    )
  );

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(TransferMoneyTableBody);
