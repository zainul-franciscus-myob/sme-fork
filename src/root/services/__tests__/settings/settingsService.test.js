import SettingsService from '../../settings';
import load from '../../settings/load';
import save from '../../settings/save';

jest.mock('../../settings/load');
jest.mock('../../settings/save');

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

  describe('save', () => {
    it('will call the save method', () => {
      const content = {};
      const dispatcher = jest.fn();
      const integration = jest.fn();
      const store = jest.fn();
      const service = SettingsService(dispatcher, integration, store);

      service.save(content);

      expect(save).toHaveBeenCalled();
    });
  });
});
