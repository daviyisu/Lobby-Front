import { CollectionStatusEnum } from './enums';

export interface GameDialogInterface {
  gameId: number;
  currentStatus: CollectionStatusEnum;
}
