import BaseError from './base';

export default class MissingRequestHeaderError extends BaseError {
  constructor(message = 'The request is missing a required header.', debug, code) {
    super('MissingRequestHeaderError', message, debug, code);
  }
}
