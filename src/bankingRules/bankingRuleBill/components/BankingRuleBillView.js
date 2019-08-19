import { BaseTemplate, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAlertShown, getIsLoading, getModalType, getPageTitle,
} from '../bankingRuleBillSelectors';
import Actions from './BankingRuleBillActions';
import BankingRuleBillAlert from './BankingRuleBillAlert';
import BankingRuleBillRuleConditions from './BankingRuleBillRuleConditions';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import ModalContainer from './BankingRuleBillModal';
import RuleDetails from './BankingRuleBillRuleDetails';

const BankingRuleBillView = ({
  isLoading,
  isAlertShown,
  modalType,
  pageTitle,
  onRuleDetailsChange,
  onRuleConditionsChange,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onDismissModal,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
  onDismissAlert,
}) => (isLoading ? <LoadingPageState /> : (
  <React.Fragment>
    <BaseTemplate>
      <PageHead title={pageTitle} />
      {isAlertShown && <BankingRuleBillAlert onDismissAlert={onDismissAlert} /> }
      <Card>
        {
          modalType && (
            <ModalContainer
              onDismissModal={onDismissModal}
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
  </React.Fragment>
));

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  pageTitle: getPageTitle(state),
  isAlertShown: getIsAlertShown(state),
});

export default connect(mapStateToProps)(BankingRuleBillView);
