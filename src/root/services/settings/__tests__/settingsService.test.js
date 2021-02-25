import SettingsService from '../index';
import load from '../load';

jest.mock('../../settings/load');

describe('SettingsService', () => {
  describe('load', () => {
    it('will call the load method', () => {
      const context = {};
      const dispatcher = jest.fn();
      const integration = jest.fn();
      const store = jest.fn();
      const service = SettingsService(dispatcher, integration, store);

      service.load(context);

      expect(load).toHaveBeenCalled();
    });
  });
});
