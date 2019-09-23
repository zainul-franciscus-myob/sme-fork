import {
  Alert,
  Button,
  PageHead,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading,
} from '../itemListSelectors';
import ItemListFilterOptions from './ItemListFilterOptions';
import ItemListTable from './ItemListTable';
import PageView from '../../../components/PageView/PageView';
import style from './ItemListView.module.css';

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
    <PageHead title="Items">
      <Button onClick={onCreateItem}>Create item</Button>
    </PageHead>
  );

  const itemListView = (
    <StandardTemplate pageHead={pageHead} filterBar={filterBar} alert={alertComponent} sticky="none">
      <div className={style.list}>
        <ItemListTable onSort={onSort} />
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
