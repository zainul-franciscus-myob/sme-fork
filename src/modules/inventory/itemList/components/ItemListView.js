import {
  Alert,
  Button,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getLoadMoreButtonStatus,
} from '../itemListSelectors';
import ItemListFilterOptions from './ItemListFilterOptions';
import ItemListTableBody from './ItemListTableBody';
import ItemListTableHeader from './ItemListTableHeader';
import PageView from '../../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../../components/PaginatedListTemplate/PaginatedListTemplate';

const tableConfig = {
  referenceId: { width: '12.8rem', valign: 'top', columnName: 'Item ID' },
  name: { width: 'flex-1', valign: 'top', columnName: 'Name' },
  sellingPrice: {
    width: '14.5rem',
    valign: 'top',
    align: 'right',
    columnName: 'Selling price($)',
  },
  status: { width: '9rem', align: 'left', columnName: 'Status' },
  tax: { width: '9rem', valign: 'top' },
};

const ItemListView = ({
  isLoading,
  alert,
  loadMoreButtonStatus,
  onDismissAlert,
  onUpdateFilters,
  onApplyFilter,
  onSort,
  onCreateItem,
  onLoadMoreButtonClick,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <ItemListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const itemListView = (
    <PaginatedListTemplate
      alert={alertComponent}
      pageHead={(
        <PageHead title="Items">
          <Button onClick={onCreateItem}>Create item</Button>
        </PageHead>
      )}
      filterBar={filterBar}
      tableHeader={<ItemListTableHeader tableConfig={tableConfig} onSort={onSort} />}
      listTable={<ItemListTableBody tableConfig={tableConfig} onCreateItem={onCreateItem} />}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      loadMoreButtonStatus={loadMoreButtonStatus}
    />
  );

  return <PageView isLoading={isLoading} view={itemListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(ItemListView);
