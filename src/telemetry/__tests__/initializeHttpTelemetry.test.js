import { getUser } from '../../Auth';
import initializeHttpTelemetry from '../initializeHttpTelemetry';

jest.mock('../../Auth');

describe('Telemetry', () => {
  const segmentWriteKey = undefined;
  const currentRouteName = 'home';
  const routeParams = {
    region: 'au',
    businessId: 'a-business-id',
  };
  const route = {
    currentRouteName,
    routeParams,
  };

  describe('initialisation', () => {
    it('will not crash if analytics is not setup', () => {
      window.analytics = undefined;
      const module = initializeHttpTelemetry(segmentWriteKey);
      expect(module).not.toBe(undefined);
    });
  });

  describe('handling page transitions', () => {
    let telemetry;
    const pageMock = jest.fn();
    const identifyMock = jest.fn();
    const groupMock = jest.fn();

    document.title = 'sme-web';
    global.window = Object.create(window);

    Object.defineProperty(window, 'location', {
      value: {
        hash: '#/au/a-business-id/home',
        href: 'http://localhost/#/au/a-business-id/home',
      },
    });
    getUser.mockImplementation(() => ({
      userId: 'mockuserId',
    }));

    beforeEach(() => {
      telemetry = initializeHttpTelemetry(segmentWriteKey);
      jest.clearAllMocks();
      window.analytics = {
        initialize: true,
        page: pageMock,
        identify: identifyMock,
        group: groupMock,
      };
    });

    it('should call page with the expected payload', () => {
      telemetry(route);
      expect(pageMock.mock.calls.length).toBe(1);
      expect(pageMock.mock.calls[0]).toEqual([
        'home',
        {
          name: 'home',
          title: 'sme-web',
          url: 'http://localhost/au/home',
          path: '/au/home',
          userId: 'mockuserId',
        },
        {
          context: {
            groupId: 'a-business-id',
          },
        }]);
    });

    it('identifies the user', () => {
      telemetry(route);
      expect(identifyMock.mock.calls.length).toBe(1);
      expect(identifyMock.mock.calls[0]).toEqual(['mockuserId']);
    });

    it('should call group', () => {
      telemetry(route);
      expect(groupMock.mock.calls.length).toBe(1);
      expect(groupMock.mock.calls[0]).toEqual(['a-business-id']);
    });

    it('does not group twice', () => {
      telemetry(route);
      telemetry(route);
      expect(groupMock.mock.calls.length).toBe(1);
    });

    it('does not identify twice', () => {
      telemetry(route);
      telemetry(route);
      expect(identifyMock.mock.calls.length).toBe(1);
    });
  });
});
