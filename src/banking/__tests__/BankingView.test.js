import React from 'react';
import ReactDOM from 'react-dom';

import BankingView from '../BankingView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BankingView renderRows={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
