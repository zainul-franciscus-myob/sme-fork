import { allowNotifyTheATO } from '../components/JobKeeperView';

describe('JobKeeperView', () => {
  describe('allowNotifyTheATO', () => {
    describe('when feature toggle is off', () => {
      it.only('always return true', () => {
        expect(
          allowNotifyTheATO(
            {
              isJobKeeper2Enabled: false,
            },
            false
          )
        ).toBe(true);
      });
    });
    describe('when feature toggle is on', () => {
      [true, false].forEach((areModifiedEmployeesValid) => {
        it.only(`return ${areModifiedEmployeesValid} when areModifiedEmployeesValid are ${areModifiedEmployeesValid} `, () => {
          expect(
            allowNotifyTheATO(
              {
                isJobKeeper2Enabled: true,
              },
              areModifiedEmployeesValid
            )
          ).toBe(areModifiedEmployeesValid);
        });
      });
    });
  });
});
