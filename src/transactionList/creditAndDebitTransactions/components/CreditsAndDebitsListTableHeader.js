import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOrder } from '../creditsAndDebitsListSelectors';
import { getResponsiveConfig } from './getResponsiveConfig';

const CreditsAndDebitsListTableHeader = ({ order, onSort, tableConfig }) => (
  <Table responsiveWidths={getResponsiveConfig(tableConfig)}>
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort
          title={tableConfig.date.columnName}
          sortName="Date"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceId}>
        <HeaderSort
          title={tableConfig.referenceId.columnName}
          sortName="Reference"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort
          title={tableConfig.description.columnName}
          sortName="Description"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayAccountName}>
        {tableConfig.displayAccountName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.sourceJournal}>
        <HeaderSort
          title={tableConfig.sourceJournal.columnName}
          sortName="SourceJournal"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayDebit}>
        <HeaderSort
          title={tableConfig.displayDebit.columnName}
          sortName="Debit"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayCredit}>
        <HeaderSort
          title={tableConfig.displayCredit.columnName}
          sortName="Credit"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
    </Table.Header>
  </Table>
);

const mapStateToProps = state => ({
  order: getOrder(state),
});

export default connect(mapStateToProps)(CreditsAndDebitsListTableHeader);
