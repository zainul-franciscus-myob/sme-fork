import { LineItemTemplate } from '@myob/myob-widgets';
import React from 'react';

import GeneralJournalDetailActions from './GeneralJournalDetailActions';
import GeneralJournalDetailOptions from './GeneralJournalDetailOptions';
import GeneralJournalDetailTable from './GeneralJournalDetailTable';

const GeneralJournalDetailView = () => {
  const options = <GeneralJournalDetailOptions />;
  const actions = <GeneralJournalDetailActions />;

  return (
    <LineItemTemplate
      pageHead="General Journal Entry"
      options={options}
      actions={actions}
    >
      <GeneralJournalDetailTable />
    </LineItemTemplate>
  );
};

export default GeneralJournalDetailView;
