import { BaseTemplate, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAlertShown, getLoadingState, getModal, getPageTitle,
} from '../bankingRuleBillSelectors';
import Actions from './BankingRuleBillActions';
import BankingRuleBillAlert from './BankingRuleBillAlert';
import BankingRuleBillRuleConditions from './BankingRuleBillRuleConditions';
import ModalContainer from './BankingRuleBillModal';
import PageView from '../../../../components/PageView/PageView';
import RuleDetails from './BankingRuleBillRuleDetails';

const BankingRuleBillView = ({
  loadingState,
  isAlertShown,
  modal,
  pageTitle,
  onRuleDetailsChange,
  onRuleConditionsChange,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onDismissModal,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
  onConfirmSave,
  onDismissAlert,
}) => {
  const view = (
    <BaseTemplate>
      <PageHead title={pageTitle} />
      {isAlertShown && <BankingRuleBillAlert onDismissAlert={onDismissAlert} /> }
      <Card>
        {
          modal && (
            <ModalContainer
              modal={modal}
              onDismissModal={onDismissModal}
              onConfirmSave={onConfirmSave}
              onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
              onConfirmCancelButtonClick={onConfirmCancelButtonClick}
            />
          )
        }
        <RuleDetails onRuleDetailsChange={onRuleDetailsChange} />
        <BankingRuleBillRuleConditions
          onRuleConditionsChange={onRuleConditionsChange}
        />
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

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  modal: getModal(state),
  pageTitle: getPageTitle(state),
  isAlertShown: getIsAlertShown(state),
});

export default connect(mapStateToProps)(BankingRuleBillView);
