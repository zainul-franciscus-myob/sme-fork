import {
  Alert,
  Button,
  Card,
  PageHead,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading,
} from '../itemListSelectors';
import ItemListFilterOptions from './ItemListFilterOptions';
import ItemListTableBody from './ItemListTableBody';
import ItemListTableHeader from './ItemListTableHeader';
import PageView from '../../../components/PageView/PageView';
import style from './ItemListView.module.css';

const tableConfig = {
  referenceId: { width: '11rem', valign: 'top' },
  name: { width: 'flex-1', valign: 'top' },
  sellingPrice: { width: '14.5rem', valign: 'top', align: 'right' },
  status: { width: '9rem', align: 'left' },
  tax: { width: '9rem', valign: 'top' },
};

const ItemListView = ({
  isLoading,
  alert,
  onDismissAlert,
  onUpdateFilters,
  onApplyFilter,
  onSort,
  onCreateItem,
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

  const pageHead = (
    <React.Fragment>
      <PageHead title="Items">
        <Button onClick={onCreateItem}>Create item</Button>
      </PageHead>
      <Card>
        {filterBar}
      </Card>
      <ItemListTableHeader tableConfig={tableConfig} onSort={onSort} />
    </React.Fragment>
  );

  const itemListView = (
    <StandardTemplate pageHead={pageHead} alert={alertComponent} sticky="all">
      <div className={style.list}>
        <ItemListTableBody tableConfig={tableConfig} onCreateItem={onCreateItem} />
      </div>
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={itemListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(ItemListView);
