import React from 'react';
import ReactDOM from 'react-dom';

import GeneralJournalView from '../GeneralJournalView';

describe('GeneralJournalView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GeneralJournalView
      renderRows={() => {}}
      filterOptions={{}}
    />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
