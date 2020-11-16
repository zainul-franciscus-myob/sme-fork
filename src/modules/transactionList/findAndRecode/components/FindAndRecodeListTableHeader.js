import { Checkbox, HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveSort,
  getAreAllItemsSelected,
  getAreSomeItemsSelected,
  getIsRecodeLoading,
} from '../findAndRecodeSelectors';
import { getResponsiveConfig } from '../../components/getResponsiveConfig';

const FindAndRecodeListTableHeader = ({
  onSort,
  onSelectAllItems,
  activeSort,
  tableConfig,
  areAllItemsSelected,
  areSomeItemsSelected,
  isRecodeLoading,
}) => (
  <Table responsiveWidths={getResponsiveConfig(tableConfig)}>
    <Table.Header>
      <Table.HeaderItem {...tableConfig.selectItem}>
        <Checkbox
          name="selectAll"
          label="Select all"
          hideLabel
          onChange={onSelectAllItems}
          checked={areAllItemsSelected}
          indeterminate={areSomeItemsSelected && !areAllItemsSelected}
          disabled={isRecodeLoading}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort
          title={tableConfig.date.columnName}
          sortName="Date"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceId}>
        <HeaderSort
          title={tableConfig.referenceId.columnName}
          sortName="Reference"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort
          title={tableConfig.description.columnName}
          sortName="Description"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayAccountName}>
        <HeaderSort
          title={tableConfig.displayAccountName.columnName}
          sortName="AccountIdentifier"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.sourceJournal}>
        <HeaderSort
          title={tableConfig.sourceJournal.columnName}
          sortName="SourceJournal"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.taxCode}>
        <HeaderSort
          title={tableConfig.taxCode.columnName}
          sortName="TaxCode"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayDebit}>
        <HeaderSort
          title={tableConfig.displayDebit.columnName}
          sortName="Debit"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayCredit}>
        <HeaderSort
          title={tableConfig.displayCredit.columnName}
          sortName="Credit"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
    </Table.Header>
  </Table>
);

const mapStateToProps = (state) => ({
  activeSort: getActiveSort(state),
  areAllItemsSelected: getAreAllItemsSelected(state),
  areSomeItemsSelected: getAreSomeItemsSelected(state),
  isRecodeLoading: getIsRecodeLoading(state),
});

export default connect(mapStateToProps)(FindAndRecodeListTableHeader);
