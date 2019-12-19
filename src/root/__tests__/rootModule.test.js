import RootModule from '../rootModule';

describe('rootModule', () => {
  it('can be instantiated', () => {
    const integration = jest.fn();
    const router = jest.fn();
    const root = new RootModule({ integration, router });

    expect(root).toBeDefined();
  });
});
