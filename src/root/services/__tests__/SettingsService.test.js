import SettingsService from '../SettingsService';
import load from '../load';
import save from '../save';

jest.mock('../load');
jest.mock('../save');

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
