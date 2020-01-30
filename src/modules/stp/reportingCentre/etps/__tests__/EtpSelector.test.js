import {
  getAllSelectedStatus,
  getDeleteEtpsContent,
  getLoadEmployeeEtpsParams,
  getLoadEmployeeEtpsUrlParams,
  getStpDeclarationContext,
  getStpTerminationsLink,
} from '../EtpSelector';

describe('EtpSelector', () => {
  describe('getAllSelectedStatus', () => {
    it('should return checked if all the pays are selected', () => {
      const state = {
        pays: [
          {
            id: '1',
            isSelected: true,
          },
          {
            id: '2',
            isSelected: true,
          },
        ],
      };

      const result = getAllSelectedStatus(state);

      expect(result).toEqual('checked');
    });

    it('should return indeterminate if some pays are selected', () => {
      const state = {
        pays: [
          {
            id: '1',
            isSelected: true,
          },
          {
            id: '2',
            isSelected: false,
          },
        ],
      };

      const result = getAllSelectedStatus(state);

      expect(result).toEqual('indeterminate');
    });

    it('should return emtpy if no pays are selected', () => {
      const state = {
        pays: [
          {
            id: '1',
            isSelected: false,
          },
          {
            id: '2',
            isSelected: false,
          },
        ],
      };

      const result = getAllSelectedStatus(state);

      expect(result).toEqual('');
    });
  });

  describe('getLoadEmployeeEtpsUrlParams', () => {
    it('should get the load employee ETPs url params', () => {
      const state = {
        businessId: '123',
        employeeId: '321',
      };

      const result = getLoadEmployeeEtpsUrlParams(state);

      const expected = {
        businessId: '123',
        employeeId: '321',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getLoadEmployeeEtpsParams', () => {
    it('should get the load employee ETPs params', () => {
      const state = {
        year: '2020',
      };

      const result = getLoadEmployeeEtpsParams(state);

      const expected = {
        year: '2020',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getStpTerminationsLink', () => {
    it('should get the STP Termination link', () => {
      const state = {
        businessId: '123',
        region: 'au',
      };

      const result = getStpTerminationsLink(state);

      expect(result).toEqual('/#/au/123/stp/reportingCentre?tab=terminations');
    });
  });

  describe('getStpDeclarationContext', () => {
    it('should get the STP declaration context', () => {
      const state = {
        eventId: '123',
        businessId: '321',
      };

      const result = getStpDeclarationContext(state);

      const expected = {
        eventId: '123',
        businessId: '321',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getDeleteEtpsContent', () => {
    it('should get the Delete ETPs content', () => {
      const state = {
        eventId: '123',
        pays: [
          {
            id: 'test1',
            isSelected: false,
          },
          {
            id: 'test2',
            isSelected: true,
          },
          {
            id: 'test3',
          },
        ],
      };

      const result = getDeleteEtpsContent(state);

      const expected = {
        eventId: '123',
        pays: [
          'test2',
        ],
      };

      expect(result).toEqual(expected);
    });
  });
});
