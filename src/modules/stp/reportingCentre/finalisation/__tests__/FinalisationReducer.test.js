import { LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR, UPDATE_EMPLOYEE_ROW } from '../FinalisationIntents';
import finalisationReducer from '../FinalisationReducer';
import loadEmployeesAndHeaderDetailsForYearResponse from '../../mappings/data/loadFinalisationEmployeesAndHeaderDetailsForYearResponse';

describe('FinalisationReducer', () => {
  it('Load employees and Headers for year', () => {
    const state = {};

    const action = {
      intent: LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
      response: loadEmployeesAndHeaderDetailsForYearResponse,
    };

    const result = finalisationReducer(state, action);

    expect(result).toEqual({
      employees: [
        {
          id: '100001',
          payId: 'effa0c73-65c4-409d-a20c-623fbe0c8b17',
          firstName: 'Alf',
          lastName: 'Galang',
          name: 'Alf Galang',
          etpCount: 0,
          terminationDate: '12/08/2019',
          payrollYear: 2020,
          ytdGross: 5890,
          ytdTax: 2372,
          isFinalised: true,
          rfbAmount: 123,
          s57aRfbAmount: 321,
          isSelected: false,
        },
      ],
      grossPaymentYtd: '$2000.99',
      paygWithholdingYtd: '$2333.33',
      reportedRfba: '$4999.99',
      reportedSection57aRfba: '$3455.99',
      employeesCount: 4,
    });
  });

  describe('UPDATE_EMPLOYEE_ROW', () => {
    it('updates the correct employee', () => {
      const state = {
        employees: [
          {
            id: '1',
            rfbAmount: 111,
            s57aRfbAmount: 111,
          },
          {
            id: '2',
            rfbAmount: 111,
            s57aRfbAmount: 111,
          },
        ],
      };

      const action = {
        intent: UPDATE_EMPLOYEE_ROW,
        key: 'rfbAmount',
        value: 222,
        rowId: '2',
      };

      const result = finalisationReducer(state, action);

      expect(result).toEqual({
        employees: [
          {
            id: '1',
            rfbAmount: 111,
            s57aRfbAmount: 111,
          },
          {
            id: '2',
            rfbAmount: 222,
            s57aRfbAmount: 111,
          },
        ],
      });
    });

    it('updates the correct employee', () => {
      const state = {
        employees: [
          {
            id: '1',
            rfbAmount: 111,
            s57aRfbAmount: 111,
          },
          {
            id: '2',
            rfbAmount: 111,
            s57aRfbAmount: 111,
          },
        ],
      };

      const action = {
        intent: UPDATE_EMPLOYEE_ROW,
        key: 's57aRfbAmount',
        value: 222,
        rowId: '2',
      };

      const result = finalisationReducer(state, action);

      expect(result).toEqual({
        employees: [
          {
            id: '1',
            rfbAmount: 111,
            s57aRfbAmount: 111,
          },
          {
            id: '2',
            rfbAmount: 111,
            s57aRfbAmount: 222,
          },
        ],
      });
    });
  });
});
