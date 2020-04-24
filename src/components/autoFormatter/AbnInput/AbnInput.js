import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import AbnPopover from './AbnPopover';
import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const AbnInput = ({
  validationResult,
  isLoading,
  ...otherProps
}) => {
  const spinner = <Spinner size="small" />;
  const accessory = validationResult && <AbnPopover {...validationResult} />;

  return (
    <AutoFormatter
      {...otherProps}
      options={{
        numericOnly: true,
        blocks: [2, 3, 3, 3],
        delimiters: [' '],
      }}
      inputAccessory={isLoading ? spinner : accessory}
    />
  );
};
export default AbnInput;
