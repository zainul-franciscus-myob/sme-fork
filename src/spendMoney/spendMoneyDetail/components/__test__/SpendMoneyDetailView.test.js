import React from 'react';
import ReactDOM from 'react-dom';

import SpendMoneyDetailView from '../SpendMoneyDetailView';

describe('SpendMoneyView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SpendMoneyDetailView
      headerOptions={{}}
      onUpdateHeaderOptions={() => {}}
      onSaveButtonClick={() => {}}
      onCancelButtonClick={() => {}}
      modal={() => {}}
      alertComponent={() => {}}
      isCreating
      lines={[]}
      newLineData={{}}
      onUpdateRow={() => {}}
      onAddRow={() => {}}
      onRemoveRow={() => {}}
      onRowInputBlur={() => {}}
      indexOfLastLine={-1}
      amountTotals={{}}
    />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
