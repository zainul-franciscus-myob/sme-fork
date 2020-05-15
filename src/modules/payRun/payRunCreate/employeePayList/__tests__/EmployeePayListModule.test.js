import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  CLOSE_JOB_LIST_MODAL,
  GET_DETAIL_JOB_LIST,
  OPEN_JOB_LIST_MODAL,
  SET_JOB_LIST_MODAL_LOADING_STATE,
} from '../../PayRunIntents';
import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import EmployeePayListModule from '../EmployeePayListModule';
import JobListModalView from '../../../jobListModal/components/JobListModalView';
import LoadingState from '../../../../../components/PageView/LoadingState';
import PayRunModule from '../../PayRunModule';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import UnsavedModal from '../../../../../components/modal/UnsavedModal';
import createEmployeePayListDispatcher from '../createEmployeePayListDispatcher';
import createEmployeePayListIntegrator from '../createEmployeePayListIntegrator';
import payRunReducer from '../../payRunReducer';

describe('EmployeePayListModule', () => {
  const constructEmployeePayListModule = () => {
    const integration = new TestIntegration();
    const pushMessage = () => {};
    const setRootView = () => (<div />);
    const isToggleOn = () => true;
    const payRunModule = new PayRunModule({
      integration, setRootView, pushMessage, isToggleOn,
    });

    const store = new TestStore(payRunReducer);
    payRunModule.store = store;

    const employeePayListModule = new EmployeePayListModule({
      integration, store: payRunModule.store, pushMessage,
    });
    employeePayListModule.dispatcher = createEmployeePayListDispatcher(store);
    employeePayListModule.integrator = createEmployeePayListIntegrator(store, integration);

    const view = employeePayListModule.getView();

    const wrappedView = (
      <Provider store={payRunModule.store}>
        {view}
      </Provider>
    );

    const wrapper = mount(wrappedView);

    wrapper.update();
    return {
      wrapper,
      module: employeePayListModule,
      payRunModule,
      store: payRunModule.store,
    };
  };

  describe('Save and close button', () => {
    it('renders the Save and close button', () => {
      const { wrapper } = constructEmployeePayListModule();

      const saveAndCloseButton = findButtonWithTestId(wrapper, 'saveAndCloseButton');

      expect(saveAndCloseButton).toHaveLength(1);
    });

    it('redirects to payRun url, when clicked', () => {
      const { wrapper } = constructEmployeePayListModule();

      findButtonWithTestId(wrapper, 'saveAndCloseButton').simulate('click');

      expect(window.location.href.endsWith('/payRun')).toBe(true);
    });
  });

  describe('tryToNavigate', () => {
    const navigateFunction = () => {
      window.location.href = 'some_url';
    };

    it('does not open unsaved changes modal when there are no changes', () => {
      const { wrapper, module } = constructEmployeePayListModule();

      module.tryToNavigate(navigateFunction);
      wrapper.update();
      const unsavedModal = wrapper.find(UnsavedModal);

      expect(unsavedModal).toHaveLength(0);
    });

    it('opens unsaved changes modal when there are changes', () => {
      const { wrapper, module } = constructEmployeePayListModule();

      const bulkSelectCheckbox = wrapper.find('input[type="checkbox"]');
      bulkSelectCheckbox.simulate('change', { target: { checked: true } });

      module.tryToNavigate(navigateFunction);
      wrapper.update();

      const unsavedModal = wrapper.find(UnsavedModal);

      expect(unsavedModal).toHaveLength(1);
    });
  });

  describe('openJobListModal', () => {
    const {
      wrapper,
      module,
      payRunModule,
      store,
    } = constructEmployeePayListModule();
    payRunModule.resetState();

    it('on click job event, it opens job list, and load job list from the server', () => {
      module.openJobListModal({
        payItem: {
          payItemId: '1',
          jobs: [{ jobId: 1, amount: 10 },
          ],
          amount: 100,
        },
        employeeId: '1',
      });

      wrapper.update();

      const jobListModal = wrapper.find(JobListModalView);
      expect(jobListModal).toHaveLength(1);

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_JOB_LIST_MODAL,
          payItem: {
            amount: 100,
            jobs: [
              {
                amount: 10,
                jobId: 1,
              },
            ],
            payItemId: '1',
          },
          employeeId: '1',
        },
        {
          intent: SET_JOB_LIST_MODAL_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: GET_DETAIL_JOB_LIST,
          entries: [
            {
              id: '1',
              name: 'Project 1',
              number: '100',
            },
            {
              id: '2',
              name: 'Sub project 1',
              number: '110',
            },
            {
              id: '3',
              name: 'Project 1 thing',
              number: '120',
            },
            {
              id: '4',
              name: 'Liabilities',
              number: '200',
            },
            {
              id: '5',
              name: 'Current liabilities',
              number: '210',
            },
            {
              id: '6',
              name: 'Credit cards',
              number: '220',
            },
            {
              id: '7',
              name: 'Visa cards',
              number: '230',
            },
            {
              id: '8',
              name: 'Deposits collected',
              number: '240',
            },
            {
              id: '9',
              name: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123',
              number: '100000000000000',
            },
            {
              id: '10',
              name: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123',
              number: '110000000000000',
            },
            {
              id: '11',
              name: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123',
              number: '120000000000000',
            },
            {
              id: '12',
              name: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123',
              number: '130000000000000',
            },
          ],
        },
      ]);
    });

    it('on close job list modal, it should close the job list window', () => {
      store.resetActions();
      module.dispatcher.closeJobListModal();

      wrapper.update();

      const jobListModal = wrapper.find(JobListModalView);
      expect(jobListModal).toHaveLength(0);

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_JOB_LIST_MODAL,
        },
      ]);
    });

    it('on subquential click job event, it opens job list, load job list from cache', () => {
      store.resetActions();
      module.openJobListModal({
        payItem: {
          payItemId: '1',
          jobs: [{ jobId: 1, amount: 10 },
          ],
          amount: 100,
        },
        employeeId: '1',
      });

      wrapper.update();

      const jobListModal = wrapper.find(JobListModalView);
      expect(jobListModal).toHaveLength(1);

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_JOB_LIST_MODAL,
          payItem: {
            amount: 100,
            jobs: [
              {
                amount: 10,
                jobId: 1,
              },
            ],
            payItemId: '1',
          },
          employeeId: '1',
        },
      ]);
    });
  });

  describe('getAmount', () => {
    const {
      payRunModule,
      module,
    } = constructEmployeePayListModule();
    payRunModule.resetState();

    it('if job exists, should return expected result', () => {
      const actual = module.getAmount({
        payItemId: 1,
        jobs: [
          {
            jobId: 1,
            amount: 10,
          },
          {
            jobId: 2,
            amount: 5,
          },
        ],
        amount: 100,
      },
      1,
      0);

      expect(actual).toEqual(10);

      const actual2 = module.getAmount({
        payItemId: 1,
        jobs: [
          {
            jobId: 1,
            amount: 10,
          },
          {
            jobId: 2,
            amount: 5,
          },
        ],
        amount: 100,
      },
      2,
      0);

      expect(actual2).toEqual(5);
    });

    it('if job does not exist, should return expected result', () => {
      const actual = module.getAmount({
        payItemId: 1,
        jobs: [
          {
            jobId: 1,
            amount: 10,
          },
          {
            jobId: 2,
            amount: 5,
          },
        ],
        amount: 100,
      },
      3,
      0);

      expect(actual).toEqual('0.00');
    });

    it('if job does not exist with no jobs was selected, should return expected result', () => {
      const actual = module.getAmount({
        payItemId: 1,
        jobs: [],
        amount: 100,
      },
      3,
      0);

      expect(actual).toEqual(100);
    });
  });

  describe('updateJobs', () => {
    const {
      payRunModule,
      module,
    } = constructEmployeePayListModule();
    payRunModule.resetState();

    const jobs = [
      {
        jobId: 1,
        amount: 10,
      },
      {
        jobId: 2,
        amount: 5,
      },
    ];

    it('add new job should add the job to the list', () => {
      const expected = [
        {
          jobId: 1,
          amount: 10,
        },
        {
          jobId: 2,
          amount: 5,
        },
        {
          jobId: 3,
          amount: 15,
        },
      ];

      const actual = module.updateJobs({
        id: 3,
        amount: 15,
        isSelected: true,
      }, jobs);

      expect(actual).toEqual(expected);
    });

    it('edit existing selected job should edit the amount', () => {
      const expected = [
        {
          jobId: 2,
          amount: 5,
        },
        {
          jobId: 1,
          amount: 25,
        },
      ];

      const actual = module.updateJobs({
        id: 1,
        amount: 25,
        isSelected: true,
      }, jobs);

      expect(actual).toEqual(expected);
    });

    it('unselected a job should remove it from the list', () => {
      const expected = [
        {
          jobId: 1,
          amount: 10,
        },
      ];

      const actual = module.updateJobs({
        id: 2,
        amount: 20,
        isSelected: false,
      }, jobs);

      expect(actual).toEqual(expected);
    });
  });
});
