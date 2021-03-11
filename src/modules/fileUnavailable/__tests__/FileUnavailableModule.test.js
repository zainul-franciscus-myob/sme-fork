import * as localStorageDriver from '../../../store/localStorageDriver';
import {
  FETCH_FILE_UPDATE_STATUS,
  LOAD_FILE_UNAVAILABLE,
  SET_IS_POLLING,
  SET_UPDATE_FILE_SUCCESS,
  TRIGGER_FILE_UPDATE,
} from '../FileUnavailableIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import FileUnavailableModule from '../FileUnavailableModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createFileUnavailableDispatcher from '../fileUnavailableDispatcher';
import createFileUnavailableIntegration from '../createFileUnavailableIntegration';
import fileUnavailableReducer from '../fileUnavailableReducer';

describe('FileUnavailableModule', () => {
  const mockLocalStorage = () => {
    localStorageDriver.loadSettings = () => {};
  };

  const setup = () => {
    mockLocalStorage();
    const integration = new TestIntegration();
    const store = new TestStore(fileUnavailableReducer);
    const setRootView = () => {};
    const popMessages = () => [];
    const module = new FileUnavailableModule({
      integration,
      setRootView,
      popMessages,
    });
    module.store = store;
    module.dispatcher = createFileUnavailableDispatcher(store);
    module.integrator = createFileUnavailableIntegration(store, integration);

    return { module, store, integration };
  };
  describe('fileUnavailableModule', () => {
    describe('loadFileUnavailable', () => {
      it('should send load_file_unavailable request and trigger polling when online only file', () => {
        const { module, store, integration } = setup();

        module.loadFileUnavailable(
          () => {},
          () => {}
        );

        expect(store.getActions()).toEqual([
          expect.objectContaining({
            intent: LOAD_FILE_UNAVAILABLE,
          }),
          expect.objectContaining({
            intent: SET_IS_POLLING,
            isPolling: true,
          }),
          expect.objectContaining({
            intent: SET_UPDATE_FILE_SUCCESS,
            updateFileSuccess: false,
          }),
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_FILE_UNAVAILABLE,
          }),
          expect.objectContaining({
            intent: TRIGGER_FILE_UPDATE,
          }),
        ]);
      });

      it('should send load_file_unavailable request and not trigger polling when ARL file', () => {
        const { module, store, integration } = setup();

        integration.mapSuccess(LOAD_FILE_UNAVAILABLE, { isOnlineOnly: false });

        module.loadFileUnavailable(
          () => {},
          () => {}
        );

        expect(store.getActions()).toEqual([
          expect.objectContaining({
            intent: LOAD_FILE_UNAVAILABLE,
          }),
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_FILE_UNAVAILABLE,
          }),
        ]);
      });
    });

    describe('startPolling', () => {
      it('should create an interval and set isPolling to true', async () => {
        const { module, store } = setup();

        const interval = module.startPolling(0);

        expect(interval).not.toBeNull();

        expect(store.getActions()).toEqual([
          expect.objectContaining({
            intent: SET_IS_POLLING,
          }),
          expect.objectContaining({
            intent: SET_UPDATE_FILE_SUCCESS,
            updateFileSuccess: false,
          }),
        ]);

        clearInterval(interval);
      });
    });

    describe('stopPolling', () => {
      it('should set isPolling to false', async () => {
        const { module, store } = setup();

        store.getState().isPolling = true;

        const testInterval = setInterval(() => {}, 0);
        module.stopPolling(testInterval);

        expect(store.getActions()).toEqual([
          expect.objectContaining({
            intent: SET_IS_POLLING,
            isPolling: false,
          }),
        ]);
      });
    });

    describe('poll', () => {
      it('should send request to fetch_file_update_status', async () => {
        const { module, integration } = setup();

        module.poll();

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: FETCH_FILE_UPDATE_STATUS,
          }),
        ]);
      });
    });

    describe('correct file version', () => {
      it('should not start polling', async () => {
        const { module, store, integration } = setup();

        const context = {
          reason: '',
        };
        module.run(context);

        expect(store.getActions()).toEqual([
          expect.objectContaining({
            intent: SET_INITIAL_STATE,
          }),
          expect.objectContaining({
            intent: SET_IS_POLLING,
          }),
          expect.objectContaining({
            intent: SET_UPDATE_FILE_SUCCESS,
            updateFileSuccess: true,
          }),
        ]);

        expect(integration.getRequests()).toEqual([]);
      });
    });

    describe('incorrect file version', () => {
      it('should start polling', async () => {
        const { module, store, integration } = setup();

        const context = {
          reason: 'versionTooLow',
        };
        module.run(context);

        expect(store.getActions()).toEqual([
          expect.objectContaining({
            intent: SET_INITIAL_STATE,
          }),
          expect.objectContaining({
            intent: LOAD_FILE_UNAVAILABLE,
          }),
          expect.objectContaining({
            intent: SET_IS_POLLING,
            isPolling: true,
          }),
          expect.objectContaining({
            intent: SET_UPDATE_FILE_SUCCESS,
            updateFileSuccess: false,
          }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_FILE_UNAVAILABLE,
          }),
          expect.objectContaining({
            intent: TRIGGER_FILE_UPDATE,
          }),
        ]);
      });
    });
  });
});
