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
    const context = {
      businessId: '1234',
    };
    module.run(context);

    expect(rootElement.innerHTML).not.toBe('');
  });
});
