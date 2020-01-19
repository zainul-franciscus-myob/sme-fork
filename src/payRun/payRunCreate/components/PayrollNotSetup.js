import { Icons, PageState, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import Icon from '../../../components/Icon/Icon';
import LinkButton from '../../../components/Button/LinkButton';
import styles from '../../../modules/dashboard/components/ErrorCard.module.css';

const PayrollNotSetup = ({ payrollSettingsLink }) => {
  const actions = (
    <LinkButton href={payrollSettingsLink} icon={<Icons.Settings />}>
      Set up payroll year
    </LinkButton>
  );

  return (
    <StandardTemplate testid="payrollNotSetup">
      <PageState
        description="Before you create a pay run, you'll need to enter a payroll year."
        image={<Icon.NoResultFolder className={styles.errorImage} />}
        actions={actions}
      />
    </StandardTemplate>
  );
};

export default PayrollNotSetup;
