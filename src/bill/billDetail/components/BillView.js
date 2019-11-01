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
  hasInTrayDocument,
  isAlertShown,
  isModalShown,
  isLoading,
  layout,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onDismissAlert,
  onUpdateBillOption,
  onServiceRowInputBlur,
  onAddServiceRow,
  onServiceRowChange,
  onRemoveServiceRow,
  onItemRowInputBlur,
  onAddItemRow,
  onItemRowChange,
  onRemoveItemRow,
}) => {
  const table = {
    item: (
      <BillItemTable
        onRowInputBlur={onItemRowInputBlur}
        onUpdateBillOption={onUpdateBillOption}
        onAddRow={onAddItemRow}
        onRowChange={onItemRowChange}
        onRemoveRow={onRemoveItemRow}
      />
    ),
    service: (
      <BillServiceTable
        onRowInputBlur={onServiceRowInputBlur}
        onUpdateBillOption={onUpdateBillOption}
        onAddRow={onAddServiceRow}
        onRowChange={onServiceRowChange}
        onRemoveRow={onRemoveServiceRow}
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
        />
      )}

      {hasInTrayDocument && <BillInTrayDocumentView />}
      <Card>
        <BillOptions
          onUpdateBillOption={onUpdateBillOption}
        />
        <Separator />
        {table}
      </Card>
      <BillActions
        onSaveButtonClick={onSaveButtonClick}
        onSaveAndButtonClick={onSaveAndButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
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
