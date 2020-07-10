import { Alert, BaseTemplate, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccount,
  getAlert,
  getDate,
  getDescription,
  getLabelStatus,
  getLoadingState,
  getModalType,
  getReferenceNumber,
  getStatus,
  getSuperPayments,
  getTotalPayment,
} from '../paySuperReadSelector';
import ActionButtons from './ActionButtons';
import ModalType from '../ModalType';
import PageView from '../../../../components/PageView/PageView';
import PaySuperReadDetailHeader from './paySuperReadDetailHeader';
import PaymentStatus from '../../components/PaymentStatus';
import ReversalModal from './ReversalModal';
import SuperPaymentsTable from '../../components/SuperPaymentsTable';
import styles from './PaySuperRead.module.css';

const PaySuperReadView = ({
  superPayments,
  account,
  description,
  referenceNumber,
  date,
  loadingState,
  onCancelClick,
  onAuthoriseClick,
  onReverseClick,
  onDateLinkClick,
  totalPayment,
  labelStatus,
  status,
  employeePayModal,
  authorisationModal,
  onReverseModalCancelClick,
  onReverseModalConfirmClick,
  onRecordReverseClick,
  alert,
  onDismissAlert,
  modalType,
}) => {
  const title = (
    <>
      Super payment {referenceNumber}
      <PaymentStatus size="large" paymentStatus={labelStatus} />
    </>
  );
  const totalPaymentFooter = (
    <div className={styles.totalPaymentsFooter}>
      <h4>
        <span className={styles.totalPaymentsFooter}>
          Total superannuation amount
        </span>
        <span>{totalPayment}</span>
      </h4>
    </div>
  );

  const view = (
    <BaseTemplate>
      {employeePayModal}
      {authorisationModal}
      {modalType === ModalType.REVERSE && (
        <ReversalModal
          onCancelButtonClick={onReverseModalCancelClick}
          onReverseButtonClick={onReverseModalConfirmClick}
        />
      )}
      {alert && (
        <Alert type={alert.type} onDismiss={onDismissAlert}>
          {alert.message}
        </Alert>
      )}
      <PageHead title={title} />
      <Card footer={totalPaymentFooter}>
        <PaySuperReadDetailHeader
          account={account}
          description={description}
          referenceNumber={referenceNumber}
          date={date}
        />
        <SuperPaymentsTable
          superPayments={superPayments}
          onDateLinkClick={onDateLinkClick}
        />
      </Card>
      <ActionButtons
        status={status}
        onCancelClick={onCancelClick}
        onAuthoriseClick={onAuthoriseClick}
        onReverseClick={onReverseClick}
        onRecordReverseClick={onRecordReverseClick}
      />
    </BaseTemplate>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  account: getAccount(state),
  description: getDescription(state),
  referenceNumber: getReferenceNumber(state),
  date: getDate(state),
  totalPayment: getTotalPayment(state),
  labelStatus: getLabelStatus(state),
  status: getStatus(state),
  superPayments: getSuperPayments(state),
  alert: getAlert(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(PaySuperReadView);
