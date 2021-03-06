import GeneralJournalDetailModule from './generalJournalDetail/GeneralJournalDetailModule';
import RouteName from '../../router/RouteName';

const getGeneralJournalRoutes = ({
  integration,
  setRootView,
  popMessages,
  pushMessage,
  navigateTo,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.GENERAL_JOURNAL_DETAIL,
      path: '/:region/:businessId/generalJournal/:generalJournalId',
      allowedParams: ['duplicateGeneralJournalId'],
      module: new GeneralJournalDetailModule({
        integration,
        setRootView,
        popMessages,
        pushMessage,
        navigateTo,
        featureToggles,
      }),
      documentTitle: 'General Journal',
    },
  ];

  return routes;
};

export default getGeneralJournalRoutes;
