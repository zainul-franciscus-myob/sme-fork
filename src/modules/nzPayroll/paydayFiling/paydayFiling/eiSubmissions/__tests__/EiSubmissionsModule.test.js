import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  SET_SELECTED_PAYROLL_YEAR,
} from '../../PaydayFilingIntents';
import EiSubmissionsFilter from '../components/EiSubmissionsFilter';
import EiSubmissionsModule from '../EiSubmissionsModule';
import PageView from '../../../../../../components/PageView/PageView';
import PaydayFilingReducer from '../../PaydayFilingReducer';
import TestIntegration from '../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../store/TestStore';
import createEiSubmissionsDispatcher from '../createEiSubmissionsDispatcher';
import createEiSubmissionsIntegrator from '../createEiSubmissionsIntegrator';

describe('EiSubmissionsModule', () => {
  let integration;
  let store;

  const constructEiSubmissionsModule = () => {
    const module = new EiSubmissionsModule({
      integration,
    });

    module.store = store;
    store.setState({
      ...store.getState(),
      region: 'nz',
      businessId: '123',
    });

    module.dispatcher = createEiSubmissionsDispatcher(store);
    module.integrator = createEiSubmissionsIntegrator(store, integration);

    module.run();
    const view = module.getView();
    const wrappedView = <Provider store={module.store}>{view}</Provider>;
    const wrapper = mount(wrappedView);
    wrapper.update();

    return {
      wrapper,
      module,
    };
  };

  beforeEach(() => {
    integration = new TestIntegration();
    store = new TestStore(PaydayFilingReducer);
  });

  afterEach(jest.clearAllMocks);

  describe('UI components', () => {
    it('should render ei submissions components when module runs', () => {
      const { wrapper } = constructEiSubmissionsModule();

      expect(wrapper.find(PageView).exists()).toBe(true);
      expect(wrapper.find(EiSubmissionsFilter).exists()).toBe(true);
    });
  });

  describe('Loading initial ei submission', () => {
    it('should load initial ei submissions and payroll options when selected payroll year missing', () => {
      store.setState({
        ...store.getState(),
        region: 'nz',
        businessId: '123',
        eiSubmissions: {
          selectedPayrollYear: '',
        },
      });
      constructEiSubmissionsModule();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
        }),
      ]);
    });
  });

  describe('Selecting payroll options', () => {
    it('should update selected payroll year when a different payroll year is selected ', () => {
      store.setState({
        ...store.getState(),
        region: 'nz',
        businessId: '123',
        eiSubmissions: {
          selectedPayrollYear: '',
        },
      });

      const { wrapper } = constructEiSubmissionsModule();
      wrapper.find('select').simulate('change', { target: { value: '2020' } });

      expect(store.getActions()).toContainEqual({
        intent: SET_SELECTED_PAYROLL_YEAR,
        selectedPayrollYear: '2020',
      });
      expect(store.getState().eiSubmissions.selectedPayrollYear).toBe('2020');
    });
  });
});
