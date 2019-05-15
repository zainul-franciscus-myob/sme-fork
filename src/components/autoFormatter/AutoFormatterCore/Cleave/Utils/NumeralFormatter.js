/*
 * https://github.com/nosir/cleave.js
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Modifications copyright (C) 2019 MYOB
 */

class NumeralFormatter {
  constructor(numeralDecimalMark,
    numeralIntegerScale,
    numeralDecimalScale,
    numeralThousandsGroupStyle,
    numeralPositiveOnly,
    stripLeadingZeroes,
    delimiter) {
    this.numeralDecimalMark = numeralDecimalMark || '.';
    this.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0;
    this.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
    this.numeralThousandsGroupStyle = numeralThousandsGroupStyle
      || NumeralFormatter.groupStyle.thousand;
    this.numeralPositiveOnly = !!numeralPositiveOnly;
    this.stripLeadingZeroes = stripLeadingZeroes !== false;
    this.delimiter = (delimiter || delimiter === '') ? delimiter : ',';
    this.delimiterRE = delimiter ? new RegExp(`\\${delimiter}`, 'g') : '';
  }

  static groupStyle = {
    thousand: 'thousand',
    lakh: 'lakh',
    wan: 'wan',
    none: 'none',
  };

  getRawValue(value) {
    return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
  }

  format(val) {
    let parts; let partInteger; let
      partDecimal = '';

    // strip alphabet letters
    let value = val.replace(/[A-Za-z]/g, '')
    // replace the first decimal mark with reserved placeholder
      .replace(this.numeralDecimalMark, 'M')

    // strip non numeric letters except minus and "M"
    // this is to ensure prefix has been stripped
      .replace(/[^\dM-]/g, '')

    // replace the leading minus with reserved placeholder
      .replace(/^-/, 'N')

    // strip the other minus sign (if present)
      .replace(/-/g, '')

    // replace the minus sign (if present)
      .replace('N', this.numeralPositiveOnly ? '' : '-')

    // replace decimal mark
      .replace('M', this.numeralDecimalMark);

    // strip any leading zeros
    if (this.stripLeadingZeroes) {
      value = value.replace(/^(-)?0+(?=\d)/, '$1');
    }

    partInteger = value;

    if (value.indexOf(this.numeralDecimalMark) >= 0) {
      parts = value.split(this.numeralDecimalMark);
      [partInteger] = parts;
      partDecimal = this.numeralDecimalMark + parts[1].slice(0, this.numeralDecimalScale);
    }

    if (this.numeralIntegerScale > 0) {
      partInteger = partInteger.slice(0, this.numeralIntegerScale + (value.slice(0, 1) === '-' ? 1 : 0));
    }

    switch (this.numeralThousandsGroupStyle) {
      case NumeralFormatter.groupStyle.lakh:
        partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, `$1${this.delimiter}`);

        break;

      case NumeralFormatter.groupStyle.wan:
        partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, `$1${this.delimiter}`);

        break;

      case NumeralFormatter.groupStyle.thousand:
        partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, `$1${this.delimiter}`);

        break;

      default:
        break;
    }

    return partInteger.toString() + (this.numeralDecimalScale > 0 ? partDecimal.toString() : '');
  }
}

export default NumeralFormatter;
