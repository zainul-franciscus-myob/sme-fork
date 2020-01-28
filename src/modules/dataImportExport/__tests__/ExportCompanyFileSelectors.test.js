import { getExportCompanyFileFileExtension, getHasClientCode } from '../selectors/ExportCompanyFileSelectors';
import ExportCompanyFileType from '../types/ExportCompanyFileType';

describe('ExportCompanyFileSelectors', () => {
  describe('getHasMyobAeMas', () => {
    it.each([
      [ExportCompanyFileType.CEE_DATA, false],
      [ExportCompanyFileType.MYE, false],
      [ExportCompanyFileType.MYOB_AE_MAS, true],
      [ExportCompanyFileType.MYOB_AO, false],
      [ExportCompanyFileType.MYOB_AO_CLASSIC, false],
      [ExportCompanyFileType.RECKON_APS, false],
      [ExportCompanyFileType.SAGE_HANDI_LEDGER, false],
    ])('when fileType is %s, should return %s', (fileType, expected) => {
      const actual = getHasClientCode.resultFunc(fileType);

      expect(actual).toEqual(expected);
    });
  });

  describe('getExportCompanyFileFileExtension', () => {
    it.each([
      [ExportCompanyFileType.CEE_DATA, 'txt'],
      [ExportCompanyFileType.MYE, 'mye'],
      [ExportCompanyFileType.MYOB_AE_MAS, 'txt'],
      [ExportCompanyFileType.MYOB_AO, 'txt'],
      [ExportCompanyFileType.MYOB_AO_CLASSIC, 'txt'],
      [ExportCompanyFileType.RECKON_APS, 'txt'],
      [ExportCompanyFileType.SAGE_HANDI_LEDGER, 'csv'],
      ['', 'txt'],
    ])('when fileType is %s, should return %s', (fileType, expected) => {
      const state = { export: { companyFile: { fileType } } };

      const actual = getExportCompanyFileFileExtension(state);

      expect(actual).toEqual(expected);
    });
  });
});
