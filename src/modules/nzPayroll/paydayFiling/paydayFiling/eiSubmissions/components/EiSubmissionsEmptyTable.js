import { PageState } from '@myob/myob-widgets';
import React from 'react';

import noResultsImage from './images/no-results-found.svg';

const EiSubmissionsEmptyTable = () => (
  <PageState
    title="No pay run information found for the selected payroll year"
    description="Perhaps check the dates or check for updates in a few minutes"
    image={<img src={noResultsImage} alt={'No results found'} />}
  />
);

export default EiSubmissionsEmptyTable;
