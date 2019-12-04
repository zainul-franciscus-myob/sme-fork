import {
  Card,
  DetailHeader,
  MasterDetailTemplate,
  Separator,
} from '@myob/myob-widgets';
import React from 'react';
import classnames from 'classnames';

import styles from './MasterDetailLineItemTemplate.module.css';

const MasterDetailLineItemTemplate = ({
  primaryOptions,
  secondaryOptions,
  subHeadChildren,
  table,
  actions,
  detail,
  pageHead,
  sticky,
  showDetail,
}) => {
  const options = showDetail ? (
    <React.Fragment>
      {primaryOptions}
      {secondaryOptions}
    </React.Fragment>
  ) : (
    <DetailHeader primary={primaryOptions} secondary={secondaryOptions} />
  );
  return (
    <MasterDetailTemplate
      master={(
        <React.Fragment>
          {subHeadChildren}
          <Card classes={styles.card}>
            {options}
            <Separator />
            {table}
          </Card>
          {actions}
        </React.Fragment>
      )}
      detail={detail}
      pageHead={pageHead}
      sticky={sticky}
      showDetail={showDetail}
      detailWidth="45%"
      containerClassName={classnames(styles.container, { [styles.showDetail]: showDetail })}
      sectionClassName={styles.section}
    />
  );
};

export default MasterDetailLineItemTemplate;
