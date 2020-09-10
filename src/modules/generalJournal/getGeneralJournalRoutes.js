import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getGeneralJournalRoutes = () => [
  {
    name: RouteName.GENERAL_JOURNAL_DETAIL,
    path: '/:region/:businessId/generalJournal/:generalJournalId',
    allowedParams: ['duplicateGeneralJournalId'],
    loadModule: () =>
      import('./generalJournalDetail/GeneralJournalDetailModule'),
    documentTitle: 'General Journal',
  },
];

export default getGeneralJournalRoutes;
