import React from 'react';
import ReactDOM from 'react-dom';
import GeneralJournalView from '../GeneralJournalView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GeneralJournalView renderRows={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
