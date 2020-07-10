import { assertSourceFile } from '@myob/entente';
import { commonPath } from '@myob/entente/lib/util';
import { join } from 'path';

import { project } from './shared.convention';

describe('get[Module]Routes.js conventions', () => {
  // get all of the route modules
  const sourceFiles = project.getSourceFiles('./src/modules/**/*Routes.js');
  const root = commonPath(sourceFiles.map((sf) => sf.getFilePath())).replace(
    `${join('sme-web', 'src')}/`,
    ''
  );

  // eslint-disable-next-line no-restricted-syntax
  for (const sourceFile of sourceFiles) {
    it(`for: ${sourceFile.getFilePath().replace(root, '/')}`, () => {
      const fn = assertSourceFile(sourceFile)
        .exports.default('the module has a default export')
        .length(1, 'the export should have a single declaration')
        .declarations[0].isVariableDeclaration(
          'the export is a variable declaration'
        )
        .name(
          /^get[A-Z]\w*Routes$/,
          'the variable is named like get[Module]Routes'
        )
        .initializer.isFunctionLike('the variables value is function like');

      fn.parameters
        .length(1, 'the function has a single parameter')
        .parameter(0, 'the first parameter exists')
        .isObject('the first parameter is an object')
        .isNotOptional('the first parameter is not optional');

      const returnElementProperties = fn.return
        .isArray('the function returns an array')
        .arrayElementType.isObject('the array should be an array of objects')
        .properties;

      returnElementProperties
        .getTypes('name', 'the object has a property named "name"')
        .atLeast(1, 'which has at least one type')
        .isString('which is a string');

      returnElementProperties
        .getTypes('path', 'the object has a property named "path"')
        .atLeast(1, 'which has at least one type')
        .isString('which is a string');

      returnElementProperties
        .getTypes(
          'documentTitle',
          'the object has a property named "documentTitle"'
        )
        .atLeast(1, 'which has at least one type')
        .isString('which is a string');

      returnElementProperties
        .getTypes('module', 'the object has a property named "module"')
        .atLeast(1, 'which has at least one type')
        .isObject('which is an object');
    });
  }
});
