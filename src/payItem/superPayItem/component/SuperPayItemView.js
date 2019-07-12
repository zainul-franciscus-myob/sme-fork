import { Alert, FormTemplate, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsCreating, getIsLoading, getModalType, getSuperPayItemOriginalName,
} from '../superPayItemSelectors';
import FormCard from '../../../components/FormCard/FormCard';
import SuperPayItemActions from './SuperPayItemActions';
import SuperPayItemDetail from './SuperPayItemDetail';
import SuperPayItemEmployees from './SuperPayItemEmployees';
import SuperPayItemExemptions from './SuperPayItemExemptions';
import SuperPayItemInfo from './SuperPayItemSuperInfo';
import SuperPayItemModal from './SuperPayItemModal';

const SuperPayItemView = (props) => {
  const {
    alert,
    isCreating,
    isLoading,
    modalType,
    originalName,
    onDismissAlert,
    onConfirmCancel,
    onConfirmDelete,
    onCloseModal,
    onSaveButtonClick,
    onCancelButtonClick,
    onDeleteButtonClick,
    onSuperPayItemDetailsChange,
    onSuperPayItemDetailBlur,
    onAddSuperPayItemEmployee,
    onRemoveSuperPayItemEmployee,
    onAddSuperPayItemExemption,
    onRemoveSuperPayItemExemption,
  } = props;

  const pageHead = isCreating ? 'Create super pay item' : originalName;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType && (
    <SuperPayItemModal
      modalType={modalType}
      onCloseModal={onCloseModal}
      onConfirmCancel={onConfirmCancel}
      onConfirmDelete={onConfirmDelete}
    />
  );

  const view = (
    <FormTemplate pageHead={pageHead} alert={alertComponent}>
      {modal}
      <FormCard>
        <SuperPayItemDetail onSuperPayItemDetailsChange={onSuperPayItemDetailsChange} />
        <SuperPayItemInfo
          onSuperPayItemDetailsChange={onSuperPayItemDetailsChange}
          onSuperPayItemDetailBlur={onSuperPayItemDetailBlur}
        />
        <SuperPayItemEmployees
          onAddSuperPayItemEmployee={onAddSuperPayItemEmployee}
          onRemoveSuperPayItemEmployee={onRemoveSuperPayItemEmployee}
        />
        <SuperPayItemExemptions
          onAddSuperPayItemExemption={onAddSuperPayItemExemption}
          onRemoveSuperPayItemExemption={onRemoveSuperPayItemExemption}
        />
      </FormCard>
      <SuperPayItemActions
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </FormTemplate>
  );

  return (isLoading ? <Spinner /> : view);
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isCreating: getIsCreating(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  originalName: getSuperPayItemOriginalName(state),
});

export default connect(mapStateToProps)(SuperPayItemView);
