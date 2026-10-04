/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { type ReagentContainer } from '../common/ReagentInfo';

export interface ChemMasterData {
  bottle_icons;
  container: ReagentContainer | null;
  default_name: string | null;
  patch_icons;
  pill_icons;
  name_max_len;
}
