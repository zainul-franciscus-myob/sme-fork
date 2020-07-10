import React from 'react';
import classNames from 'classnames';

import Combobox from './Combobox';
import styles from './JobCombobox.module.css';

const JobCombobox = (props) => {
  const { items = [], left, addNewJob, ...otherProps } = props;

  const metaData = [
    { columnName: 'jobNumber', columnWidth: '13rem', showData: true },
    { columnName: 'jobName', columnWidth: '15rem' },
  ];

  const formattedItems =
    items &&
    items.map(({ displayName, ...rest }) => ({
      ...rest,
      displayName: ` ${displayName}`,
    }));

  return (
    <div
      className={classNames({
        [styles.left]: left,
        [otherProps.className]: otherProps.className,
      })}
    >
      <Combobox
        metaData={metaData}
        items={formattedItems}
        addNewItem={addNewJob && { onAddNew: addNewJob, label: 'Create job' }}
        noMatchFoundMessage="No job found"
        {...otherProps}
      />
    </div>
  );
};

export default JobCombobox;
