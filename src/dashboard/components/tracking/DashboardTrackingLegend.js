import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getLegend } from '../../selectors/DashboardTrackingSelectors';
import styles from './DashboardTrackingLegend.module.css';

const DashboardTrackingLegendItem = ({
  name,
  value,
  className,
  isNegative,
}) => (
  <div className={styles.legendItem}>
    <div className={styles.legendItemPointer}>
      <hr className={className} />
    </div>
    <div>
      <div>{name}</div>
      <h2 className={classNames({ [styles.negative]: isNegative })}>{value}</h2>
    </div>
  </div>
);
const DashboardTrackingLegend = ({
  isIncomeNegative,
  isExpensesNegative,
  isProfitNegative,
  incomeAmount,
  expenseAmount,
  profitAmount,
  financialYearLabel,
  financialYearDisplay,
}) => (
  <div className={styles.container}>
    <div className={styles.legendTitle}>
      <div>{financialYearLabel}</div>
      <h2>{financialYearDisplay}</h2>
    </div>
    <div className={styles.amounts}>
      <div className={styles.incomeExpenses}>
        <DashboardTrackingLegendItem name="Income" value={incomeAmount} className={styles.income} isNegative={isIncomeNegative} />
        <DashboardTrackingLegendItem name="Expenses" value={expenseAmount} className={styles.expense} isNegative={isExpensesNegative} />
      </div>
      <DashboardTrackingLegendItem name="Net profit" value={profitAmount} className={styles.profit} isNegative={isProfitNegative} />
    </div>
  </div>
);


const mapStateToProps = state => getLegend(state);

export default connect(mapStateToProps)(DashboardTrackingLegend);
