import { InfoIcon, Tooltip } from '@myob/myob-widgets';
import React from 'react';

const LineItemTableHeader = (props) => {
  const {
    label,
    required,
    toolTipContent,
    toolTipIcon,
    toolTipMouseEnter,
  } = props;

  return (
    <div className="line-item__data" data-label={label}>
      <div className="line-item__label">
        {label}
        {required && <Tooltip triggerContent=" * ">{required}</Tooltip>}
        {toolTipContent && (
          <span onMouseEnter={toolTipMouseEnter}>
            <Tooltip triggerContent={toolTipIcon || <InfoIcon />}>
              {toolTipContent}
            </Tooltip>
          </span>
        )}
      </div>
    </div>
  );
};

export default LineItemTableHeader;
