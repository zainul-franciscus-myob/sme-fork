import React from 'react';
import ReactDOM from 'react-dom';

import SpendMoneyView from '../SpendMoneyView';

describe('SpendMoneyView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SpendMoneyView
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
