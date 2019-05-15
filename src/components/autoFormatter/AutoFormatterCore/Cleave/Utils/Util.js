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

const Util = {
  noop() {
  },

  strip(value, re) {
    return value.replace(re, '');
  },

  getPostDelimiter(value, delimiter, delimiters) {
    // single delimiter
    if (delimiters.length === 0) {
      return value.slice(-delimiter.length) === delimiter ? delimiter : '';
    }

    // multiple delimiters
    let matchedDelimiter = '';
    delimiters.forEach((current) => {
      if (value.slice(-current.length) === current) {
        matchedDelimiter = current;
      }
    });

    return matchedDelimiter;
  },

  getDelimiterREByDelimiter(delimiter) {
    return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
  },

  getNextCursorPosition(prevPos, oldValue, newValue, delimiter, delimiters) {
    // If cursor was at the end of value, just place it back.
    // Because new value could contain additional chars.
    if (oldValue.length === prevPos) {
      return newValue.length;
    }

    return prevPos + this.getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters);
  },

  getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters) {
    const oldRawValue = this.stripDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
    const newRawValue = this.stripDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
    const lengthOffset = oldRawValue.length - newRawValue.length;

    return (lengthOffset !== 0) ? (lengthOffset / Math.abs(lengthOffset)) : 0;
  },

  stripDelimiters(value, delimiter, delimiters) {
    let val = value;
    // single delimiter
    if (delimiters.length === 0) {
      const delimiterRE = delimiter ? this.getDelimiterREByDelimiter(delimiter) : '';

      return val.replace(delimiterRE, '');
    }

    // multiple delimiters
    delimiters.forEach((current) => {
      current.split('').forEach((letter) => {
        val = val.replace(this.getDelimiterREByDelimiter(letter), '');
      });
    });

    return val;
  },

  headStr(str, length) {
    return str.slice(0, length);
  },

  getMaxLength(blocks) {
    return blocks.reduce((previous, current) => previous + current, 0);
  },

  // strip prefix
  // Before type  |   After type    |     Return value
  // PEFIX-...    |   PEFIX-...     |     ''
  // PREFIX-123   |   PEFIX-123     |     123
  // PREFIX-123   |   PREFIX-23     |     23
  // PREFIX-123   |   PREFIX-1234   |     1234
  getPrefixStrippedValue(value, prefix, prefixLength, prevResult, delimiter, delimiters) {
    const val = value;
    // No prefix
    if (prefixLength === 0) {
      return val;
    }

    // Pre result has issue
    // Revert to raw prefix
    if (prevResult.slice(0, prefixLength) !== prefix) {
      return '';
    }

    const prevValue = this.stripDelimiters(prevResult, delimiter, delimiters);

    // New value has issue, someone typed in between prefix letters
    // Revert to pre value
    if (val.slice(0, prefixLength) !== prefix) {
      return prevValue.slice(prefixLength);
    }

    // No issue, strip prefix for new value
    return val.slice(prefixLength);
  },

  getFirstDiffIndex(prev, current) {
    let index = 0;

    while (prev.charAt(index) === current.charAt(index)) {
      // eslint-disable-next-line
      if (prev.charAt(index++) === '') {
        return -1;
      }
    }

    return index;
  },

  getFormattedValue(value, blocks, blocksLength, delimiter, delimiters, delimiterLazyShow) {
    let val = value;
    let result = '';


    const multipleDelimiters = delimiters.length > 0;


    let currentDelimiter;

    // no options, normal input
    if (blocksLength === 0) {
      return val;
    }

    blocks.forEach((length, index) => {
      if (val.length > 0) {
        const sub = val.slice(0, length);


        const rest = val.slice(length);

        if (multipleDelimiters) {
          currentDelimiter = delimiters[delimiterLazyShow ? (index - 1) : index]
            || currentDelimiter;
        } else {
          currentDelimiter = delimiter;
        }

        if (delimiterLazyShow) {
          if (index > 0) {
            result += currentDelimiter;
          }

          result += sub;
        } else {
          result += sub;

          if (sub.length === length && index < blocksLength - 1) {
            result += currentDelimiter;
          }
        }

        // update remaining string
        val = rest;
      }
    });

    return result;
  },

  // move cursor to the end
  // the first time user focuses on an input with prefix
  fixPrefixCursor(el, prefix, delimiter, delimiters) {
    if (!el) {
      return;
    }

    const val = el.value;


    const appendix = delimiter || (delimiters[0] || ' ');

    if (!el.setSelectionRange || !prefix || (prefix.length + appendix.length) < val.length) {
      return;
    }

    const len = val.length * 2;

    // set timeout to avoid blink
    setTimeout(() => {
      el.setSelectionRange(len, len);
    }, 1);
  },

  setSelection(element, position, doc) {
    if (element !== this.getActiveElement(doc)) {
      return;
    }

    // cursor is already in the end
    if (element && element.value.length <= position) {
      return;
    }

    if (element.createTextRange) {
      const range = element.createTextRange();

      range.move('character', position);
      range.select();
    } else {
      try {
        element.setSelectionRange(position, position);
      } catch (e) {
        // eslint-disable-next-line
              console.warn('The input element type does not support selection');
      }
    }
  },

  getActiveElement(parent) {
    const { activeElement } = parent;
    if (activeElement && activeElement.shadowRoot) {
      return this.getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  },

  isAndroid() {
    return navigator && /android/i.test(navigator.userAgent);
  },

  // On Android chrome, the keyup and keydown events
  // always return key code 229 as a composition that
  // buffers the user’s keystrokes
  // see https://github.com/nosir/cleave.js/issues/147
  isAndroidBackspaceKeydown(lastInputValue, currentInputValue) {
    if (!this.isAndroid() || !lastInputValue || !currentInputValue) {
      return false;
    }

    return currentInputValue === lastInputValue.slice(0, -1);
  },
};

export default Util;
