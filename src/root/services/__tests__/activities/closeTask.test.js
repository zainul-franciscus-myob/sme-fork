import { CLOSE_TASK } from '../../../rootIntents';
import closeTask from '../../activities/closeTask';

describe('activitiesService', () => {
  describe('closeTask', () => {
    const businessId = 'business-id';
    const region = 'region';
    const activityId = 'activity-id';
    const activityKey = 'activity-key';
    const getState = jest.fn();
    const store = { getState };
    const data = {};
    const context = { activityId, activityKey };

    getState.mockReturnValue({ businessId, region });

    const dispatcher = {
      updateActivity: jest.fn(),
    };

    const integration = {
      write: jest.fn().mockImplementation(({ onSuccess }) => onSuccess(data)),
    };

    it('gives close task intent', async () => {
      await closeTask({
        dispatcher, integration, store, context,
      });

      expect(integration.write).toBeCalledWith(
        expect.objectContaining({
          intent: CLOSE_TASK,
        }),
      );
    });

    it('gives url params', async () => {
      await closeTask({
        dispatcher, integration, store, context,
      });

      expect(integration.write).toBeCalledWith(
        expect.objectContaining({
          urlParams: { businessId, activityId, activityKey },
        }),
      );
    });

    it('gives updated activity to the redux store', async () => {
      await closeTask({
        dispatcher, integration, store, context,
      });
      expect(dispatcher.updateActivity).toBeCalledWith(data);
    });
  });
});
