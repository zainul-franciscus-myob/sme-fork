import { Icons, PageState, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import LinkButton from '../Button/LinkButton';
import noAccessImage from './no-access.svg';

const PayrollNotSetup = ({
  payrollSettingsLink,
  description,
}) => {
  const actions = (
    <LinkButton href={payrollSettingsLink} icon={<Icons.Settings />}>
      Go to Payroll settings to set up your payroll year
    </LinkButton>
  );

  return (
    <StandardTemplate testid="payrollNotSetup">
      <PageState
        description={description}
        image={<img src={noAccessImage} alt="no access" />}
        actions={actions}
      />
    </StandardTemplate>
  );
};

export default PayrollNotSetup;
