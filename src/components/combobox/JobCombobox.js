import React from 'react';
import classNames from 'classnames';

import Combobox from './Combobox';
import styles from './JobCombobox.module.css';

const JobCombobox = (props) => {
  const {
    items = [],
    left,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'jobNumber', columnWidth: '13rem', showData: true },
    { columnName: 'jobName', columnWidth: '15rem' },
  ];

  const formattedItems = items
    && items.map(({ displayName, ...rest }) => ({
      ...rest,
      displayName: ` ${displayName}`,
    }));

  return (
    <div className={classNames({
      [styles.left]: left,
    })}
    >
      <Combobox
        metaData={metaData}
        items={formattedItems}
        noMatchFoundMessage="No job found"
        {...otherProps}
      />
    </div>
  );
};

export default JobCombobox;