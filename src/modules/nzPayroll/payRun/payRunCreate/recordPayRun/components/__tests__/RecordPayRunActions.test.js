import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import RecordPayRunActions from '../RecordPayRunActions';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('RecordPayRunActions', () => {
  let store;
  const props = {
    onPreviousButtonClick: jest.fn(),
    onRecordButtonClick: jest.fn(),
    onViewPayrollVerifyReportClick: jest.fn(),
    isBusinessOnboarded: false,
    isPaydayFilingEnabled: false,
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
      { buttonName: 'save', expectedHandler: props.onRecordButtonClick },
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

  it('Should show record without filling with IR when business not onboarded', () => {
    const onboarded = {
      ...props,
      isPaydayFilingEnabled: true,
    };
    store.setState({
      ...store.getState(),
      isBusinessOnboarded: false,
    });

    const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
    expect(
      wrapper.find({ testid: 'saveWithoutFilingButton' }).first().text()
    ).toEqual('Record pay run without filing with IR');
    expect(wrapper.find({ testid: 'saveButton' }).length).toBe(0);
  });

  it('Should show record when business is onboarded', () => {
    const onboarded = {
      ...props,
      isPaydayFilingEnabled: true,
    };

    store.setState({
      ...store.getState(),
      isBusinessOnboarded: true,
    });

    const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
    expect(wrapper.find({ testid: 'saveButton' }).first().text()).toEqual(
      'Record'
    );
    expect(wrapper.find({ testid: 'saveWithoutFilingButton' }).length).toBe(0);
  });

  it('Should show record when payday filing is not enabled', () => {
    const onboarded = {
      ...props,
      isPaydayFilingEnabled: false,
    };

    store.setState({
      ...store.getState(),
      isBusinessOnboarded: true,
    });

    const wrapper = mountWithProvider(<RecordPayRunActions {...onboarded} />);
    expect(wrapper.find({ testid: 'saveButton' }).first().text()).toEqual(
      'Record'
    );
    expect(wrapper.find({ testid: 'saveWithoutFilingButton' }).length).toBe(0);
  });
});
