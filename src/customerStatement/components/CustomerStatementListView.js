import {
  Alert, BaseTemplate, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading, getModal } from '../selectors/customerStatementListSelectors';
import CustomerStatementFilterOptions from './CustomerStatementFilterOptions';
import CustomerStatementListModal from './CustomerStatementListModal';
import CustomerStatementListTable from './CustomerStatementListTable';
import PageView from '../../components/PageView/PageView';

const CustomerStatementListView = ({
  isLoading,
  modal,
  alert,
  onApplyFilters,
  onUpdateFilters,
  onToggleAllCustomerStatements,
  onSelectCustomerStatement,
  onSelectPdfDropdown,
  onClickEmailButton,
  onDismissModal,
  onDismissModalAlert,
  onDismissAlert,
  onDownloadPdf,
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
    />
  );
  const table = (
    <CustomerStatementListTable
      onToggleAllCustomerStatements={onToggleAllCustomerStatements}
      onSelectCustomerStatement={onSelectCustomerStatement}
      onSelectPdfDropdown={onSelectPdfDropdown}
      onClickEmailButton={onClickEmailButton}
      onSort={onSort}
    />
  );
  const modalComponent = (
    modal && (
    <CustomerStatementListModal
      onDismissModal={onDismissModal}
      onDismissModalAlert={onDismissModalAlert}
      onDownloadPdf={onDownloadPdf}
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

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  modal: getModal(state),
});

export default connect(mapStateToProps)(CustomerStatementListView);