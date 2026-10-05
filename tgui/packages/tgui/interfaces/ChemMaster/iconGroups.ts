/**
 * @file
 * @copyright 2026 Mordent
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import type { IconEntry, IconGroup, ItemIcon } from './type';

// Group icons by capacity, keeping each icon's original index for selection
export const groupIcons = (icons: ItemIcon[]): IconGroup[] => {
  const iconsByCapacity = new Map<number | undefined, IconEntry[]>();
  icons.forEach(({ src, capacity }, index) => {
    const group = iconsByCapacity.get(capacity) ?? [];
    group.push({ src, index });
    iconsByCapacity.set(capacity, group);
  });
  return [...iconsByCapacity.entries()]
    .sort(([a], [b]) => (a ?? 0) - (b ?? 0))
    .map(([capacity, icons]) => ({
      label: capacity === undefined ? undefined : `${capacity}u`,
      icons,
    }));
};
