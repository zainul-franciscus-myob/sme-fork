import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getInTrayRoutes = () => [
  {
    name: RouteName.IN_TRAY,
    path: '/:region/:businessId/inTray/',
    loadModule: () => import('./inTrayList/InTrayModule'),
    documentTitle: 'In Tray',
  },
  {
    name: RouteName.ONBOARDING_LEARN_IN_TRAY,
    path: '/:region/:businessId/inTray/learn',
    loadModule: () => import('../learning/inTrayLearn/LearnInTrayModule'),
    documentTitle: 'Learn the In Tray',
  },
];

export default getInTrayRoutes;
