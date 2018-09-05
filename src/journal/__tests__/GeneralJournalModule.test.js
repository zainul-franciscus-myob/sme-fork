import ReactDOM from 'react-dom';

import GeneralJournalModule from '../GeneralJournalModule';

describe('GeneralJournalModule', () => {
  it('should render into the supplied DOM element', () => {
    const rootElement = document.createElement('div');
    const setRootView = (component) => {
      ReactDOM.render(component, rootElement);
    };

    const integration = { read: ({ onSuccess }) => onSuccess({ filterOptions: { dateFrom: '', dateTo: '' }, entries: [] }) };
    const module = new GeneralJournalModule(integration, setRootView);
    module.run();

    expect(rootElement.innerHTML).not.toBe('');
  });
});
