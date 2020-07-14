import { Button } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { NEXT_STEP, SET_EMPLOYEE_PAYMENTS } from '../../PayRunIntents';
import PreparePaySlipsSubModule from '../PreparePaySlipsSubModule';
import PreparePaySlipsView from '../components/PreparePaySlipsView';
import TestStore from '../../../../../../store/TestStore';
import payRunReducer from '../../payRunReducer';
import response from '../../../mappings/data/payRun/recordPayments';

describe('PreparePaySlipsSubModule', () => {
  let store;
  let wrapper;

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () =>
    mountWithProvider(new PreparePaySlipsSubModule({ store }).render());

  beforeEach(() => {
    store = new TestStore(payRunReducer);
    store.dispatch({ intent: SET_EMPLOYEE_PAYMENTS, response });
    wrapper = setup();
    wrapper.update();
  });

  describe('Prepare payslip screen', () => {
    it('displays the PreparePaySlipsView for employee payslips', () => {
      const preparePaySlipsView = wrapper.find(PreparePaySlipsView);
      expect(preparePaySlipsView.exists()).toBe(true);
    });

    it('should dispatch next step action when Next button is clicked', () => {
      const nextButton = wrapper.find({ name: 'next' }).find(Button);
      nextButton.simulate('click');

      expect(store.getActions()).toEqual([
        {
          intent: SET_EMPLOYEE_PAYMENTS,
          response,
        },
        {
          intent: NEXT_STEP,
        },
      ]);
    });
  });
});
