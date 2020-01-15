import { GET_ACTIVITIES_LIST } from '../../../rootIntents';
import load from '../../activities/load';

describe('activitiesService', () => {
  describe('load', () => {
    const businessId = 'business-id';
    const region = 'region';
    const getState = jest.fn();
    const store = { getState };
    const data = {};

    getState.mockReturnValue({ businessId, region });

    const dispatcher = {
      loadActivities: jest.fn(),
      setLoadingState: jest.fn(),
    };

    const integration = {
      read: jest.fn().mockImplementation(({ onSuccess }) => onSuccess(data)),
    };

    it('gives get activities list', async () => {
      await load({ dispatcher, integration, store });

      expect(integration.read).toBeCalledWith(
        expect.objectContaining({
          intent: GET_ACTIVITIES_LIST,
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

    it('gives activities to the redux store', async () => {
      await load({ dispatcher, integration, store });
      expect(dispatcher.loadActivities).toBeCalledWith(data);
    });
  });
});
