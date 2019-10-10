import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import { getSalesTotalSummary } from '../../selectors/DashboardSalesSelectors';
import styles from './DashboardSalesTotalSummary.module.css';

const HeaderItem = ({ title, content, clickable }) => (
  <div className={classnames(styles.headerItem, { [styles.headerItemClickable]: clickable })}>
    <div>
      {title}
    </div>
    <div>
      <h2 className={styles.headerItem__content}>{content}</h2>
    </div>
  </div>
);

const DashboardSalesTotalSummary = ({
  unpaidTotal,
  overDueTotal,
  salesTotal,
  salesTotalLabel,
  invoiceListLink,
}) => (
  <div className={styles.totalHeader}>
    <a href={invoiceListLink}>
      <HeaderItem title={salesTotalLabel} content={salesTotal} clickable />
    </a>
    <a href={invoiceListLink}>
      <HeaderItem title="All open invoices" content={unpaidTotal} clickable />
    </a>
    <HeaderItem title="All overdue invoices" content={overDueTotal} />
  </div>
);

const mapStateToProps = state => getSalesTotalSummary(state);

export default connect(mapStateToProps)(DashboardSalesTotalSummary);
