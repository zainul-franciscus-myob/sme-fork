import React from 'react';
import ReactDOM from 'react-dom';
import Pet from '../Pet';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const pets = [];
  const species = [];
  ReactDOM.render(<Pet pets={pets} species={species} onAllocate={() => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
