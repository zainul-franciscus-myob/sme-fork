import React from 'react';

export default class App {
  constructor(setRootView) {
    this.setRootView = setRootView;
  }

  run = () => {
    this.setRootView(
      <div>
        <h2>MYOB SLW</h2>
        <ul>
          <li><a href="#/banking"> Banking Screen </a></li>
          <li><a href="#/journal"> General Journal Screen </a></li>
          <li><a href="#/pets"> Pets Screen </a></li>
        </ul>
      </div>,
    );
  }
}
