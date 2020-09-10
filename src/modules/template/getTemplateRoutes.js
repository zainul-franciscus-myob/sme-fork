import RouteName from '../../router/RouteName';
import TemplateModule from './TemplateModule';

const getTaxRoutes = ({ integration, setRootView, pushMessage }) => [
  {
    name: RouteName.CREATE_TEMPLATE,
    path: '/:region/:businessId/template/',
    module: new TemplateModule({ integration, setRootView, pushMessage }),
    documentTitle: 'Template',
  },
  {
    name: RouteName.TEMPLATE_DETAIL,
    path: '/:region/:businessId/template/:templateName',
    module: new TemplateModule({ integration, setRootView, pushMessage }),
    documentTitle: 'Template',
  },
];

export default getTaxRoutes;
