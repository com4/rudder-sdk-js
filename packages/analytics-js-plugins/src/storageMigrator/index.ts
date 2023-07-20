/* eslint-disable no-param-reassign */
import { ApplicationState, ILogger, IStorage } from '../types/common';
import { ExtensionPlugin, Nullable } from '../types/plugins';
import { decrypt as decryptLegacy } from '../storageEncryptionLegacy/legacyEncryptionUtils';
import { isNullOrUndefined } from '../utilities/common';
import { decrypt } from '../storageEncryption/encryptionUtils';
import { STORAGE_MIGRATION_ERROR } from '../utilities/logMessages';
import { STORAGE_MIGRATOR_PLUGIN } from './constants';

const pluginName = 'StorageMigrator';

const StorageMigrator = (): ExtensionPlugin => ({
  name: pluginName,
  initialize: (state: ApplicationState) => {
    state.plugins.loadedPlugins.value = [...state.plugins.loadedPlugins.value, pluginName];
  },
  storage: {
    migrate(key: string, storageEngine: IStorage, logger?: ILogger): Nullable<string> {
      try {
        const storedVal = storageEngine.getItem(key);
        if (isNullOrUndefined(storedVal)) {
          return null;
        }

        let decryptedVal = decryptLegacy(storedVal as string);

        // The value is not encrypted using legacy encryption
        // Try latest
        if (decryptedVal === storedVal) {
          decryptedVal = decrypt(storedVal);
        }

        if (isNullOrUndefined(decryptedVal)) {
          return null;
        }

        // storejs that is used in localstorage engine already deserializes json strings but swallows errors
        return JSON.parse(decryptedVal);
      } catch (err) {
        logger?.error(STORAGE_MIGRATION_ERROR(STORAGE_MIGRATOR_PLUGIN, key), err);
        return null;
      }
    },
  },
});

export { StorageMigrator };

export default StorageMigrator;