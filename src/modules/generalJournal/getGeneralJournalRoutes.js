import GeneralJournalDetailModule from './generalJournalDetail/GeneralJournalDetailModule';
import RouteName from '../../router/RouteName';

const getGeneralJournalRoutes = ({
  integration, setRootView, popMessages, pushMessage, reload,
}) => {
  const routes = [
    {
      name: RouteName.GENERAL_JOURNAL_DETAIL,
      path: '/:region/:businessId/generalJournal/:generalJournalId',
      module: new GeneralJournalDetailModule({
        integration, setRootView, popMessages, pushMessage, reload,
      }),
      documentTitle: 'General Journal',
    },
  ];

  return routes;
};

export default getGeneralJournalRoutes;
