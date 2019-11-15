import {
  BaseTemplate, Card, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasInTrayDocument,
  getIsAlertShown,
  getIsLoading,
  getIsModalShown,
  getLayout,
} from '../selectors/billSelectors';
import BillActions from './BillActions';
import BillAlert from './BillAlert';
import BillHeader from './BillHeader';
import BillInTrayDocumentView from './BillInTrayDocumentView';
import BillItemTable from './BillItemTable';
import BillModal from './BillModal';
import BillOptions from './BillOptions';
import BillServiceTable from './BillServiceTable';
import PageView from '../../../components/PageView/PageView';

const BillView = ({
  onAddAccount,
  accountModal,
  hasInTrayDocument,
  isAlertShown,
  isModalShown,
  isLoading,
  layout,
  contactModal,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onExportPdfButtonClick,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onDismissAlert,
  onUpdateBillOption,
  onAmountPaidBlur,
  onServiceRowInputBlur,
  onAddServiceRow,
  onServiceRowChange,
  onRemoveServiceRow,
  onItemRowInputBlur,
  onAddItemRow,
  onItemRowChange,
  onRemoveItemRow,
  exportPdfModalListeners,
  onAddSupplierButtonClick,
}) => {
  const table = {
    item: (
      <BillItemTable
        onRowInputBlur={onItemRowInputBlur}
        onUpdateBillOption={onUpdateBillOption}
        onAmountPaidBlur={onAmountPaidBlur}
        onAddRow={onAddItemRow}
        onRowChange={onItemRowChange}
        onRemoveRow={onRemoveItemRow}
      />
    ),
    service: (
      <BillServiceTable
        onRowInputBlur={onServiceRowInputBlur}
        onUpdateBillOption={onUpdateBillOption}
        onAmountPaidBlur={onAmountPaidBlur}
        onAddRow={onAddServiceRow}
        onRowChange={onServiceRowChange}
        onRemoveRow={onRemoveServiceRow}
        onAddAccount={onAddAccount}
      />
    ),
  }[layout];

  const view = (
    <BaseTemplate
      stickyHeaderChildren={(
        <div>
          {isAlertShown && <BillAlert onDismissAlert={onDismissAlert} />}
          <BillHeader />
        </div>
)}
    >
      {accountModal}
      {isModalShown && (
        <BillModal
          onModalClose={onModalClose}
          onCancelModalConfirm={onCancelModalConfirm}
          onDeleteModalConfirm={onDeleteModalConfirm}
          onConfirmSaveAndCreateNewButtonClick={
            onConfirmSaveAndCreateNewButtonClick
          }
          onConfirmSaveAndDuplicateButtonClick={
            onConfirmSaveAndDuplicateButtonClick
          }
          exportPdfModalListeners={exportPdfModalListeners}
        />
      )}

      {contactModal}

      {hasInTrayDocument && <BillInTrayDocumentView />}
      <Card>
        <BillOptions
          onUpdateBillOption={onUpdateBillOption}
          onAddSupplierButtonClick={onAddSupplierButtonClick}
        />
        <Separator />
        {table}
      </Card>
      <BillActions
        onSaveButtonClick={onSaveButtonClick}
        onSaveAndButtonClick={onSaveAndButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onExportPdfButtonClick={onExportPdfButtonClick}
      />
    </BaseTemplate>
  );

  return (
    <PageView
      isLoading={isLoading}
      view={view}
    />
  );
};

const mapStateToProps = state => ({
  hasInTrayDocument: getHasInTrayDocument(state),
  isModalShown: getIsModalShown(state),
  isAlertShown: getIsAlertShown(state),
  isLoading: getIsLoading(state),
  layout: getLayout(state),
});

export default connect(mapStateToProps)(BillView);
