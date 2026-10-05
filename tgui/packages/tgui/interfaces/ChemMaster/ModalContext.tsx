/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { createContext, useState } from 'react';

import { useConstant } from '../common/hooks';
import type { IconModalOptions, ModalContextValue } from './type';

const stubModalContextValue: ModalContextValue = {
  openModal: () => undefined,
  closeModal: () => undefined,
};

export const ModalContext = createContext(stubModalContextValue);

export const useModalContext = () => {
  const [modalOptions, setModalOptions] = useState<IconModalOptions | null>(
    null,
  );
  const modalContextValue = useConstant<ModalContextValue>(() => ({
    openModal: (options) => setModalOptions(options),
    closeModal: () => setModalOptions(null),
  }));
  return [modalContextValue, modalOptions, ModalContext] as const;
};
