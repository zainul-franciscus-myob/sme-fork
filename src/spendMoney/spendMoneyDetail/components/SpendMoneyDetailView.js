import { LineItemTemplate } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import SpendMoneyDetailActions from './SpendMoneyDetailActions';
import SpendMoneyDetailOptions from './SpendMoneyDetailOptions';
import SpendMoneyDetailTable from './SpendMoneyDetailTable';

const SpendMoneyDetailView = ({
  headerOptions,
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
  isActionsDisabled,
}) => {
  const templateOptions = (
    <SpendMoneyDetailOptions
      headerOptions={headerOptions}
      onUpdateHeaderOptions={onUpdateHeaderOptions}
    />
  );

  const actions = (
    <SpendMoneyDetailActions
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      isActionsDisabled={isActionsDisabled}
    />
  );

  return (
    <React.Fragment>
      {alertComponent}
      <LineItemTemplate
        pageHead="Spend Money Entry"
        options={templateOptions}
        actions={actions}
      >
        { modal }
        <SpendMoneyDetailTable
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

SpendMoneyDetailView.propTypes = {
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
  isActionsDisabled: PropTypes.bool.isRequired,
};

SpendMoneyDetailView.defaultProps = {
  modal: null,
  alertComponent: null,
};

export default SpendMoneyDetailView;
