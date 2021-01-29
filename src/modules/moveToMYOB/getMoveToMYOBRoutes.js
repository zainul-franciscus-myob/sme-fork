import MoveToMYOBModule from './MoveToMYOBModule';
import RouteName from '../../router/RouteName';

const getMoveToMYOBRoutes = ({ integration, setRootView, navigateTo }) => [
  {
    name: RouteName.MOVE_TO_MYOB,
    path: '/:region/:businessId/moveToMYOB/',
    module: new MoveToMYOBModule({
      integration,
      setRootView,
      navigateTo,
    }),
    documentTitle: 'Move to MYOB',
  },
];

export default getMoveToMYOBRoutes;
