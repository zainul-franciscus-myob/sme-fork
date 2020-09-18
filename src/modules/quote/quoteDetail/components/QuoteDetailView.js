import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getAlert,
  getIsCalculating,
  getIsCreating,
  getIsReadOnly,
  getLayout,
  getLoadingState,
  getModal,
} from '../selectors/QuoteDetailSelectors';
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import MoreInformation from './MoreInformation';
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
import styles from './QuoteDetailView.module.css';

const QuoteDetailView = ({
  renderContactCombobox,
  renderItemCombobox,
  accountModal,
  jobModal,
  loadingState,
  alert,
  modal,
  isCalculating,
  layout,
  onDismissAlert,
  onUpdateHeaderOptions,
  onUpdateLayout,
  onInputAlert,
  serviceLayoutListeners,
  itemAndServiceLayoutListeners,
  quoteActionListeners,
  modalListeners,
  isReadOnly,
  onAccordionToggle,
  onReferenceNoClick,
  isCreating,
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
      onConvertToInvoiceButtonClick={
        quoteActionListeners.onConvertToInvoiceButtonClick
      }
    />
  );

  const options = (
    <QuoteDetailOptions
      renderContactCombobox={renderContactCombobox}
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      onInputAlert={onInputAlert}
    />
  );

  const footer = <QuoteDetailFooter onUpdateNote={onUpdateHeaderOptions} />;

  const serviceTable = (
    <QuoteServiceTable listeners={serviceLayoutListeners} footer={footer} />
  );

  const itemAndServiceTable = (
    <QuoteItemAndServiceTable
      renderItemCombobox={renderItemCombobox}
      listeners={itemAndServiceLayoutListeners}
      footer={footer}
    />
  );

  const table = {
    [QuoteLayout.SERVICE]: serviceTable,
    [QuoteLayout.ITEM_AND_SERVICE]: itemAndServiceTable,
    [QuoteLayout.PROFESSIONAL]: serviceTable,
    [QuoteLayout.TIME_BILLING]: itemAndServiceTable,
    [QuoteLayout.MISCELLANEOUS]: serviceTable,
  }[layout];

  const layoutPopover = (
    <QuoteDetailLayoutPopover
      layout={layout}
      isCalculating={isCalculating}
      isReadOnly={isReadOnly}
      onUpdateLayout={onUpdateLayout}
    />
  );

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead={pageHead}
        alert={alertComponent}
        options={options}
        separatorOptions={layoutPopover}
        actions={actions}
      >
        {modalComponent}
        {accountModal}
        {jobModal}
        <div className={classNames(isReadOnly && styles.disabledTable)}>
          {table}
        </div>
      </LineItemTemplate>
      {!isCreating && (
        <MoreInformation
          onAccordionToggle={onAccordionToggle}
          onReferenceNoClick={onReferenceNoClick}
        />
      )}
    </React.Fragment>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  modal: getModal(state),
  alert: getAlert(state),
  layout: getLayout(state),
  isCalculating: getIsCalculating(state),
  isReadOnly: getIsReadOnly(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(QuoteDetailView);
