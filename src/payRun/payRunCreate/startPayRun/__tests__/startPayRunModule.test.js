import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import React from 'react';

import PayRunModule from '../../PayRunModule';
import StartPayRunModule from '../StartPayRunModule';
import startNewPayRunResponse from '../../../../integration/data/payRun/startNewPayRun';

Enzyme.configure({ adapter: new Adapter() });

describe('StartPayRunModule', () => {
  const constructStartPayRunModule = (successResponse) => {
    const integration = {
      read: ({ onSuccess }) => {
        onSuccess(
          successResponse || startNewPayRunResponse,
        );
      },
    };

    const pushMessage = [];
    const payRunModule = new PayRunModule(integration, {}, pushMessage);
    const { store } = payRunModule;
    const module = new StartPayRunModule({ integration, store, pushMessage });
    const component = <Provider store={store}>{module.getView()}</Provider>;

    const wrapper = mount(component);
    return wrapper;
  };

  it('renders the title of the module', () => {
    const wrapper = constructStartPayRunModule();
    const header = wrapper.find({ testid: 'startPayRunViewPageHead' });

    expect(header).toHaveLength(1);
  });

  it('renders the pay cycle', () => {
    const wrapper = constructStartPayRunModule();
    const payCycleDropDown = wrapper.find({ testid: 'payCycleDropDown' });

    expect(payCycleDropDown).toHaveLength(1);
  });

  describe('ExistingPayRunModal', () => {
    it('When there is no draft data, the modal should not be rendered', () => {
      const successResponse = {
        ...startNewPayRunResponse,
        draftPayRun: null,
      };
      const wrapper = constructStartPayRunModule(successResponse);

      const modal = wrapper.find({ testid: 'existingPayRunModal' });

      expect(modal).toHaveLength(0);
    });

    it.skip('When there is draft data, the modal should be rendered', () => {
      const wrapper = constructStartPayRunModule();

      const modal = wrapper.find({ testid: 'existingPayRunModal' });

      expect(modal).toHaveLength(1);
    });
  });
});
