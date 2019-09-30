import {
  Badge, Button, Icons, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFormattedTableEntries, getIsFilteredList, getIsTableEmpty, getIsTableLoading,
} from '../itemListSelectors';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import StickyTableBody from '../../../components/StickyTable/StickyTableBody';

const ItemListTableBody = ({
  isTableEmpty,
  isTableLoading,
  isFilteredList,
  tableConfig,
  entries,
  onCreateItem,
}) => {
  const emptyView = (
    <NoResultPageState
      title={isFilteredList ? 'No results found :(' : 'Speed up invoice entry'}
      description={isFilteredList ? 'Perhaps check spelling or remove filters and try again'
        : `Add items you sell, stock, or services you provide to speed up invoice entry.
                The next time you create an invoice, just select the item from the list.
                No more typing the description each time you sell it!`}
      actions={isFilteredList ? [] : [
        <Button key="createItem" type="link" onClick={onCreateItem} icon={<Icons.Add />}>Create item</Button>,
      ]}
    />
  );

  return (
    <StickyTableBody emptyView={emptyView} isEmpty={isTableEmpty} isLoading={isTableLoading}>
      {
        entries.map(entry => (
          <Table.Row key={entry.id}>
            <Table.RowItem {...tableConfig.referenceId}>
              <a href={entry.link}>{entry.referenceId}</a>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.name}>{entry.name}</Table.RowItem>
            <Table.RowItem {...tableConfig.status}>
              {
                  entry.shouldDisplayBadge
                  && <Badge color="light-grey">{entry.status}</Badge>
                }
            </Table.RowItem>
            <Table.RowItem {...tableConfig.sellingPrice}>{entry.sellingPrice}</Table.RowItem>
            <Table.RowItem {...tableConfig.tax}>
              {entry.tax}
            </Table.RowItem>
          </Table.Row>
        ))
      }
    </StickyTableBody>
  );
};

const mapStateToProps = state => ({
  entries: getFormattedTableEntries(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isFilteredList: getIsFilteredList(state),
});

export default connect(mapStateToProps)(ItemListTableBody);
