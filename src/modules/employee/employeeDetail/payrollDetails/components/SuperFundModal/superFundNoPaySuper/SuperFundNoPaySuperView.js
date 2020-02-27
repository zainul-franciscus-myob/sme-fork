import { Field, Icons } from '@myob/myob-widgets';
import React from 'react';

import LinkButton from '../../../../../../../components/Button/LinkButton';
import SuperFundContactDetails from '../SuperFundContactDetails';
import SuperFundDetailSection from './SuperFundDetailSection';

const SuperFundNoPaySuperView = ({
  superFundModalListeners,
  signUpForPaySuperUrl,
}) => {
  const view = (
    <>
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
