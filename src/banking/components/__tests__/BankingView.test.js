import React from 'react';
import ReactDOM from 'react-dom';

import BankingTransactionsView from '../BankingTransactionsView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BankingTransactionsView renderRows={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
