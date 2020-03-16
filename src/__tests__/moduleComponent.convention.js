import { assertSourceFile } from '@myob/entente';
import { commonPath } from '@myob/entente/lib/util';
import { join } from 'path';

import { project } from './shared.convention';

describe('module component conventions', () => {
  const sourceFiles = project.getSourceFiles('./src/**/*Module.js');
  const root = commonPath(sourceFiles.map(sf => sf.getFilePath())).replace(
    `${join('src', 'modules')}/`,
    '',
  );

  // eslint-disable-next-line no-restricted-syntax
  for (const sourceFile of sourceFiles) {
    const sourceFilePath = sourceFile.getFilePath().replace(root, '/');
    it(`exports a module component from "${sourceFilePath}"`, () => {
      const moduleClass = assertSourceFile(sourceFile)
        .classes.includes(/Module$/)
        .length(1).declarations[0].isDefaultExport();

      moduleClass.member('render')[0].isMethod();
    });
  }
});
