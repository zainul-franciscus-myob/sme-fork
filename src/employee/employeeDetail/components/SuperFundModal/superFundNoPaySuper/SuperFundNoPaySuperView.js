import React from 'react';

import SuperFundContactDetails from '../SuperFundContactDetails';
import SuperFundDetailSection from './SuperFundDetailSection';

const SuperFundNoPaySuperView = ({
  superFundModalListeners,
}) => {
  const view = (
    <>
      <SuperFundDetailSection superFundModalListeners={superFundModalListeners} />
      <SuperFundContactDetails superFundModalListeners={superFundModalListeners} />
    </>
  );

  return view;
};

export default SuperFundNoPaySuperView;
