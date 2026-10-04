/**
 * @file
 * @copyright 2026
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { PropsWithChildren } from 'react';

import { Drive, type DriveBaseProps } from '../../../common/drives';
import { Module } from './Module';
import { ModuleDriveSlot } from './ModuleDriveSlot';

interface ModuleDriveProps extends DriveBaseProps {}

export function ModuleDrive(props: PropsWithChildren<ModuleDriveProps>) {
  return <Drive {...props} slotComponent={ModuleDriveSlot} />;
}

ModuleDrive.Module = Module;
