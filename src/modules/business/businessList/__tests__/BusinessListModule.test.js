import ReactDOM from 'react-dom';

import BusinessListModule from '../BusinessListModule';

describe('BusinessListModule', () => {
  it('should render into the supplied DOM element', () => {
    const integration = { read: ({ onSuccess }) => onSuccess([]) };
    const rootElement = document.createElement('div');
    const setRootView = (component) => {
      ReactDOM.render(component, rootElement);
    };
    const module = new BusinessListModule({ integration, setRootView });

    module.run();

    expect(rootElement.innerHTML).not.toBe('');
  });
});
