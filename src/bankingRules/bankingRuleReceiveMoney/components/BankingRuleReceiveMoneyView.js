import { BaseTemplate, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAlertShown, getIsLoading, getModal, getPageTitle,
} from '../bankingRuleReceiveMoneySelectors';
import Actions from './BankingRuleReceiveMoneyActions';
import BankingRuleReceiveMoneyAlert from './BankingRuleReceiveMoneyAlert';
import BankingRuleReceiveMoneyRuleConditions from './BankingRuleReceiveMoneyRuleConditions';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import ModalContainer from './BankingRuleReceiveMoneyModal';
import RuleDetails from './BankingRuleReceiveMoneyRuleDetails';

const BankingRuleReceiveMoneyView = ({
  isLoading,
  isAlertShown,
  modal,
  pageTitle,
  onRuleDetailsChange,
  onRuleConditionsChange,
  onRowInputBlur,
  onAddRow,
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
}) => (isLoading ? <LoadingPageState /> : (
  <React.Fragment>
    <BaseTemplate>
      <PageHead title={pageTitle} />
      {isAlertShown && <BankingRuleReceiveMoneyAlert onDismissAlert={onDismissAlert} /> }
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
        <BankingRuleReceiveMoneyRuleConditions
          onRuleConditionsChange={onRuleConditionsChange}
          onRowInputBlur={onRowInputBlur}
          onAddRow={onAddRow}
          onRowChange={onRowChange}
          onRemoveRow={onRemoveRow}
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
  modal: getModal(state),
  pageTitle: getPageTitle(state),
  isAlertShown: getIsAlertShown(state),
});

export default connect(mapStateToProps)(BankingRuleReceiveMoneyView);
