/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { type ReagentContainer } from '../common/ReagentInfo';

export interface ChemMasterData {
  bottle_icons: [number, string][];
  container: ReagentContainer | null;
  default_name: string | null;
  patch_icons: [number, string][];
  pill_icons: [number, string][];
  name_max_len: number;
}

export enum ModalType {
  None = 'none',
  SinglePill = 'singlepill',
  MultiplePills = 'multiplepills',
  Bottle = 'bottle',
  SinglePatch = 'singlepatch',
  MultiplePatches = 'multiplepatches',
}

export interface ModalContextValue {
  openModal: (
    modalType: ModalType,
    onSelectIcon: (index: number) => void,
  ) => void;
  closeModal: () => void;
}

export interface ModalContextState {
  modalType: ModalType;
  onSelectIcon: (index: number) => void;
}
