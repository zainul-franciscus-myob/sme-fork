import { assertSourceFile } from '@myob/entente';
import { commonPath } from '@myob/entente/lib/util';
import { join } from 'path';

import { project } from './shared.convention';

describe('importing conventions', () => {
  // pulls in only source files from `src/modules` for analysis
  const sourceFiles = project.getSourceFiles('./src/modules/**/*.js');

  // find the common path for the files, in order to make the display easier
  const root = commonPath(sourceFiles.map(sf => sf.getFilePath())).replace(
    `${join('src', 'modules')}/`,
    '',
  );

  // Extends Jest with a specific expectation around cross module importing
  expect.extend({
    toBeImportedCrossModuleFrom(target, source) {
      const pass = commonPath([source, target]).endsWith('modules/');
      if (pass) {
        return {
          message: () => `expected "${target.replace(root, '')}" to not be cross module imported`,
          pass,
        };
      }
      return {
        message: () => `expected "${target.replace(root, '')}" to be cross module imported`,
        pass,
      };
    },
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const sourceFile of sourceFiles) {
    const sourceFilePath = sourceFile.getFilePath();
    it(`imports from "${sourceFilePath.replace(root, '/')}"`, () => {
      // eslint-disable-next-line no-restricted-syntax
      for (const maybeNode of Object.values(
        assertSourceFile(sourceFile).imports.sourceFileNodes,
      )) {
        const importFilePath = maybeNode && maybeNode.getFilePath();
        if (importFilePath) {
          expect(importFilePath).not.toBeImportedCrossModuleFrom(sourceFilePath);
        }
      }
    });
  }
});
