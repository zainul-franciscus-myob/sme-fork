import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const UpperCaseInputFormatter = props => (
  <AutoFormatter
    {...props}
    options={{
      uppercase: true,
      delimiter: '',
    }}
  />
);
export default UpperCaseInputFormatter;
