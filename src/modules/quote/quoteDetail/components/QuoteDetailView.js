import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsCalculating,
  getLayout,
  getLoadingState,
  getModal,
} from '../selectors/QuoteDetailSelectors';
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import QuoteDetailActions from './QuoteDetailActions';
import QuoteDetailFooter from './QuoteDetailFooter';
import QuoteDetailLayoutPopover from './QuoteDetailLayoutPopover';
import QuoteDetailModal from './QuoteDetailModal';
import QuoteDetailOptions from './QuoteDetailOptions';
import QuoteDetailPageHead from './QuoteDetailPageHead';
import QuoteItemAndServiceTable from './itemLayout/QuoteItemAndServiceTable';
import QuoteLayout from '../QuoteLayout';
import QuoteServiceTable from './serviceLayout/QuoteServiceTable';

const QuoteDetailView = ({
  contactModal,
  accountModal,
  inventoryModal,
  loadingState,
  alert,
  modal,
  isCalculating,
  layout,
  onDismissAlert,
  onUpdateHeaderOptions,
  onUpdateLayout,
  onAddCustomerButtonClick,
  serviceLayoutListeners,
  itemAndServiceLayoutListeners,
  quoteActionListeners,
  modalListeners,
}) => {
  const actions = <QuoteDetailActions listeners={quoteActionListeners} />;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modalComponent = modal && (
    <QuoteDetailModal listeners={modalListeners} />
  );

  const pageHead = (
    <QuoteDetailPageHead
      onConvertToInvoiceButtonClick={quoteActionListeners.onConvertToInvoiceButtonClick}
    />
  );

  const options = (
    <QuoteDetailOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      onAddCustomerButtonClick={onAddCustomerButtonClick}
    />
  );

  const footer = <QuoteDetailFooter onUpdateNote={onUpdateHeaderOptions} />;

  const table = ({
    [QuoteLayout.SERVICE]: <QuoteServiceTable listeners={serviceLayoutListeners} footer={footer} />,
    [QuoteLayout.ITEM_AND_SERVICE]: (
      <QuoteItemAndServiceTable listeners={itemAndServiceLayoutListeners} footer={footer} />
    ),
  }[layout]);

  const layoutPopover = (
    <QuoteDetailLayoutPopover
      layout={layout}
      isCalculating={isCalculating}
      onUpdateLayout={onUpdateLayout}
    />
  );

  const view = (
    <LineItemTemplate
      pageHead={pageHead}
      alert={alertComponent}
      options={options}
      actions={actions}
    >
      { modalComponent }
      { contactModal }
      { accountModal }
      { inventoryModal }
      { layoutPopover }
      { table }
    </LineItemTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  modal: getModal(state),
  alert: getAlert(state),
  layout: getLayout(state),
  isCalculating: getIsCalculating(state),
});

export default connect(mapStateToProps)(QuoteDetailView);
