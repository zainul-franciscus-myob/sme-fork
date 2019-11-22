import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsCreating,
  getIsLoading,
  getLayout,
  getModalType,
  getPageTitle,
  getTotalAmount,
} from '../selectors/QuoteDetailSelectors';
import PageView from '../../../components/PageView/PageView';
import QuoteDetailActions from './QuoteDetailActions';
import QuoteDetailModal from './QuoteDetailModal';
import QuoteDetailOptions from './QuoteDetailOptions';
import QuoteDetailPageHead from './QuoteDetailPageHead';
import QuoteItemTable from './itemLayout/QuoteItemTable';
import QuoteLayout from '../QuoteLayout';
import QuoteServiceTable from './serviceLayout/QuoteServiceTable';

const QuoteDetailView = ({
  contactModal,
  accountModal,
  inventoryModal,
  isLoading,
  alert,
  modalType,
  isCreating,
  pageTitle,
  totalAmount,
  layout,
  onDismissAlert,
  onUpdateHeaderOptions,
  onAddCustomerButtonClick,
  serviceLayoutListeners,
  itemLayoutListeners,
  quoteActionListeners,
  modalListeners,
}) => {
  const actions = <QuoteDetailActions listeners={quoteActionListeners} />;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType && (
    <QuoteDetailModal listeners={modalListeners} />
  );

  const pageHead = (
    <QuoteDetailPageHead
      showTotalItems={isCreating}
      totalAmount={totalAmount}
      pageTitle={pageTitle}
    />
  );

  const options = (
    <QuoteDetailOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      onAddCustomerButtonClick={onAddCustomerButtonClick}
    />
  );

  const table = ({
    [QuoteLayout.SERVICE]: <QuoteServiceTable listeners={serviceLayoutListeners} />,
    [QuoteLayout.ITEM]: <QuoteItemTable listeners={itemLayoutListeners} />,
  }[layout]);

  const view = (
    <LineItemTemplate
      pageHead={pageHead}
      alert={alertComponent}
      options={options}
      actions={actions}
    >
      { modal }
      { contactModal }
      { accountModal }
      { inventoryModal }
      { table }
    </LineItemTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  alert: getAlert(state),
  pageTitle: getPageTitle(state),
  totalAmount: getTotalAmount(state),
  layout: getLayout(state),
});

export default connect(mapStateToProps)(QuoteDetailView);
