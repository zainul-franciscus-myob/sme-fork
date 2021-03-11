import { Tooltip } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_TERMINATION_EMPLOYEES } from '../TerminationIntents';
import TerminationModule from '../TerminationModule';
import TerminationTable from '../components/TerminationTable';

describe('TerminationModule', () => {
  const employeesResponse = {
    employees: [
      {
        id: '100001',
        payId: 'effa0c73-65c4-409d-a20c-623fbe0c8b17',
        firstName: 'Alf',
        lastName: 'Galang',
        etpCount: 0,
        terminationDate: '12/08/2019',
        payrollYear: 2020,
        ytdGross: 5890,
        ytdTax: 2372,
        isFinalised: true,
        rfbAmount: 123,
        s57aRfbAmount: 321,
      },
      {
        id: '100002',
        payId: '73f25da3-32ef-4ad9-a5cb-74e241b0506b',
        firstName: 'Sarah',
        lastName: 'Boss',
        etpCount: 1,
        terminationDate: '',
        payrollYear: 2020,
        ytdGross: 6000,
        ytdTax: 3000,
        isFinalised: false,
      },
      {
        firstName: 'Harpy',
        id: '100003',
        isFinalised: false,
        lastName: 'Brawn',
        etpCount: 3,
        payId: '00253642-22a3-48f1-a4a3-a6ad48555c6c',
        payrollYear: 2020,
        rfbAmount: 'undefined',
        s57aRfbAmount: 'undefined',
        terminationDate: '03/01/2020',
        ytdGross: 10000,
        ytdTax: 2000,
      },
      {
        firstName: 'Gran',
        id: '100004',
        isFinalised: false,
        lastName: 'Gedup',
        etpCount: 2,
        payId: '81aefddf-c2e3-4b86-abf1-6321cca56598',
        payrollYear: 2020,
        terminationDate: '',
        ytdGross: 23148,
        ytdTax: 5432,
      },
    ],
    payrollYears: [
      {
        endDate: '2020-06-30',
        label: '2019/20',
        startDate: '2019-07-01',
        year: '2020',
      },
      {
        endDate: '2019-06-30',
        label: '2018/19',
        startDate: '2018-07-01',
        year: '2019',
      },
      {
        endDate: '2018-06-30',
        label: '2017/18',
        startDate: '2017-07-01',
        year: '2018',
      },
    ],
  };

  const setupModule = (setAlert = {}, featureToggles) => {
    const integration = {
      read: ({ intent, onSuccess }) => {
        if (intent === LOAD_TERMINATION_EMPLOYEES) onSuccess(employeesResponse);
      },
    };

    const module = new TerminationModule({
      integration,
      setAlert,
      featureToggles,
    });

    module.run({});
    const wrapper = mount(module.getView());
    wrapper.update();
    return wrapper;
  };

  describe('ETP page', () => {
    it('should not render etp link and show tooltip', () => {
      const wrapper = setupModule({});

      const terminationView = wrapper.find(TerminationTable);
      expect(terminationView.find({ name: 'view-etp-link' })).toHaveLength(0);
      expect(terminationView.find(Tooltip)).toHaveLength(3);
    });
  });
});
