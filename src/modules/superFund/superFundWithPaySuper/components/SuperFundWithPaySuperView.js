import { Alert, FieldGroup, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getModalType,
  getSuperFund,
  getSuperFundPageTitle,
} from '../SuperFundWithPaySuperSelectors';
import FormCard from '../../../../components/FormCard/FormCard';
import PaySuperSection from './PaySuperSection';
import SuperFundAPRADetail from './SuperFundAPRADetail';
import SuperFundBasic from './SuperFundBasic';
import SuperFundDetailActions from './SuperFundDetailActions';
import SuperFundDetailModal from '../../components/SuperFundDetailModal';
import SuperFundSelfManagedDetail from './SuperFundSelfManagedDetail';
import SuperFundWithPaySuperContactDetails from './SuperFundWithPaySuperContactDetails';

const SuperFundWithPaySuperView = ({
  modalType,
  alertMessage,
  listeners,
  superFund,
  pageTitle,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={listeners.onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const modal = modalType && (
    <SuperFundDetailModal modalType={modalType} listeners={listeners} />
  );

  const actions = <SuperFundDetailActions listeners={listeners} />;

  const FundDetail =
    superFund.fundType === 'SelfManagedSuperFund'
      ? SuperFundSelfManagedDetail
      : SuperFundAPRADetail;

  return (
    <FormTemplate
      actions={actions}
      alert={alertComponent}
      sticky="none"
      pageHead={pageTitle}
    >
      {modal}
      <FormCard header="Superannuation fund details">
        <FieldGroup label="Self managed" hideLabel>
          <SuperFundBasic listeners={listeners} />
          <FundDetail listeners={listeners} />
          <SuperFundWithPaySuperContactDetails listeners={listeners} />
          <PaySuperSection listeners={listeners} />
        </FieldGroup>
      </FormCard>
    </FormTemplate>
  );
};

const mapStateToProps = (state) => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  superFund: getSuperFund(state),
  pageTitle: getSuperFundPageTitle(state),
});

export default connect(mapStateToProps)(SuperFundWithPaySuperView);
