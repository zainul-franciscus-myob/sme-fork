import loadTasks from '../loadTasks';
import tasksService from '../index';

jest.mock('../../tasks/closeTasks');
jest.mock('../../tasks/loadTasks');

describe('tasksService', () => {
  const context = {};
  const dispatcher = jest.fn();
  const integration = jest.fn();
  const store = jest.fn();

  describe('when loading tasks', () => {
    it('calls loadTasks', () => {
      const service = tasksService(dispatcher, integration, store);

      service.load(context);

      expect(loadTasks).toHaveBeenCalled();
    });
  });
});
