/**
 * @file
 * @copyright 2026
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { Button } from 'tgui-core/components';

import { type DriveSlotProps } from '../../../common/drives';

interface ModuleDriveSlotProps extends DriveSlotProps {}

export function ModuleDriveSlot(props: ModuleDriveSlotProps) {
  const { onClick } = props;
  return (
    <Button
      disabled={!onClick}
      fluid
      onClick={onClick}
      textAlign="center"
      height="100%"
      verticalAlignContent="middle"
    >
      Empty Module Slot
    </Button>
  );
}
