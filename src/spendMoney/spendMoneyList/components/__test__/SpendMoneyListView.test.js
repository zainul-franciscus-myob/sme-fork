import React from 'react';
import ReactDOM from 'react-dom';

import SpendMoneyListView from '../SpendMoneyListView';

describe('SpendMoneyListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SpendMoneyListView
      renderRows={() => {}}
      onApplyFilter={() => {}}
      onUpdateFilters={() => {}}
      filterOptions={{}}
      onSort={() => {}}
    />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
