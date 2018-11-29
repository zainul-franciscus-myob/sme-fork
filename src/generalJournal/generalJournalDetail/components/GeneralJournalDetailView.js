import { LineItemTemplate } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import GeneralJournalDetailActions from './GeneralJournalDetailActions';
import GeneralJournalDetailOptions from './GeneralJournalDetailOptions';
import GeneralJournalDetailTable from './GeneralJournalDetailTable';

const GeneralJournalDetailView = ({
  headerOptions,
  isActionsDisabled,
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  modal,
  alertComponent,
  isCreating,
  lines,
  newLineData,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
  indexOfLastLine,
  amountTotals,
}) => {
  const templateOptions = (
    <GeneralJournalDetailOptions
      headerOptions={headerOptions}
      onUpdateHeaderOptions={onUpdateHeaderOptions}
    />
  );

  const actions = (
    <GeneralJournalDetailActions
      isCreating={isCreating}
      onSave={onSaveButtonClick}
      onCancel={onCancelButtonClick}
      onDelete={onDeleteButtonClick}
      isActionsDisabled={isActionsDisabled}
    />
  );

  return (
    <React.Fragment>
      {alertComponent}
      <LineItemTemplate
        pageHead="General Journal Entry"
        options={templateOptions}
        actions={actions}
      >
        { modal }
        <GeneralJournalDetailTable
          lines={lines}
          indexOfLastLine={indexOfLastLine}
          newLineData={newLineData}
          amountTotals={amountTotals}
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onRowInputBlur={onRowInputBlur}
        />

      </LineItemTemplate>
    </React.Fragment>
  );
};

GeneralJournalDetailView.propTypes = {
  headerOptions: PropTypes.shape({}).isRequired,
  isCreating: PropTypes.bool.isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  modal: PropTypes.element,
  alertComponent: PropTypes.element,
  lines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
  indexOfLastLine: PropTypes.number.isRequired,
  amountTotals: PropTypes.shape({}).isRequired,
  newLineData: PropTypes.shape({}).isRequired,
  isActionsDisabled: PropTypes.bool,
};

GeneralJournalDetailView.defaultProps = {
  modal: null,
  alertComponent: null,
  isActionsDisabled: false,
};

export default GeneralJournalDetailView;
