import {
  getIsLoading,
  getIsRegisteredForStp,
  getIsStpDeclarationOpen,
  getPayRunId,
  getRecordPayContents,
  getRecordStpDeclarationContents,
  getStpAlertMessage,
  getStpDeclarationName,
} from '../RecordPayRunSelectors';

describe('RecordPayRunSelectors', () => {
  describe('getRecordPayContents', () => {
    it('should get the record pay contents', () => {
      const paymentDates = {
        paymentFrequency: 'Weekly',
        paymentDate: '2019-01-01',
        payPeriodStart: '2019-01-07',
        payPeriodEnd: '2019-01-08',
      };

      const lines = [
        {
          employeeId: '22',
          isSelected: true,
        },
      ];

      const state = {
        payRunId: '21e38491-f9ad-4a06-9da0-540ec07cf551',
        startPayRun: {
          ...paymentDates,
        },
        employeePayList: {
          lines: [
            {
              employeeId: '21',
              isSelected: false,
            },
            {
              employeeId: '22',
              isSelected: true,
            },
          ],
        },
      };

      const actual = getRecordPayContents(state);

      expect(actual.payRunId).toEqual(state.payRunId);
      expect(actual.paymentFrequency).toEqual(paymentDates.paymentFrequency);
      expect(actual.paymentDate).toEqual(paymentDates.paymentDate);
      expect(actual.payPeriodStart).toEqual(paymentDates.payPeriodStart);
      expect(actual.payPeriodEnd).toEqual(paymentDates.payPeriodEnd);
      expect(actual.employeePayLines).toEqual(lines);
    });
  });

  describe('getIsStpDeclarationOpen', () => {
    it('should get whether the STP Declaration modal is open or not', () => {
      const state = {
        recordPayRun: {
          stp: {
            isOpen: true,
          },
        },
      };

      expect(getIsStpDeclarationOpen(state)).toEqual(true);
    });
  });

  describe('getStpAlertMessage', () => {
    it('should get the alert for the STP Declaration modal', () => {
      const state = {
        recordPayRun: {
          stp: {
            alertMessage: 'This is an error',
          },
        },
      };

      expect(getStpAlertMessage(state)).toEqual(state.recordPayRun.stp.alertMessage);
    });
  });

  describe('getIsLoading', () => {
    it('should get the loading state for the STP Declaration modal', () => {
      const state = {
        recordPayRun: {
          stp: {
            isLoading: true,
          },
        },
      };

      expect(getIsLoading(state)).toEqual(true);
    });
  });

  describe('getStpDeclarationName', () => {
    it('should get the name value for the STP Declaration modal', () => {
      const state = {
        recordPayRun: {
          stp: {
            name: 'Bob',
          },
        },
      };

      expect(getStpDeclarationName(state)).toEqual('Bob');
    });
  });

  describe('getIsRegisteredForStp', () => {
    it('should return true when the STP registration status is registered', () => {
      const state = {
        employeePayList: {
          stpRegistrationStatus: 'registered',
        },
      };

      expect(getIsRegisteredForStp(state)).toEqual(true);
    });

    it('should return false when the STP registration status is notRegistered', () => {
      const state = {
        employeePayList: {
          stpRegistrationStatus: 'notRegistered',
        },
      };

      expect(getIsRegisteredForStp(state)).toEqual(false);
    });

    it('should return false when the STP registration status is lostConnection', () => {
      const state = {
        employeePayList: {
          stpRegistrationStatus: 'lostConnection',
        },
      };

      expect(getIsRegisteredForStp(state)).toEqual(false);
    });
  });

  describe('getRecordStpDeclarationContents', () => {
    it('should get contents to record the STP declaration', () => {
      const state = {
        recordPayRun: {
          stp: {
            name: 'Bob',
          },
        },
      };

      expect(getRecordStpDeclarationContents(state)).toEqual({ name: 'Bob' });
    });
  });

  describe('getPayRunId', () => {
    it('should get the Pay Run Id from the state', () => {
      const state = {
        payRunId: 'some random id',
      };

      expect(getPayRunId(state)).toEqual('some random id');
    });
  });
});
