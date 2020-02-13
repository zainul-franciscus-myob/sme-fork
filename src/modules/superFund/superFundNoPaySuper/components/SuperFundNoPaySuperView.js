import {
  Alert,
  Field,
  FormTemplate,
  Icons,
  RadioButton,
  RadioButtonGroup,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import {
  getAlertMessage,
  getModalType,
  getSignUpForPaySuperUrl,
  getSuperFundPageTitle,
} from '../SuperFundNoPaySuperSelectors';
import { selfManagedSuperFund, standardSuperFund } from '../../FundTypes';
import FormCard from '../../../../components/FormCard/FormCard';
import LinkButton from '../../../../components/Button/LinkButton';
import SuperFundDetailActions from './SuperFundDetailActions';
import SuperFundDetailModal from '../../components/SuperFundDetailModal';
import SuperFundDetailSection from './SuperFundDetailSection';
import SuperFundNoPaySuperContactDetails from './SuperFundNoPaySuperContactDetails';

const SuperFundNoPaySuperView = ({
  listeners,
  modalType,
  alertMessage,
  pageTitle,
  signUpForPaySuperUrl,
}) => {
  const alert = alertMessage && (
    <Alert type="danger" onDismiss={listeners.onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const modal = modalType && (
    <SuperFundDetailModal modalType={modalType} listeners={listeners} />
  );

  const actions = <SuperFundDetailActions listeners={listeners} />;

  return (
    <Fragment>
      {modal}
      <FormTemplate actions={actions} pageHead={pageTitle} alert={alert}>
        <FormCard header="Superannuation fund details">
          <RadioButtonGroup
            label="Type"
            name="fundType"
            renderRadios={() => ([
              <RadioButton
                key={standardSuperFund.name}
                name="fundType"
                label={standardSuperFund.name}
                value={standardSuperFund.value}
                checked
              />,
              <RadioButton
                key={selfManagedSuperFund.name}
                name="fundType"
                label={selfManagedSuperFund.name}
                value={selfManagedSuperFund.value}
                disabled
                labelAccessory={(
                  <Tooltip>
                    You can only select an SMSF if you sign up to Pay super
                  </Tooltip>
                )}
              />,
            ])}
          />

          <SuperFundDetailSection listeners={listeners} />
          <SuperFundNoPaySuperContactDetails listeners={listeners} />

          <Field
            label="Sign up for Pay super"
            hideLabel
            renderField={
              () => (
                <LinkButton
                  href={signUpForPaySuperUrl}
                  align="center"
                  icon={<Icons.OpenExternalLink />}
                  iconRight
                  isOpenInNewTab
                >
                  Sign up for Pay super
                </LinkButton>
              )
            }
          />

        </FormCard>
      </FormTemplate>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  pageTitle: getSuperFundPageTitle(state),
  signUpForPaySuperUrl: getSignUpForPaySuperUrl(state),
});

export default connect(mapStateToProps)(SuperFundNoPaySuperView);
