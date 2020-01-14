import activitiesService from '../../activities';
import closeActivity from '../../activities/closeActivity';
import closeTask from '../../activities/closeTask';
import load from '../../activities/load';

jest.mock('../../activities/closeActivity');
jest.mock('../../activities/closeTask');
jest.mock('../../activities/load');

describe('activitiesService', () => {
  const context = {};
  const dispatcher = jest.fn();
  const integration = jest.fn();
  const store = jest.fn();

  describe('when closing an activity', () => {
    it('calls closeActivity', () => {
      const service = activitiesService(dispatcher, integration, store);

      service.closeActivity(context);

      expect(closeActivity).toHaveBeenCalled();
    });
  });

  describe('when closing a task', () => {
    it('calls closeTask', () => {
      const service = activitiesService(dispatcher, integration, store);

      service.closeTask(context);

      expect(closeTask).toHaveBeenCalled();
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
