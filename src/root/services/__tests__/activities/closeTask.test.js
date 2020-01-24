import { CLOSE_TASKS } from '../../../rootIntents';
import closeTasks from '../../activities/closeTasks';

describe('activitiesService', () => {
  describe('closeTasks', () => {
    const businessId = 'business-id';
    const region = 'region';
    const activityId = 'activity-id';
    const activityKey = 'activity-key';
    const getState = jest.fn();
    const store = { getState };
    const data = {};

    const context = { activityId, activityKey, closeEvent: 'MagicEvent' };

    getState.mockReturnValue({ businessId, region });

    const dispatcher = {
      updateActivities: jest.fn(),
    };

    const integration = {
      write: jest.fn().mockImplementation(({ onSuccess }) => onSuccess(data)),
    };

    it('gives close tasks intent', async () => {
      await closeTasks({
        dispatcher, integration, store, context,
      });

      expect(integration.write).toBeCalledWith(
        expect.objectContaining({
          intent: CLOSE_TASKS,
        }),
      );
    });

    it('gives url params', async () => {
      await closeTasks({
        dispatcher, integration, store, context,
      });

      expect(integration.write).toBeCalledWith(
        expect.objectContaining({
          urlParams: { businessId, closeEvent: 'MagicEvent' },
        }),
      );
    });
  });
});
