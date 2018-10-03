import { LineItemTemplate } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import GeneralJournalDetailActions from './GeneralJournalDetailActions';
import GeneralJournalDetailOptions from './GeneralJournalDetailOptions';
import GeneralJournalDetailTable from './GeneralJournalDetailTable';

const GeneralJournalDetailView = ({ isCreating, headerOptions, onUpdateHeaderOptions }) => {
  const templateOptions = (
    <GeneralJournalDetailOptions
      headerOptions={headerOptions}
      onUpdateHeaderOptions={onUpdateHeaderOptions}
    />
  );
  const actions = <GeneralJournalDetailActions isCreating={isCreating} />;

  return (
    <LineItemTemplate
      pageHead="General Journal Entry"
      options={templateOptions}
      actions={actions}
    >
      <GeneralJournalDetailTable />
    </LineItemTemplate>
  );
};

GeneralJournalDetailView.propTypes = {
  headerOptions: PropTypes.shape({}).isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
};

export default GeneralJournalDetailView;
