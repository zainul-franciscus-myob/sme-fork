import load from '../load';

describe('SettingsService', () => {
  describe('load', () => {
    it('loads from the integration', () => {
      const context = {};
      const data = {};

      const dispatcher = {
        loadSettings: jest.fn(),
      };

      const integration = {
        read: jest.fn().mockImplementation(({ onSuccess }) => onSuccess(data)),
      };

      load(dispatcher, integration, context);
      expect(dispatcher.loadSettings).toBeCalledWith(data);
    });
  });
});
