import { getModuleAction } from '../rootSelectors';
import ModuleAction from '../../common/types/ModuleAction';
import RouteName from '../../router/RouteName';

describe('rootSelector', () => {
  describe('getModuleAction', () => {
    describe('LOAD_BUSINESS', () => {
      it.each([
        [false, 'when business is not selected', '', '', 'routeName'],
        [true, 'when business is selected', 'new', '', 'routeName'],
        [true, 'when business has changed', 'new', 'old', 'routeName'],
        [false, 'when business has not changed', 'same', 'same', 'routeName'],
        [
          true,
          'when previous route is link user page',
          'same',
          'same',
          RouteName.LINK_USER,
        ],
        [false, 'when current route is error page', '', '', RouteName.ERROR],
      ])(
        'returns %s',
        (
          expected,
          _,
          currentBusinessId,
          previousBusinessId,
          previousRouteName
        ) => {
          const actual = getModuleAction({
            currentBusinessId,
            previousBusinessId,
            previousRouteName,
          });

          expect(actual[ModuleAction.LOAD_BUSINESS]).toEqual(expected);
        }
      );
    });
  });
});
