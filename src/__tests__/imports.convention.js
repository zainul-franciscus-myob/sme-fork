import { assertSourceFile } from '@myob/entente';
import { basename } from 'path';
import { commonPath } from '@myob/entente/lib/util';

import { project } from './shared.convention';

describe('importing conventions', () => {
  // Pulls in only source files from `src/modules` for analysis
  const sourceFiles = project.getSourceFiles('./src/modules/**/*.js');

  // Find the common path for the files, in order to make the display easier
  const root = commonPath(sourceFiles.map(sf => sf.getFilePath()));

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

  const getImports = sourceFile => Object
    .values(assertSourceFile(sourceFile).imports.sourceFileNodes)
    .reduce((acc, maybeNode) => {
      if (maybeNode) {
        const importFilePath = maybeNode.getFilePath();
        const importFileName = basename(importFilePath, '.js');

        // Exclude *ModalModule from cross-module test (exemptions)
        if (!importFileName.endsWith('ModalModule')) {
          const importFileShortPath = importFilePath.replace(root, '');
          return [...acc, [importFileShortPath, importFilePath]];
        }
      }

      return acc;
    }, []);

  // Build test data with source file paths and their import file paths
  const sourceFilesWithImports = sourceFiles
    .reduce((acc, sourceFile) => {
      const imports = getImports(sourceFile);

      if (imports.length) {
        const sourceFilePath = sourceFile.getFilePath();
        const sourceFileShortPath = sourceFilePath.replace(root, '');

        return [...acc, [sourceFileShortPath, sourceFilePath, imports]];
      }

      return acc;
    }, []);

  describe.each(sourceFilesWithImports)('imports from %s', (sourceFileShortPath, sourceFilePath, imports) => {
    it.each(imports)('%s is not a cross module import', (importFileShortPath, importFilePath) => {
      expect(importFilePath).not.toBeImportedCrossModuleFrom(sourceFilePath);
    });
  });
});
