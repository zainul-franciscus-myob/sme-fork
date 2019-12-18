import { Button, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCreateBillLink,
  getHasError,
  getIsEmpty,
  getIsLoading,
  getIsTableEmpty,
} from '../../selectors/DashboardPurchaseSelectors';
import CardView from '../../../../components/CardView/CardView';
import DashboardCardHeader from '../DashboardCardHeader';
import DashboardPurchaseChart from './DashboardPurchaseChart';
import DashboardPurchaseTable from './DashboardPurchaseTable';
import DashboardPurchaseTotalSummary from './DashboardPurchaseTotalSummary';
import ErrorCard from '../ErrorCard';
import styles from './DashboardPurchaseCard.module.css';

const handleLinkClick = (handler, link) => () => {
  handler(link);
};

const DashboardPurchaseCard = ({
  createBillLink,
  isEmpty,
  isTableEmpty,
  onLinkClick,
  onReload,
  hasError,
  isLoading,
}) => {
  const table = <DashboardPurchaseTable onLinkClick={onLinkClick} />;

  const emptyTable = (<div className={styles.emptyTableView}>No overdue bills - great work!</div>);

  const tableView = isTableEmpty ? emptyTable : table;

  const chart = (
    <div className={styles.chart}>
      <DashboardPurchaseChart />
    </div>
  );

  const summary = (
    <div className={styles.summary}>
      <DashboardCardHeader title="Purchases">
        <Button type="link" icon={<Icons.Add />} onClick={handleLinkClick(onLinkClick, createBillLink)}>
          Create bill
        </Button>
      </DashboardCardHeader>
      <hr />
      <DashboardPurchaseTotalSummary />
      {tableView}
    </div>
  );

  const purchaseView = (
    <div className={styles.container}>
      {summary}
      {chart}
    </div>
  );

  const actions = [
    <Button type="link" icon={<Icons.Add />} onClick={handleLinkClick(onLinkClick, createBillLink)}>Create bill</Button>,
  ];

  const emptyView = (
    <PageState
      title="Keep on top of your expenses"
      actions={actions}
      description="Keep track of outstanding bills, and see how you're tracking over time."
    />
  );

  if (hasError) return <ErrorCard onTry={onReload} />;

  const view = isEmpty ? emptyView : purchaseView;

  return (
    <CardView isLoading={isLoading} view={view} />
  );
};

const mapStateToProps = state => ({
  isEmpty: getIsEmpty(state),
  isTableEmpty: getIsTableEmpty(state),
  createBillLink: getCreateBillLink(state),
  hasError: getHasError(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(DashboardPurchaseCard);
