import BaseError from './base';

export default class MissingQueryError extends BaseError {
  constructor(message = 'The request is missing a query string.', debug, code) {
    super('MissingQueryError', message, debug, code);
  }
}
