import {
  getCurrentEmployeeEmail,
  getCurrentEmployeeName, getEmailContentForCurrentEmployee,
  getEmailUrlParams, getEmployeeCount, getIsFinished,
} from '../EmailPaySlipModalSelectors';

describe('EmailPaySlipModalSelectors', () => {
  describe('getCurrentEmployeeName', () => {
    it('should return the name if the employee object exists', () => {
      const state = {
        currentEmployee: {
          name: 'John',
        },
      };

      const actual = getCurrentEmployeeName(state);

      expect(actual).toEqual('John');
    });

    it('should return empty string if the employee object does not exist', () => {
      const state = {};

      const actual = getCurrentEmployeeName(state);

      expect(actual).toEqual('');
    });
  });

  describe('getCurrentEmployeeEmail', () => {
    it('should return the email if the employee object exists', () => {
      const state = {
        currentEmployee: {
          email: 'John',
        },
      };

      const actual = getCurrentEmployeeEmail(state);

      expect(actual).toEqual('John');
    });

    it('should return empty string if the employee object does not exist', () => {
      const state = {};

      const actual = getCurrentEmployeeEmail(state);

      expect(actual).toEqual('');
    });
  });

  describe('getEmailUrlParams', () => {
    it('should return the url params', () => {
      const state = {
        businessId: 321,
        currentEmployee: {
          transactionId: 123,
        },
      };

      const actual = getEmailUrlParams(state);

      expect(actual).toEqual({ businessId: 321, transactionId: 123 });
    });
  });

  describe('getEmployeeCount', () => {
    it('should return the current count + 1', () => {
      const state = {
        currentCount: 12,
      };

      const actual = getEmployeeCount(state);

      expect(actual).toEqual(13);
    });
  });

  describe('getIsFinished', () => {
    it('should return true if the count is equal to the total', () => {
      const state = {
        currentCount: 2,
        employees: [{}, {}, {}],
      };

      const actual = getIsFinished(state);

      expect(actual).toEqual(true);
    });

    it('should return false if the count is more than the total', () => {
      const state = {
        currentCount: 3,
        employees: [{}, {}, {}],
      };

      const actual = getIsFinished(state);

      expect(actual).toEqual(false);
    });

    it('should return true if the count is less than the total', () => {
      const state = {
        currentCount: 1,
        employees: [{}, {}, {}],
      };

      const actual = getIsFinished(state);

      expect(actual).toEqual(false);
    });
  });

  describe('getEmailContentForCurrentEmployee', () => {
    it('should return the email request content', () => {
      const state = {
        emailSettings: {
          fromEmail: 'from@this.email',
          fromName: 'Spicy',
          paySlipBody: 'This is the body',
          paySlipSubject: 'This is the subject',
        },
        currentEmployee: {
          name: 'Sonny',
          email: 'test@lotsaemail.com',
        },
      };

      const actual = getEmailContentForCurrentEmployee(state);

      expect(actual).toEqual({
        fromEmail: 'from@this.email',
        fromName: 'Spicy',
        messageBody: 'This is the body',
        subject: 'This is the subject',
        toName: 'Sonny',
        toEmail: 'test@lotsaemail.com',
      });
    });
  });
});
