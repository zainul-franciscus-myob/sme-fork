import OnboardingModule from '../OnboardingModule';

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
    const onboardingModule = new OnboardingModule({
      recordPageVisit: jest.fn(),
    });

    const routeProps = {
      routeParams: {
        businessId: 'bizId',
      },
    };
    onboardingModule.run(routeProps);
    onboardingModule.onboardingVisited();

    expect(onboardingModule.recordPageVisit).toHaveBeenCalledTimes(1);
    expect(onboardingModule.recordPageVisit).toBeCalledWith(
      expect.objectContaining({
        currentRouteName: 'onboarding',
        telemetryData: {
          businessId: 'bizId',
        },
      })
    );
  });
});
