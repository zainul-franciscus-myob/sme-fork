import { Alert, Card, DetailHeader, Separator } from '@myob/myob-widgets';
import React, { useState } from 'react';
import classnames from 'classnames';

import MasterDetailTemplate from '../Feelix/MasterDetailTemplate/MasterDetailTemplate';
import styles from './MasterDetailLineItemTemplate.module.css';

const MasterDetailLineItemTemplate = ({
  optionInfo,
  primaryOptions,
  secondaryOptions,
  subHeadChildren,
  tableLayoutOption,
  table,
  actions,
  detail,
  pageHead,
  sticky,
  showDetail,
  more,
  detailHeaderClassName,
  onDismissOptionInfo,
  templateClassName,
}) => {
  /*
   * Walkaround for chrome backward typing issue
   * - Story: https://dev-arl.visualstudio.com/ARL%20Protected%20API/_workitems/edit/5352
   * - Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=932002
   *
   * Prevent mouse event to be captured by `embed` element before mouse up
   */
  const [isMouseDown, setIsMouseDown] = useState(false);

  const onMouseUp = () => {
    setIsMouseDown(false);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onMouseDown = () => {
    setIsMouseDown(true);
    document.addEventListener('mouseup', onMouseUp);
  };

  const options = showDetail ? (
    <React.Fragment>
      {primaryOptions}
      {secondaryOptions}
    </React.Fragment>
  ) : (
    <DetailHeader
      className={detailHeaderClassName}
      primary={primaryOptions}
      secondary={secondaryOptions}
    />
  );

  const separator = tableLayoutOption ? (
    <div className={styles.separator}>
      <Separator />
      {tableLayoutOption}
    </div>
  ) : (
    <Separator />
  );

  return (
    <MasterDetailTemplate
      master={
        <div role="presentation" onMouseDown={onMouseDown}>
          {subHeadChildren}
          <Card classes={styles.card}>
            <div className={styles.options}>
              {optionInfo && (
                <Alert type="info" onDismiss={onDismissOptionInfo}>
                  {optionInfo}
                </Alert>
              )}
              {options}
              {separator}
            </div>
            {table}
          </Card>
          {actions}
          {more}
        </div>
      }
      detail={detail}
      pageHead={pageHead}
      sticky={sticky}
      showDetail={showDetail}
      detailWidth="55%"
      containerClassName={classnames(styles.container, {
        [styles.showDetail]: showDetail,
        [styles.noPointerEvents]: isMouseDown,
      })}
      sectionClassName={styles.section}
      templateClassName={templateClassName}
    />
  );
};

export default MasterDetailLineItemTemplate;
