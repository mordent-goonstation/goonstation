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
import { ModalType } from './type';

export const ChemMaster = () => {
  const [modalContextValue, modalContextState, ModalContext] =
    useModalContext();
  return (
    <Window width={435} height={480} theme="ntos">
      <ModalContext value={modalContextValue}>
        <Window.Content>
          <ReagentDisplay />
          <OperationsSection />
        </Window.Content>
        {modalContextState.modalType !== ModalType.None && (
          <SelectIconModal {...modalContextState} />
        )}
      </ModalContext>
    </Window>
  );
};
