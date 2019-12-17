import {
  Alert, Button, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
} from '../quoteListSelector';
import PageView from '../../../../components/PageView/PageView';
import QuoteListFilterOptions from './QuoteListFilterOptions';
import QuoteListTable from './QuoteListTable';
import style from './QuoteListView.module.css';

const QuoteListView = (props) => {
  const {
    isLoading,
    alert,
    onDismissAlert,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    onAddQuote,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <QuoteListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const pageHead = (
    <PageHead title="Quotes">
      <Button onClick={onAddQuote}>Create quote</Button>
    </PageHead>
  );

  const quoteListView = (
    <StandardTemplate pageHead={pageHead} filterBar={filterBar} alert={alertComponent} sticky="none">
      <div className={style.list}>
        <QuoteListTable onSort={onSort} />
      </div>
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={quoteListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(QuoteListView);
