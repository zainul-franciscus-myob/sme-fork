import React from 'react';
import ReactDOM from 'react-dom';

import BusinessListView from '../BusinessListView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusinessListView businesses={[]} onBusinessSelect={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
