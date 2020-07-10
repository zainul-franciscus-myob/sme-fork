import { Alert, Button, PageHead, Table } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme/build';
import React from 'react';

import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import { getDefaultState } from '../../paySuperListReducer';
import LoadingState from '../../../../../components/PageView/LoadingState';
import NoResultPageState from '../../../../../components/NoResultPageState/NoResultPageState';
import PaySuperListView from '../PaySuperListView';
import Store from '../../../../../store/Store';
import UnregisteredPageState from '../UnregisteredPageState';

const DEFAULT_STATE = {
  ...getDefaultState(),
  loadingState: LoadingState.LOADING_SUCCESS,
  isRegistered: true,
  superPayments: [],
};

describe('PaySuperListView', () => {
  const constructPaySuperListView = (state = {}) => {
    const store = new Store(() => ({ ...DEFAULT_STATE, ...state }));
    const wrappedComponent = (
      <Provider store={store}>
        <PaySuperListView onSort={() => {}} />
      </Provider>
    );

    return mount(wrappedComponent);
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
        {
          amount: '88,888.89',
          batchPaymentId: '13867',
          dateOccurred: '24/02/2017',
          employeeCount: 3,
          displayId: 'PS000002',
          description: 'Superannuation Payment',
          status: 'FundsUnavailable',
        },
      ];

      const wrapper = constructPaySuperListView({ superPayments });

      const tableRows = wrapper.find(Table.Row);

      expect(tableRows.length).toEqual(superPayments.length);
    });

    it('renders empty state when pay super registered and no super payments found', () => {
      const wrapper = constructPaySuperListView({
        superPayments: [],
      });

      const emptyState = wrapper.find(NoResultPageState);

      expect(emptyState).toHaveLength(1);
    });
  });

  describe('action buttons', () => {
    it('renders create button when pay super is registered', () => {
      const wrapper = constructPaySuperListView();

      const createButton = findButtonWithTestId(
        wrapper,
        'createSuperPaymentButton'
      );

      expect(createButton).not.toHaveLength(0);
    });

    it('renders settings button when pay super is registered', () => {
      const wrapper = constructPaySuperListView();

      const settingsButton = findButtonWithTestId(
        wrapper,
        'superPaymentSettingsButton'
      );

      expect(settingsButton).not.toHaveLength(0);
    });

    it('does not render action buttons if not registered', () => {
      const wrapper = constructPaySuperListView({
        isRegistered: false,
      });

      const pageHeader = wrapper.find(PageHead);
      const actionButtons = pageHeader.find(Button);

      expect(actionButtons).toHaveLength(0);
    });
  });

  describe('Unregistered page state', () => {
    it('renders unregistered page state when unregistered', () => {
      const wrapper = constructPaySuperListView({
        isRegistered: false,
      });

      const unregisteredPageState = wrapper.find(UnregisteredPageState);

      expect(unregisteredPageState).toHaveLength(1);
    });
  });

  describe('Alerts', () => {
    it("renders alerts when they're set", () => {
      const wrapper = constructPaySuperListView({
        alert: {
          type: 'danger',
          message: 'Danger, Will Robinson',
        },
      });

      const alert = wrapper.find(Alert);

      expect(alert).toHaveLength(1);
    });
  });
});
