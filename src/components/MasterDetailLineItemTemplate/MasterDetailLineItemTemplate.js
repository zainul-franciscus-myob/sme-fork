import {
  Alert,
  Card,
  DetailHeader,
  MasterDetailTemplate,
  Separator,
} from '@myob/myob-widgets';
import React from 'react';
import classnames from 'classnames';

import styles from './MasterDetailLineItemTemplate.module.css';

const MasterDetailLineItemTemplate = ({
  optionInfo,
  primaryOptions,
  secondaryOptions,
  subHeadChildren,
  table,
  actions,
  detail,
  pageHead,
  sticky,
  showDetail,
  more,
  detailHeaderClassName,
  onDismissOptionInfo,
}) => {
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
  return (
    <MasterDetailTemplate
      master={(
        <React.Fragment>
          {subHeadChildren}
          <Card classes={styles.card}>
            { optionInfo && (
              <Alert type="info" onDismiss={onDismissOptionInfo}>
                {optionInfo}
              </Alert>
            )}
            {options}
            <Separator />
            {table}
          </Card>
          {actions}
          {more}
        </React.Fragment>
      )}
      detail={detail}
      pageHead={pageHead}
      sticky={sticky}
      showDetail={showDetail}
      detailWidth="55%"
      containerClassName={classnames(
        styles.container,
        { [styles.showDetail]: showDetail },
      )}
      sectionClassName={styles.section}
    />
  );
};

export default MasterDetailLineItemTemplate;
