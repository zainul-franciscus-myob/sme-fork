import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlertMessage,
  getModalType,
} from '../billItemSelectors';
import BillItemActions from './BillItemActions';
import BillItemModal from './BillItemModal';
import BillItemOptions from './BillItemOptions';
import BillItemTable from './BillItemTable';

const BillItemView = ({
  alertMessage,
  modalType,
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
}) => (
  <React.Fragment>
    { modalType && (
      <BillItemModal
        onModalClose={onModalClose}
        onCancelModalConfirm={onCancelModalConfirm}
        onDeleteModalConfirm={onDeleteModalConfirm}
      />
    )}
    <LineItemTemplate
      pageHead="Bill"
      options={(
        <BillItemOptions
          onUpdateBillOption={onUpdateBillOption}
          onUpdateTaxInclusive={onUpdateTaxInclusive}
        />
      )}
      actions={(
        <BillItemActions
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      )}
      alert={alertMessage && (
        <Alert type="danger" onDismiss={onDismissAlert}>
          {alertMessage}
        </Alert>
      )}
    >
      <BillItemTable
        onAddTableLine={onAddTableLine}
        onChangeTableRow={onChangeTableRow}
        onRemoveTableRow={onRemoveTableRow}
        onLineInputBlur={onLineInputBlur}
      />
    </LineItemTemplate>
  </React.Fragment>
);

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
});

export default connect(mapStateToProps)(BillItemView);
