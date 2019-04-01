import {
  Button,
  PageHead,
  Spinner,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading,
} from '../itemListSelectors';
import Alert from '../../../components/Alert/Alert';
import ItemListFilterOptions from './ItemListFilterOptions';
import ItemListTable from './ItemListTable';
import style from './ItemListView.css';

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
    <React.Fragment>
      {alertComponent}
      <StandardTemplate pageHead={pageHead} filterBar={filterBar}>
        <div className={style.list}>
          <ItemListTable onSort={onSort} />
        </div>
      </StandardTemplate>
    </React.Fragment>
  );

  const view = isLoading ? (<Spinner />) : itemListView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(ItemListView);
