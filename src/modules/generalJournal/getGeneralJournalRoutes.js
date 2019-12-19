import GeneralJournalDetailModule from './generalJournalDetail/GeneralJournalDetailModule';
import RouteName from '../../router/RouteName';

const getGeneralJournalRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.GENERAL_JOURNAL_DETAIL,
      path: '/:region/:businessId/generalJournal/:generalJournalId',
      module: new GeneralJournalDetailModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'General Journal',
    },
  ];

  return routes;
};

export default getGeneralJournalRoutes;
