import {
  Card,
  PageHead,
} from '@myob/myob-widgets';
import React from 'react';

import StickyHeader from '../StickyHeader/StickyHeader';

const STICKY_NONE = 'none';
const STICKY_ALL = 'all';

const renderSwitch = (param, pageHead, alert) => {
  switch (param) {
    case STICKY_NONE:
      return (
        <div className="flx-template__header">
          {alert}
          {pageHead}
        </div>
      );
    case STICKY_ALL:
    default:
      return (
        <StickyHeader>
          {alert}
          {pageHead}
        </StickyHeader>
      );
  }
};

/**
 * LineItemTemplate
 *
 * @visibleName
 */
const LineItemTemplate = ({
  pageHead,
  children,
  fluid,
  cozy,
  wcagAA,
  actions,
  options,
  alert,
  sticky,
}) => {
  const hasFluid = fluid ? 'flx-container--fluid' : '';
  const hasCozy = cozy ? 'flx-container--cozy' : '';
  const hasWcagAA = wcagAA ? 'flx-container--aa' : '';
  const safePageHead = typeof pageHead === 'string' ? <PageHead title={pageHead} /> : pageHead;
  const safeAlert = alert && (
    <div className="flx-template__alert flx-template-line-item__alert">
      {alert}
    </div>
  );

  return (
    <div className={`flx-container ${hasFluid} ${hasCozy} ${hasWcagAA}`}>
      <div className="flx-template flx-template-line-item">
        {renderSwitch(sticky, safePageHead, safeAlert)}
        <div className="flx-template__body">
          <Card>
            <div className="flx-template-line-item__options">{options}</div>
            <hr />
            {children}
          </Card>
        </div>
        {actions && <div className="flx-template__footer">{actions}</div>}
      </div>
    </div>
  );
};

export default LineItemTemplate;
