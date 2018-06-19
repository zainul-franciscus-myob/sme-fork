import React from 'react';
import ReactDOM from 'react-dom';
import Toy from '../Toy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Toy />, div);
  ReactDOM.unmountComponentAtNode(div);
});
