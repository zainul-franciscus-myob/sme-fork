import ReactDOM from 'react-dom';

import GeneralJournalDetailModule from '../GeneralJournalDetailModule';

describe('GeneralJournalDetailModule', () => {
  it('should render into the supplied DOM element', () => {
    const rootElement = document.createElement('div');
    const setRootView = (component) => {
      ReactDOM.render(component, rootElement);
    };

    const integration = { read: ({ onSuccess }) => onSuccess({ }) };
    const module = new GeneralJournalDetailModule(integration, setRootView);
    const context = {
      businessId: '1234',
    };
    module.run(context);

    expect(rootElement.innerHTML).not.toBe('');
  });
});
