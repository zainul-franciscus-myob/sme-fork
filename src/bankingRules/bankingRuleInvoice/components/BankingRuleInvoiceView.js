import { BaseTemplate, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAlertShown, getIsLoading, getModalType, getPageTitle,
} from '../bankingRuleInvoiceSelectors';
import Actions from './BankingRuleInvoiceActions';
import BankingRuleInvoiceAlert from './BankingRuleInvoiceAlert';
import BankingRuleInvoiceRuleConditions from './BankingRuleInvoiceRuleConditions';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import ModalContainer from './BankingRuleInvoiceModal';
import RuleDetails from './BankingRuleInvoiceRuleDetails';

const BankingRuleInvoiceView = ({
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
      {isAlertShown && <BankingRuleInvoiceAlert onDismissAlert={onDismissAlert} /> }
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
        <BankingRuleInvoiceRuleConditions
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

export default connect(mapStateToProps)(BankingRuleInvoiceView);
