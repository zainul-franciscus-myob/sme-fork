import { LineItemTemplate } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import GeneralJournalDetailActions from './GeneralJournalDetailActions';
import GeneralJournalDetailOptions from './GeneralJournalDetailOptions';
import GeneralJournalDetailTable from './GeneralJournalDetailTable';

const GeneralJournalDetailView = ({
  headerOptions,
  lines,
  isCreating,
  accounts,
  onUpdateHeaderOptions,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  indexOfLastLine,
}) => {
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
      <GeneralJournalDetailTable
        lines={lines}
        indexOfLastLine={indexOfLastLine}
        accounts={accounts}
        onUpdateRow={onUpdateRow}
        onAddRow={onAddRow}
        onRemoveRow={onRemoveRow}
      />
    </LineItemTemplate>
  );
};

GeneralJournalDetailView.propTypes = {
  headerOptions: PropTypes.shape({}).isRequired,
  lines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  indexOfLastLine: PropTypes.number.isRequired,
};

export default GeneralJournalDetailView;
