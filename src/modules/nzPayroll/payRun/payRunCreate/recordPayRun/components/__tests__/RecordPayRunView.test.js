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
      describe('when business is not onboarded', () => {
        it('should display payday filing alert and Record without filing with IR Action', () => {
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
          expect(wrapper.find({ testid: 'nextButton' }).length).toEqual(0);
          expect(
            wrapper.find({ name: 'businessNotOnboardedAlert' }).exists()
          ).toBe(true);
          expect(wrapper.find('RecordPayRunIRFilingModal').exists()).toBe(
            false
          );
        });
      });

      describe('when business is onboarded', () => {
        describe('when user is onboarded', () => {
          it('should have Next Action and not display payday filing alert', () => {
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
                isUserSessionValid: true,
              },
            });

            const updated = {
              ...props,
              isPaydayFilingEnabled: true,
            };

            const wrapper = mountWithProvider(
              <RecordPayRunView {...updated} />
            );

            expect(
              wrapper.find({ testid: 'paydayFilingReportButton' }).length
            ).toEqual(0);
            expect(
              wrapper.find({ testid: 'nextButton' }).first().text()
            ).toEqual('Next');
            expect(wrapper.find('Alert').exists()).toBe(false);
          });

          it('should have RecordPayRunIRFilingModal', () => {
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
                isUserSessionValid: true,
              },
              recordPayRunIRFileModal: true,
            });

            const updated = {
              ...props,
              isPaydayFilingEnabled: true,
            };

            const wrapper = mountWithProvider(
              <RecordPayRunView {...updated} />
            );
            const irFileModal = wrapper.find('RecordPayRunIRFilingModal');
            expect(irFileModal.exists()).toBe(true);
          });
        });

        describe('when user is not onboarded', () => {
          it('should have Next Action and display payday filing alert', () => {
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
                isUserSessionValid: false,
              },
            });

            const updated = {
              ...props,
              isPaydayFilingEnabled: true,
            };

            const wrapper = mountWithProvider(
              <RecordPayRunView {...updated} />
            );

            expect(
              wrapper.find({ testid: 'paydayFilingReportButton' }).length
            ).toEqual(0);
            expect(
              wrapper.find({ testid: 'nextButton' }).first().text()
            ).toEqual('Next');
            expect(
              wrapper.find({ name: 'userNotOnboardedAlert' }).exists()
            ).toBe(true);
          });

          it('should have RecordPayRunIRFilingModal', () => {
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
                isUserSessionValid: false,
              },
              recordPayRunIRFileModal: true,
            });

            const updated = {
              ...props,
              isPaydayFilingEnabled: true,
            };

            const wrapper = mountWithProvider(
              <RecordPayRunView {...updated} />
            );
            const irFileModal = wrapper.find('RecordPayRunIRFilingModal');
            expect(
              wrapper.find({ testid: 'paydayFilingReportButton' }).length
            ).toEqual(0);
            expect(irFileModal.exists()).toBe(true);
          });
        });
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
        expect(wrapper.find('recordPayRunIRFilingModal').exists()).toBe(false);
      });
    });
  });
});
