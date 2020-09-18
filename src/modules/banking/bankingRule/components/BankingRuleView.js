import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsBankingRuleOpen,
  getIsLoading,
  getShouldShowAllocationSection,
} from '../bankingRuleSelectors';
import AllocationSection from './AllocationSection';
import ConditionsSection from './ConditionsSection';
import HeaderSection from './HeaderSection';
import PageView from '../../../../components/PageView/PageView';
import RuleDetailsSection from './RuleDetailsSection';
import SuggestMatchSection from './SuggestMatchSection';

const BankingRuleView = ({
  onCancel,
  onSave,
  onContactChange,
  onDetailsChange,
  onConditionChange,
  onConditionAdd,
  onPredicateAdd,
  onPredicateChange,
  onPredicateRemove,
  onAddAllocationLine,
  onUpdateAllocationLine,
  onRemoveAllocationLine,
  onAlert,
  showShowAllocationSection,
  renderContactCombobox,
  isLoading,
  isOpen,
  alert,
}) => {
  const modalBody = (
    <>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <HeaderSection />
      <RuleDetailsSection onDetailsChange={onDetailsChange} />
      <ConditionsSection
        onConditionChange={onConditionChange}
        onConditionAdd={onConditionAdd}
        onPredicateAdd={onPredicateAdd}
        onPredicateChange={onPredicateChange}
        onPredicateRemove={onPredicateRemove}
      />
      {showShowAllocationSection && (
        <AllocationSection
          onContactChange={onContactChange}
          onDetailsChange={onDetailsChange}
          onAddAllocationLine={onAddAllocationLine}
          onUpdateAllocationLine={onUpdateAllocationLine}
          onRemoveAllocationLine={onRemoveAllocationLine}
          renderContactCombobox={renderContactCombobox}
          onAlert={onAlert}
        />
      )}
      {!showShowAllocationSection && (
        <SuggestMatchSection
          onContactChange={onContactChange}
          renderContactCombobox={renderContactCombobox}
          onAlert={onAlert}
        />
      )}
    </>
  );

  return isOpen ? (
    <Modal
      title="Create bank feed rule"
      onCancel={onCancel}
      canClose={!isLoading}
      size="large"
    >
      <Modal.Body>
        <PageView isLoading={isLoading} view={modalBody} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="primary" onClick={onSave} disabled={isLoading}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

const mapStateToProps = (state) => ({
  showShowAllocationSection: getShouldShowAllocationSection(state),
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isOpen: getIsBankingRuleOpen(state),
});

export default connect(mapStateToProps)(BankingRuleView);
