import { Card, Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import {
  SET_DROPDOWN_ACTION,
  SET_DROPDOWN_ACTION_EMPLOYEE,
  SET_IS_SHOWING_JOB_MAKER_ACTION_MODAL,
  SET_JOB_MAKER_INITIAL,
  SET_LOADING_STATE,
} from '../JobMakerIntents';
import {
  getDropdownAction,
  getDropdownActionEmployee,
  getIsShowingJobMakerActionModal,
} from '../JobMakerSelector';
import JobMakerActionTypes from '../JobMakerActionTypes';
import JobMakerModule from '../JobMakerModule';
import JobMakerReducer from '../JobMakerReducer';
import LoadingState from '../../../../../components/PageView/LoadingState';
import TestStore from '../../../../../store/TestStore';
import createJobMakerDispatcher from '../createJobMakerDispatcher';
import loadJobMakerInitialEmployees from '../../mappings/data/loadJobMakerInitialEmployees';

describe('JobMakerModule', () => {
  const currentJobMakerInfo = {
    currentPayrollYearLabel: '2020/21',
    currentPeriodDetails: {
      period: 1,
      periodStart: '7 Oct 2020',
      periodEnd: '6 Jan 2021',
      claimStart: '1 February',
      claimBestBefore: '27 March',
      claimEnd: '30 March',
    },
  };

  const defaultIntegration = {
    read: ({ onSuccess }) => onSuccess(currentJobMakerInfo),
  };

  const setupModule = (featureToggles, integration = defaultIntegration) => {
    const module = new JobMakerModule({
      integration,
      featureToggles,
    });
    const store = new TestStore(JobMakerReducer);
    module.store = store;
    module.dispatcher = createJobMakerDispatcher(store);

    module.run({});
    const wrapper = mount(module.getView());
    wrapper.update();
    return { store, wrapper, module };
  };

  describe('run', () => {
    describe('when isJobMakerDeclarationEnabled toggle is off', () => {
      it('renders landing page', () => {
        const { store, wrapper } = setupModule({
          isJobMakerDeclarationEnabled: false,
        });

        const result = wrapper.find({ testid: 'jobMaker-landing' });

        expect(result.find(Card)).toHaveLength(1);
        expect(store.getActions()).toEqual([
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING,
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING_SUCCESS,
          },
          {
            intent: SET_JOB_MAKER_INITIAL,
            response: currentJobMakerInfo,
          },
        ]);
      });
    });

    describe('when isJobMakerDeclarationEnabled toggle is on', () => {
      const featureToggleOn = {
        isJobMakerDeclarationEnabled: true,
      };

      it('hides landing page', () => {
        const { wrapper } = setupModule(featureToggleOn);

        const result = wrapper.find({ testid: 'jobMaker-landing' });

        expect(result.find(Card)).toHaveLength(0);
      });

      it('renders jobmaker basic UI components', () => {
        const { wrapper } = setupModule(featureToggleOn);

        expect(
          wrapper.find({ testid: 'JM-payroll-year-current' })
        ).toHaveLength(1);
        expect(
          wrapper.find({ testid: 'JM-period-header-current' })
        ).toHaveLength(1);
        expect(wrapper.find({ testid: 'JM-table-header' })).toHaveLength(1);
        expect(
          wrapper.find({ testid: 'JM-column-declaration-tooltip' }).exists()
        ).toBeTruthy();
      });

      describe('onJobmakerTableDropdownItemClicked', () => {
        let module;
        let store;
        let wrapper;
        const integration = {
          write: ({ onSuccess }) => onSuccess({}),
          read: ({ onSuccess }) => onSuccess(loadJobMakerInitialEmployees),
        };
        beforeEach(() => {
          const component = setupModule(featureToggleOn, integration);
          module = component.module;
          wrapper = component.wrapper;
          store = component.store;
        });

        const testActions = [
          JobMakerActionTypes.Nominate,
          JobMakerActionTypes.CancelNominate,
        ];

        testActions.forEach((action) => {
          it(`should show ${action} modal when ${action} dropdown item clicked`, () => {
            const mockEmployee = { employeeId: '001' };

            module.onJobmakerTableDropdownItemClicked(mockEmployee, action);
            wrapper.update();

            const state = store.getState();
            expect(getDropdownActionEmployee(state)).toEqual(mockEmployee);
            expect(getDropdownAction(state)).toBe(action);
            expect(getIsShowingJobMakerActionModal(state)).toBe(true);

            const modal = wrapper.find({
              testid: `jobmakerAction-modal-${action}`,
            });
            expect(modal.exists()).toBe(true);
          });
        });

        it('does not set employee and action with invalid dropdown item', () => {
          module.openStpDeclarationModal = jest.fn();
          const mockEmployee = { employeeId: '001' };
          module.onJobmakerTableDropdownItemClicked(
            mockEmployee,
            'invalid item'
          );
          const state = store.getState();

          expect(getDropdownActionEmployee(state)).toEqual(undefined);
          expect(getDropdownAction(state)).toBe(undefined);
        });

        testActions.forEach((action) => {
          it(`should call correct intents per ${action} action`, () => {
            const selectedEmployee = loadJobMakerInitialEmployees.employees[0];
            const dropdown = wrapper
              .find({ testid: `dropdownlist-${selectedEmployee.employeeId}` })
              .first();
            expect(dropdown.exists()).toBeTruthy();

            dropdown.prop('onSelect')(action);

            expect(store.getActions()).toEqual([
              {
                intent: SET_LOADING_STATE,
                loadingState: LoadingState.LOADING,
              },
              {
                intent: SET_LOADING_STATE,
                loadingState: LoadingState.LOADING_SUCCESS,
              },
              {
                intent: SET_JOB_MAKER_INITIAL,
                response: loadJobMakerInitialEmployees,
              },
              {
                intent: SET_DROPDOWN_ACTION_EMPLOYEE,
                employee: selectedEmployee,
              },
              {
                intent: SET_DROPDOWN_ACTION,
                action,
              },
              {
                intent: SET_IS_SHOWING_JOB_MAKER_ACTION_MODAL,
                isShowingJobMakerActionModal: true,
              },
            ]);
          });
        });

        it('should not call any setting dropdown actions with invalid dropdown item', () => {
          const selectedEmployee = loadJobMakerInitialEmployees.employees[0];
          const invalidAction = 'invalidAction';
          const dropdown = wrapper
            .find({ testid: `dropdownlist-${selectedEmployee.employeeId}` })
            .first();
          dropdown.prop('onSelect')(invalidAction);

          expect(store.getActions()).not.toContainEqual({
            intent: SET_DROPDOWN_ACTION,
            action: invalidAction,
          });
        });
      });

      describe('loadInitialEmployeesAndHeaderDetails', () => {
        it('renders jobmaker header details', () => {
          const { store } = setupModule(featureToggleOn);

          expect(store.getState()).toEqual(
            expect.objectContaining(currentJobMakerInfo)
          );
        });

        it('renders jobmaker empty page state when no employees', () => {
          const { wrapper } = setupModule(featureToggleOn);

          expect(
            wrapper.find({ testid: 'JM-emptyEmployee-state' })
          ).toHaveLength(1);
          expect(wrapper.find(Table.Row)).toHaveLength(0);
        });

        it('renders employee rows when response has employees', () => {
          const integration = {
            read: ({ onSuccess }) => onSuccess(loadJobMakerInitialEmployees),
          };
          const { wrapper } = setupModule(featureToggleOn, integration);

          expect(
            wrapper.find({ testid: 'JM-emptyEmployee-state' })
          ).toHaveLength(0);
          expect(wrapper.find(Table.Row)).toHaveLength(3);
        });
      });

      describe('openStpDeclarationModal', () => {
        let module;
        let store;
        const integration = {
          write: ({ onSuccess }) => onSuccess({}),
          read: ({ onSuccess }) => onSuccess(loadJobMakerInitialEmployees),
        };
        beforeEach(() => {
          const component = setupModule(featureToggleOn, integration);
          module = component.module;
          store = component.store;
        });

        it('set new eventId and call createJobMakerEmployeeAction', () => {
          module.createJobMakerEmployeeAction = jest.fn();
          const spy = jest.spyOn(module.stpDeclarationModule, 'run');

          module.openStpDeclarationModal();

          const state = store.getState();
          const { eventId, businessId } = state;
          expect(eventId).not.toBe(undefined);
          expect(spy).toHaveBeenCalledWith(
            { eventId, businessId },
            module.createJobMakerEmployeeAction
          );

          module.stpDeclarationModule.recordDeclaration();
          expect(module.createJobMakerEmployeeAction).toHaveBeenCalled();
        });
      });

      describe('onModalActionClicked', () => {
        let module;
        let wrapper;
        let store;
        const integration = {
          write: ({ onSuccess }) => onSuccess({}),
          read: ({ onSuccess }) => onSuccess(loadJobMakerInitialEmployees),
        };
        beforeEach(() => {
          const component = setupModule(featureToggleOn, integration);
          module = component.module;
          wrapper = component.wrapper;
          store = component.store;
        });

        it('should close the jobmaker action modal and open stp declaration modal', () => {
          module.onModalActionClicked();
          wrapper.update();

          const state = store.getState();
          expect(getIsShowingJobMakerActionModal(state)).toBe(false);

          const stpDeclarationModal = wrapper.find({
            testid: 'stp-declaration-modal',
          });
          expect(stpDeclarationModal.exists()).toBe(true);
        });
      });

      describe('onCloseModal', () => {
        let module;
        let wrapper;
        let store;
        const integration = {
          write: ({ onSuccess }) => onSuccess({}),
          read: ({ onSuccess }) => onSuccess(loadJobMakerInitialEmployees),
        };
        beforeEach(() => {
          const component = setupModule(featureToggleOn, integration);
          module = component.module;
          wrapper = component.wrapper;
          store = component.store;
        });

        it('should close the jobmaker action modal without showing stp declaration modal', () => {
          module.onCloseModal();
          wrapper.update();

          const state = store.getState();
          expect(getIsShowingJobMakerActionModal(state)).toBe(false);
          expect(getDropdownAction(state)).toBeUndefined();
          expect(getDropdownActionEmployee(state)).toEqual({});

          const stpDeclarationModal = wrapper.find({
            testid: 'stp-declaration-modal',
          });
          expect(stpDeclarationModal.exists()).toBe(false);
        });
      });

      describe('createJobMakerEmployeeAction', () => {
        it('should call set alert with correct message', () => {
          const message = 'sample';
          const integration = {
            write: ({ onFailure }) => onFailure({ message }),
            read: ({ onSuccess }) => onSuccess(loadJobMakerInitialEmployees),
          };
          const { module } = setupModule(featureToggleOn, integration);
          module.setAlert = jest.fn();
          module.createJobMakerEmployeeAction();
          expect(module.setAlert).toHaveBeenCalledWith({
            type: 'danger',
            message,
          });
        });

        it('should load jobmaker employees after job maker creation is success', () => {
          const integration = {
            write: ({ onSuccess }) => onSuccess(),
            read: ({ onSuccess }) => onSuccess(loadJobMakerInitialEmployees),
          };
          const { module } = setupModule(featureToggleOn, integration);
          module.loadInitialEmployeesAndHeaderDetails = jest.fn();

          module.createJobMakerEmployeeAction();

          expect(
            module.loadInitialEmployeesAndHeaderDetails
          ).toHaveBeenCalled();
        });
      });
    });
  });
});
