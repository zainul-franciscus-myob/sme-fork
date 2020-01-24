import activitiesService from '../../activities';
import closeTasks from '../../activities/closeTasks';
import load from '../../activities/load';

jest.mock('../../activities/closeTasks');
jest.mock('../../activities/load');

describe('activitiesService', () => {
  const context = {};
  const dispatcher = jest.fn();
  const integration = jest.fn();
  const store = jest.fn();

  describe('when closing a task', () => {
    it('calls closeTasks', () => {
      const service = activitiesService(dispatcher, integration, store);

      service.closeTasks(context);

      expect(closeTasks).toHaveBeenCalled();
    });
  });

  describe('when loading activities', () => {
    it('calls load', () => {
      const service = activitiesService(dispatcher, integration, store);

      service.load(context);

      expect(load).toHaveBeenCalled();
    });
  });
});
