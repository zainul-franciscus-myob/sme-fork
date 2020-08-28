import { getUser } from '../../Auth';
import { setAnalyticsTraits } from '../../store/localStorageDriver';
import initializeHttpTelemetry from '../initializeHttpTelemetry';

jest.mock('../../Auth');
jest.mock('../../store/localStorageDriver');

describe('Telemetry', () => {
  const segmentWriteKey = undefined;
  const currentRouteName = 'home';
  const telemetryParams = {
    currentRouteName,
    telemetryData: {
      businessId: 'a-business-id',
    },
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
    document.cookie = encodeURIComponent(
      '_gid=GA1.2.912270860.1568003222; _ga=GA1.2.593164909.1569991666; ajs_group_id="c958be75-6093-4777-8eae-a3fc99284540"; optimizelyEndUserId=oeu1569991459421r0.9908169548370924; _hjid=2295a85f-2dc4-434b-bf1d-0783262c350a; _hjIncludedInSample=1;'
    );

    global.window = Object.create(window);

    Object.defineProperty(window, 'location', {
      value: {
        hash: '#/au/a-business-id/homeaccess_token="XYZ"',
        href: 'http://localhost/#/au/a-business-id/home?access_token="ABCD"',
      },
    });

    getUser.mockImplementation(() => ({
      userId: 'mockuserId',
    }));

    setAnalyticsTraits.mockImplementation(() => {});

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
      const { recordPageVisit } = telemetry;
      recordPageVisit(telemetryParams);
      expect(pageMock.mock.calls.length).toBe(1);
      expect(pageMock.mock.calls[0]).toEqual([
        'home',
        {
          name: 'home',
          title: 'sme-web',
          url: 'http://localhost/au/home?',
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
        },
      ]);
    });

    it('should identify user with the expected traits', () => {
      const { recordPageVisit } = telemetry;
      const modifiedTelemetryParams = {
        ...telemetryParams,
        telemetryData: {
          ...telemetryParams.telemetryData,
          a: 'a',
          b: 'b',
        },
      };

      recordPageVisit(modifiedTelemetryParams);

      expect(setAnalyticsTraits).toHaveBeenCalledTimes(1);
      expect(identifyMock).toHaveBeenCalledTimes(1);
      expect(identifyMock).toBeCalledWith('mockuserId', {
        businessId: 'a-business-id',
        a: 'a',
        b: 'b',
      });
    });

    it('should identify user even when no business has been selected', () => {
      const { recordPageVisit } = telemetry;
      const modifiedTelemetryParams = {
        ...telemetryParams,
        telemetryData: {},
      };

      recordPageVisit(modifiedTelemetryParams);

      expect(setAnalyticsTraits).toHaveBeenCalledTimes(1);
      expect(identifyMock).toHaveBeenCalledTimes(1);
      expect(identifyMock).toBeCalledWith('mockuserId', {});
    });

    it('should call group', () => {
      const { recordPageVisit } = telemetry;
      recordPageVisit(telemetryParams);
      expect(groupMock.mock.calls.length).toBe(1);
      expect(groupMock.mock.calls[0]).toEqual(['a-business-id']);
    });

    it('does not group twice', () => {
      const { recordPageVisit } = telemetry;
      recordPageVisit(telemetryParams);
      recordPageVisit(telemetryParams);
      expect(groupMock.mock.calls.length).toBe(1);
    });

    it('does not identify twice', () => {
      const { recordPageVisit } = telemetry;
      recordPageVisit(telemetryParams);
      recordPageVisit(telemetryParams);
      expect(setAnalyticsTraits.mock.calls.length).toBe(1);
      expect(identifyMock.mock.calls.length).toBe(1);
    });

    it('identifies again when business id changes', () => {
      const { recordPageVisit } = telemetry;
      recordPageVisit(telemetryParams);
      recordPageVisit({
        ...telemetryParams,
        telemetryData: {
          ...telemetryParams.telemetryData,
          businessId: 'new-business-id',
        },
      });
      expect(identifyMock).toHaveBeenCalledTimes(2);
      expect(setAnalyticsTraits).toHaveBeenCalledTimes(2);
      expect(identifyMock).toHaveBeenLastCalledWith('mockuserId', {
        businessId: 'new-business-id',
      });
    });
  });

  describe('sending user events', () => {
    let telemetry;

    global.window = Object.create(window);

    const trackMock = jest.fn();

    beforeEach(() => {
      telemetry = initializeHttpTelemetry(segmentWriteKey);
      jest.clearAllMocks();
      window.analytics = {
        initialize: true,
        track: trackMock,
      };
    });

    it('should call window track with expected payload', () => {
      const { trackUserEvent } = telemetry;
      const expectedOptions = {
        context: {
          'Google Analytics': {
            clientId: '593164909.1569991666',
          },
        },
      };
      trackUserEvent({ eventName: 'eventName', eventProperties: { p1: 'p1' } });
      expect(trackMock).toHaveBeenCalledTimes(1);
      expect(trackMock).toBeCalledWith(
        'eventName',
        { p1: 'p1' },
        expectedOptions
      );
    });
  });
});
