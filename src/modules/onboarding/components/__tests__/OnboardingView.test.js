import { View as OnboardingView } from '../OnboardingView';

describe('OnboardingView', () => {
  it('can be instantiated', () => {
    const dispatcher = {};
    const onSave = jest.fn();
    const view = new OnboardingView(dispatcher, onSave);

    expect(view).toBeDefined();
  });
});
