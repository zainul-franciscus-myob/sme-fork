import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsActionDisabled,
  getIsLoading,
  getIsOpen,
  getIsPrimaryActionDisabled,
} from '../RecurringTransactionListModalSelectors';
import PageView from '../../../../components/PageView/PageView';
import RecurringTransactionListModalTable from './RecurringTransactionListModalTable';

const tableConfig = {
  radio: { width: '40px' },
  transactionName: { width: 'flex-1', columnName: 'Name', valign: 'top' },
  transactionType: { columnName: 'Transaction type', valign: 'top' },
  amount: {
    width: '14.8rem',
    columnName: 'Amount ($)',
    valign: 'top',
    align: 'right',
  },
};

const RecurringTransactionListModalView = ({
  isOpen,
  alert,
  isLoading,
  isActionDisabled,
  isPrimaryActionDisabled,
  onClose,
  onDismissAlert,
  onSelect,
  onSort,
  onOkButtonClick,
  onCancelButtonClick,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <RecurringTransactionListModalTable
      tableConfig={tableConfig}
      onSelect={onSelect}
      onSort={onSort}
    />
  );

  const modal = (
    <Modal
      title="Recurring transactions"
      onCancel={onClose}
      canClose={!isActionDisabled}
      size="small"
    >
      <Modal.Body>
        {alertComponent}
        <PageView isLoading={isLoading} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          onClick={onCancelButtonClick}
          disabled={isActionDisabled}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onOkButtonClick}
          disabled={isPrimaryActionDisabled}
        >
          Prefill
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return isOpen ? modal : null;
};

const mapStateToProps = (state) => ({
  isOpen: getIsOpen(state),
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isActionDisabled: getIsActionDisabled(state),
  isPrimaryActionDisabled: getIsPrimaryActionDisabled(state),
});

export default connect(mapStateToProps)(RecurringTransactionListModalView);
