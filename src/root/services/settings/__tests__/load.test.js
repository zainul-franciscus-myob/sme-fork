import load from '../load';

describe('SettingsService', () => {
  describe('load', () => {
    const data = { previousSettingsBusinessId: 'hi' };
    let dispatcher;
    let integration;

    beforeEach(() => {
      dispatcher = {
        loadSettings: jest.fn(),
      };

      integration = {
        read: jest.fn().mockImplementation(({ onSuccess }) => onSuccess(data)),
      };
    });
    it('should call integration when businessId exists and settings have not been loaded previously', async () => {
      const store = {
        getState: () => ({
          areOnboardingSettingsLoaded: false,
          businessId: 'hi',
        }),
      };

      await load(dispatcher, integration, store);
      expect(dispatcher.loadSettings).toBeCalledWith(data);
    });

    it('should not integration when businessId is missing', () => {
      const store = {
        getState: () => ({
          previousSettingsBusinessId: 'hi',
          areOnboardingSettingsLoaded: false,
        }),
      };

      load(dispatcher, integration, store);
      expect(dispatcher.loadSettings).toBeCalledTimes(0);
    });

    it('should not integration when settings have been loaded previously', () => {
      const store = {
        getState: () => ({
          previousSettingsBusinessId: 'hi',
          businessId: 'hi',
          areOnboardingSettingsLoaded: true,
        }),
      };

      load(dispatcher, integration, store);
      expect(dispatcher.loadSettings).toBeCalledTimes(0);
    });

    it('should call to integration when the businessId changes', async () => {
      const store = {
        getState: () => ({
          areOnboardingSettingsLoaded: true,
          previousSettingsBusinessId: 'not hi',
          businessId: 'hi',
        }),
      };

      await load(dispatcher, integration, store);
      expect(dispatcher.loadSettings).toBeCalledWith(data);
    });
  });
});
