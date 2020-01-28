import load from '../../tasks/load';
import tasksService from '../../tasks';

jest.mock('../../tasks/closeTasks');
jest.mock('../../tasks/load');

describe('tasksService', () => {
  const context = {};
  const dispatcher = jest.fn();
  const integration = jest.fn();
  const store = jest.fn();

  describe('when loading tasks', () => {
    it('calls load', () => {
      const service = tasksService(dispatcher, integration, store);

      service.load(context);

      expect(load).toHaveBeenCalled();
    });
  });
});
