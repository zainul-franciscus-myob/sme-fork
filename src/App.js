import { Button } from '@myob/myob-widgets';
import React from 'react';

import { isLoggedIn, login, logout } from './auth';

export default class App {
  constructor(setRootView) {
    this.setRootView = setRootView;
  }

  render = () => {
    this.setRootView(
      <div>
        <h2>MYOB SLW</h2>
        <ul>
          <li><a href="#/business"> Business List Screen </a></li>
        </ul>
        {
          isLoggedIn()
            ? <Button onClick={logout}>Logout</Button>
            : <Button onClick={login}>Login</Button>
        }
      </div>,
    );
  }

  run = () => {
    this.render();
  }
}
