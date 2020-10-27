import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getInvoiceRoutes = () => {
  const routes = [
    {
      name: RouteName.INVOICE_LIST,
      path: '/:region/:businessId/invoice/',
      allowedParams: [
        'dateFrom',
        'dateTo',
        'keywords',
        'customerId',
        'status',
        'orderBy',
        'sortOrder',
      ],
      loadModule: () => import('./invoiceList/InvoiceListModule'),
      documentTitle: 'Invoices',
    },
    {
      name: RouteName.INVOICE_DETAIL,
      path: '/:region/:businessId/invoice/:invoiceId',
      allowedParams: ['layout', 'quoteId'],
      loadModule: () => import('./invoiceDetail/InvoiceDetailModule'),
      documentTitle: 'Invoice',
    },
  ];

  return routes;
};

export default getInvoiceRoutes;
