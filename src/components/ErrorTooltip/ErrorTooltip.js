import { Icons, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import style from './ErrorTooltip.module.css';

const ErrorTooltip = ({ errorMessage }) => (
  <Tooltip
    className={errorMessage ? style.displayError : style.hideError}
    triggerContent={<Icons.Error />}
  >
    {errorMessage}
  </Tooltip>
);

export default ErrorTooltip;
