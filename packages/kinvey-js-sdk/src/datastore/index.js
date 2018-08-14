import { getConfig } from '../client';
import NetworkStore from './networkstore';
import CacheStore from './cachestore';

const DATASTORE_POOL = new Map();

export const DataStoreType = {
  Cache: 'Cache',
  Network: 'Network'
};

export function collection(collectionName, type = DataStoreType.Cache, tag, options = { useDeltaSet: false, useAutoPagination: false }) {
  if (collectionName == null || typeof collectionName !== 'string') {
    throw new Error('A collection name is required and must be a string.');
  }

  const { appKey } = getConfig();
  const key = `${appKey}${collectionName}${type}${tag}`;
  let datastore = DATASTORE_POOL.get(key);

  if (!datastore) {
    if (type === DataStoreType.Network) {
      datastore = new NetworkStore(appKey, collectionName);
    } else if (type === DataStoreType.Cache) {
      datastore = new CacheStore(appKey, collectionName, tag, options);
    } else {
      throw new Error('Unknown data store type.');
    }

    DATASTORE_POOL.set(key, datastore);
  }

  return datastore;
}

export async function clearCache() {
  const promises = [];
  DATASTORE_POOL.forEach((datastore) => {
    if (datastore instanceof CacheStore) {
      promises.push(datastore.clear());
    }
  });
  const responses = await Promise.all(promises);
  return responses;
}
