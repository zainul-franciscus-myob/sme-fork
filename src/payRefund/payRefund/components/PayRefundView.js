import { Alert, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getModalType, getTitle,
} from '../payRefundSelectors';
import PageView from '../../../components/PageView/PageView';
import PayRefundModal from './PayRefundModal';
import RefundActions from './PayRefundActions';
import RefundDetail from './PayRefundDetail';
import SmallScreenTemplate from '../../../components/SmallScreenTemplate/SmallScreenTemplate';

const PayRefundView = (props) => {
  const {
    alert,
    title,
    isLoading,
    modalType,
    onDismissAlert,
    onConfirmCancel,
    onConfirmDelete,
    onCloseModal,
    onRefundDetailsChange,
    onSaveButtonClick,
    onCancelButtonClick,
    onDeleteButtonClick,
    onGoBackButtonClick,
  } = props;
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType && (
    <PayRefundModal
      modalType={modalType}
      onCloseModal={onCloseModal}
      onConfirmCancel={onConfirmCancel}
      onConfirmDelete={onConfirmDelete}
    />
  );

  const view = (
    <SmallScreenTemplate>
      {alertComponent}
      {modal}
      <PageHead title={title} />
      <Card>
        <RefundDetail onRefundDetailsChange={onRefundDetailsChange} />
      </Card>
      <RefundActions
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onGoBackButtonClick={onGoBackButtonClick}
      />
    </SmallScreenTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  title: getTitle(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(PayRefundView);
