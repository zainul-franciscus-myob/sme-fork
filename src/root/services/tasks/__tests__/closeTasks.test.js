import { CLOSE_TASKS } from '../../../rootIntents';
import closeTasks from '../closeTasks';
import reactsToCloseEvent from '../reactsToCloseEvent';

jest.mock('../reactsToCloseEvent');

describe('tasksService', () => {
  describe('closeTasks', () => {
    const businessId = 'business-id';
    const region = 'region';
    const getState = jest.fn();
    const store = { getState };
    const data = {};
    const closeEvent = 'businessDetailsConfirmed';
    const context = { closeEvent };

    getState.mockReturnValue({ businessId, region });

    const dispatcher = {
      updateTasks: jest.fn(),
    };

    const integration = {
      write: jest.fn().mockImplementation(({ onSuccess }) => onSuccess(data)),
    };

    beforeEach(() => {
      reactsToCloseEvent.mockReturnValue(true);
    });

    afterEach(() => {
      reactsToCloseEvent.mockReset();
    });

    it('gives get tasks list', async () => {
      await closeTasks({
        dispatcher, integration, store, context,
      });

      expect(integration.write).toBeCalledWith(
        expect.objectContaining({
          intent: CLOSE_TASKS,
        }),
      );
    });

    it('gives params', async () => {
      await closeTasks({
        dispatcher, integration, store, context,
      });

      expect(integration.write).toBeCalledWith(
        expect.objectContaining({
          urlParams: { businessId, closeEvent },
        }),
      );
    });

    it('gives tasks to the redux store', async () => {
      await closeTasks({
        dispatcher, integration, store, context,
      });

      expect(dispatcher.updateTasks).toBeCalledWith(data);
    });

    describe('when the close event is dismissable', () => {
      const dismissableCloseEvent = 'businessDetailsConfirmedDismiss';
      const withDismissableEvent = { dismissableCloseEvent };

      it('executes closes the tasks', async () => {
        await closeTasks({
          dispatcher, integration, store, context: withDismissableEvent,
        });

        expect(integration.write).toBeCalled();
      });
    });
  });
});
