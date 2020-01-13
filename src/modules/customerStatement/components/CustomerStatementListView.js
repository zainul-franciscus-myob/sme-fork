import {
  Alert, BaseTemplate, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getLoadingState, getModal } from '../selectors/customerStatementListSelectors';
import CustomerStatementFilterOptions from './CustomerStatementFilterOptions';
import CustomerStatementListModal from './CustomerStatementListModal';
import CustomerStatementListTable from './CustomerStatementListTable';
import PageView from '../../../components/PageView/PageView';

const CustomerStatementListView = ({
  loadingState,
  modal,
  alert,
  onApplyFilters,
  onUpdateFilters,
  onUpdateTemplateAdditionalOptions,
  onToggleAllCustomerStatements,
  onSelectCustomerStatement,
  onSelectPDFDropdown,
  onClickEmailButton,
  onDismissModal,
  onDismissModalAlert,
  onDismissAlert,
  onDownloadPDF,
  onUpdateTemplateOption,
  onSendEmail,
  onUpdateEmailOptions,
  onSort,
}) => {
  const pageHead = <PageHead title="Customer statements" />;
  const filterOptions = (
    <CustomerStatementFilterOptions
      onApplyFilters={onApplyFilters}
      onUpdateFilters={onUpdateFilters}
      onUpdateTemplateAdditionalOptions={onUpdateTemplateAdditionalOptions}
    />
  );
  const table = (
    <CustomerStatementListTable
      onToggleAllCustomerStatements={onToggleAllCustomerStatements}
      onSelectCustomerStatement={onSelectCustomerStatement}
      onSelectPDFDropdown={onSelectPDFDropdown}
      onClickEmailButton={onClickEmailButton}
      onSort={onSort}
    />
  );
  const modalComponent = (
    modal && (
    <CustomerStatementListModal
      onDismissModal={onDismissModal}
      onDismissModalAlert={onDismissModalAlert}
      onDownloadPDF={onDownloadPDF}
      onUpdateTemplateOption={onUpdateTemplateOption}
      onSendEmail={onSendEmail}
      onUpdateEmailOptions={onUpdateEmailOptions}
      modal={modal}
    />
    )
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <BaseTemplate>
      {modalComponent}
      {pageHead}
      {alertComponent}
      {filterOptions}
      {table}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  modal: getModal(state),
});

export default connect(mapStateToProps)(CustomerStatementListView);
