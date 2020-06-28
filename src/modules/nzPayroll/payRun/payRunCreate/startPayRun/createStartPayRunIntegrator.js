import createPayRunIntegrator from '../createPayRunIntegrator';

const createStartPayRunIntegrator = (store, integration) => ({
  ...createPayRunIntegrator(store, integration),

});

export default createStartPayRunIntegrator;
