import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme/build';
import React from 'react';


import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import { getDefaultState } from '../FinalisationReducer';
import CancelModal from '../../../../../components/modal/CancelModal';
import FinalisationEmployeesTable from '../components/FinalisationEmployeesTable';
import FinalisationHeader from '../components/FinalisationHeader';
import FinalisationView from '../components/FinalisationView';
import LoadingState from '../../../../../components/PageView/LoadingState';
import Store from '../../../../../store/Store';

describe('FinalisationView', () => {
  const constructFinalisationView = (state = {}) => {
    const store = new Store(() => ({ ...getDefaultState(), ...state }));
    const wrappedComponent = (
      <Provider store={store}>
        <FinalisationView
          onSort={() => { }}
          unsavedChangesModalListeners={{
            onCancel: () => {},
            onConfirm: () => {},
          }}
        />
      </Provider>
    );

    return mount(wrappedComponent);
  };

  it('shows the header', () => {
    const finalisationView = constructFinalisationView(
      { loadingState: LoadingState.LOADING_SUCCESS },
    );

    const header = finalisationView.find(FinalisationHeader);

    expect(header).toHaveLength(1);
  });

  describe('FinalisationEmployeeTable', () => {
    it('shows the employees table', () => {
      const finalisationView = constructFinalisationView(
        { loadingState: LoadingState.LOADING_SUCCESS },
      );

      const table = finalisationView.find(FinalisationEmployeesTable);

      expect(table).toHaveLength(1);
    });

    it('shows the same number of rows as the employee list', () => {
      const state = {
        loadingState: LoadingState.LOADING_SUCCESS,
        employees: [
          { id: 1 },
          { id: 2 },
        ],
      };
      const finalisationView = constructFinalisationView(state);

      const rows = finalisationView.find(Table.Row);

      expect(rows).toHaveLength(2);
    });
  });

  describe('Finalise button', () => {
    it('shows the finalise button when unfinalised employee is selected', () => {
      const state = {
        loadingState: LoadingState.LOADING_SUCCESS,
        employees: [
          {
            isSelected: true,
            isFinalised: false,
          },
        ],
      };

      const finalisationView = constructFinalisationView(state);
      const finaliseButton = findButtonWithTestId(finalisationView, 'finaliseButton');

      expect(finaliseButton).toHaveLength(1);
    });

    it('does not show the finalise button when no unfinalised employees are selected', () => {
      const state = {
        loadingState: LoadingState.LOADING_SUCCESS,
        employees: [
          {
            isSelected: true,
            isFinalised: true,
          },
        ],
      };

      const finalisationView = constructFinalisationView(state);
      const finaliseButton = findButtonWithTestId(finalisationView, 'finaliseButton');

      expect(finaliseButton).toHaveLength(0);
    });
  });

  describe('Remove Finalisation button', () => {
    it('shows the remove finalisation button when finalised employee is selected', () => {
      const state = {
        loadingState: LoadingState.LOADING_SUCCESS,
        employees: [
          {
            isSelected: true,
            isFinalised: true,
          },
        ],
      };

      const finalisationView = constructFinalisationView(state);
      const removefinalisationButton = findButtonWithTestId(finalisationView, 'removeFinalisationButton');

      expect(removefinalisationButton).toHaveLength(1);
    });

    it('does not show the remove finalisation button when no finalised employees are selected', () => {
      const state = {
        loadingState: LoadingState.LOADING_SUCCESS,
        employees: [
          {
            isSelected: true,
            isFinalised: false,
          },
          {
            isSelected: false,
            isFinalised: true,
          },
        ],
      };

      const finalisationView = constructFinalisationView(state);
      const removefinalisationButton = findButtonWithTestId(finalisationView, 'removeFinalisationButton');

      expect(removefinalisationButton).toHaveLength(0);
    });
  });

  describe('Unsaved changes modal', () => {
    it('renders the unsaved changes modal', () => {
      const state = {
        loadingState: LoadingState.LOADING_SUCCESS,
        unsavedChangesModalIsOpen: true,
      };

      const finalisationView = constructFinalisationView(state);
      const unsavedChangesModal = finalisationView.find(CancelModal);

      expect(unsavedChangesModal).toHaveLength(1);
    });

    it('does not render the unsaved changes modal', () => {
      const state = {
        loadingState: LoadingState.LOADING_SUCCESS,
        unsavedChangesModalIsOpen: false,
      };

      const finalisationView = constructFinalisationView(state);
      const unsavedChangesModal = finalisationView.find(CancelModal);

      expect(unsavedChangesModal).toHaveLength(0);
    });
  });
});
