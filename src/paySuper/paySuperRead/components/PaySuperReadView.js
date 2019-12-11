import {
  BaseTemplate,
  Card,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccount,
  getDate,
  getDescription,
  getIsLoading,
  getLabelStatus,
  getReferenceNumber,
  getStatus,
  getTotalPayment,
} from '../paySuperReadSelector';
import ActionButtons from './ActionButtons';
import PageView from '../../../components/PageView/PageView';
import PaySuperReadDetailHeader from './paySuperReadDetailHeader';
import PaySuperReadTable from './paySuperReadTable';
import PaymentStatus from '../../components/PaymentStatus';
import styles from './PaySuperRead.module.css';

const PaySuperReadView = ({
  batchPayments,
  account,
  description,
  referenceNumber,
  date,
  isLoading,
  onCancelClick,
  onAuthoriseClick,
  onReverseClick,
  totalPayment,
  labelStatus,
  status,

}) => {
  const title = <>Super payment {referenceNumber}<PaymentStatus size="large" paymentStatus={labelStatus} /></>;
  const totalPaymentFooter = (
    <div className={styles.totalPaymentsFooter}>
      <h4>
        <span className={styles.totalPaymentsFooter}>Total superannuation amount</span>
        <span>{totalPayment}</span>
      </h4>
    </div>
  );
  const view = (
    <BaseTemplate>
      <PageHead title={title} />
      <Card
        footer={totalPaymentFooter}
      >
        <PaySuperReadDetailHeader
          account={account}
          description={description}
          referenceNumber={referenceNumber}
          date={date}
        />
        <PaySuperReadTable
          superPayments={batchPayments}
        />
      </Card>
      <ActionButtons
        status={status}
        onCancelClick={onCancelClick}
        onAuthoriseClick={onAuthoriseClick}
        onReverseClick={onReverseClick}
      />
    </BaseTemplate>
  );
  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  account: getAccount(state),
  description: getDescription(state),
  referenceNumber: getReferenceNumber(state),
  date: getDate(state),
  totalPayment: getTotalPayment(state),
  labelStatus: getLabelStatus(state),
  status: getStatus(state),
});

export default connect(mapStateToProps)(PaySuperReadView);
