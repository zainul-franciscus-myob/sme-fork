import { FormHorizontal, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAlertShown,
  getIsCreating,
  getIsModalShown,
  getLoadingState,
  getOriginalName,
} from '../ExpensePayItemSelectors';
import AllocatedEmployeesSection from './AllocatedEmployeesSection';
import DetailsSection from './DetailsSection';
import EmployerExpenseInformationSection from './EmployerExpenseInformationSection';
import ExemptionsSection from './ExemptionsSection';
import ExpensePayItemActions from './ExpensePayItemActions';
import ExpensePayItemAlert from './ExpensePayItemAlert';
import ExpensePayItemModal from './ExpensePayItemModal';
import PageView from '../../../../components/PageView/PageView';
import styles from './ExpensePayItemView.module.css';

const ExpensePayItemView = ({
  originalName,
  isCreating,
  loadingState,
  isModalShown,
  isAlertShown,
  onDismissAlert,
  onDismissModal,
  onChangeExpensePayItemInput,
  onAddAllocatedEmployee,
  onRemoveAllocatedEmployee,
  onAddExemptionPayItem,
  onRemoveExemptionPayItem,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
  onSaveButtonClick,
  onDeleteButtonClick,
  onCancelButtonClick,
}) => {
  const pageHead = isCreating ? 'Create expense pay item' : originalName;
  const alert = isAlertShown && (
    <ExpensePayItemAlert onDismissAlert={onDismissAlert} />
  );
  const modal = isModalShown && (
    <ExpensePayItemModal
      onDismissModal={onDismissModal}
      onConfirmCancelButtonClick={onConfirmCancelButtonClick}
      onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
    />
  );

  const view = (
    <StandardTemplate pageHead={pageHead} alert={alert} sticky="none">
      {modal}
      <div className={styles.payItemView}>
        <FormHorizontal>
          <DetailsSection
            onChangeExpensePayItemInput={onChangeExpensePayItemInput}
          />
          <EmployerExpenseInformationSection
            onChangeExpensePayItemInput={onChangeExpensePayItemInput}
          />
        </FormHorizontal>
      </div>
      <hr />
      <AllocatedEmployeesSection
        onAddAllocatedEmployee={onAddAllocatedEmployee}
        onRemoveAllocatedEmployee={onRemoveAllocatedEmployee}
      />
      <ExemptionsSection
        onAddExemptionPayItem={onAddExemptionPayItem}
        onRemoveExemptionPayItem={onRemoveExemptionPayItem}
      />
      <ExpensePayItemActions
        onSaveButtonClick={onSaveButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onCancelButtonClick={onCancelButtonClick}
      />
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  originalName: getOriginalName(state),
  isCreating: getIsCreating(state),
  loadingState: getLoadingState(state),
  isModalShown: getIsModalShown(state),
  isAlertShown: getIsAlertShown(state),
});

export default connect(mapStateToProps)(ExpensePayItemView);
