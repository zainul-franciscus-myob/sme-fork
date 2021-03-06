import { Alert, FormHorizontal, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getModalType,
  getTitle,
} from '../DeductionPayItemSelectors';
import DeductionPayItemActions from './DeductionPayItemActions';
import DeductionPayItemModal from './DeductionPayItemModal';
import DetailsView from './DetailsView';
import EmployeeAllocationView from './EmployeeAllocationView';
import ExemptionsView from './ExemptionsView';
import InformationView from './InformationView';
import PageView from '../../../../../components/PageView/PageView';
import styles from './DeductionPayItemView.module.css';

const DeductionPayItemView = ({
  title,
  loadingState,
  modalType,
  onDetailsChange,
  onInformationChange,
  onEmployeeSelected,
  onExemptionSelected,
  onRemoveEmployee,
  onRemoveExemption,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onConfirmCancel,
  onConfirmDelete,
  onCloseModal,
  onDismissAlert,
  alert,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <StandardTemplate pageHead={title} alert={alertComponent} sticky="none">
      {modalType && (
        <DeductionPayItemModal
          modalType={modalType}
          onConfirmCancel={onConfirmCancel}
          onConfirmDelete={onConfirmDelete}
          onCloseModal={onCloseModal}
        />
      )}
      <div className={styles.payItemView}>
        <FormHorizontal>
          <DetailsView onDetailsChange={onDetailsChange} />
          <InformationView onInformationChange={onInformationChange} />
        </FormHorizontal>
      </div>
      <hr />
      <EmployeeAllocationView
        onEmployeeSelected={onEmployeeSelected}
        onRemoveEmployee={onRemoveEmployee}
      />
      <ExemptionsView
        onExemptionSelected={onExemptionSelected}
        onRemoveExemption={onRemoveExemption}
      />
      <DeductionPayItemActions
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </StandardTemplate>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  title: getTitle(state),
  loadingState: getLoadingState(state),
  modalType: getModalType(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(DeductionPayItemView);
