import {
  Button, Icons, PageHead, PageState,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCreateInvoiceLink, getHasError, getIsEmpty, getIsLoading, getIsTableEmpty,
} from '../../selectors/DashboardSalesSelectors';
import CardView from '../../../components/CardView/CardView';
import DashboardSalesChart from './DashboardSalesChart';
import DashboardSalesTable from './DashboardSalesTable';
import DashboardSalesTotalSummary from './DashboardSalesTotalSummary';
import ErrorCard from '../ErrorCard';
import styles from './DashboardSalesCard.module.css';

const handleLinkClick = (handler, link) => () => {
  handler(link);
};

const DashboardSalesCard = ({
  createInvoiceLink,
  isEmpty,
  isTableEmpty,
  onLinkClick,
  onReload,
  hasError,
  isLoading,
}) => {
  const table = <DashboardSalesTable onLinkClick={onLinkClick} />;

  const emptyTable = (
    <div className={styles.emptyTableView}>No overdue invoices - looking good!</div>
  );

  const tableView = isTableEmpty ? emptyTable : table;

  const chart = (
    <div className={styles.chart}>
      <DashboardSalesChart />
    </div>
  );

  const summary = (
    <div className={styles.summary}>
      <PageHead title="Sales">
        <Button type="link" icon={<Icons.Add />} onClick={handleLinkClick(onLinkClick, createInvoiceLink)}>
          Create invoice
        </Button>
      </PageHead>
      <hr />
      <DashboardSalesTotalSummary />
      {tableView}
    </div>
  );

  const salesView = (
    <div className={styles.container}>
      {summary}
      {chart}
    </div>
  );

  const actions = [
    <Button type="link" icon={<Icons.Add />} onClick={handleLinkClick(onLinkClick, createInvoiceLink)}>Create invoice</Button>,
  ];

  const emptyView = (
    <PageState
      title="Invoicing that gets you paid fast"
      actions={actions}
      description="Create professional invoices in a few clicks, and stay on top of overdue payments with online invoice tracking."
    />
  );

  if (hasError) return <ErrorCard onTry={onReload} />;

  const view = isEmpty ? emptyView : salesView;

  return (
    <CardView isLoading={isLoading} view={view} />
  );
};

const mapStateToProps = state => ({
  isEmpty: getIsEmpty(state),
  isTableEmpty: getIsTableEmpty(state),
  createInvoiceLink: getCreateInvoiceLink(state),
  hasError: getHasError(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(DashboardSalesCard);
