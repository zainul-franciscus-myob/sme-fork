import InvoiceLogoModule from './InvoiceLogoModule';
import RouteName from '../../router/RouteName';
import TemplateModule from './TemplateModule';

const getTaxRoutes = ({
  integration, setRootView, pushMessage, globalCallbacks: { uploadedLogo },
}) => [
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
  {
    name: RouteName.INVOICE_LOGO_SETTINGS,
    path: '/:region/:businessId/invoiceLogoSettings/',
    module: new InvoiceLogoModule({
      integration, setRootView, pushMessage, uploadedLogo,
    }),
    documentTitle: 'Upload your logo',
  },
];

export default getTaxRoutes;
