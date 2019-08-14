import {
  FieldGroup,
  Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSelfManagedFund } from '../../../selectors/SuperFundModalSelectors';
import PaySuperSection from './PaySuperSection';
import SuperFundAPRADetail from './SuperFundAPRADetail';
import SuperFundBasic from './SuperFundBasic';
import SuperFundContactDetails from '../SuperFundContactDetails';
import SuperFundSelfManagedDetail from './SuperFundSelfManagedDetail';

const SuperFundWithPaySuperView = ({
  isSelfManagedFund,
  superFundModalListeners,
}) => {
  const FundDetail = isSelfManagedFund ? SuperFundSelfManagedDetail : SuperFundAPRADetail;

  const view = (
    <FieldGroup label="Self managed" hideLabel>
      <SuperFundBasic superFundModalListeners={superFundModalListeners} />
      <Separator />
      <FundDetail superFundModalListeners={superFundModalListeners} />
      <SuperFundContactDetails superFundModalListeners={superFundModalListeners} />
      <Separator />
      <PaySuperSection superFundModalListeners={superFundModalListeners} />
    </FieldGroup>
  );

  return view;
};

const mapStateToProps = state => ({
  isSelfManagedFund: getIsSelfManagedFund(state),
});

export default connect(mapStateToProps)(SuperFundWithPaySuperView);
