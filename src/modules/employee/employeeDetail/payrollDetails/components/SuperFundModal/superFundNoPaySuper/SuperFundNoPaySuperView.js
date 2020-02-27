import {
  Field, Icons, RadioButton, RadioButtonGroup, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import { selfManagedSuperFund, standardSuperFund } from '../FundTypes';
import LinkButton from '../../../../../../../components/Button/LinkButton';
import SuperFundContactDetails from '../SuperFundContactDetails';
import SuperFundDetailSection from './SuperFundDetailSection';

const SuperFundNoPaySuperView = ({
  superFundModalListeners,
  signUpForPaySuperUrl,
}) => {
  const view = (
    <>
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
      <SuperFundDetailSection superFundModalListeners={superFundModalListeners} />
      <SuperFundContactDetails superFundModalListeners={superFundModalListeners} />
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
    </>
  );

  return view;
};

export default SuperFundNoPaySuperView;
