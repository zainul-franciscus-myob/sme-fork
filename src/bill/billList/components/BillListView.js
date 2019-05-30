import {
  Alert, Button, PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading } from '../billListSelectors';
import BillListFilterOptions from './BillListFilterOptions';
import BillListTable from './BillListTable';
import style from './BillListView.css';

const BillListView = (props) => {
  const {
    isLoading,
    alert,
    onDismissAlert,
    onUpdateFilters,
    onApplyFilter,
    onSort,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <BillListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const pageHead = (
    <PageHead title="Bills">
      <Button onClick={() => {}}>Create bill</Button>
    </PageHead>
  );

  const billListView = (
    <StandardTemplate alert={alertComponent} sticky="none" pageHead={pageHead} filterBar={filterBar}>
      <div className={style.list}>
        <BillListTable
          onSort={onSort}
        />
      </div>
    </StandardTemplate>
  );

  const view = isLoading ? (<Spinner />) : billListView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(BillListView);
