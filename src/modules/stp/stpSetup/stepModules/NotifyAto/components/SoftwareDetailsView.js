import { Columns, Icons } from '@myob/myob-widgets';
import React from 'react';

import SoftwareDetailView from './SoftwareDetailView';

const SoftwareDetailsView = ({ softwareId }) => (
  <Columns type="three">
    <SoftwareDetailView
      DetailIcon={Icons.GenericDocument}
      heading="Software ID"
      detail={softwareId}
    />
    <SoftwareDetailView
      DetailIcon={Icons.PcComputer}
      heading="Service provider name"
      detail="MYOB AUSTRALIA PTY LTD"
    />
    <SoftwareDetailView
      DetailIcon={Icons.Business}
      heading="ABN"
      detail="13 086 760 198"
    />
  </Columns>
);

export default SoftwareDetailsView;
