/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { Window } from '../../layouts';
import { OperationsSection } from './OperationsSection';
import { ReagentDisplay } from './ReagentDisplay';

export const ChemMaster = () => {
  return (
    <Window width={435} height={480} theme="ntos">
      <Window.Content>
        <ReagentDisplay />
        <OperationsSection />
      </Window.Content>
    </Window>
  );
};
