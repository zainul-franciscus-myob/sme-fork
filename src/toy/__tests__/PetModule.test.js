import PetModule from '../PetModule';

describe('PetModule', ()=> {
  it('should render into the supplied DOM element', () => {
    const integration = { read() { return []; } };
    const rootElement = document.createElement('div');
    const module = new PetModule(integration, rootElement);

    module.run();

    expect(rootElement.innerHTML).not.toBe('');
  });
});