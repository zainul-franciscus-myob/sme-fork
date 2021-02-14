import { recordPageVisit } from '../../../telemetry';
import OnboardingModule from '../OnboardingModule';

jest.mock('../../../telemetry', () => ({
  recordPageVisit: jest.fn(),
}));

describe('OnboardingModule', () => {
  it('can be instantiated', () => {
    const dispatcher = jest.fn();
    const settingsService = jest.fn();

    const onboardingModule = new OnboardingModule({
      dispatcher,
      settingsService,
    });
    expect(onboardingModule).toBeDefined();
  });

  it('sends telemetry event with expected payload when onboarding view first loads', () => {
    const onboardingModule = new OnboardingModule({});

    const routeProps = {
      routeParams: {
        businessId: 'bizId',
      },
    };
    onboardingModule.run(routeProps);
    onboardingModule.onboardingVisited();

    expect(recordPageVisit).toHaveBeenCalledTimes(1);
    expect(recordPageVisit).toBeCalledWith(
      expect.objectContaining({
        currentRouteName: 'onboarding',
      })
    );
  });
});
