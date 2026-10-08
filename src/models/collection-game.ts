import { Game } from './game';
import { CollectionStatusEnum } from './enums';

/**
 * A game as listed in the user's collection. `status` and `rating` are
 * optional until the collection endpoint returns them.
 */
export type CollectionGame = Game & {
  status?: CollectionStatusEnum;
  rating?: number;
};

/**
 * Collection statuses in display order, with their Material Symbols icon
 * and the suffix of their design tokens (--status-<key>, --status-<key>-soft).
 */
export const STATUS_META: {
  status: CollectionStatusEnum;
  icon: string;
  key: string;
}[] = [
  {
    status: CollectionStatusEnum.playing,
    icon: 'sports_esports',
    key: 'playing',
  },
  {
    status: CollectionStatusEnum.completed,
    icon: 'emoji_events',
    key: 'completed',
  },
  { status: CollectionStatusEnum.played, icon: 'check_circle', key: 'played' },
  {
    status: CollectionStatusEnum.abandoned,
    icon: 'heart_broken',
    key: 'abandoned',
  },
  {
    status: CollectionStatusEnum.retired,
    icon: 'all_inclusive',
    key: 'retired',
  },
];
