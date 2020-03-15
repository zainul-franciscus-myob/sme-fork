import { Button, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCreateInvoiceLink,
  getHasError,
  getIsEmpty,
  getIsLoading,
  getIsTableEmpty,
} from '../../selectors/DashboardSalesSelectors';
import CardView from '../../../../components/CardView/CardView';
import DashboardCardHeader from '../DashboardCardHeader';
import DashboardSalesChart from './DashboardSalesChart';
import DashboardSalesTable from './DashboardSalesTable';
import DashboardSalesTotalSummary from './DashboardSalesTotalSummary';
import EmptyStatesSales from './dashboard-empty-state-sales.svg';
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
      <DashboardCardHeader title="Sales">
        <Button type="link" icon={<Icons.Add />} onClick={handleLinkClick(onLinkClick, createInvoiceLink)}>
          Create invoice
        </Button>
      </DashboardCardHeader>

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

  const emptyView = (
    <PageState
      title="Invoicing that gets you paid fast"
      actions={[
        <Button key={1} type="link" icon={<Icons.Add />} onClick={handleLinkClick(onLinkClick, createInvoiceLink)}>Create invoice</Button>,
      ]}
      description="Create professional invoices in a few clicks, and stay on top of overdue payments with online invoice tracking."
      image={<img src={EmptyStatesSales} alt="no invoices" style={{ width: '50%' }} />}
    >
    </PageState>
  );

  if (hasError) return <ErrorCard onTry={onReload} />;

  const view = isEmpty ? emptyView : salesView;

  return <CardView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isEmpty: getIsEmpty(state),
  isTableEmpty: getIsTableEmpty(state),
  createInvoiceLink: getCreateInvoiceLink(state),
  hasError: getHasError(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(DashboardSalesCard);
