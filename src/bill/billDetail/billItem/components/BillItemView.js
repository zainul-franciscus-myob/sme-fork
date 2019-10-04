import {
  Alert, BaseTemplate, Card, PageHead, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlertMessage, getInTrayDocument,
  getModalType,
  getPageTitle,
} from '../billItemSelectors';
import BillInTrayDocumentView from '../../components/BillInTrayDocumentView';
import BillItemActions from './BillItemActions';
import BillItemModal from './BillItemModal';
import BillItemOptions from './BillItemOptions';
import BillItemTable from './BillItemTable';
import styles from './BillItemView.module.css';

const BillItemView = ({
  alertMessage,
  modalType,
  pageTitle,
  inTrayDocument,
  onUpdateBillOption,
  onUpdateTaxInclusive,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
  onAddTableLine,
  onChangeTableRow,
  onRemoveTableRow,
  onDismissAlert,
  onLineInputBlur,
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
    </div>
  );

  const filterOptions = (
    <div className={styles.filterOptions}>
      <BillItemOptions
        onUpdateBillOption={onUpdateBillOption}
        onUpdateTaxInclusive={onUpdateTaxInclusive}
      />
    </div>
  );

  const buttonActions = (
    <BillItemActions
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const modal = modalType && (
  <BillItemModal
    modalType={modalType}
    onModalClose={onModalClose}
    onCancelModalConfirm={onCancelModalConfirm}
    onDeleteModalConfirm={onDeleteModalConfirm}
  />
  );

  const viewDocumentSection = inTrayDocument && (
    <BillInTrayDocumentView
      inTrayDocument={inTrayDocument}
    />
  );

  const view = (
    <BaseTemplate stickyHeaderChildren={alertAndPageHead}>

      {viewDocumentSection}

      <Card>
        {filterOptions}

        <Separator />

        {modal}

        <BillItemTable
          onAddTableLine={onAddTableLine}
          onChangeTableRow={onChangeTableRow}
          onRemoveTableRow={onRemoveTableRow}
          onLineInputBlur={onLineInputBlur}
        />

      </Card>

      {buttonActions}

    </BaseTemplate>
  );

  return view;
};

BillItemView.propTypes = {
  alertMessage: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  onUpdateBillOption: PropTypes.func.isRequired,
  onUpdateTaxInclusive: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onCancelModalConfirm: PropTypes.func.isRequired,
  onDeleteModalConfirm: PropTypes.func.isRequired,
  onAddTableLine: PropTypes.func.isRequired,
  onChangeTableRow: PropTypes.func.isRequired,
  onRemoveTableRow: PropTypes.func.isRequired,
  onLineInputBlur: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  pageTitle: getPageTitle(state),
  inTrayDocument: getInTrayDocument(state),
});

export default connect(mapStateToProps)(BillItemView);
