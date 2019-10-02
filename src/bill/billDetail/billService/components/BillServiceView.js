import {
  Alert, BaseTemplate, Card, Columns, PageHead, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlertMessage,
  getInTrayDocument,
  getIsCreating,
  getModalType,
  getPageTitle,
} from '../billServiceSelectors';
import BillServiceActions from './BillServiceActions';
import BillServiceInTrayDocumentView from './BillServiceInTrayDocumentView';
import BillServiceOptions from './BillServiceOptions';
import BillServiceTable from './BillServiceTable';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import styles from './BillServiceView.module.css';

const BillServiceView = ({
  onUpdateHeaderOptions,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  isCreating,
  modalType,
  inTrayDocument,
  pageTitle,
  onCloseModal,
  onCancelModal,
  alertMessage,
  onDismissAlert,
  onDeleteModal,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const alertAndPageHead = (
    <div>
      {alertComponent}
      <PageHead title={pageTitle} />
    </div>);

  const filterOptions = (
    <div className={styles.filterOptions}>
      <Columns type="three">
        <BillServiceOptions
          onUpdateHeaderOptions={onUpdateHeaderOptions}
        />
      </Columns>
    </div>
  );

  const buttonActions = (
    <BillServiceActions
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
        title="Cancel bill alterations"
        description="Are you sure you want to cancel the alterations in this bill?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete bill"
        description="Are you sure you want to delete this bill?"
      />
    );
  }

  const viewDocumentSection = inTrayDocument && (
    <BillServiceInTrayDocumentView />
  );

  const view = (
    <BaseTemplate stickyHeaderChildren={alertAndPageHead}>

      {viewDocumentSection}

      <Card>
        {filterOptions}

        <Separator />

        {modal}

        <BillServiceTable
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onRowInputBlur={onRowInputBlur}
        />
      </Card>

      {buttonActions}

    </BaseTemplate>
  );

  return view;
};

BillServiceView.propTypes = {
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  inTrayDocument: getInTrayDocument(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(BillServiceView);
