import createPayRunDispatchers from '../createPayRunDispatchers';

const createRecordPayRunDispatchers = store => ({
  ...createPayRunDispatchers(store),
});

export default createRecordPayRunDispatchers;
