import { CLOSE_ACTIVITY } from '../../../rootIntents';
import activity from '../../../../integration/data/activities/activity';
import closeActivity from '../../activities/closeActivity';

describe('activitiesService', () => {
  describe('closeActivity', () => {
    const businessId = 'business-id';
    const activityId = 'activity-id';
    const getState = jest.fn();
    const store = { getState };
    const data = activity;
    const context = { activityId };

    getState.mockReturnValue({ businessId });

    const dispatcher = {
      updateActivity: jest.fn(),
    };

    const integration = {
      write: jest.fn().mockImplementation(({ onSuccess }) => onSuccess(data)),
    };

    it('gives close activity intent', async () => {
      await closeActivity({
        dispatcher, integration, store, context,
      });

      expect(integration.write).toBeCalledWith(
        expect.objectContaining({
          intent: CLOSE_ACTIVITY,
        }),
      );
    });

    it('gives url params', async () => {
      await closeActivity({
        dispatcher, integration, store, context,
      });

      expect(integration.write).toBeCalledWith(
        expect.objectContaining({
          urlParams: { businessId, activityId },
        }),
      );
    });

    it('gives updated activity to the redux store', async () => {
      await closeActivity({
        dispatcher, integration, store, context,
      });
      expect(dispatcher.updateActivity).toBeCalledWith(data);
    });
  });
});
