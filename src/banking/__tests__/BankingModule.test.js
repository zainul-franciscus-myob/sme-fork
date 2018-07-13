import BankingModule from '../BankingModule';

describe('BankingModule', () => {
  it('should render into the supplied DOM element', () => {
    const integration = { read: () => ({ transactions: [] }) };
    const rootElement = document.createElement('div');
    const module = new BankingModule(integration, rootElement);

    module.run();

    expect(rootElement.innerHTML).not.toBe('');
  });
});