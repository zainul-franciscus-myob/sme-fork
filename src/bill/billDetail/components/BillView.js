import { connect } from 'react-redux';
import React from 'react';

import {
  getHasInTrayDocument,
  getIsAlertShown,
  getIsLoading,
  getIsModalShown,
  getLayout,
  getShowSplitView,
} from '../selectors/billSelectors';
import BillActions from './BillActions';
import BillAlert from './BillAlert';
import BillDocumentViewer from './BillDocumentViewer';
import BillHeader from './BillHeader';
import BillInTrayDocumentView from './BillInTrayDocumentView';
import BillItemTable from './BillItemTable';
import BillModal from './BillModal';
import BillPrimaryOptions from './BillPrimaryOptions';
import BillSecondaryOptions from './BillSecondaryOptions';
import BillServiceTable from './BillServiceTable';
import MasterDetailLineItemTemplate from '../../../components/MasterDetailLineItemTemplate/MasterDetailLineItemTemplate';
import PageView from '../../../components/PageView/PageView';

const BillView = ({
  onAddAccount,
  accountModal,
  hasInTrayDocument,
  isAlertShown,
  isModalShown,
  isSplitViewShown,
  isLoading,
  layout,
  inventoryModal,
  inTrayModal,
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
  onAddItemButtonClick,
  onAddSupplierButtonClick,
  toggleSplitView,
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
        onAddItemButtonClick={onAddItemButtonClick}
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

  const stickyHeader = (
    <div>
      {isAlertShown && <BillAlert onDismissAlert={onDismissAlert} />}
      <BillHeader />
    </div>
  );

  const detail = hasInTrayDocument && <BillDocumentViewer toggleSplitView={toggleSplitView} />;

  const inTrayDocument = hasInTrayDocument && !isSplitViewShown && (
    <BillInTrayDocumentView toggleSplitView={toggleSplitView} />
  );

  const subHeaderChildren = (
    <div>
      {inventoryModal}
      {accountModal}
      {contactModal}
      {inTrayModal}
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
      {inTrayDocument}
    </div>
  );

  const view = (
    <MasterDetailLineItemTemplate
      primaryOptions={(
        <BillPrimaryOptions
          onUpdateBillOption={onUpdateBillOption}
          onAddSupplierButtonClick={onAddSupplierButtonClick}
        />
      )}
      secondaryOptions={
        <BillSecondaryOptions onUpdateBillOption={onUpdateBillOption} />
      }
      table={table}
      actions={(
        <BillActions
          onSaveButtonClick={onSaveButtonClick}
          onSaveAndButtonClick={onSaveAndButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          onExportPdfButtonClick={onExportPdfButtonClick}
        />
      )}
      subHeadChildren={subHeaderChildren}
      detail={detail}
      pageHead={stickyHeader}
      showDetail={isSplitViewShown}
    />
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
  isSplitViewShown: getShowSplitView(state),
});

export default connect(mapStateToProps)(BillView);
