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

/**
 * Props Assignment
 *
 * Separate this, so react module can share the usage
 */
const DefaultProperties = {
  // Maybe change to object-assign
  // for now just keep it as simple
  assign(trgt, opts) {
    const target = trgt || {};
    const options = opts || {};

    // credit card
    target.creditCard = !!options.creditCard;
    target.creditCardStrictMode = !!options.creditCardStrictMode;
    target.creditCardType = '';
    target.onCreditCardTypeChanged = options.onCreditCardTypeChanged || (() => {});

    // phone
    target.phone = !!options.phone;
    target.phoneRegionCode = options.phoneRegionCode || 'AU';
    target.phoneFormatter = {};

    // time
    target.time = !!options.time;
    target.timePattern = options.timePattern || ['h', 'm', 's'];
    target.timeFormat = options.timeFormat || '24';
    target.timeFormatter = {};

    // date
    target.date = !!options.date;
    target.datePattern = options.datePattern || ['d', 'm', 'Y'];
    target.dateFormatter = {};

    // numeral
    target.numeral = !!options.numeral;
    target.numeralIntegerScale = options.numeralIntegerScale > 0 ? options.numeralIntegerScale : 0;
    target.numeralDecimalScale = options.numeralDecimalScale >= 0 ? options.numeralDecimalScale : 2;
    target.numeralDecimalMark = options.numeralDecimalMark || '.';
    target.numeralThousandsGroupStyle = options.numeralThousandsGroupStyle || 'thousand';
    target.numeralPositiveOnly = !!options.numeralPositiveOnly;
    target.stripLeadingZeroes = options.stripLeadingZeroes !== false;

    // others
    target.numericOnly = target.creditCard || target.date || !!options.numericOnly;

    target.uppercase = !!options.uppercase;
    target.lowercase = !!options.lowercase;

    target.prefix = (target.creditCard || target.date) ? '' : (options.prefix || '');
    target.noImmediatePrefix = !!options.noImmediatePrefix;
    target.prefixLength = target.prefix.length;
    target.rawValueTrimPrefix = !!options.rawValueTrimPrefix;
    target.copyDelimiter = !!options.copyDelimiter;

    target.initValue = (options.initValue !== undefined && options.initValue !== null) ? options.initValue.toString() : '';

    /* eslint-disable no-nested-ternary */
    target.delimiter = (options.delimiter || options.delimiter === '') ? options.delimiter
      : (options.date ? '/'
        : (options.time ? ':'
          : (options.numeral ? ','
            : (options.phone ? ' '
              : ' '))));
    target.delimiterLength = target.delimiter.length;
    target.delimiterLazyShow = !!options.delimiterLazyShow;
    target.delimiters = options.delimiters || [];

    target.blocks = options.blocks || [];
    target.blocksLength = target.blocks.length;

    target.root = (typeof global === 'object' && global) ? global : window;
    target.document = options.document || target.root.document;

    target.maxLength = 0;

    target.backspace = false;
    target.result = '';

    target.onValueChanged = options.onValueChanged || (function () {});

    return target;
  },
};

export default DefaultProperties;
