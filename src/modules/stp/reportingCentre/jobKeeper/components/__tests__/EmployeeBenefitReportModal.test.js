import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme/build';
import React from 'react';

import { getDefaultState } from '../../JobKeeperReducer';
import EmployeeBenefitReportModal from '../EmployeeBenefitReportModal';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import Store from '../../../../../../store/Store';

describe('EmployeeBenefitReportModal', () => {
  const constructEmployeeBenefitReportModalView = (state = {}) => {
    const store = new Store(() => ({ ...getDefaultState(), ...state }));
    const wrappedComponent = (
      <Provider store={store}>
        <EmployeeBenefitReportModal
          onSort={() => {}}
          unsavedChangesModalListeners={{
            onCancel: () => {},
            onConfirm: () => {},
          }}
        />
      </Provider>
    );

    return mount(wrappedComponent);
  };

  describe('EmployeeBenefitReportModalTable', () => {
    it('shows the employees table', () => {
      const modal = constructEmployeeBenefitReportModalView({
        loadingState: LoadingState.LOADING_SUCCESS,
        isEmployeeBenefitReportModalOpen: true,
      });

      expect(modal.find(EmployeeBenefitReportModal)).toHaveLength(1);
    });

    it('shows the same number of rows as the employee list', () => {
      const modal = constructEmployeeBenefitReportModalView({
        loadingState: LoadingState.LOADING_SUCCESS,
        employees: [
          {
            employeeId: '100001',
            payId: 'effa0c73-65c4-409d-a20c-623fbe0c8b17',
            firstName: 'Alf',
            lastName: 'Galang',
            firstFortnight: '02',
            finalFortnight: null,
            tier: '01',
          },
          {
            employeeId: '100002',
            payId: '73f25da3-32ef-4ad9-a5cb-74e241b0506b',
            firstName: 'Sarah',
            lastName: 'Boss',
            firstFortnight: '02',
            finalFortnight: '03',
            tier: '02',
          },
        ],
        isEmployeeBenefitReportModalOpen: true,
      });

      const rows = modal.find(Table.Row);
      expect(rows).toHaveLength(2);
    });
  });

  describe('EmployeeBenefitReportModal checkbox', () => {
    it('should mark employees as checked when isSelected is true', () => {
      const modal = constructEmployeeBenefitReportModalView({
        loadingState: LoadingState.LOADING_SUCCESS,
        employees: [
          {
            employeeId: '100001',
            payId: 'effa0c73-65c4-409d-a20c-623fbe0c8b17',
            firstName: 'Alf',
            lastName: 'Galang',
            firstFortnight: '02',
            finalFortnight: null,
            tier: '01',
            isSelected: true,
          },
          {
            employeeId: '100002',
            payId: '73f25da3-32ef-4ad9-a5cb-74e241b0506b',
            firstName: 'Sarah',
            lastName: 'Boss',
            firstFortnight: '02',
            finalFortnight: '03',
            tier: '02',
            isSelected: false,
          },
        ],
        isEmployeeBenefitReportModalOpen: true,
      });

      expect(
        modal.find({ name: '100001-select' }).find('Checkbox').props().checked
      ).toEqual(true);

      expect(
        modal.find({ name: '100002-select' }).find('Checkbox').props().checked
      ).toEqual(false);
    });
  });
});
