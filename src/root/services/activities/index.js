import closeActivity from './closeActivity';
import closeTask from './closeTask';
import load from './load';

export default (dispatcher, integration, store) => ({
  load: () => load({ dispatcher, integration, store }),
  closeTask: context => closeTask({
    dispatcher, integration, context, store,
  }),
  closeActivity: context => closeActivity({
    dispatcher, integration, context, store,
  }),
});
