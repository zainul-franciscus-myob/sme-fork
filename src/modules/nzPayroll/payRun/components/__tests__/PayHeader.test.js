import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import PayHeader from '../PayHeader';
import TestStore from '../../../../../store/TestStore';
import payRunReducer from '../../payRunCreate/payRunReducer';

describe('PayHeader', () => {
  let store;
  let wrapper;
  const props = {
    items: [
      {
        label: 'label1',
        name: 'name1',
        testid: 'testid1',
        value: 'value1',
      },
      {
        label: 'label2',
        name: 'name2',
        testid: 'testid2',
        value: 'value2',
      },
    ],
  };
  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  beforeEach(() => {
    store = new TestStore(payRunReducer);
    wrapper = mountWithProvider(<PayHeader {...props} />);
  });

  describe('when PayHeader is rendered', () => {
    it('should display all Pay Header DOM elements', () => {
      expect(wrapper.find('ReadOnly').length).toEqual(props.items.length);
    });

    it('should display all Pay Header DOM elements with correct tag and values', () => {
      let readOnlyElement;
      let spanElement;

      props.items.forEach((item) => {
        readOnlyElement = wrapper.find({ name: item.name }).find('ReadOnly');
        spanElement = readOnlyElement.find('span');

        expect(readOnlyElement.prop('label')).toEqual(item.label);
        expect(spanElement.prop('testid')).toEqual(item.testid);
        expect(spanElement.text()).toEqual(item.value);
      });
    });

    it('should have items wrapped in Card component', () => {
      const cardElement = wrapper.find('Card');
      expect(cardElement.length).toEqual(1);
      expect(cardElement.find('ReadOnly').length).toEqual(props.items.length);
    });
  });
});
