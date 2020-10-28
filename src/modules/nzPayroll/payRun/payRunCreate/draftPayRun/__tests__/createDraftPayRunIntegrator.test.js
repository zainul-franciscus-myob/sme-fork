import { UPDATE_DRAFT_PAY_RUN, UPDATE_EMPLOYEE_PAY } from '../../PayRunIntents';
import createDraftPayRunIntegrator from '../createDraftPayRunIntegrator';

describe('Employee pay list integrator', () => {
  describe('update employee pay', () => {
    it('calls integrator with expected parameters', () => {
      const integration = { write: jest.fn() };
      const expectedUrlParams = {
        businessId: 7,
        draftPayRunId: 77,
        employeePayId: 217,
      };
      const expectedContent = {
        name: 'Mary Jones',
        id: 217,
        employeeId: 21,
        daysPaid: 5,
        taxCode: 'M',
        gross: '1500.00',
        takeHomePay: '700.00',
        kiwiSaver: '40.00',
        paye: '110.00',
        isSelected: true,
        payLines: [
          {
            payItemId: 22,
            name: 'Salary Wage',
            type: 'SalaryWage',
            amount: '100000.00',
            quantity: '0.00',
            id: 16,
            calculationType: 'Amount',
            rate: '0.00',
          },
        ],
      };

      const store = {
        getState: () => ({
          businessId: 7,
          draftPayRunId: 77,
          draftPayRun: {
            lines: [expectedContent],
          },
        }),
      };

      const integrator = createDraftPayRunIntegrator(store, integration);

      integrator.updateEmployeePay({
        employeeId: 21,
        onSuccess: () => {},
        onFailure: () => {},
      });

      const parameterObject = integration.write.mock.calls[0][0];
      expect(parameterObject.intent).toEqual(UPDATE_EMPLOYEE_PAY);
      expect(parameterObject.urlParams).toEqual(expectedUrlParams);
      expect(parameterObject.content).toEqual(expectedContent);
    });
  });
  describe('update draft pay run', () => {
    it('calls integrator with expected parameters', () => {
      const integration = { write: jest.fn() };
      const expectedUrlParams = {
        businessId: 7,
        draftPayRunId: 77,
      };
      const draftPayRunState = {
        lines: [
          {
            name: 'Mary Jones',
            id: 217,
            employeeId: 21,
            daysPaid: 5,
            taxCode: 'M',
            gross: '1500.00',
            takeHomePay: '700.00',
            kiwiSaver: '40.00',
            paye: '110.00',
            isSelected: true,
            payLines: [
              {
                payItemId: 22,
                name: 'Salary Wage',
                type: 'SalaryWage',
                amount: '100000.00',
                quantity: '0.00',
                id: 16,
                calculationType: 'Amount',
                rate: '0.00',
              },
            ],
          },
        ],
      };

      const expectedContent = {
        employeePays: [
          {
            id: 217,
            isSelected: true,
          },
        ],
      };

      const store = {
        getState: () => ({
          businessId: 7,
          draftPayRunId: 77,
          draftPayRun: draftPayRunState,
        }),
      };

      const integrator = createDraftPayRunIntegrator(store, integration);

      integrator.updateDraftPayRun({
        onSuccess: () => {},
        onFailure: () => {},
      });

      const parameterObject = integration.write.mock.calls[0][0];
      expect(parameterObject.intent).toEqual(UPDATE_DRAFT_PAY_RUN);
      expect(parameterObject.urlParams).toEqual(expectedUrlParams);
      expect(parameterObject.content).toEqual(expectedContent);
    });
  });
});
