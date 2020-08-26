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
import { getShouldUsePayrollLayout } from '../../selectors/DashboardSelectors';
import CreatePayrun from './create_pay_run.svg';
import DashboardCardHeader from '../DashboardCardHeader';
import DashboardPayrollCard from './DashboardPayrollCard';
import EmptyStatePayroll from './dashboard-empty-state-payroll.svg';
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
  const onEntryKeydown = (entryLink) => ({ key }) =>
    (key === ' ' || key === 'Enter' || key === 'Spacebar') &&
    onLinkClick(entryLink);

  const entries = payrollEntries.map((entry) => (
    <div
      role="button"
      tabIndex="0"
      className={styles.container}
      onClick={() => onLinkClick(entry.payRunLink)}
      onKeyDown={onEntryKeydown(entry.payRunLink)}
    >
      <div>
        <div
          className={classNames(
            styles.row,
            styles.firstRow,
            styles.payRunCompleted
          )}
        >
          <h3>{entry.date}</h3>
          {entry.isDraft ? (
            <div className={styles.tag}>Draft</div>
          ) : (
            <div className={styles.tick}>
              <Icons.Tick />
            </div>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.lightText}>{entry.formattedPaymentDate}</div>
          {entry.isDraft ? (
            <Button
              type="link"
              icon={<Icons.ArrowRight />}
              onClick={() => onLinkClick(entry.payRunLink)}
            >
              Continue pay run
            </Button>
          ) : (
            <div className={styles.lightText}>{entry.amount}</div>
          )}
        </div>
      </div>
    </div>
  ));

  const createPayrunButton = shouldUsePayrollLayout ? (
    <Button
      type="primary"
      onClick={() => {
        onLinkClick(createPayrunLink);
      }}
    >
      Create pay run
    </Button>
  ) : (
    <Button
      type="link"
      icon={<Icons.Add />}
      onClick={() => {
        onLinkClick(createPayrunLink);
      }}
    >
      Create pay run
    </Button>
  );

  const emptyView = (
    <PageState
      title="You have no recent pay runs"
      actions={[createPayrunButton]}
      image={
        <img
          src={EmptyStatePayroll}
          style={{ width: '50%' }}
          alt="no recent payruns"
        />
      }
    />
  );

  const createPayrunView = (
    <PageState
      title="Setup your payroll"
      actions={[
        <Button
          type="primary"
          onClick={() => {
            onLinkClick(payrollSettingsLink);
          }}
        >
          Get started
        </Button>,
      ]}
      image={
        <img src={CreatePayrun} style={{ width: '50%' }} alt="setup payroll" />
      }
    />
  );

  const payrollPayrunView = (
    <div className={styles.body}>
      <div>{entries}</div>
      <div className={styles.viewAllSection}>
        <Button
          type="link"
          onClick={() => {
            onLinkClick(payrunListLink);
          }}
        >
          View all
        </Button>
      </div>
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
      <DashboardCardHeader title="Pay runs">
        {createPayrunButton}
      </DashboardCardHeader>
      <hr />
    </div>
  );

  const view = (
    <>
      {isPayrunEntriesVisible && header}
      {bodyView}
    </>
  );

  return (
    <DashboardPayrollCard
      hasError={hasError}
      onReload={onReload}
      isLoading={isLoading}
      view={view}
    />
  );
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
