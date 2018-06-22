import React from 'react';
import ReactDOM from 'react-dom';
import Toy from '../Toy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const pets = [];
  const species = [];
  ReactDOM.render(<Toy pets={pets} species={species} onAllocate={() => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
