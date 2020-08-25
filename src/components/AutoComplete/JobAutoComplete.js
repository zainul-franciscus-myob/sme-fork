import React from 'react';
import classNames from 'classnames';

import AutoCompleteCombobox from './AutoCompleteCombobox';
import styles from './JobAutoComplete.module.css';

const JobAutoComplete = ({ items = [], left, addNewJob, ...otherProps }) => {
  const metaData = [
    {
      columnName: 'jobNumber',
      columnWidth: '13rem',
      showData: true,
      showPagination: true,
    },
    { columnName: 'jobName', columnWidth: '15rem' },
  ];

  const addNewItem = addNewJob
    ? {
        label: 'Create job',
        onAddNew: addNewJob,
      }
    : undefined;

  const formattedItems =
    items &&
    items.map(({ jobName, ...rest }) => ({
      ...rest,
      jobName: ` ${jobName}`,
    }));

  return (
    <div
      className={classNames({
        [styles.left]: left,
        [otherProps.className]: otherProps.className,
      })}
    >
      <AutoCompleteCombobox
        metaData={metaData}
        items={formattedItems}
        addNewItem={addNewItem}
        {...otherProps}
      />
    </div>
  );
};

JobAutoComplete.defaultProps = {
  hintText: 'Search for job...',
  noMatchFoundMessage: 'No job found',
};

export default JobAutoComplete;
