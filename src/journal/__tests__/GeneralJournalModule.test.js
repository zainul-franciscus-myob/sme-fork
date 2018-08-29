import GeneralJournalModule from '../GeneralJournalModule';

describe('GeneralJournalModule', () => {
  it('should render into the supplied DOM element', () => {
    const integration = { read: () => ({ entries: [] }) };
    const rootElement = document.createElement('div');
    const module = new GeneralJournalModule(integration, rootElement);

    module.run();

    expect(rootElement.innerHTML).not.toBe('');
  });
});
