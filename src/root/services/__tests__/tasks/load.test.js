import { GET_TASKS_LIST } from '../../../rootIntents';
import load from '../../tasks/load';

describe('tasksService', () => {
  describe('load', () => {
    const businessId = 'business-id';
    const region = 'region';
    const getState = jest.fn();
    const store = { getState };
    const data = {};

    getState.mockReturnValue({ businessId, region });

    const dispatcher = {
      loadTasks: jest.fn(),
      setLoadingState: jest.fn(),
    };

    const integration = {
      read: jest.fn().mockImplementation(({ onSuccess }) => onSuccess(data)),
    };

    it('gives get tasks list', async () => {
      await load({ dispatcher, integration, store });

      expect(integration.read).toBeCalledWith(
        expect.objectContaining({
          intent: GET_TASKS_LIST,
        }),
      );
    });

    it('gives params', async () => {
      await load({ dispatcher, integration, store });

      expect(integration.read).toBeCalledWith(
        expect.objectContaining({
          urlParams: { businessId },
          params: { region },
        }),
      );
    });

    it('gives tasks to the redux store', async () => {
      await load({ dispatcher, integration, store });
      expect(dispatcher.loadTasks).toBeCalledWith(data);
    });
  });
});