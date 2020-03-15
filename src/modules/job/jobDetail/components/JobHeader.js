import {
  Label, TotalsHeader,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

const JobHeader = (props) => {
  const {
    isCreating,
    title,
    status,
  } = props;

  if (isCreating) {
    return (
      <TotalsHeader
        title="Create job"
      />
    );
  }

  return (
    <TotalsHeader
      title={title}
      tag={(
        <Label type="boxed" color="light-grey">
          {status}
        </Label>
      )}
    />
  );
};

export default connect()(JobHeader);
