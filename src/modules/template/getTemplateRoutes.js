import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getTaxRoutes = () => [
  {
    name: RouteName.CREATE_TEMPLATE,
    path: '/:region/:businessId/template/',
    loadModule: () => import('./TemplateModule'),
    documentTitle: 'Template',
  },
  {
    name: RouteName.TEMPLATE_DETAIL,
    path: '/:region/:businessId/template/:templateName',
    loadModule: () => import('./TemplateModule'),
    documentTitle: 'Template',
  },
];

export default getTaxRoutes;
