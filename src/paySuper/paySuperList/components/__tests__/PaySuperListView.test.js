import {
  Alert, Button, PageHead, Table,
} from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import React from 'react';
import TestRenderer from 'react-test-renderer';

import { getDefaultState } from '../../paySuperListReducer';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import PaySuperListView from '../PaySuperListView';
import Store from '../../../../store/Store';
import UnregisteredPageState from '../UnregisteredPageState';

const DEFAULT_STATE = {
  ...getDefaultState(),
  isLoading: false,
  isRegistered: true,
  superPayments: [],
};

describe('PaySuperListView', () => {
  const constructPaySuperListView = (state = {}) => {
    const store = new Store(() => ({ ...DEFAULT_STATE, ...state }));
    const wrappedComponent = (
      <Provider store={store}>
        <PaySuperListView sticky="none" />
      </Provider>
    );

    const rendered = TestRenderer.create(wrappedComponent);

    return rendered.root;
  };

  describe('table', () => {
    it('renders table rows when pay super registered and super payments found', () => {
      const superPayments = [
        {
          amount: '88,888.88',
          batchPaymentId: '13866',
          dateOccurred: '24/02/2017',
          employeeCount: 3,
          displayId: 'PS000001',
          description: 'Superannuation Payment',
          status: 'FundsUnavailable',
        },
      ];

      const testInstance = constructPaySuperListView({ superPayments });

      const tableRows = testInstance.findAllByType(Table.Row);

      expect(tableRows.length).toEqual(superPayments.length);
    });

    it('renders empty state when pay super registered and no super payments found', () => {
      const testInstance = constructPaySuperListView({
        superPayments: [],
      });

      const emptyState = testInstance.findByType(NoResultPageState);

      expect(emptyState).toBeDefined();
    });
  });

  describe('action buttons', () => {
    it('renders create button when pay super is registered', () => {
      const testInstance = constructPaySuperListView();

      const createButton = testInstance.findByProps({ testId: 'createSuperPaymentButton' });

      expect(createButton).toBeDefined();
    });

    it('renders settings button when pay super is registered', () => {
      const testInstance = constructPaySuperListView();

      const settingsButton = testInstance.findByProps({ testId: 'superPaymentSettingsButton' });

      expect(settingsButton).toBeDefined();
    });

    it('does not render action buttons if not registered', () => {
      const testInstance = constructPaySuperListView({
        isRegistered: false,
      });

      const pageHeader = testInstance.findByType(PageHead);
      const actionButtons = pageHeader.findAllByType(Button);

      expect(actionButtons).toHaveLength(0);
    });
  });

  describe('Unregistered page state', () => {
    it('renders unregistered page state when unregistered', () => {
      const testInstance = constructPaySuperListView({
        isRegistered: false,
      });

      const unregisteredPageState = testInstance.findByType(UnregisteredPageState);

      expect(unregisteredPageState).toBeDefined();
    });
  });

  describe('Alerts', () => {
    it('renders alerts when they\'re set', () => {
      const testInstance = constructPaySuperListView({
        alert: {
          type: 'danger',
          message: 'Danger, Will Robinson',
        },
      });

      const alert = testInstance.findByType(Alert);

      expect(alert).toBeDefined();
    });
  });
});
