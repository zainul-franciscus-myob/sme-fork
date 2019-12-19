import save from '../save';

describe('SettingsService', () => {
  describe('save', () => {
    it('saves to the integration', () => {
      const data = {};

      const store = {
        getState: () => ({ businessId: '123' }),
      };

      const dispatcher = {
        saveSettings: jest.fn(),
        setLoadingState: jest.fn(),
      };

      const integration = {
        write: jest.fn().mockImplementation(({ onSuccess }) => onSuccess(data)),
      };

      save(dispatcher, integration, store);

      expect(dispatcher.saveSettings).toBeCalledWith(data);
      expect(dispatcher.setLoadingState).toBeCalledWith(false);
    });
  });
});
