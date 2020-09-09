import { BaseTemplate, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAlertShown,
  getLoadingState,
  getModal,
  getPageTitle,
  getShowAllocationTable,
} from '../bankingRuleDetailSelectors';
import Actions from './BankingRuleDetailActions';
import BankingRuleDetailAlert from './BankingRuleDetailAlert';
import BankingRuleDetailAllocationTable from './BankingRuleDetailAllocationTable';
import BankingRuleDetailConditionsSection from './BankingRuleDetailConditionsSection';
import BankingRuleDetailRuleDetails from './BankingRuleDetailRuleDetails';
import BankingRuleDetailTransactionSection from './BankingRuleDetailTransactionSection';
import ModalContainer from './BankingRuleDetailModal';
import PageView from '../../../../components/PageView/PageView';

const BankingRuleDetailView = ({
  renderContactCombobox,
  loadingState,
  isAlertShown,
  modal,
  jobModal,
  pageTitle,
  showAllocationTable,
  onRuleDetailsChange,
  onRuleConditionsChange,
  onConditionChange,
  onConditionAdd,
  onPredicateAdd,
  onPredicateChange,
  onPredicateRemove,
  onAddRow,
  onAddJob,
  onRowChange,
  onRemoveRow,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onDismissModal,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
  onConfirmSave,
  onDismissAlert,
  onAlert,
}) => {
  const view = (
    <BaseTemplate>
      {isAlertShown && (
        <BankingRuleDetailAlert onDismissAlert={onDismissAlert} />
      )}
      <PageHead title={pageTitle} />
      <Card>
        {jobModal}
        {modal && (
          <ModalContainer
            modal={modal}
            onDismissModal={onDismissModal}
            onConfirmSave={onConfirmSave}
            onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
            onConfirmCancelButtonClick={onConfirmCancelButtonClick}
          />
        )}
        <BankingRuleDetailRuleDetails
          onRuleDetailsChange={onRuleDetailsChange}
          onRuleConditionsChange={onRuleConditionsChange}
        />
        <BankingRuleDetailConditionsSection
          onConditionChange={onConditionChange}
          onConditionAdd={onConditionAdd}
          onPredicateAdd={onPredicateAdd}
          onPredicateChange={onPredicateChange}
          onPredicateRemove={onPredicateRemove}
        />
        <BankingRuleDetailTransactionSection
          renderContactCombobox={renderContactCombobox}
          onRuleConditionsChange={onRuleConditionsChange}
          onAlert={onAlert}
        />
        {showAllocationTable && (
          <BankingRuleDetailAllocationTable
            onAddRow={onAddRow}
            onRowChange={onRowChange}
            onRemoveRow={onRemoveRow}
            onAddJob={onAddJob}
          />
        )}
      </Card>
      <Actions
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  modal: getModal(state),
  pageTitle: getPageTitle(state),
  isAlertShown: getIsAlertShown(state),
  showAllocationTable: getShowAllocationTable(state),
});

export default connect(mapStateToProps)(BankingRuleDetailView);
