import GeneralJournalDetailModule from './generalJournalDetail/GeneralJournalDetailModule';
import GeneralJournalModule from './generalJournalList/GeneralJournalModule';

const getGeneralJournalRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: 'generalJournalList',
      path: '/',
      module: new GeneralJournalModule({ integration, setRootView, popMessages }),
    }, {
      name: 'generalJournalDetail',
      path: '/:journalId',
      module: new GeneralJournalDetailModule({ integration, setRootView, pushMessage }),
    },
  ];

  return routes;
};

export default getGeneralJournalRoutes;
