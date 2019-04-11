import {
  Button, PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
} from '../quoteListSelector';
import Alert from '../../../components/Alert/Alert';
import QuoteListFilterOptions from './QuoteListFilterOptions';
import QuoteListTable from './QuoteListTable';
import style from './QuoteListView.css';

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
    <React.Fragment>
      {alertComponent}
      <StandardTemplate pageHead={pageHead} filterBar={filterBar}>
        <div className={style.list}>
          <QuoteListTable onSort={onSort} />
        </div>
      </StandardTemplate>
    </React.Fragment>
  );

  const view = isLoading ? (<Spinner />) : quoteListView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(QuoteListView);
