/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { Window } from '../../layouts';
import { useModalContext } from './ModalContext';
import { OperationsSection } from './OperationsSection';
import { ReagentDisplay } from './ReagentDisplay';
import { SelectIconModal } from './SelectIconModal';

export const ChemMaster = () => {
  const [modalContextValue, modalOptions, ModalContext] = useModalContext();
  return (
    <Window width={435} height={510} theme="ntos">
      <ModalContext value={modalContextValue}>
        <Window.Content>
          <ReagentDisplay />
          <OperationsSection />
        </Window.Content>
        {modalOptions && <SelectIconModal {...modalOptions} />}
      </ModalContext>
    </Window>
  );
};
