import { ServiceAddons } from '@feathersjs/feathers';

import { localDebug } from '@/lib/debug';
import TypeORMService from '@/services/TypeORMService';

export default class SyncTypeORMService<T> extends TypeORMService<T> {
  sync(
    this: SyncTypeORMService<T> & ServiceAddons<T>,
    syncId: string,
    onSyncComplete: () => void,
    syncState?: number,
  ): number {
    const newSyncState = Math.floor(new Date().getTime() / 1000);
    void this.loadAndEmitDataToSync(syncId, new Date(syncState ? syncState * 1000 : 0), onSyncComplete);
    localDebug(`sync - ${this.getRepository().metadata.name}`, 'Received new sync state', newSyncState);
    return newSyncState;
  }

  private async loadAndEmitDataToSync(
    this: SyncTypeORMService<T> & ServiceAddons<T>,
    syncId: string,
    syncTime: Date,
    onSyncComplete: () => void,
  ): Promise<void> {
    const query = {
      meta: {
        updated: {
          $gte: syncTime,
        },
      },
    };
    const dataArray = (await this.find({ query, paginate: false })) as T[];
    dataArray.forEach((data) => {
      this.emit('updated', { syncId, data: data });
    });
    localDebug(`sync - ${this.getRepository().metadata.name}`, 'sync completed');
    onSyncComplete();
  }
}
