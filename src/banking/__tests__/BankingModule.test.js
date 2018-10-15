import ReactDOM from 'react-dom';

import BankingModule from '../BankingModule';

describe('BankingModule', () => {
  it('should render into the supplied DOM element', () => {
    const rootElement = document.createElement('div');
    const setRootView = (component) => {
      ReactDOM.render(component, rootElement);
    };

    const integration = { read: ({ onSuccess }) => onSuccess({ transactions: [], accounts: [] }) };
    const module = new BankingModule({ integration, setRootView });
    module.run();

    expect(rootElement.innerHTML).not.toBe('');
  });
});
