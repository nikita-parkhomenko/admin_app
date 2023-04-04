
// outsource dependencies
import _ from 'lodash';

// local dependencies
import { CURRENCY, DIR, urlRegExp } from '../constants';


/**
 *
 * @param {String} string
 * @returns {String}
 */
export const humanize = string => !string ? '' : String(string)
  // from camel case
  .replace(/([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g, '$1$4 $2$3$5')
  // spec
  .replace(/[_-]+/g, ' ')
  // normalize
  .replace(/\s+/g, ' ')
  // trim
  .replace(/^\s*|\s*$/g, '')
  // capitalize
  .toLowerCase()
  .replace(/^.{1,1}/, sib => sib.toUpperCase());

/**
 * handle string and make enum from it
 *
 * @param {String} string
 * @returns {String}
 */
export const toEnum = (string = '') => String(string)
  .replace(/[^\w\d\s]/gi, '')
  .replace(/[\s]+/g, '_')
  .replace(/^_+|_+$/g, '')
  .toUpperCase();

/**
 * formatting html to plain text
 *
 * @param {String} html
 * @returns {String}
 */
export const escapeHtml = (html = '') => String(html).replace(/<[^>]*>?/gm, '');

/**
 * formatting:cut string by options
 *
 * @param {String} string
 * @param {Object} [options]
 * @returns {String}
 */
const defaultTruncateOptions = {
  breakOnWord: false,
  length: 10,
  end: '...',
};
export function truncate (string = '', options) {
  const { length, end, breakOnWord } = _.defaults(options, defaultTruncateOptions);
  // NOTE skip cases
  if (_.size(string) < length) { return string; }
  if (isNaN(length) || length <= 0) { return ''; }
  if (!_.isString(string)) { return ''; }
  // NOTE cut source
  string = string.substring(0, length);
  // NOTE cut more to the spice symbol
  if (!breakOnWord) {
    const lastSpace = string.lastIndexOf(' ');
    // NOTE get last space
    if (lastSpace !== -1) {
      string = string.substr(0, lastSpace);
    }
  }
  return string.trim() + end;
}

/**
 * checks - is this string can be url
 *
 * @param {String} string
 * @returns {Boolean}
 */
export const isUrl = (string = '') => urlRegExp.test(string);

/**
 * has definitions of BE s3 path and doesn't have the protocol
 * probably we should check exact s3 host, but i do not think so
 * @param url
 * @return {boolean|boolean}
 */
export const isS3RelativePath = url => {
  const s3RBEPathReg = new RegExp(`/public/(${Object.values(DIR).join('|')})/`);
  return s3RBEPathReg.test(url) && !/^http(s?):\/\//.test(url);
};

/**
 * @typedef {'short' | 'long'} NumberShortenerFormatDisplay
 */
/**
 * number shortener
 * @param {number} val number
 * @param {NumberShortenerFormatDisplay=} compactDisplay (short | long)
 * @returns {String}
 */
export const numberShortener = (val, compactDisplay= 'short') => Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
  compactDisplay: compactDisplay
}).format(val);

/**
 * prepare text price depend on currency
 * @param {Number|String} price amount of money
 * @param {String} currency currency enum
 * @returns {String}
 */
export const formatPrice = (price = 1, currency = CURRENCY.USD) => `${new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price) }`;

/**
 * check is object correct interface of file
 * @param file
 * @return {boolean}
 */
export const isFile = file => {
  return file instanceof File || (
    // NOTE same interface as File
    _.isObject(file)
    && _.isString(file.name)
    && _.isString(file.type)
    && _.isNumber(file.size)
  );
};
/**
 *
 * @param {File} file
 * @param {Number} [minKB=1]
 * @param {Number} [maxMB=1.1]
 * @return {string}
 */
export const validateFileSize = (file, minKB = 1, maxMB = 4.1) => {
  if (!isFile(file)) { return 'Not a valid file'; }
  const size = file.size;
  const KB = Math.floor(Number(size / 1024));
  const MB = Math.ceil(Number(size / (1024*1024)));
  if (KB < minKB) { return `File size is too small (${KB}kb), it should be at least ${Math.floor(minKB)}kb`; }
  if (MB > maxMB) { return `File size is too big (${MB}mb), it should be less than ${Math.floor(maxMB)}mb`; }

  return '';
};
