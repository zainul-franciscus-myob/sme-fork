import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  CLOSE_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
  LOAD_PAYDAY_ONBOARDED_STATUS,
  NEXT_STEP,
  OPEN_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
  PREVIOUS_STEP,
  RECORD_PAYMENTS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TOTAL_TAKE_HOME_PAY,
} from '../../PayRunIntents';
import { RECORD_AND_REPORT } from '../../payRunSteps';
import { findButtonWithTestId } from '../../../../../../common/tests/selectors';
import AlertType from '../../types/AlertType';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import RecordPayRunSubModule from '../RecordPayRunSubModule';
import TestIntegration from '../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../store/TestStore';
import payRunReducer from '../../payRunReducer';

describe('RecordPayRunSubModule', () => {
  const constructRecordPayRunSubModule = (
    featureToggles = {
      isPaydayFilingEnabled: false,
    }
  ) => {
    const store = new TestStore(payRunReducer);
    const integration = new TestIntegration();
    const navigateToName = jest.fn();
    const recordPayRunSubModule = new RecordPayRunSubModule({
      integration,
      store,
      featureToggles,
      navigateToName,
    });

    const view = recordPayRunSubModule.render();

    const wrappedView = <Provider store={store}>{view}</Provider>;

    const wrapper = mount(wrappedView);

    wrapper.update();
    return {
      store,
      integration,
      wrapper,
    };
  };

  describe('Record button', () => {
    it('sets employee payments when integration is successful', () => {
      const { store, integration, wrapper } = constructRecordPayRunSubModule();

      const recordButton = findButtonWithTestId(wrapper, 'recordButton');
      recordButton.simulate('click');

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
          intent: SET_ALERT,
          alert: undefined,
        },
        {
          intent: NEXT_STEP,
        },
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({
          intent: RECORD_PAYMENTS,
          urlParams: { businessId: undefined, draftPayRunId: -1 },
          params: undefined,
        })
      );
    });

    it('displays an alert message when integration is unsuccessful', () => {
      const { store, integration, wrapper } = constructRecordPayRunSubModule();

      const message = 'this failed!';
      const type = AlertType.ERROR;

      integration.mapFailure(RECORD_PAYMENTS, { message });

      const recordButton = findButtonWithTestId(wrapper, 'recordButton');
      recordButton.simulate('click');

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
          intent: SET_ALERT,
          alert: { type, message },
        },
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({
          intent: RECORD_PAYMENTS,
          urlParams: { businessId: undefined, draftPayRunId: -1 },
          params: undefined,
        })
      );
    });

    describe('Payday Filing enabled', () => {
      describe('Business and user are not onboarded', () => {
        it('should proceed to prepare payslips step', () => {
          const featureToggles = {
            isPaydayFilingEnabled: true,
          };

          const {
            store,
            wrapper,
            integration,
          } = constructRecordPayRunSubModule(featureToggles);

          store.setState({
            ...store.getState(),
            step: RECORD_AND_REPORT,
            totalTakeHomePay: 10,
          });

          const recordButton = findButtonWithTestId(
            wrapper,
            'recordWithoutFilingButton'
          );

          recordButton.simulate('click');

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
              intent: SET_ALERT,
              alert: undefined,
            },
            {
              intent: NEXT_STEP,
            },
          ]);
          expect(store.getState().step.key).toEqual('preparePaySlips');
          expect(wrapper.find('RecordPayRunWithIRFilingModal').exists()).toBe(
            false
          );
          expect(integration.getRequests()).toContainEqual(
            expect.objectContaining({
              intent: RECORD_PAYMENTS,
              urlParams: { businessId: undefined, draftPayRunId: -1 },
              params: undefined,
            })
          );
        });
      });

      describe('Business is onboarded and user is not onboarded', () => {
        it('should proceed to prepare payslips step', () => {
          const featureToggles = {
            isPaydayFilingEnabled: true,
          };

          const {
            store,
            wrapper,
            integration,
          } = constructRecordPayRunSubModule(featureToggles);

          store.setState({
            ...store.getState(),
            step: RECORD_AND_REPORT,
            totalTakeHomePay: 10,
          });

          store.dispatch({
            intent: LOAD_PAYDAY_ONBOARDED_STATUS,
            payDayOnboardedStatus: {
              isBusinessOnboarded: true,
              isUserOnboarded: false,
            },
          });

          wrapper.update();
          const nextButton = findButtonWithTestId(wrapper, 'recordButton');

          nextButton.simulate('click');

          expect(store.getActions()).toEqual([
            {
              intent: LOAD_PAYDAY_ONBOARDED_STATUS,
              payDayOnboardedStatus: {
                isBusinessOnboarded: true,
                isUserOnboarded: false,
              },
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING_SUCCESS,
            },
            {
              intent: SET_ALERT,
              alert: undefined,
            },
            {
              intent: NEXT_STEP,
            },
          ]);

          expect(store.getState().step.key).toEqual('preparePaySlips');
          expect(wrapper.find('RecordPayRunWithIRFilingModal').exists()).toBe(
            false
          );
          expect(integration.getRequests()).toContainEqual(
            expect.objectContaining({
              intent: RECORD_PAYMENTS,
              urlParams: { businessId: undefined, draftPayRunId: -1 },
              params: undefined,
            })
          );
        });
      });

      describe('Business and user are onboarded', () => {
        it('should display RecordPayRunWithIRFilingModal', () => {
          const featureToggles = {
            isPaydayFilingEnabled: true,
          };

          const { store, wrapper } = constructRecordPayRunSubModule(
            featureToggles
          );

          store.setState({
            ...store.getState(),
            step: RECORD_AND_REPORT,
            totalTakeHomePay: 10,
          });

          store.dispatch({
            intent: LOAD_PAYDAY_ONBOARDED_STATUS,
            payDayOnboardedStatus: {
              isBusinessOnboarded: true,
              isUserOnboarded: true,
            },
          });

          wrapper.update();
          const nextButton = findButtonWithTestId(wrapper, 'nextButton');

          nextButton.simulate('click');

          expect(store.getActions()).toEqual([
            {
              intent: LOAD_PAYDAY_ONBOARDED_STATUS,
              payDayOnboardedStatus: {
                isBusinessOnboarded: true,
                isUserOnboarded: true,
              },
            },
            {
              intent: OPEN_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
            },
          ]);

          expect(wrapper.find('RecordPayRunWithIRFilingModal').exists()).toBe(
            true
          );
        });

        describe('RecordPayRunWithIRFilingModal is open and Record is pressed', () => {
          it('should close modal', () => {
            const featureToggles = {
              isPaydayFilingEnabled: true,
            };

            const {
              store,
              wrapper,
              integration,
            } = constructRecordPayRunSubModule(featureToggles);

            store.setState({
              ...store.getState(),
              step: RECORD_AND_REPORT,
              totalTakeHomePay: 10,
            });

            store.dispatch({
              intent: LOAD_PAYDAY_ONBOARDED_STATUS,
              payDayOnboardedStatus: {
                isBusinessOnboarded: true,
                isUserOnboarded: true,
              },
            });

            wrapper.update();
            const nextButton = findButtonWithTestId(wrapper, 'nextButton');

            nextButton.simulate('click');

            const recordAndFile = wrapper
              .find({ name: 'recordAndFile' })
              .find('button');

            recordAndFile.simulate('click');

            expect(store.getActions()).toEqual([
              {
                intent: LOAD_PAYDAY_ONBOARDED_STATUS,
                payDayOnboardedStatus: {
                  isBusinessOnboarded: true,
                  isUserOnboarded: true,
                },
              },
              {
                intent: OPEN_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
              },
              {
                intent: SET_LOADING_STATE,
                loadingState: LoadingState.LOADING,
              },
              {
                intent: SET_LOADING_STATE,
                loadingState: LoadingState.LOADING_SUCCESS,
              },
              {
                intent: SET_ALERT,
                alert: undefined,
              },
              {
                intent: NEXT_STEP,
              },
            ]);

            expect(wrapper.find('RecordPayRunWithIRFilingModal').exists()).toBe(
              true
            );

            expect(integration.getRequests()).toContainEqual(
              expect.objectContaining({
                intent: RECORD_PAYMENTS,
                urlParams: { businessId: undefined, draftPayRunId: -1 },
                params: undefined,
              })
            );
          });
        });

        describe('RecordPayRunWithIRFilingModal is open and Go Back is pressed', () => {
          it('should close modal and return to Record and report', () => {
            const featureToggles = {
              isPaydayFilingEnabled: true,
            };

            const { store, wrapper } = constructRecordPayRunSubModule(
              featureToggles
            );

            store.setState({
              ...store.getState(),
              step: RECORD_AND_REPORT,
              totalTakeHomePay: 10,
            });

            store.dispatch({
              intent: LOAD_PAYDAY_ONBOARDED_STATUS,
              payDayOnboardedStatus: {
                isBusinessOnboarded: true,
                isUserOnboarded: true,
              },
            });

            wrapper.update();
            const nextButton = findButtonWithTestId(wrapper, 'nextButton');

            nextButton.simulate('click');

            const goBack = wrapper.find({ name: 'goBack' }).find('button');

            goBack.simulate('click');

            expect(store.getActions()).toEqual([
              {
                intent: LOAD_PAYDAY_ONBOARDED_STATUS,
                payDayOnboardedStatus: {
                  isBusinessOnboarded: true,
                  isUserOnboarded: true,
                },
              },
              {
                intent: OPEN_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
              },
              {
                intent: CLOSE_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
              },
            ]);

            expect(wrapper.find('RecordPayRunWithIRFilingModal').exists()).toBe(
              false
            );
          });
        });
      });
    });
  });

  describe('Previous button', () => {
    it('returns to the previous page and resets total take home pay to null', () => {
      const { store, wrapper } = constructRecordPayRunSubModule();

      store.setState({
        ...store.getState(),
        step: RECORD_AND_REPORT,
        totalTakeHomePay: 10,
      });

      const previousButton = findButtonWithTestId(wrapper, 'previousButton');

      previousButton.simulate('click');

      expect(store.getActions()).toEqual([
        {
          intent: SET_TOTAL_TAKE_HOME_PAY,
          totalTakeHomePay: null,
        },
        {
          intent: PREVIOUS_STEP,
        },
      ]);
      expect(store.getState().totalTakeHomePay).toBeNull();
      expect(store.getState().step.key).toEqual('draftPayRun');
    });
  });
});
