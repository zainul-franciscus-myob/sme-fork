import { Card, Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { SET_JOB_MAKER_INITIAL, SET_LOADING_STATE } from '../JobMakerIntents';
import JobMakerModule from '../JobMakerModule';
import JobMakerReducer from '../JobMakerReducer';
import LoadingState from '../../../../../components/PageView/LoadingState';
import TestStore from '../../../../../store/TestStore';
import createJobMakerDispatcher from '../createJobMakerDispatcher';
import loadJobMakerInitialEmployees from '../../mappings/data/loadJobMakerInitialEmployees';

describe('JobMakerModule', () => {
  const currentJobMakerInfo = {
    currentPayrollYearLabel: '2020/2021',
    currentPeriodDetails: {
      period: 1,
      periodStart: '7 Oct 2020',
      periodEnd: '6 Jan 2021',
      claimStart: '1 February 2021',
      claimBestBefore: '27 March 2021',
      claimEnd: '30 March 2021',
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
    return { store, wrapper };
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
          wrapper.find({ testid: 'JM-column-declaration-tooltip' })
        ).toHaveLength(1);
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
    });
  });
});
