import { FormHorizontal, ReadOnly } from '@myob/myob-widgets';
import React from 'react';

const EiSubmissionsDetailedInformation = ({ username, submissionKey }) => (
  <div>
    <h3>Submission Information</h3>
    <FormHorizontal testid="submissionInfoForm">
      <ReadOnly label="Submitted by" name="username">
        {username}
      </ReadOnly>
      <ReadOnly label="Receipt number" name="submissionKey">
        {submissionKey}
      </ReadOnly>
    </FormHorizontal>
    <hr />
  </div>
);

export default EiSubmissionsDetailedInformation;
