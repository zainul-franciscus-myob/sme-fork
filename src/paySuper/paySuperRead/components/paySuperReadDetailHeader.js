import {
  DetailHeader,
  ReadOnly,
} from '@myob/myob-widgets';
import React from 'react';


const paySuperReadDetailHeader = ({
  account,
  description,
  referenceNumber,
  date,
}) => {
  const primary = (
    <div>
      <ReadOnly
        label="Pay from"
        name="account"
      >
        {account}
      </ReadOnly>
      <ReadOnly
        label="Description"
        name="description"
      >
        {description}
      </ReadOnly>
    </div>
  );

  const secondary = (
    <div>
      <ReadOnly
        name="referenceNumber"
        label="Reference number"
      >
        {referenceNumber}
      </ReadOnly>
      <ReadOnly
        name="date"
        label="Date"
      >
        {date}
      </ReadOnly>
    </div>
  );

  return (<DetailHeader primary={primary} secondary={secondary} />);
};

export default paySuperReadDetailHeader;
