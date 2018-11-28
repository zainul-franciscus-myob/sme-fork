import { LineItemTemplate } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import SpendMoneyActions from './SpendMoneyActions';
import SpendMoneyOptions from './SpendMoneyOptions';
import SpendMoneyTable from './SpendMoneyTable';

const SpendMoneyView = ({
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
}) => {
  const templateOptions = (
    <SpendMoneyOptions
      headerOptions={headerOptions}
      onUpdateHeaderOptions={onUpdateHeaderOptions}
    />
  );

  const actions = (
    <SpendMoneyActions
      isCreating={isCreating}
      onSave={onSaveButtonClick}
      onCancel={onCancelButtonClick}
      onDelete={onDeleteButtonClick}
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
        <SpendMoneyTable
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

SpendMoneyView.propTypes = {
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
};

SpendMoneyView.defaultProps = {
  modal: null,
  alertComponent: null,
};

export default SpendMoneyView;
