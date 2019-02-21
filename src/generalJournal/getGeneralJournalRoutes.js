import GeneralJournalDetailModule from './generalJournalDetail/GeneralJournalDetailModule';

const getGeneralJournalRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'generalJournalDetail',
      path: '/:generalJournalId',
      module: new GeneralJournalDetailModule({ integration, setRootView, pushMessage }),
    },
  ];

  return routes;
};

export default getGeneralJournalRoutes;
