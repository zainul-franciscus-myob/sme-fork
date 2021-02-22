import { Icons, PageState, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import LinkButton from '../Button/LinkButton';
import noAccessImage from './no-access.svg';

const PayrollNotSetup = ({ payrollSettingsLink, description }) => {
  const actions = (
    <LinkButton href={payrollSettingsLink} icon={<Icons.Settings />}>
      Complete and save payroll settings
    </LinkButton>
  );

  return (
    <StandardTemplate testid="payrollNotSetup">
      <PageState
        title={description}
        image={<img src={noAccessImage} alt="no access" />}
        actions={actions}
      />
    </StandardTemplate>
  );
};

export default PayrollNotSetup;
