import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import EmployeePayHeader from '../../../components/EmployeePayHeader';
import RecordPayRunActions from '../RecordPayRunActions';
import RecordPayRunView from '../RecordPayRunView';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('RecordPayRunView', () => {
  let store;
  const props = {
    recordPayments: () => {},
    onOpenPaydayFilingClick: jest.fn(),
    isPaydayFilingEnabled: false,
    isBusinessOnboarded: false,
    isUserOnboarded: false,
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('when RecordPayRun view is rendered', () => {
    it('should render EmployeePayHeader child component', () => {
      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);

      expect(wrapper.find(EmployeePayHeader).exists()).toBe(true);
      expect(wrapper.find(EmployeePayHeader)).toHaveLength(1);
    });

    it('should render RecordPayRunActions child component', () => {
      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);

      expect(wrapper.find(RecordPayRunActions).exists()).toBe(true);
      expect(wrapper.find(RecordPayRunActions)).toHaveLength(1);
    });

    it('should display number of selected employees', () => {
      const draftPayRun = {
        lines: [
          {
            employeeId: '21',
            isSelected: true,
            payLines: [],
          },
          {
            employeeId: '22',
            isSelected: true,
            payLines: [],
          },
        ],
      };

      store.setState({
        ...store.getState(),
        draftPayRun,
      });

      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);
      const expected = 'Record pay for 2 employees?';

      expect(wrapper.find({ testid: 'testFieldGroup' }).prop('label')).toEqual(
        expected
      );
    });

    it('should display correct label for single employee', () => {
      const draftPayRun = {
        lines: [
          {
            employeeId: '21',
            isSelected: true,
            payLines: [],
          },
        ],
      };

      store.setState({
        ...store.getState(),
        draftPayRun,
      });

      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);
      const expected = 'Record pay for 1 employee?';

      expect(wrapper.find({ testid: 'testFieldGroup' }).prop('label')).toEqual(
        expected
      );
    });

    it('should display correct label for zero employees selected', () => {
      const draftPayRun = { lines: [] };

      store.setState({
        ...store.getState(),
        draftPayRun,
      });

      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);
      const expected = 'Record pay for 0 employees?';

      expect(wrapper.find({ testid: 'testFieldGroup' }).prop('label')).toEqual(
        expected
      );
    });

    describe('when PayDayFiling is enabled', () => {
      it('should display payday filing alert and Record without filing with IR Action when business is not onboarded', () => {
        const draftPayRun = {
          lines: [
            {
              employeeId: '21',
              isSelected: true,
              payLines: [],
            },
          ],
        };

        store.setState({
          ...store.getState(),
          draftPayRun,
        });

        const updated = { ...props, isPaydayFilingEnabled: true };

        const wrapper = mountWithProvider(<RecordPayRunView {...updated} />);

        expect(
          wrapper.find({ testid: 'paydayFilingReportButton' }).first().text()
        ).toEqual('save pay run and connect to Payday filing');
        expect(
          wrapper.find({ testid: 'recordWithoutFilingButton' }).first().text()
        ).toEqual('Record without filing with IR');
        expect(wrapper.find('RecordPayRunWithIRFilingModal').exists()).toBe(
          false
        );
      });

      it('should have Next Action and not display payday filing alert when business is onboarded', () => {
        const draftPayRun = {
          lines: [
            {
              employeeId: '21',
              isSelected: true,
              payLines: [],
            },
          ],
        };

        store.setState({
          ...store.getState(),
          draftPayRun,
          payDayOnboardedStatus: {
            isBusinessOnboarded: true,
            isUserOnboarded: true,
          },
        });

        const updated = {
          ...props,
          isPaydayFilingEnabled: true,
        };

        const wrapper = mountWithProvider(<RecordPayRunView {...updated} />);

        expect(
          wrapper.find({ testid: 'paydayFilingReportButton' }).length
        ).toEqual(0);
        expect(wrapper.find({ testid: 'nextButton' }).first().text()).toEqual(
          'Next'
        );
      });

      it('should call onOpenPaydayFilingClick when clicked payday filing button business is not onboarded', () => {
        const draftPayRun = {
          lines: [
            {
              employeeId: '21',
              isSelected: true,
              payLines: [],
            },
          ],
        };

        store.setState({
          ...store.getState(),
          draftPayRun,
          payDayOnboardedStatus: {
            isBusinessOnboarded: false,
            isUserOnboarded: false,
          },
        });

        const updated = {
          ...props,
          isPaydayFilingEnabled: true,
        };

        const wrapper = mountWithProvider(<RecordPayRunView {...updated} />);
        const button = wrapper
          .find({ testid: 'paydayFilingReportButton' })
          .first();

        button.simulate('click');

        expect(props.onOpenPaydayFilingClick).toHaveBeenCalled();
      });

      it('should have RecordPayRunWithIRFilingModal when business and user are onboarded', () => {
        const draftPayRun = {
          lines: [
            {
              employeeId: '21',
              isSelected: true,
              payLines: [],
            },
          ],
        };

        store.setState({
          ...store.getState(),
          draftPayRun,
          payDayOnboardedStatus: {
            isBusinessOnboarded: true,
            isUserOnboarded: true,
          },
          recordPayRunIRFileModal: true,
        });

        const updated = {
          ...props,
          isPaydayFilingEnabled: true,
        };

        const wrapper = mountWithProvider(<RecordPayRunView {...updated} />);
        expect(wrapper.find('RecordPayRunWithIRFilingModal').exists()).toBe(
          true
        );
      });

      it('should not have RecordPayRunWithIRFilingModal when only business is onboarded', () => {
        const draftPayRun = {
          lines: [
            {
              employeeId: '21',
              isSelected: true,
              payLines: [],
            },
          ],
        };

        store.setState({
          ...store.getState(),
          draftPayRun,
          payDayOnboardedStatus: {
            isBusinessOnboarded: true,
            isUserOnboarded: false,
          },
          recordPayRunIRFileModal: true,
        });

        const updated = {
          ...props,
          isPaydayFilingEnabled: true,
        };

        const wrapper = mountWithProvider(<RecordPayRunView {...updated} />);

        expect(
          wrapper.find({ testid: 'paydayFilingReportButton' }).length
        ).toEqual(0);
        expect(wrapper.find({ testid: 'recordButton' }).first().text()).toEqual(
          'Record'
        );
        expect(wrapper.find('RecordPayRunWithIRFilingModal').exists()).toBe(
          false
        );
      });
    });

    describe('when PayDayFiling is disabled', () => {
      it('should have record action and not display payday filing alert', () => {
        const draftPayRun = {
          lines: [
            {
              employeeId: '21',
              isSelected: true,
              payLines: [],
            },
          ],
        };

        store.setState({
          ...store.getState(),
          draftPayRun,
        });

        const wrapper = mountWithProvider(<RecordPayRunView {...props} />);

        expect(
          wrapper.find({ testid: 'paydayFilingReportButton' }).length
        ).toEqual(0);
        expect(wrapper.find({ testid: 'recordButton' }).first().text()).toEqual(
          'Record'
        );
        expect(wrapper.find('RecordPayRunWithIRFilingModal').exists()).toBe(
          false
        );
      });
    });
  });
});
