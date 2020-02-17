import {
  Alert, Button, Modal,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsSaving,
  getShouldShowAllocationSection,
} from '../bankingRuleSelectors';
import AllocationSection from './AllocationSection';
import ConditionsSection from './ConditionsSection';
import HeaderSection from './HeaderSection';
import PageView from '../../../../components/PageView/PageView';
import RuleDetailsSection from './RuleDetailsSection';
import SuggestMatchSection from './SuggestMatchSection';

const BankingRuleModal = ({
  onCancel,
  onSave,
  onDetailsChange,
  onConditionChange,
  onConditionAdd,
  onPredicateAdd,
  onPredicateChange,
  onPredicateRemove,
  onAddAllocationLine,
  onUpdateAllocationLine,
  onRemoveAllocationLine,
  showShowAllocationSection,
  isSaving,
  alert,
}) => {
  const view = (
    <>
      {
        alert && (
          <Alert type={alert.type}>
            {alert.message}
          </Alert>
        )
      }
      <HeaderSection />
      <RuleDetailsSection onDetailsChange={onDetailsChange} />
      <ConditionsSection
        onConditionChange={onConditionChange}
        onConditionAdd={onConditionAdd}
        onPredicateAdd={onPredicateAdd}
        onPredicateChange={onPredicateChange}
        onPredicateRemove={onPredicateRemove}
      />
      {
        showShowAllocationSection && (
          <AllocationSection
            onDetailsChange={onDetailsChange}
            onAddAllocationLine={onAddAllocationLine}
            onUpdateAllocationLine={onUpdateAllocationLine}
            onRemoveAllocationLine={onRemoveAllocationLine}
          />
        )
      }
      {
        !showShowAllocationSection && <SuggestMatchSection onDetailsChange={onDetailsChange} />
      }
    </>
  );

  return (
    <Modal
      title="Create bank feed rule"
      onCancel={onCancel}
      canClose={!isSaving}
      size="large"
    >
      <Modal.Body>
        <PageView isLoading={isSaving} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel} disabled={isSaving}>Cancel</Button>
        <Button type="primary" onClick={onSave} disabled={isSaving}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  showShowAllocationSection: getShouldShowAllocationSection(state),
  alert: getAlert(state),
  isSaving: getIsSaving(state),
});

export default connect(mapStateToProps)(BankingRuleModal);
