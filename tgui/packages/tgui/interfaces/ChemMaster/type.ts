/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { type ReagentContainer } from '../common/ReagentInfo';

export interface ChemMasterData {
  ampoule_options: [number, string][];
  bottle_options: [number, string][];
  container: ReagentContainer | null;
  default_name: string | null;
  patch_options: [number, string][];
  pill_options: string[];
  name_max_len: number;
}

export interface ItemIcon {
  src: string;
  // Fixed volume of the container; undefined if limited only by the source container
  capacity?: number;
}

export interface IconEntry {
  src: string;
  // Original index in the backend icon list, used for selection
  index: number;
}

export interface IconGroup {
  label?: string;
  icons: IconEntry[];
}

export interface IconModalOptions {
  title: string;
  groups: IconGroup[];
  onSelectIcon: (index: number) => void;
}

export interface ModalContextValue {
  openModal: (options: IconModalOptions) => void;
  closeModal: () => void;
}
