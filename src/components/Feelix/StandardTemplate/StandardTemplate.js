import {
  Card,
  PageHead,
} from '@myob/myob-widgets';
import React from 'react';
import classnames from 'classnames';

import StickyHeader from '../StickyHeader/StickyHeader';

const STICKY_NONE = 'none';
const STICKY_ALL = 'all';

const renderSwitch = (
  param,
  alert,
  pageHead,
  subHeadChildren,
  filterBar,
  tableHeader,
) => {
  switch (param) {
    case STICKY_NONE:
      return (
        <div className="flx-template__header">
          {alert}
          {pageHead}
          {subHeadChildren}
          {filterBar}
        </div>
      );
    case STICKY_ALL:
    default:
      return (
        <StickyHeader>
          {alert}
          {pageHead}
          {subHeadChildren}
          {filterBar}
          {tableHeader}
        </StickyHeader>
      );
  }
};

const StandardTemplate = ({
  pageHead,
  filterBar,
  tableHeader,
  bulkActions,
  children,
  fluid,
  subHeadChildren,
  cozy,
  wcagAA,
  alert,
  sticky,
}) => {
  const hasFluid = fluid ? 'flx-container--fluid' : '';
  const hasCozy = cozy ? 'flx-container--cozy' : '';
  const hasWcagAA = wcagAA ? 'flx-container--aa' : '';

  const safeAlert = alert && (
    <div className="flx-template__alert flx-template-standard__alert">
      {alert}
    </div>
  );
  const safePageHead = typeof pageHead === 'string' ? <PageHead title={pageHead} /> : pageHead;
  const safeSubHead = subHeadChildren && (
    <div className="flx-template__sub-head">{subHeadChildren}</div>
  );
  const safeFilterBar = filterBar && <Card>{filterBar}</Card>;
  const safeBulkActions = bulkActions && (
    <div className="flx-template__bulk-actions">{bulkActions}</div>
  );
  const safeTableHeader = tableHeader && (
    <div className="flx-template__table-header">{tableHeader}</div>
  );
  const stickyTableHeader = (safeTableHeader || safeBulkActions) && (
    <Card
      classes={[
        classnames({
          'flx-card__table--sticky': safeTableHeader,
          'flx-card__bulk-actions--sticky': safeBulkActions,
        }),
      ]}
    >
      {safeBulkActions}
      {safeTableHeader}
    </Card>
  );

  return (
    <div className={`flx-container ${hasFluid} ${hasCozy} ${hasWcagAA}`}>
      <div className="flx-template flx-template-standard">
        {renderSwitch(
          sticky,
          safeAlert,
          safePageHead,
          safeSubHead,
          safeFilterBar,
          stickyTableHeader,
        )}
        <div className="flx-template__body">
          <Card
            classes={
              sticky === STICKY_ALL ? ['flx-card__table-body--sticky'] : []
            }
          >
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StandardTemplate;
