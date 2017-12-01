import Client from 'kinvey-client';

import { Repository } from './repository';

export class OfflineRepository extends Repository {
  clear() {
    this._throwNotImplementedError();
  }

  _throwNotImplementedError() {
    throw new Error('Method of OfflineRepository not implemented');
  }

  // protected methods

  _getAppKey() {
    return Client.sharedInstance().appKey;
  }

  _ensureCollection(collectionName) {
    this._throwNotImplementedError(collectionName);
  }
}
