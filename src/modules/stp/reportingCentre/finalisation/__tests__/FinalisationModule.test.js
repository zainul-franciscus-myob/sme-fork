import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR, LOAD_INITIAL_EMPLOYEES_AND_HEADERS } from '../FinalisationIntents';
import FinalisationModule from '../FinalisationModule';
import loadFinalisation from '../../mappings/data/loadFinalisationInitialEmployeesAndHeaderDetailsResponse';

describe('FinalisationModule', () => {
  const defaultIntegration = {
    write: ({ onSuccess }) => onSuccess({}),
    read: ({ onSuccess }) => onSuccess({}),
  };

  const constructModule = (integration) => {
    const module = new FinalisationModule({
      integration: {
        ...defaultIntegration,
        ...integration,
      },
    });

    const wrapper = mount(module.getView());
    module.run();
    wrapper.update();

    return {
      wrapper,
      module,
    };
  };

  describe('Payroll year selector', () => {
    it('fetches new information on change', () => {
      const integration = {
        read: ({ intent, onSuccess }) => {
          switch (intent) {
            case LOAD_INITIAL_EMPLOYEES_AND_HEADERS:
              onSuccess(loadFinalisation);
              break;
            case LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR:
              onSuccess({
                employees: [
                  {
                    name: 'NEW USER',
                  },
                ],
              });
              break;
            default:
              throw new Error(`unmocked intent "${intent.toString()}"`);
          }
        },
      };
      const { wrapper } = constructModule(integration);
      const payrollYearField = wrapper.find({ testid: 'payrollYearFilter' });

      expect(payrollYearField).toHaveLength(1);
      payrollYearField.prop('onPayrollYearChange')('2019');
      wrapper.update();

      expect(wrapper.find(Table.Row)).toHaveLength(1);
      expect(wrapper.find(Table.Row).first().text()).toContain('NEW USER');
    });
  });
});
