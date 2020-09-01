import { Button, Heading, Label, SubHeadingGroup } from '@myob/myob-widgets';
import { mount } from 'enzyme/build';

import GstCalculatorModule from '../GstCalculatorModule';
import calculateGstTurnover from '../../mappings/data/calculateGstTurnover';

describe('GstCalculatorModule', () => {
  const constructModule = (
    module = new GstCalculatorModule({
      integration: {
        write: ({ onSuccess }) => onSuccess(calculateGstTurnover),
      },
      pushMessage: () => {},
    })
  ) => {
    module.run();

    const wrapper = mount(module.getView());

    wrapper.update();
    return {
      wrapper,
      module,
    };
  };

  it('should set gst turnover amount and percentage when calculate button is clicked', () => {
    const { wrapper } = constructModule();

    wrapper.find(Button).simulate('click');

    const subHeadingGroup = wrapper.find(SubHeadingGroup);

    expect(subHeadingGroup.find(Heading).at(1).find('div').text()).toEqual(
      `${calculateGstTurnover.turnoverPercentage}%`
    );
    expect(subHeadingGroup.find(Label).text()).toEqual('$12,000.00');
  });
});
