import { Button, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getCreatePayrunLink,
  getHasError,
  getIsEmpty,
  getIsLoading,
  getIsPayrollSetup,
  getPayrollEntries,
  getPayrollSettingsLink,
  getPayrunListLink,
} from '../../selectors/DashboardPayrollSelectors';
import {
  getShouldUsePayrollLayout,
} from '../../selectors/DashboardSelectors';
import CardView from '../../../../components/CardView/CardView';
import CreatePayrun from './create_pay_run.svg';
import DashboardCardHeader from '../DashboardCardHeader';
import EmptyStatePayroll from './dashboard-empty-state-payroll.svg';
import ErrorCard from '../ErrorCard';
import styles from './DashboardPayrollPayrunsCard.module.css';

const DashboardPayrollPayrunsCard = ({
  hasError,
  isLoading,
  isEmpty,
  isPayrollSetup,
  payrollEntries,
  onLinkClick,
  onReload,
  createPayrunLink,
  payrunListLink,
  payrollSettingsLink,
  shouldUsePayrollLayout,
}) => {
  const entries = payrollEntries.map(entry => {
    const isEntryEmpty = Object.keys(entry).length === 0;
    if (isEntryEmpty) {
      /*
        We set an empty div as there is an expectation that the widget will have 3 entries
        as per the grid layout. Therefore we use an empty <div /> to allow the grid to create
        empty rows.
      */
      return (
        <div />
      );
    }

    return (
      <div className={styles.container}>
        <div>
          <div className={classNames(styles.row, styles.firstRow, styles.payRunCompleted)}>
            <h3>{entry.date}</h3>
            {entry.isDraft
              ? <div className={styles.tag}>Draft</div>
              : <div className={styles.tick}><Icons.Tick /></div>}
          </div>
          <div className={styles.row}>
            <div className={styles.lightText}>{entry.formatedPaymentDate}</div>
            {entry.isDraft
              ? (
                <Button
                  type="link"
                  icon={<Icons.ArrowRight />}
                  onClick={() => { onLinkClick(createPayrunLink); }}
                >
                  Continue pay run
                </Button>
              )
              : <div className={styles.lightText}>{entry.amount}</div>}
          </div>
        </div>
      </div>
    );
  });

  if (hasError) return <ErrorCard onTry={onReload} />;

  const createPayrunButton = shouldUsePayrollLayout ? (
    <Button
      type="primary"
      onClick={() => { onLinkClick(createPayrunLink); }}
    >
      Create pay run
    </Button>
  ) : (
      <Button
        type="link"
        icon={<Icons.Add />}
        onClick={() => { onLinkClick(createPayrunLink); }}
      >
        Create pay run
      </Button>
  );

  const emptyView = (
    <PageState
      title="You have no recent pay runs"
      actions={[createPayrunButton]}
      image={<img src={EmptyStatePayroll} style={{ width: '50%' }} alt="no recent payruns" />}
    />
  );

  const createPayrunView = (
    <PageState
      title="Setup your payroll"
      actions={[
      <Button type="primary" onClick={() => { onLinkClick(payrollSettingsLink); }}>Get started</Button>,
      ]}
      image={<img src={CreatePayrun} style={{ width: '50%' }} alt="setup payroll" />}
    />
  );

  const payrollPayrunView = (
    <div className={styles.body}>
      {entries}
      <Button
        type="link"
        className={styles.viewAll}
        onClick={() => { onLinkClick(payrunListLink); }}
      >
        View all
      </Button>
  </div>
  );

  let bodyView;
  if (!isPayrollSetup) {
    bodyView = createPayrunView;
  } else if (isEmpty) {
    bodyView = emptyView;
  } else {
    bodyView = payrollPayrunView;
  }

  const isPayrunEntriesVisible = isPayrollSetup && !isEmpty;
  const header = (
    <div>
      <div className={styles.summary}>
        <DashboardCardHeader title="Pay runs">
          {createPayrunButton}
        </DashboardCardHeader>
      </div>
      <hr />
    </div>
  );

  const view = (
    <>
      {isPayrunEntriesVisible && header}
      {bodyView}
    </>
  );

  return <CardView
    isLoading={isLoading}
    view={view}
    cardBodyClassname={styles.cardbody}
  />;
};

const mapStateToProps = (state) => ({
  hasError: getHasError(state),
  isLoading: getIsLoading(state),
  isEmpty: getIsEmpty(state),
  isPayrollSetup: getIsPayrollSetup(state),
  payrollEntries: getPayrollEntries(state),
  payrunListLink: getPayrunListLink(state),
  payrollSettingsLink: getPayrollSettingsLink(state),
  createPayrunLink: getCreatePayrunLink(state),
  shouldUsePayrollLayout: getShouldUsePayrollLayout(state),
});

export default connect(mapStateToProps)(DashboardPayrollPayrunsCard);