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
    document.cookie = encodeURIComponent('_ga=GA1.2.912270860.1568003222; _gid=GA1.2.593164909.1569991666; ajs_group_id="c958be75-6093-4777-8eae-a3fc99284540"; optimizelyEndUserId=oeu1569991459421r0.9908169548370924; _hjid=2295a85f-2dc4-434b-bf1d-0783262c350a; _hjIncludedInSample=1;');

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
            'Google Analytics': {
              clientId: '593164909.1569991666',
            },
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
