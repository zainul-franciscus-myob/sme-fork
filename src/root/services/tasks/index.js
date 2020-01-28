import closeTasks from './closeTasks';
import load from './load';

export default (dispatcher, integration, store) => ({
  load: () => load({ dispatcher, integration, store }),
  closeTasks: context => closeTasks({
    dispatcher, integration, context, store,
  }),
});
