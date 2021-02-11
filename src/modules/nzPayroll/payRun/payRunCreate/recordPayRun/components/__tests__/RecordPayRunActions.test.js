import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import MainActionType from '../RecordPayRunMainActionType';
import RecordPayRunActions from '../RecordPayRunActions';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('RecordPayRunActions', () => {
  let store;
  const props = {
    onPreviousButtonClick: jest.fn(),
    onMainActionButtonClick: jest.fn(),
    onViewPayrollVerifyReportClick: jest.fn(),
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('Record Pay Actions buttons', () => {
    [
      { buttonName: 'record', expectedHandler: props.onMainActionButtonClick },
      { buttonName: 'previous', expectedHandler: props.onPreviousButtonClick },
      {
        buttonName: 'payrollVerificationReport',
        expectedHandler: props.onViewPayrollVerifyReportClick,
      },
    ].forEach(({ buttonName, expectedHandler }) => {
      it(`Clicking ${buttonName} button should call expected handler`, () => {
        // Arrange
        const wrapper = mountWithProvider(<RecordPayRunActions {...props} />);
        const button = wrapper.find({ name: buttonName }).find('button');
        // Act
        button.simulate('click');
        // Assert
        expect(expectedHandler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Payday filing is enabled', () => {
    describe('Record Pay Actions Next button', () => {
      [
        { buttonName: 'next', expectedHandler: props.onMainActionButtonClick },
      ].forEach(({ buttonName, expectedHandler }) => {
        it(`Clicking ${buttonName} button should call expected handler`, () => {
          const onboarded = {
            ...props,
            mainActionType: MainActionType.NEXT,
          };

          // Arrange
          const wrapper = mountWithProvider(
            <RecordPayRunActions {...onboarded} />
          );
          const button = wrapper.find({ name: buttonName }).find('button');
          // Act
          button.simulate('click');
          // Assert
          expect(expectedHandler).toHaveBeenCalledTimes(1);
        });
      });
    });

    it('Should show record without filling with IR when business and user not onboarded', () => {
      const onboarded = {
        ...props,
        mainActionType: MainActionType.RECORD_WITHOUT_FILING,
      };

      const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
      expect(
        wrapper.find({ testid: 'recordWithoutFilingButton' }).first().text()
      ).toEqual('Record without filing with IR');
      expect(wrapper.find({ testid: 'recordButton' }).length).toBe(0);
      expect(wrapper.find({ testid: 'nextButton' }).length).toBe(0);
    });

    it('Should show record when business is onboarded, user not onboarded', () => {
      const onboarded = {
        ...props,
        mainActionType: MainActionType.RECORD,
      };

      const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
      expect(wrapper.find({ testid: 'recordButton' }).first().text()).toEqual(
        'Record'
      );
      expect(wrapper.find({ testid: 'recordWithoutFilingButton' }).length).toBe(
        0
      );
      expect(wrapper.find({ testid: 'nextButton' }).length).toBe(0);
    });

    it('Should show next when business is onboarded, user onboarded', () => {
      const onboarded = {
        ...props,
        mainActionType: MainActionType.NEXT,
      };

      const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
      expect(wrapper.find({ testid: 'nextButton' }).first().text()).toEqual(
        'Next'
      );
      expect(wrapper.find({ testid: 'recordWithoutFilingButton' }).length).toBe(
        0
      );
      expect(wrapper.find({ testid: 'recordButton' }).length).toBe(0);
    });

    it('Should show record without filling with IR when business not onboarded, user onboarded', () => {
      const onboarded = {
        ...props,
        mainActionType: MainActionType.RECORD_WITHOUT_FILING,
      };

      const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
      expect(
        wrapper.find({ testid: 'recordWithoutFilingButton' }).first().text()
      ).toEqual('Record without filing with IR');
      expect(wrapper.find({ testid: 'recordButton' }).length).toBe(0);
      expect(wrapper.find({ testid: 'nextButton' }).length).toBe(0);
    });
  });

  describe('Payday filing is disabled', () => {
    it('Should show record when business and user are onboarded', () => {
      const onboarded = {
        ...props,
        isPaydayFilingEnabled: false,
        isBusinessOnboarded: true,
        isUserOnboarded: true,
      };

      const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
      expect(wrapper.find({ testid: 'recordButton' }).first().text()).toEqual(
        'Record'
      );
      expect(wrapper.find({ testid: 'recordWithoutFilingButton' }).length).toBe(
        0
      );
      expect(wrapper.find({ testid: 'nextButton' }).length).toBe(0);
    });

    it('Should show record when business and user are not onboarded', () => {
      const onboarded = {
        ...props,
        isPaydayFilingEnabled: false,
        isBusinessOnboarded: false,
        isUserOnboarded: false,
      };

      const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
      expect(wrapper.find({ testid: 'recordButton' }).first().text()).toEqual(
        'Record'
      );
      expect(wrapper.find({ testid: 'recordWithoutFilingButton' }).length).toBe(
        0
      );
      expect(wrapper.find({ testid: 'nextButton' }).length).toBe(0);
    });

    it('Should show record when business onboarded, user not onboarded', () => {
      const onboarded = {
        ...props,
        isPaydayFilingEnabled: false,
        isBusinessOnboarded: true,
        isUserOnboarded: false,
      };

      const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
      expect(wrapper.find({ testid: 'recordButton' }).first().text()).toEqual(
        'Record'
      );
      expect(wrapper.find({ testid: 'recordWithoutFilingButton' }).length).toBe(
        0
      );
      expect(wrapper.find({ testid: 'nextButton' }).length).toBe(0);
    });

    it('Should show record when business not onboarded, user onboarded', () => {
      const onboarded = {
        ...props,
        isPaydayFilingEnabled: false,
        isBusinessOnboarded: false,
        isUserOnboarded: true,
      };

      const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
      expect(wrapper.find({ testid: 'recordButton' }).first().text()).toEqual(
        'Record'
      );
      expect(wrapper.find({ testid: 'recordWithoutFilingButton' }).length).toBe(
        0
      );
      expect(wrapper.find({ testid: 'nextButton' }).length).toBe(0);
    });
  });
});
