import React from 'react';

import Combobox from './Combobox';

const JobCombobox = (props) => {
  const { items = [], addNewJob, ...otherProps } = props;

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
    <Combobox
      metaData={metaData}
      items={formattedItems}
      addNewItem={addNewJob && { onAddNew: addNewJob, label: 'Create job' }}
      noMatchFoundMessage="No job found"
      {...otherProps}
    />
  );
};

export default JobCombobox;
