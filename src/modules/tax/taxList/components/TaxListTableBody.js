import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../taxListSelectors';
import style from './TaxListTableBody.module.css';

const TaxListTableBody = ({ tableConfig, entries }) => {
  const inactiveLabel = (
    <Label type="boxed" color="light-grey" size="small">
      Inactive
    </Label>
  );

  const rows = entries.map(
    ({
      id,
      code,
      description,
      codeType,
      collectedAccountName,
      collectedAccountIsActive,
      paidAccountName,
      paidAccountIsActive,
      rate,
      link,
    }) => (
      <Table.Row key={id}>
        <Table.RowItem {...tableConfig.taxCode}>
          <a href={link}>{code}</a>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.description}>
          {description}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.type}>{codeType}</Table.RowItem>
        <Table.RowItem {...tableConfig.collectedAccountName}>
          <div className={style.accountNameContainer}>
            <span className={style.accountName}>{collectedAccountName}</span>
            &nbsp;
            {!collectedAccountIsActive && inactiveLabel}
          </div>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.paidAccountName}>
          <div className={style.accountNameContainer}>
            <span className={style.accountName}>{paidAccountName}</span>
            &nbsp;
            {!paidAccountIsActive && inactiveLabel}
          </div>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.rate}>{rate}</Table.RowItem>
      </Table.Row>
    )
  );

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(TaxListTableBody);
