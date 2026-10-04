/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { createContext, useState } from 'react';

import { useConstant } from '../common/hooks';
import {
  type ModalContextState,
  type ModalContextValue,
  ModalType,
} from './type';

const closedModalState: ModalContextState = {
  modalType: ModalType.None,
  onSelectIcon: () => undefined,
};

const stubModalContextValue: ModalContextValue = {
  openModal: () => undefined,
  closeModal: () => undefined,
};

export const ModalContext = createContext(stubModalContextValue);

export const useModalContext = () => {
  const [modalContextState, setModalContextState] =
    useState<ModalContextState>(closedModalState);
  const modalContextValue = useConstant<ModalContextValue>(() => ({
    openModal: (modalType, onSelectIcon) =>
      setModalContextState({ modalType, onSelectIcon }),
    closeModal: () => setModalContextState(closedModalState),
  }));
  return [modalContextValue, modalContextState, ModalContext] as const;
};
