import ApplyToSaleModule from './ApplyToSaleModule';

const getApplyToSaleRoutes = ({
  integration, setRootView, pushMessage,
}) => [
  {
    name: 'applyToSale',
    path: '/:applyToSaleId',
    module: new ApplyToSaleModule({
      integration,
      setRootView,
      pushMessage,
    }),
  },
];

export default getApplyToSaleRoutes;
